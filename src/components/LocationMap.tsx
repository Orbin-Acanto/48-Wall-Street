'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  TrainFront,
  Bus,
  BedDouble,
  SquareParking,
  Star,
  Check,
  type LucideIcon,
} from 'lucide-react';
import {
  MAP_CATEGORIES,
  VENUE,
  VENUE_COLOR,
  type MapCategory,
} from '@/data/locationMap';

type CategoryId = MapCategory['id'];

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  subway: TrainFront,
  bus: Bus,
  hotel: BedDouble,
  parking: SquareParking,
};

const TOTAL_LOCATIONS = MAP_CATEGORIES.reduce(
  (sum, c) => sum + c.points.length,
  0
);

// Lucide glyph paths (24x24, stroke-based) for each category's map marker.
const CATEGORY_GLYPHS: Record<CategoryId, string> = {
  subway:
    '<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>',
  bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  hotel:
    '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>',
  parking:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
};

// Builds a rounded pin badge that holds the category's icon in white on its color.
function makeCategoryIcon(color: string, glyph: string): L.DivIcon {
  return L.divIcon({
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
    html: `
      <div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9999px;background:${color};border:2px solid #ffffff;box-shadow:0 1px 4px rgba(0,0,0,0.4);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff"
             stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${glyph}</svg>
      </div>`,
  });
}

const CATEGORY_MARKER_ICONS = MAP_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat.id] = makeCategoryIcon(cat.color, CATEGORY_GLYPHS[cat.id]);
    return acc;
  },
  {} as Record<CategoryId, L.DivIcon>
);

// Gold star marker so the venue stands out as the highlighted location.
const venueIcon = L.divIcon({
  className: '',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  html: `
    <div style="display:flex;align-items:center;justify-content:center;width:42px;height:42px;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="${VENUE_COLOR}"
           stroke="#ffffff" stroke-width="1.4" stroke-linejoin="round"
           style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.45));">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>`,
});

// Great-circle distance in meters between two coordinates.
function haversineMeters(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Walking time (~80 m/min) and human-readable distance from the venue.
function walkInfo(lat: number, lng: number): { mins: number; dist: string } {
  const m = haversineMeters(VENUE.lat, VENUE.lng, lat, lng);
  const mins = Math.max(1, Math.round(m / 80));
  const miles = m / 1609.34;
  const dist =
    miles < 0.19 ? `${Math.round(m * 3.281)} ft` : `${miles.toFixed(1)} mi`;
  return { mins, dist };
}

// Use the address (not raw coords) so Google labels it "48 Wall Street"
// instead of reverse-geocoding the pin to a neighboring street number.
const VENUE_ADDRESS = '48 Wall Street, New York, NY 10005';

const directionsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    VENUE_ADDRESS
  )}&destination=${lat},${lng}&travelmode=walking`;

const mapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

// Recenters/zooms the map to fit the venue plus all currently visible points.
function FitToVisible({ visible }: { visible: Set<CategoryId> }) {
  const map = useMap();

  useEffect(() => {
    const pts: [number, number][] = [];
    MAP_CATEGORIES.forEach((cat) => {
      if (visible.has(cat.id)) {
        cat.points.forEach((p) => pts.push([p.lat, p.lng]));
      }
    });

    if (pts.length === 0) {
      // Nothing toggled on — keep a clean, close view centered on the venue.
      map.setView([VENUE.lat, VENUE.lng], 16, { animate: true });
      return;
    }

    const bounds = L.latLngBounds([[VENUE.lat, VENUE.lng], ...pts]).pad(0.15);
    map.fitBounds(bounds, { animate: true });
  }, [visible, map]);

  return null;
}

export default function LocationMap() {
  // Start clean: only the venue is shown until the user opts into categories.
  const [visible, setVisible] = useState<Set<CategoryId>>(() => new Set());

  const toggle = (id: CategoryId) =>
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allOn = visible.size === MAP_CATEGORIES.length;
  const toggleAll = () =>
    setVisible(allOn ? new Set() : new Set(MAP_CATEGORIES.map((c) => c.id)));

  const totalVisible = useMemo(
    () =>
      MAP_CATEGORIES.reduce(
        (sum, c) => sum + (visible.has(c.id) ? c.points.length : 0),
        0
      ),
    [visible]
  );

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* ── Always-open sidebar ─────────────────────────── */}
      <aside className="flex flex-col border-b border-gray-200 bg-gradient-to-b from-white to-gray-50/60 md:w-60 md:flex-shrink-0 md:border-r md:border-b-0">
        {/* Header */}
        <div className="border-b border-gray-100 px-5 pt-6 pb-5">
          <p className="font-secondary text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">
            Getting Here
          </p>
          <h3 className="font-primary text-dark-black mt-1 text-lg font-light tracking-wide uppercase">
            48 Wall Street
          </h3>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="font-secondary text-xs text-gray-500">
              <span className="text-dark-black font-semibold">
                {totalVisible}
              </span>{' '}
              / {TOTAL_LOCATIONS} shown
            </span>
            <button
              type="button"
              onClick={toggleAll}
              className="font-secondary text-primary text-[11px] font-semibold tracking-wide uppercase transition-opacity hover:opacity-70"
            >
              {allOn ? 'Hide all' : 'Show all'}
            </button>
          </div>
        </div>

        {/* Category list */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* Venue (always shown) */}
          <div
            className="mb-3 flex items-center gap-3 rounded-xl border px-3 py-3"
            style={{
              borderColor: `${VENUE_COLOR}33`,
              backgroundColor: `${VENUE_COLOR}0f`,
            }}
          >
            <span
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
              style={{ backgroundColor: VENUE_COLOR }}
            >
              <Star className="h-[18px] w-[18px]" fill="currentColor" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-secondary text-dark-black text-sm font-semibold">
                The Venue
              </p>
              <p className="font-secondary truncate text-xs text-gray-500">
                48 Wall St
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {MAP_CATEGORIES.map((cat) => {
              const on = visible.has(cat.id);
              const Icon = CATEGORY_ICONS[cat.id];
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => toggle(cat.id)}
                    aria-pressed={on}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                      on
                        ? 'border-gray-200 bg-white shadow-sm hover:shadow-md'
                        : 'border-transparent bg-transparent hover:bg-white/60'
                    }`}
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                      style={{
                        backgroundColor: on ? `${cat.color}1a` : '#f3f4f6',
                        color: on ? cat.color : '#9ca3af',
                      }}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-secondary text-sm font-medium transition-colors ${
                          on ? 'text-dark-black' : 'text-gray-500'
                        }`}
                      >
                        {cat.label}
                      </p>
                      <p className="font-secondary text-xs text-gray-400">
                        {cat.points.length}
                      </p>
                    </div>

                    {/* Toggle indicator */}
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        on ? 'border-transparent' : 'border-gray-300'
                      }`}
                      style={on ? { backgroundColor: cat.color } : undefined}
                    >
                      {on && <Check className="h-3 w-3 text-white" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer hint */}
        <div className="hidden border-t border-gray-100 px-5 py-4 md:block">
          <p className="font-secondary text-[11px] leading-relaxed text-gray-400">
            Tap a category to add it to the map. Scroll over the map to zoom.
          </p>
        </div>
      </aside>

      {/* ── Map ──────────────────────────────────────────── */}
      <div className="relative h-[460px] flex-1 md:h-auto">
        <MapContainer
          center={[VENUE.lat, VENUE.lng]}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            subdomains="abcd"
          />

          <FitToVisible visible={visible} />

          {/* Category points */}
          {MAP_CATEGORIES.map(
            (cat) =>
              visible.has(cat.id) &&
              cat.points.map((p) => {
                const { mins, dist } = walkInfo(p.lat, p.lng);
                return (
                  <Marker
                    key={`${cat.id}-${p.name}-${p.lat}-${p.lng}`}
                    position={[p.lat, p.lng]}
                    icon={CATEGORY_MARKER_ICONS[cat.id]}
                  >
                    <Tooltip direction="top" offset={[0, -16]}>
                      {p.name}
                    </Tooltip>
                    <Popup>
                      <div className="min-w-[190px] py-0.5">
                        <p className="text-[13px] font-semibold text-gray-900">
                          {p.name}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                            {cat.label}
                          </span>
                        </div>
                        <p className="mt-2 text-[12px] text-gray-600">
                          <span className="font-semibold text-gray-800">
                            {mins} min walk
                          </span>{' '}
                          · {dist} from 48 Wall St
                        </p>
                        <div className="mt-2.5 flex items-center gap-3 border-t border-gray-100 pt-2">
                          <a
                            href={directionsUrl(p.lat, p.lng)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] font-semibold hover:underline"
                            style={{ color: cat.color }}
                          >
                            Directions ↗
                          </a>
                          <a
                            href={mapsUrl(p.lat, p.lng)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] font-medium text-gray-500 hover:underline"
                          >
                            Open in Maps ↗
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })
          )}

          {/* Venue marker — highlighted star, always on top */}
          <Marker position={[VENUE.lat, VENUE.lng]} icon={venueIcon} zIndexOffset={1000}>
            <Tooltip direction="top" offset={[0, -18]} permanent>
              <span className="font-semibold">48 Wall Street</span>
            </Tooltip>
            <Popup>
              <div className="min-w-[190px] py-0.5">
                <p className="text-[13px] font-semibold text-gray-900">
                  48 Wall Street
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: VENUE_COLOR }}
                  />
                  <span className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                    The Venue
                  </span>
                </div>
                <p className="mt-2 text-[12px] text-gray-600">
                  48 Wall St, New York, NY 10005
                  <br />
                  Financial District, Lower Manhattan
                </p>
                <div className="mt-2.5 border-t border-gray-100 pt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      VENUE_ADDRESS
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-semibold hover:underline"
                    style={{ color: VENUE_COLOR }}
                  >
                    Get Directions ↗
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
