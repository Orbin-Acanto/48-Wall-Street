import React, { useState } from 'react';
import {
  EVENT_TYPES,
  EventDetails,
  FloorKey,
  SERVICE_TYPES,
} from '@/types/floorplan.types';
import {
  AV_REQUIREMENTS,
  BAR_FINISHES,
  BAR_SERVICE_TYPES,
  BAR_STYLES,
  CATERING_STYLES,
  DANCE_FLOOR_TYPES,
  DECOR_STYLES,
  ENTERTAINMENT_OPTIONS,
  FOOD_TYPES,
  GOLD,
  LAYOUT_STYLES,
  POWER_PLANS,
  STAGE_SKIRTING_TYPES,
} from '@/data/event';

interface EventDetailsModalProps {
  isOpen: boolean;
  eventDetails: EventDetails;
  onSave: (details: EventDetails) => void;
  onClose: () => void;
  selectedFloor: FloorKey;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  eventDetails,
  onSave,
  onClose,
  selectedFloor,
}) => {
  const [formData, setFormData] = useState<EventDetails>({
    ...eventDetails,

    // Core & client
    clientName: eventDetails.clientName || '',
    clientEmail: eventDetails.clientEmail || '',
    eventName: eventDetails.eventName || '',
    eventType: eventDetails.eventType || '',
    guestCount: eventDetails.guestCount ?? 0,
    eventDate: eventDetails.eventDate || '',
    services: eventDetails.services || [],

    // Food & layout
    foodType: eventDetails.foodType || '',
    cateringStyle: eventDetails.cateringStyle || '',
    layoutStyle: eventDetails.layoutStyle || '',
    decorStyle: eventDetails.decorStyle || '',
    colorPalette: eventDetails.colorPalette || '',

    // Dance floor
    hasDanceFloor: eventDetails.hasDanceFloor ?? false,
    danceFloorSize: eventDetails.danceFloorSize || '',
    danceFloorType: eventDetails.danceFloorType || '',
    danceFloorColor: eventDetails.danceFloorColor || '',
    danceFloorLocation: eventDetails.danceFloorLocation || '',
    danceFloorNotes: eventDetails.danceFloorNotes || '',

    // Stage / podium
    hasStage: eventDetails.hasStage ?? false,
    stageSize: eventDetails.stageSize || '',
    stageSkirtingType: eventDetails.stageSkirtingType || '',
    stageBackdropStyle: eventDetails.stageBackdropStyle || '',
    hasPodium: eventDetails.hasPodium ?? false,
    podiumBranding: eventDetails.podiumBranding || '',
    podiumNotes: eventDetails.podiumNotes || '',

    // Bars
    barsCount:
      typeof eventDetails.barsCount === 'number' ? eventDetails.barsCount : 1,
    barStylePreference: eventDetails.barStylePreference || '',
    barFinishPreference: eventDetails.barFinishPreference || '',
    barServiceType: eventDetails.barServiceType || '',

    // AV & power
    avNeeds: eventDetails.avNeeds || [],
    avNotes: eventDetails.avNotes || '',
    powerPlan: eventDetails.powerPlan || '',
    powerNotes: eventDetails.powerNotes || '',

    // Entertainment
    entertainmentOptions: eventDetails.entertainmentOptions || [],
    entertainmentNotes: eventDetails.entertainmentNotes || '',

    // Schedule / notes
    loadInTime: eventDetails.loadInTime || '',
    loadOutTime: eventDetails.loadOutTime || '',
    eventScheduleNotes: eventDetails.eventScheduleNotes || '',
    specialNotes: eventDetails.specialNotes || '',

    // Floor
    floor: selectedFloor || 'ground',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange =
    <K extends keyof EventDetails>(key: K) =>
    (value: EventDetails[K]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const toggleArrayField = (
    field: 'avNeeds' | 'entertainmentOptions',
    value: string
  ) => {
    setFormData((prev) => {
      const current = (prev[field] || []) as string[];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  return (
    <div className="font-secondary fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
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
              <p className="text-xs text-gray-500">
                A simple overview so we can suggest a smart layout and setup for
                you.
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
          <div className="space-y-6 px-6 py-6">
            {/* STEP 1: ABOUT YOUR EVENT */}
            <section className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
              <header className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Step 1 · About Your Event
                </h3>
                <p className="text-xs text-gray-500">
                  Basic info so we understand what you&apos;re planning.
                </p>
              </header>

              <div className="grid gap-3 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.clientName || ''}
                    onChange={(e) => handleChange('clientName')(e.target.value)}
                    placeholder="e.g., Sarah Miller"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail || ''}
                    onChange={(e) =>
                      handleChange('clientEmail')(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Event name / type / date / guests */}
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Event Name{' '}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.eventName || ''}
                      onChange={(e) =>
                        handleChange('eventName')(e.target.value)
                      }
                      placeholder="e.g., Smith & Johnson Wedding"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Event Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) =>
                        handleChange('eventType')(e.target.value)
                      }
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">Choose one...</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Event Date{' '}
                      <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate || ''}
                      onChange={(e) =>
                        handleChange('eventDate')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Approx. Guest Count{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.guestCount}
                      onChange={(e) =>
                        handleChange('guestCount')(
                          Number.isNaN(parseInt(e.target.value, 10))
                            ? 0
                            : parseInt(e.target.value, 10)
                        )
                      }
                      placeholder="e.g., 120"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-gray-500">
                      Helps size seating, bars, and dance floor correctly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Load in/out */}
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Approx. Load-in Time
                  </label>
                  <input
                    type="text"
                    value={formData.loadInTime || ''}
                    onChange={(e) => handleChange('loadInTime')(e.target.value)}
                    placeholder="e.g., 8:00 AM"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Approx. Load-out Time
                  </label>
                  <input
                    type="text"
                    value={formData.loadOutTime || ''}
                    onChange={(e) =>
                      handleChange('loadOutTime')(e.target.value)
                    }
                    placeholder="e.g., 1:00 AM"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* STEP 2: SERVICES */}
            <section className="space-y-3 rounded-xl border border-gray-100 bg-white p-4">
              <header className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Step 2 · What You Need From Us
                </h3>
                <p className="text-xs text-gray-500">
                  Check everything you&apos;d like help with.
                </p>
              </header>

              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {SERVICE_TYPES.map((service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 transition-colors hover:border-gray-300 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="h-3.5 w-3.5 rounded border-gray-300"
                      style={{ accentColor: GOLD }}
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-[10px] text-gray-500">
                {formData.services.length} service
                {formData.services.length !== 1 ? 's' : ''} selected
              </p>
            </section>

            {/* STEP 3: FOOD, LAYOUT & LOOK */}
            <section className="space-y-4 rounded-xl bg-gray-50/70 p-4">
              <header className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Step 3 · Food, Layout &amp; Look
                </h3>
                <p className="text-xs text-gray-500">
                  Just choose what feels closest. You can always change later.
                </p>
              </header>

              <div className="space-y-3">
                {/* Food & catering */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Preferred Food Style
                    </label>
                    <select
                      value={formData.foodType || ''}
                      onChange={(e) => handleChange('foodType')(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">I&apos;m not sure yet</option>
                      {FOOD_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      How will food be served?
                    </label>
                    <select
                      value={formData.cateringStyle || ''}
                      onChange={(e) =>
                        handleChange('cateringStyle')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">Not decided yet</option>
                      {CATERING_STYLES.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Layout & decor */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Seating &amp; Layout
                    </label>
                    <select
                      value={formData.layoutStyle || ''}
                      onChange={(e) =>
                        handleChange('layoutStyle')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">Help me decide</option>
                      {LAYOUT_STYLES.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700">
                      Overall Style / Vibe
                    </label>
                    <select
                      value={formData.decorStyle || ''}
                      onChange={(e) =>
                        handleChange('decorStyle')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">Not sure</option>
                      {DECOR_STYLES.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Main Colors / Theme Words
                  </label>
                  <input
                    type="text"
                    value={formData.colorPalette || ''}
                    onChange={(e) =>
                      handleChange('colorPalette')(e.target.value)
                    }
                    placeholder="e.g., white, black, gold • modern, romantic"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* STEP 4: KEY AREAS */}
            <section className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
              <header className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Step 4 · Key Areas (Dance Floor, Stage, Bars)
                </h3>
                <p className="text-xs text-gray-500">
                  Tell us which main areas you want. We&apos;ll handle layout.
                </p>
              </header>

              {/* Dance Floor */}
              <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-start gap-3">
                  <input
                    id="hasDanceFloor"
                    type="checkbox"
                    checked={!!formData.hasDanceFloor}
                    onChange={(e) =>
                      handleChange('hasDanceFloor')(e.target.checked)
                    }
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    style={{ accentColor: GOLD }}
                  />
                  <div className="flex-1 space-y-2">
                    <label
                      htmlFor="hasDanceFloor"
                      className="text-xs font-medium text-gray-800"
                    >
                      Add a dance floor
                    </label>
                    <p className="text-[11px] text-gray-500">
                      If you&apos;re having dancing, check this and we&apos;ll
                      reserve space.
                    </p>

                    {formData.hasDanceFloor && (
                      <>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-[11px] font-medium text-gray-700">
                              Approx. Size
                            </label>
                            <input
                              type="text"
                              value={formData.danceFloorSize || ''}
                              onChange={(e) =>
                                handleChange('danceFloorSize')(e.target.value)
                              }
                              placeholder='e.g., "16x16 ft"'
                              className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-[11px] font-medium text-gray-700">
                              Look / Finish
                            </label>
                            <select
                              value={formData.danceFloorType || ''}
                              onChange={(e) =>
                                handleChange('danceFloorType')(e.target.value)
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                            >
                              <option value="">No preference</option>
                              {DANCE_FLOOR_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid gap-2 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-[11px] font-medium text-gray-700">
                              Color / Look
                            </label>
                            <input
                              type="text"
                              value={formData.danceFloorColor || ''}
                              onChange={(e) =>
                                handleChange('danceFloorColor')(e.target.value)
                              }
                              placeholder="e.g., all white, black border"
                              className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-[11px] font-medium text-gray-700">
                              Where in the room?
                            </label>
                            <input
                              type="text"
                              value={formData.danceFloorLocation || ''}
                              onChange={(e) =>
                                handleChange('danceFloorLocation')(
                                  e.target.value
                                )
                              }
                              placeholder="e.g., center, in front of stage"
                              className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                            />
                          </div>
                        </div>

                        <textarea
                          value={formData.danceFloorNotes || ''}
                          onChange={(e) =>
                            handleChange('danceFloorNotes')(e.target.value)
                          }
                          placeholder="LED patterns, monogram, special moments (first dance, Hora, etc.)"
                          rows={2}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Stage & Podium */}
              <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-start gap-3">
                  <input
                    id="hasStage"
                    type="checkbox"
                    checked={!!formData.hasStage}
                    onChange={(e) => handleChange('hasStage')(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    style={{ accentColor: GOLD }}
                  />
                  <div className="flex-1 space-y-2">
                    <label
                      htmlFor="hasStage"
                      className="text-xs font-medium text-gray-800"
                    >
                      Stage or presentation area
                    </label>
                    <p className="text-[11px] text-gray-500">
                      For bands, DJs, speeches, panels, or presentations.
                    </p>

                    {formData.hasStage && (
                      <>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-[11px] font-medium text-gray-700">
                              Approx. Stage Size
                            </label>
                            <input
                              type="text"
                              value={formData.stageSize || ''}
                              onChange={(e) =>
                                handleChange('stageSize')(e.target.value)
                              }
                              placeholder='e.g., "12x16 ft"'
                              className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-[11px] font-medium text-gray-700">
                              Stage Skirting / Finish
                            </label>
                            <select
                              value={formData.stageSkirtingType || ''}
                              onChange={(e) =>
                                handleChange('stageSkirtingType')(
                                  e.target.value
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                            >
                              <option value="">No preference</option>
                              {STAGE_SKIRTING_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-[11px] font-medium text-gray-700">
                            Backdrop / Look Behind Stage
                          </label>
                          <input
                            type="text"
                            value={formData.stageBackdropStyle || ''}
                            onChange={(e) =>
                              handleChange('stageBackdropStyle')(e.target.value)
                            }
                            placeholder="Pipe & drape, LED wall, custom branded set, etc."
                            className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                          />
                        </div>

                        {/* Podium */}
                        <div className="mt-2 space-y-1 rounded-lg bg-gray-50 p-2">
                          <div className="flex items-start gap-2">
                            <input
                              id="hasPodium"
                              type="checkbox"
                              checked={!!formData.hasPodium}
                              onChange={(e) =>
                                handleChange('hasPodium')(e.target.checked)
                              }
                              className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300"
                              style={{ accentColor: GOLD }}
                            />
                            <label
                              htmlFor="hasPodium"
                              className="text-[11px] font-medium text-gray-800"
                            >
                              Podium / lectern for speakers
                            </label>
                          </div>

                          {formData.hasPodium && (
                            <>
                              <select
                                value={formData.podiumBranding || ''}
                                onChange={(e) =>
                                  handleChange('podiumBranding')(e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                              >
                                <option value="">
                                  Branding on podium? (optional)
                                </option>
                                <option value="None">No branding</option>
                                <option value="Logo only">
                                  Logo on front panel
                                </option>
                                <option value="Full wrap">
                                  Full custom wrap
                                </option>
                                <option value="Digital screen">
                                  Digital screen / monitor
                                </option>
                              </select>

                              <textarea
                                value={formData.podiumNotes || ''}
                                onChange={(e) =>
                                  handleChange('podiumNotes')(e.target.value)
                                }
                                placeholder="Podium location, presenter notes, height preferences, etc."
                                rows={2}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                              />
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Bars */}
              <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-3">
                <label className="mb-1 block text-xs font-semibold text-gray-800">
                  Bars &amp; drink stations
                </label>
                <p className="text-[11px] text-gray-500">
                  Even a rough idea helps us avoid long lines.
                </p>

                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700">
                      How many bars?
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={formData.barsCount ?? 1}
                      onChange={(e) =>
                        handleChange('barsCount')(
                          Math.max(
                            0,
                            Number.isNaN(parseInt(e.target.value, 10))
                              ? 0
                              : parseInt(e.target.value, 10)
                          )
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700">
                      Bar type
                    </label>
                    <select
                      value={formData.barServiceType || ''}
                      onChange={(e) =>
                        handleChange('barServiceType')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">Not sure</option>
                      {BAR_SERVICE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700">
                      Bar shape
                    </label>
                    <select
                      value={formData.barStylePreference || ''}
                      onChange={(e) =>
                        handleChange('barStylePreference')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">No preference</option>
                      {BAR_STYLES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-700">
                      Look / finish
                    </label>
                    <select
                      value={formData.barFinishPreference || ''}
                      onChange={(e) =>
                        handleChange('barFinishPreference')(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                    >
                      <option value="">No preference</option>
                      {BAR_FINISHES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 5: AV & POWER */}
            <section className="space-y-4 rounded-xl bg-gray-50/70 p-4">
              <header className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Step 5 · Sound, Screens &amp; Power
                </h3>
                <p className="text-xs text-gray-500">
                  If you&apos;re not sure, just pick what you know for now.
                </p>
              </header>

              {/* AV */}
              <div className="space-y-2">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Sound / screens / recording
                </label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {AV_REQUIREMENTS.map((req) => (
                    <label
                      key={req}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-gray-800 hover:border-gray-300 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.avNeeds?.includes(req) || false}
                        onChange={() => toggleArrayField('avNeeds', req)}
                        className="h-3.5 w-3.5 rounded border-gray-300"
                        style={{ accentColor: GOLD }}
                      />
                      <span>{req}</span>
                    </label>
                  ))}
                </div>

                <textarea
                  value={formData.avNotes || ''}
                  onChange={(e) => handleChange('avNotes')(e.target.value)}
                  placeholder="Where do you imagine DJ/band, screens, camera, or tech table?"
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                />
              </div>

              {/* Power */}
              <div className="space-y-2">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Power / electrical
                </label>
                <select
                  value={formData.powerPlan || ''}
                  onChange={(e) => handleChange('powerPlan')(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                >
                  <option value="">Not sure yet</option>
                  {POWER_PLANS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <textarea
                  value={formData.powerNotes || ''}
                  onChange={(e) => handleChange('powerNotes')(e.target.value)}
                  placeholder="High-amp needs (LED wall, kitchen, band), preferred power drops, dedicated circuits, etc."
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                />
              </div>
            </section>

            {/* STEP 6: ENTERTAINMENT, SCHEDULE, NOTES */}
            <section className="space-y-4 rounded-xl border border-gray-100 bg-white p-4">
              <header className="space-y-1">
                <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Step 6 · Entertainment, Schedule &amp; Notes
                </h3>
                <p className="text-xs text-gray-500">
                  Anything you share here helps us make better suggestions.
                </p>
              </header>

              {/* Entertainment */}
              <div className="space-y-2">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Entertainment &amp; activations
                </label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {ENTERTAINMENT_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-gray-800 hover:border-gray-300 hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.entertainmentOptions?.includes(option) ||
                          false
                        }
                        onChange={() =>
                          toggleArrayField('entertainmentOptions', option)
                        }
                        className="h-3.5 w-3.5 rounded border-gray-300"
                        style={{ accentColor: GOLD }}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                <textarea
                  value={formData.entertainmentNotes || ''}
                  onChange={(e) =>
                    handleChange('entertainmentNotes')(e.target.value)
                  }
                  placeholder="Where do you imagine casino, karaoke, games, photo booth, etc.?"
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                />
              </div>

              {/* Schedule details */}
              <div className="space-y-2">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Event schedule / run of show
                </label>
                <textarea
                  value={formData.eventScheduleNotes || ''}
                  onChange={(e) =>
                    handleChange('eventScheduleNotes')(e.target.value)
                  }
                  placeholder="Ceremony / cocktail / reception timings, fashion show call times, filming schedule, key moments, etc."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                />
              </div>

              {/* Special notes */}
              <div className="space-y-2">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Anything else we should know?
                </label>
                <textarea
                  value={formData.specialNotes || ''}
                  onChange={(e) => handleChange('specialNotes')(e.target.value)}
                  placeholder="Accessibility needs, vendor restrictions, noise limits, must-have photo moments, kids/elderly seating, cultural elements, etc."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[rgba(212,175,55,0.25)] focus:outline-none"
                />
              </div>
            </section>
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
                  Quick Summary
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
                      • <span className="font-medium">Contact:</span>{' '}
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
                      • <span className="font-medium">Food service:</span>{' '}
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
                      • <span className="font-medium">Style:</span>{' '}
                      {formData.decorStyle}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C39A2F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = GOLD;
              }}
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
