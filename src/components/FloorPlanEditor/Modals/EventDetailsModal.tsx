import React, { useState } from 'react';
import {
  EVENT_TYPES,
  EventDetails,
  SERVICE_TYPES,
} from '@/types/floorplan.types';

interface EventDetailsModalProps {
  isOpen: boolean;
  eventDetails: EventDetails;
  onSave: (details: EventDetails) => void;
  onClose: () => void;
}

const FOOD_TYPES = [
  'No preference',
  'Modern American',
  'Mediterranean',
  'Italian',
  'French',
  'Middle Eastern',
  'Indian',
  'Asian Fusion',
  'Latin / Mexican',
  'BBQ / Rustic',
  'Vegan / Vegetarian Focused',
];

const CATERING_STYLES = [
  'Plated Dinner',
  'Buffet',
  'Family Style',
  "Cocktail / Passed Hors d'Oeuvres",
  'Food Stations',
  'Brunch',
];

const LAYOUT_STYLES = [
  'Banquet (round tables)',
  'Family-style long tables',
  'Theater / Rows',
  'Classroom',
  'U-shape / Boardroom',
  'Cocktail / Lounge',
  'Mixed (zones)',
];

const DECOR_STYLES = [
  'Minimal / Clean',
  'Classic / Elegant',
  'Modern / Geometric',
  'Rustic / Farmhouse',
  'Boho / Organic',
  'Glam / Luxe',
  'Themed (Corporate / Brand / Cultural)',
];

const GOLD = '#d2b371';

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  eventDetails,
  onSave,
  onClose,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<EventDetails>({
    ...eventDetails,
    clientName: eventDetails.clientName || '',
    clientEmail: eventDetails.clientEmail || '',
    foodType: eventDetails.foodType || '',
    cateringStyle: eventDetails.cateringStyle || '',
    layoutStyle: eventDetails.layoutStyle || '',
    decorStyle: eventDetails.decorStyle || '',
    colorPalette: eventDetails.colorPalette || '',
    hasDanceFloor: eventDetails.hasDanceFloor ?? false,
    danceFloorSize: eventDetails.danceFloorSize || '',
    hasStage: eventDetails.hasStage ?? false,
    stageSize: eventDetails.stageSize || '',
    barsCount:
      typeof eventDetails.barsCount === 'number' ? eventDetails.barsCount : 1,
    specialNotes: eventDetails.specialNotes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleChange =
    <K extends keyof EventDetails>(key: K) =>
    (value: EventDetails[K]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  return (
    <div
      className="font-secondary fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: '#FFF7E6' }}
            >
              <svg
                className="h-6 w-6"
                style={{ color: GOLD }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Event Details
              </h2>
              <p className="text-sm text-gray-500">
                Tell us enough so layout & decor can be genuinely smart.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-140px)] overflow-y-auto"
        >
          <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Client Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Client Information
                </h3>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName || ''}
                    onChange={(e) => handleChange('clientName')(e.target.value)}
                    placeholder="e.g., Sarah Miller"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail || ''}
                    onChange={(e) =>
                      handleChange('clientEmail')(e.target.value)
                    }
                    placeholder="client@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Core Event Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Event Basics
                </h3>

                {/* Event Name */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Event Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.eventName || ''}
                    onChange={(e) => handleChange('eventName')(e.target.value)}
                    placeholder="e.g., Smith & Johnson Wedding"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => handleChange('eventType')(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  >
                    <option value="">Select event type...</option>
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Guest Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.guestCount}
                    onChange={(e) =>
                      handleChange('guestCount')(
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    placeholder="Total expected guests"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-gray-500">
                    Used to size seating, bars, buffet lines, and circulation.
                  </p>
                </div>

                {/* Event Date */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Event Date <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate || ''}
                    onChange={(e) => handleChange('eventDate')(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Services */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Services
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_TYPES.map((service) => (
                    <label
                      key={service}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 transition-colors hover:border-gray-300 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="text-[${GOLD}] focus:ring-[${GOLD}] h-3.5 w-3.5 rounded border-gray-300"
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-1 text-[10px] text-gray-500">
                  {formData.services.length} service
                  {formData.services.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Food & Catering */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Food & Catering
                </h3>

                {/* Food Type */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Preferred Cuisine
                  </label>
                  <select
                    value={formData.foodType || ''}
                    onChange={(e) => handleChange('foodType')(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  >
                    <option value="">Select cuisine...</option>
                    {FOOD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Catering Style */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Catering Style
                  </label>
                  <select
                    value={formData.cateringStyle || ''}
                    onChange={(e) =>
                      handleChange('cateringStyle')(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  >
                    <option value="">Select style...</option>
                    {CATERING_STYLES.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[10px] text-gray-500">
                    This helps position buffets, stations, and service paths.
                  </p>
                </div>
              </div>

              {/* Layout & Decor */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Layout & Decor Preferences
                </h3>

                {/* Layout Style */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Preferred Layout
                  </label>
                  <select
                    value={formData.layoutStyle || ''}
                    onChange={(e) =>
                      handleChange('layoutStyle')(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  >
                    <option value="">Select layout...</option>
                    {LAYOUT_STYLES.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Decor Style */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Decor / Atmosphere
                  </label>
                  <select
                    value={formData.decorStyle || ''}
                    onChange={(e) => handleChange('decorStyle')(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  >
                    <option value="">Select decor style...</option>
                    {DECOR_STYLES.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Color Palette / Theme Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.colorPalette || ''}
                    onChange={(e) =>
                      handleChange('colorPalette')(e.target.value)
                    }
                    placeholder="e.g., white, black, gold • modern luxe"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Functional Zones */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Functional Zones
                </h3>

                {/* Dance Floor */}
                <div className="flex items-start gap-3">
                  <input
                    id="hasDanceFloor"
                    type="checkbox"
                    checked={!!formData.hasDanceFloor}
                    onChange={(e) =>
                      handleChange('hasDanceFloor')(e.target.checked)
                    }
                    className="text-[${GOLD}] focus:ring-[${GOLD}] mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="hasDanceFloor"
                      className="text-xs font-medium text-gray-800"
                    >
                      Include Dance Floor
                    </label>
                    <p className="text-[10px] text-gray-500">
                      AI can reserve central, front, or side space based on your
                      layout.
                    </p>
                    {formData.hasDanceFloor && (
                      <input
                        type="text"
                        value={formData.danceFloorSize || ''}
                        onChange={(e) =>
                          handleChange('danceFloorSize')(e.target.value)
                        }
                        placeholder='e.g., "16x16 ft center-stage"'
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                {/* Stage */}
                <div className="flex items-start gap-3">
                  <input
                    id="hasStage"
                    type="checkbox"
                    checked={!!formData.hasStage}
                    onChange={(e) => handleChange('hasStage')(e.target.checked)}
                    className="text-[${GOLD}] focus:ring-[${GOLD}] mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="hasStage"
                      className="text-xs font-medium text-gray-800"
                    >
                      Stage / Performance Area
                    </label>
                    <p className="text-[10px] text-gray-500">
                      For bands, DJs, panels, or presentations.
                    </p>
                    {formData.hasStage && (
                      <input
                        type="text"
                        value={formData.stageSize || ''}
                        onChange={(e) =>
                          handleChange('stageSize')(e.target.value)
                        }
                        placeholder='e.g., "8x12 ft near wall with power"'
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                {/* Bars */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Number of Bar / Drink Stations
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={formData.barsCount ?? 1}
                    onChange={(e) =>
                      handleChange('barsCount')(
                        Math.max(0, parseInt(e.target.value, 10) || 0)
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-gray-500">
                    Helps avoid congestion and informs bar placement
                    suggestions.
                  </p>
                </div>
              </div>

              {/* Special Notes */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
                  Special Notes & Constraints
                </h3>
                <textarea
                  value={formData.specialNotes || ''}
                  onChange={(e) => handleChange('specialNotes')(e.target.value)}
                  placeholder="Accessibility needs, vendor restrictions, noise limits, must-have photo moments, kids/elderly seating, etc."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Summary Ribbon */}
          <div className="px-6 pb-3">
            {(formData.eventType ||
              formData.guestCount > 0 ||
              formData.layoutStyle ||
              formData.cateringStyle ||
              formData.decorStyle) && (
              <div
                className="rounded-xl border px-4 py-3 text-xs"
                style={{
                  borderColor: '#F3D9A4',
                  backgroundColor: '#FFFBF3',
                }}
              >
                <div className="mb-1 font-semibold" style={{ color: GOLD }}>
                  AI Planning Snapshot
                </div>
                <div className="space-y-0.5 text-gray-800">
                  {formData.eventName && (
                    <div>
                      • <span className="font-medium">Event:</span>{' '}
                      {formData.eventName}
                    </div>
                  )}
                  {formData.eventType && (
                    <div>
                      • <span className="font-medium">Type:</span>{' '}
                      {formData.eventType}
                    </div>
                  )}
                  {formData.clientName && (
                    <div>
                      • <span className="font-medium">Client:</span>{' '}
                      {formData.clientName}
                      {formData.clientEmail ? ` (${formData.clientEmail})` : ''}
                    </div>
                  )}
                  {formData.guestCount > 0 && (
                    <div>
                      • <span className="font-medium">Guests:</span>{' '}
                      {formData.guestCount}
                    </div>
                  )}
                  {formData.cateringStyle && (
                    <div>
                      • <span className="font-medium">Catering:</span>{' '}
                      {formData.cateringStyle}
                    </div>
                  )}
                  {formData.foodType && (
                    <div>
                      • <span className="font-medium">Cuisine:</span>{' '}
                      {formData.foodType}
                    </div>
                  )}
                  {formData.layoutStyle && (
                    <div>
                      • <span className="font-medium">Layout:</span>{' '}
                      {formData.layoutStyle}
                    </div>
                  )}
                  {formData.decorStyle && (
                    <div>
                      • <span className="font-medium">Decor:</span>{' '}
                      {formData.decorStyle}
                    </div>
                  )}
                  {formData.colorPalette && (
                    <div>
                      • <span className="font-medium">Palette:</span>{' '}
                      {formData.colorPalette}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
              style={{ backgroundColor: GOLD }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#C39A2F')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = GOLD)
              }
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
