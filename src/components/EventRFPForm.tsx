'use client';

import { useState } from 'react';
import {
  ChevronDown,
  Volume2,
  Lightbulb,
  Monitor,
  Radio,
  Headphones,
  Wrench,
  Coffee,
  UtensilsCrossed,
  Wine,
  Sandwich,
  Salad,
  ChefHat,
  IceCreamCone,
  GlassWater,
  CheckCircle2,
  X,
  ArrowLeft,
} from 'lucide-react';
import CustomButton from './CustomButton';

// ── Shared sub-components ──────────────────────────────────────────

function StepIndicator({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center">
        {steps.map((label, idx) => (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {idx > 0 ? (
                <div className="h-px flex-1">
                  <div
                    className={`h-full transition-colors duration-300 ${
                      idx <= current ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                </div>
              ) : (
                <div className="flex-1" />
              )}
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center text-sm font-bold transition-all duration-300 ${
                  idx < current
                    ? 'bg-primary text-white'
                    : idx === current
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {idx < current ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="font-secondary">{idx + 1}</span>
                )}
              </div>
              {idx < steps.length - 1 ? (
                <div className="h-px flex-1">
                  <div
                    className={`h-full transition-colors duration-300 ${
                      idx < current ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                </div>
              ) : (
                <div className="flex-1" />
              )}
            </div>
            <span
              className={`font-secondary mt-2 hidden text-center text-[10px] tracking-[0.1em] uppercase sm:block ${
                idx <= current ? 'text-primary font-semibold' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile-only current step label */}
      <p className="font-secondary text-primary mt-4 text-center text-xs font-semibold tracking-[0.15em] uppercase sm:hidden">
        Step {current + 1} of {steps.length} — {steps[current]}
      </p>
    </div>
  );
}

function FieldCard({
  label,
  name,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="group rounded border border-gray-200 bg-white px-4 py-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      <label className="font-secondary mb-2 flex items-center gap-2 text-[10px] tracking-[0.15em] text-gray-400 uppercase">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-200 bg-transparent px-0 py-1 text-sm placeholder-gray-400 transition-colors focus:outline-none"
      />
    </div>
  );
}

function CounterCard({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="group flex flex-col items-center rounded border border-gray-200 bg-white px-4 py-6 text-center transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      <span className="font-secondary mb-3 text-[10px] tracking-[0.15em] text-gray-400 uppercase">
        {label}
      </span>
      <input
        type="number"
        name={name}
        min="0"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder="0"
        className="text-dark-black focus:border-primary font-primary w-full border-b border-gray-200 bg-transparent py-1 text-center text-2xl font-light placeholder-gray-300 transition-colors focus:outline-none"
      />
    </div>
  );
}

function CheckboxGroup({
  title,
  items,
  selected,
  onToggle,
}: {
  title?: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div>
      {title && (
        <h4 className="font-secondary text-dark-black mb-3 text-sm font-semibold">
          {title}
        </h4>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <label
            key={item}
            className="group flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors duration-150 hover:bg-gray-50"
          >
            <div
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center border-2 transition-all duration-200 ${
                selected.includes(item)
                  ? 'border-primary bg-primary'
                  : 'border-gray-400 group-hover:border-gray-600'
              }`}
            >
              {selected.includes(item) && (
                <svg
                  className="h-2.5 w-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="font-secondary text-dark-black/80 text-xs">
              {item}
            </span>
            <input
              type="checkbox"
              className="hidden"
              checked={selected.includes(item)}
              onChange={() => onToggle(item)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function RadioGroup({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <label
          key={item}
          className="group flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors duration-150 hover:bg-gray-50"
        >
          <div
            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
              selected === item
                ? 'border-primary'
                : 'border-gray-400 group-hover:border-gray-600'
            }`}
          >
            {selected === item && (
              <div className="bg-primary h-2 w-2 rounded-full" />
            )}
          </div>
          <span className="font-secondary text-dark-black/80 text-xs">
            {item}
          </span>
          <input
            type="radio"
            className="hidden"
            checked={selected === item}
            onChange={() => onSelect(item)}
          />
        </label>
      ))}
    </div>
  );
}

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border bg-white transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-sm' : 'border-gray-200'}`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50/50 md:px-8"
      >
        <span className="font-primary text-dark-black text-base font-light tracking-wide uppercase">
          {title}
        </span>
        <ChevronDown
          className={`text-dark-black/40 h-4 w-4 transition-transform duration-300 ${isOpen ? 'text-primary rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="border-t border-gray-100 px-6 py-8 md:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Icon service items ─────────────────────────────────────────────

const AV_SERVICES = [
  { label: 'Audio', icon: Volume2 },
  { label: 'Lighting', icon: Lightbulb },
  { label: 'Staging', icon: Monitor },
  { label: 'Video / LED Walls', icon: Radio },
  { label: 'Live Streaming Services', icon: Headphones },
  { label: 'Technical Production Support', icon: Wrench },
];

const FOOD_BEVERAGE = [
  { label: 'Breakfast', icon: Coffee },
  { label: 'Lunch', icon: Sandwich },
  { label: 'AM / PM Snacks', icon: IceCreamCone },
  { label: 'Cocktail Reception', icon: Wine },
  { label: 'Sit-Down Dinner', icon: UtensilsCrossed },
  { label: 'Food Stations', icon: Salad },
  { label: 'Bar Service', icon: GlassWater },
  { label: 'Custom Menu Design', icon: ChefHat },
];

// ── Main component ─────────────────────────────────────────────────

const STEP_LABELS = [
  'Services',
  'Event Info',
  'Venue & Catering',
  'Production',
  'Finalize',
];

export default function EventRFPForm() {
  const [step, setStep] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Step 1 state
  const [selectedAV, setSelectedAV] = useState<string[]>([]);
  const [selectedFB, setSelectedFB] = useState<string[]>([]);

  // Step 2 state
  const [fields, setFields] = useState<Record<string, string>>({});
  const [eventType, setEventType] = useState('');
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  // Step 3 state
  const [venueRequirements, setVenueRequirements] = useState<string[]>([]);
  const [roomSetup, setRoomSetup] = useState('');
  const [foodDetailed, setFoodDetailed] = useState<Record<string, string[]>>({
    breakfast: [],
    lunch: [],
    dinner: [],
    reception: [],
    beverage: [],
  });
  const [culinary, setCulinary] = useState<string[]>([]);

  // Step 4 state
  const [avProduction, setAvProduction] = useState<Record<string, string[]>>({
    audio: [],
    video: [],
    lighting: [],
    streaming: [],
    staging: [],
  });
  const [decor, setDecor] = useState<string[]>([]);
  const [entertainment, setEntertainment] = useState<string[]>([]);
  const [branding, setBranding] = useState<string[]>([]);

  // Step 5 state
  const [staffing, setStaffing] = useState<string[]>([]);

  const updateField = (name: string, value: string) =>
    setFields((p) => ({ ...p, [name]: value }));
  const updateAttendance = (name: string, value: string) =>
    setAttendance((p) => ({ ...p, [name]: value }));

  const toggleList = (
    item: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const toggleNestedList = (
    key: string,
    item: string,
    state: Record<string, string[]>,
    setter: (v: Record<string, string[]>) => void
  ) => {
    const current = state[key] || [];
    setter({
      ...state,
      [key]: current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item],
    });
  };

  const nextStep = () => {
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
    setOpenAccordion(null);
  };
  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
    setOpenAccordion(null);
  };

  const resetForm = () => {
    setStep(0);
    setOpenAccordion(null);
    setSelectedAV([]);
    setSelectedFB([]);
    setFields({});
    setEventType('');
    setAttendance({});
    setVenueRequirements([]);
    setRoomSetup('');
    setFoodDetailed({
      breakfast: [],
      lunch: [],
      dinner: [],
      reception: [],
      beverage: [],
    });
    setCulinary([]);
    setAvProduction({
      audio: [],
      video: [],
      lighting: [],
      streaming: [],
      staging: [],
    });
    setDecor([]);
    setEntertainment([]);
    setBranding([]);
    setStaffing([]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        services: { av: selectedAV, foodBeverage: selectedFB },
        eventInfo: {
          eventName: fields.eventName,
          company: fields.companyOrganization,
          contactName: fields.contactName,
          email: fields.emailAddress,
          phone: fields.phoneNumber,
          preferredVenue: fields.preferredVenue,
          eventDates: fields.eventDates,
          alternateDates: fields.alternateDates,
          startEndTime: fields.eventStartEndTime,
          loadInDateTime: fields.loadInDateTime,
          vendorLoadIn: fields.vendorLoadIn,
          loadOutDateTime: fields.loadOutDateTime,
        },
        eventType,
        attendance,
        venueRequirements,
        roomSetup,
        foodAndBeverage: foodDetailed,
        culinaryPreferences: culinary,
        avProduction,
        decor,
        entertainment,
        branding,
        logistics: {
          vendors: fields.numVendors,
          truckDeliveries: fields.truckDeliveries,
          freightRequirements: fields.freightRequirements,
          securityRequirements: fields.securityRequirements,
          insuranceCOIs: fields.insuranceCOIs,
          specialPermits: fields.specialPermits,
          electricalRequirements: fields.electricalRequirements,
          storageNeeds: fields.storageNeeds,
          overnightSecurity: fields.overnightSecurity,
        },
        staffing,
        budget: {
          estimated: fields.estimatedBudget,
          perGuest: fields.spendPerGuest,
          pricingTier: fields.pricingTier,
          flexibility: fields.budgetFlexibility,
        },
        additional: {
          eventGoals: fields.eventGoals,
          brandGuidelines: fields.brandGuidelines,
          specialRequests: fields.specialRequests,
        },
      };

      await fetch(
        'https://primary-production-f807.up.railway.app/webhook/35339c3d-5ccf-4015-b6c6-458109f44a89',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      setShowModal(true);
      resetForm();
    } catch {
      setShowModal(true);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-white px-6 py-20 md:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="font-secondary text-primary mb-4 text-center text-sm tracking-[0.3em] uppercase">
            Plan Every Detail
          </p>
          <h2 className="heading-hero text-center">
            Build Your Event Proposal
          </h2>
          <p className="text-lead mb-16 text-center">
            Design your event in just a few minutes. Our AI-powered Request for
            Proposal (RFP) Builder allows you to customize every aspect of your
            event. Once submitted, our team will review your selections and
            prepare a customized proposal, budget, floor plan, and event
            timeline.
          </p>

          <StepIndicator steps={STEP_LABELS} current={step} />

          <div className="mx-auto max-w-6xl">
            {/* ── Step 1: Services ─────────────────────────── */}
            {step === 0 && (
              <div>
                <h3 className="font-primary text-dark-black mb-2 text-center text-2xl font-light tracking-wide uppercase">
                  Style of Services
                </h3>
                <p className="text-lead mb-12 text-center">
                  Select the services you would like included in your event
                  proposal.
                </p>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <div className="mb-8 flex items-center gap-3">
                      <div className="bg-primary flex h-10 w-10 items-center justify-center">
                        <Volume2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-primary text-dark-black text-xl font-light tracking-wide uppercase">
                          AV Services
                        </h4>
                        <p className="font-secondary text-xs text-gray-400">
                          Select all that apply
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {AV_SERVICES.map(({ label, icon: Icon }) => {
                        const sel = selectedAV.includes(label);
                        return (
                          <label
                            key={label}
                            className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-all duration-200"
                          >
                            <div
                              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-all duration-200 ${sel ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span
                              className={`font-secondary text-sm ${sel ? 'text-dark-black font-medium' : 'text-dark-black/70'}`}
                            >
                              {label}
                            </span>
                            <div className="ml-auto">
                              <div
                                className={`flex h-5 w-5 items-center justify-center border-2 transition-all duration-200 ${sel ? 'border-primary bg-primary' : 'border-gray-300'}`}
                              >
                                {sel && (
                                  <svg
                                    className="h-3 w-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={sel}
                              onChange={() =>
                                toggleList(label, selectedAV, setSelectedAV)
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-8 flex items-center gap-3">
                      <div className="bg-primary flex h-10 w-10 items-center justify-center">
                        <UtensilsCrossed className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-primary text-dark-black text-xl font-light tracking-wide uppercase">
                          Food & Beverage
                        </h4>
                        <p className="font-secondary text-xs text-gray-400">
                          Select all that apply
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {FOOD_BEVERAGE.map(({ label, icon: Icon }) => {
                        const sel = selectedFB.includes(label);
                        return (
                          <label
                            key={label}
                            className="group flex cursor-pointer items-center gap-4 px-5 py-4 transition-all duration-200"
                          >
                            <div
                              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-all duration-200 ${sel ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span
                              className={`font-secondary text-sm ${sel ? 'text-dark-black font-medium' : 'text-dark-black/70'}`}
                            >
                              {label}
                            </span>
                            <div className="ml-auto">
                              <div
                                className={`flex h-5 w-5 items-center justify-center border-2 transition-all duration-200 ${sel ? 'border-primary bg-primary' : 'border-gray-300'}`}
                              >
                                {sel && (
                                  <svg
                                    className="h-3 w-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={sel}
                              onChange={() =>
                                toggleList(label, selectedFB, setSelectedFB)
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Event Info ───────────────────────── */}
            {step === 1 && (
              <div className="space-y-14">
                <div>
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Contact Details
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FieldCard
                      label="Event Name"
                      name="eventName"
                      value={fields.eventName || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Company / Organization"
                      name="companyOrganization"
                      value={fields.companyOrganization || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Contact Name"
                      name="contactName"
                      value={fields.contactName || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Email Address"
                      name="emailAddress"
                      type="email"
                      value={fields.emailAddress || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={fields.phoneNumber || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Preferred Venue"
                      name="preferredVenue"
                      value={fields.preferredVenue || ''}
                      onChange={updateField}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-12">
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Event Schedule
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FieldCard
                      label="Event Date(s)"
                      name="eventDates"
                      value={fields.eventDates || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Alternate Date(s)"
                      name="alternateDates"
                      value={fields.alternateDates || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Start & End Time"
                      name="eventStartEndTime"
                      value={fields.eventStartEndTime || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Load-In Date & Time"
                      name="loadInDateTime"
                      value={fields.loadInDateTime || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Vendor Load-In"
                      name="vendorLoadIn"
                      value={fields.vendorLoadIn || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Load-Out Date & Time"
                      name="loadOutDateTime"
                      value={fields.loadOutDateTime || ''}
                      onChange={updateField}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-12">
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Event Type
                  </h4>
                  <RadioGroup
                    items={[
                      'Corporate Meeting',
                      'Conference',
                      'General Session',
                      'Town Hall',
                      'Awards Gala',
                      'Holiday Party',
                      'Fundraiser',
                      'Wedding',
                      'Bar/Bat Mitzvah',
                      'Fashion Show',
                      'Product Launch',
                      'Press Conference',
                      'Trade Show',
                      'Expo',
                      'Networking Reception',
                      'Cocktail Reception',
                      'Charity Event',
                      'Private Celebration',
                      'Film Screening',
                      'Brand Activation',
                      'Pop-Up Experience',
                      'Other',
                    ]}
                    selected={eventType}
                    onSelect={setEventType}
                  />
                </div>

                <div className="border-t border-gray-200 pt-12">
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Estimated Attendance
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    <CounterCard
                      label="Guests"
                      name="guestCount"
                      value={attendance.guestCount || ''}
                      onChange={updateAttendance}
                    />
                    <CounterCard
                      label="VIP"
                      name="vipCount"
                      value={attendance.vipCount || ''}
                      onChange={updateAttendance}
                    />
                    <CounterCard
                      label="Speakers"
                      name="speakerCount"
                      value={attendance.speakerCount || ''}
                      onChange={updateAttendance}
                    />
                    <CounterCard
                      label="Exhibitors"
                      name="exhibitorCount"
                      value={attendance.exhibitorCount || ''}
                      onChange={updateAttendance}
                    />
                    <CounterCard
                      label="Press / Media"
                      name="pressCount"
                      value={attendance.pressCount || ''}
                      onChange={updateAttendance}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Venue & Catering ─────────────────── */}
            {step === 2 && (
              <div className="space-y-4">
                <AccordionSection
                  title="Venue Requirements"
                  isOpen={openAccordion === 'venue'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'venue' ? null : 'venue')
                  }
                >
                  <CheckboxGroup
                    items={[
                      'Ballroom',
                      'Historic Banking Hall',
                      'Breakout Rooms',
                      'Green Rooms',
                      'Bridal Suite',
                      'Registration Area',
                      'VIP Lounge',
                      'Speaker Ready Room',
                      'Back-of-House Production Office',
                      'Catering Prep Kitchen',
                      'Freight Elevator',
                      'Loading Dock',
                      'Coat Check',
                      'ADA Accessibility',
                      'Secure Storage',
                      'Wi-Fi',
                      'High-Speed Internet',
                      'Power Distribution',
                    ]}
                    selected={venueRequirements}
                    onToggle={(i) =>
                      toggleList(i, venueRequirements, setVenueRequirements)
                    }
                  />
                </AccordionSection>

                <AccordionSection
                  title="Room Setup"
                  isOpen={openAccordion === 'room'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'room' ? null : 'room')
                  }
                >
                  <RadioGroup
                    items={[
                      'Theater',
                      'Classroom',
                      'Banquet',
                      'Cabaret',
                      'Hollow Square',
                      'U-Shape',
                      'Conference',
                      'Cocktail Style',
                      'Standing Reception',
                      'Custom Layout',
                    ]}
                    selected={roomSetup}
                    onSelect={setRoomSetup}
                  />
                </AccordionSection>

                <AccordionSection
                  title="Food & Beverage Details"
                  isOpen={openAccordion === 'fb'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'fb' ? null : 'fb')
                  }
                >
                  <div className="space-y-6">
                    <CheckboxGroup
                      title="Breakfast"
                      items={[
                        'Continental',
                        'Full Breakfast',
                        'Executive Breakfast',
                      ]}
                      selected={foodDetailed.breakfast}
                      onToggle={(i) =>
                        toggleNestedList(
                          'breakfast',
                          i,
                          foodDetailed,
                          setFoodDetailed
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Lunch"
                      items={[
                        'Box Lunches',
                        'Buffet',
                        'Plated Lunch',
                        'Food Stations',
                      ]}
                      selected={foodDetailed.lunch}
                      onToggle={(i) =>
                        toggleNestedList(
                          'lunch',
                          i,
                          foodDetailed,
                          setFoodDetailed
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Dinner"
                      items={[
                        'Buffet',
                        'Plated Dinner',
                        'Multi-Course Dinner',
                        "Chef's Table Experience",
                      ]}
                      selected={foodDetailed.dinner}
                      onToggle={(i) =>
                        toggleNestedList(
                          'dinner',
                          i,
                          foodDetailed,
                          setFoodDetailed
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Reception"
                      items={[
                        "Passed Hors d'oeuvres",
                        'Cocktail Reception',
                        'Grazing Tables',
                        'Dessert Display',
                        'Late-Night Snacks',
                      ]}
                      selected={foodDetailed.reception}
                      onToggle={(i) =>
                        toggleNestedList(
                          'reception',
                          i,
                          foodDetailed,
                          setFoodDetailed
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Beverage Service"
                      items={[
                        'Coffee Service',
                        'Tea Service',
                        'Soft Drinks',
                        'Juice Station',
                        'Open Bar',
                        'Premium Bar',
                        'Signature Cocktails',
                        'Wine Pairing',
                        'Champagne Toast',
                      ]}
                      selected={foodDetailed.beverage}
                      onToggle={(i) =>
                        toggleNestedList(
                          'beverage',
                          i,
                          foodDetailed,
                          setFoodDetailed
                        )
                      }
                    />
                  </div>
                </AccordionSection>

                <AccordionSection
                  title="Culinary Preferences"
                  isOpen={openAccordion === 'culinary'}
                  onToggle={() =>
                    setOpenAccordion(
                      openAccordion === 'culinary' ? null : 'culinary'
                    )
                  }
                >
                  <CheckboxGroup
                    items={[
                      'Kosher',
                      'Halal',
                      'Vegan',
                      'Vegetarian',
                      'Gluten-Free',
                      'Dairy-Free',
                      'Nut-Free',
                      'Custom Dietary Requirements',
                    ]}
                    selected={culinary}
                    onToggle={(i) => toggleList(i, culinary, setCulinary)}
                  />
                </AccordionSection>
              </div>
            )}

            {/* ── Step 4: Production & Design ──────────────── */}
            {step === 3 && (
              <div className="space-y-4">
                <AccordionSection
                  title="Audio Visual & Production"
                  isOpen={openAccordion === 'av'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'av' ? null : 'av')
                  }
                >
                  <div className="space-y-6">
                    <CheckboxGroup
                      title="Audio"
                      items={[
                        'Wireless Microphones',
                        'Podium Microphone',
                        'Lavalier Microphones',
                        'Headset Microphones',
                        'House Sound System',
                        'Line Array Speakers',
                        'Audio Recording',
                      ]}
                      selected={avProduction.audio}
                      onToggle={(i) =>
                        toggleNestedList(
                          'audio',
                          i,
                          avProduction,
                          setAvProduction
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Video"
                      items={[
                        'Projection',
                        'LED Video Wall',
                        'LCD Displays',
                        'Confidence Monitors',
                        'Playback System',
                        'Media Server',
                        'Presentation Management',
                        'Teleprompter',
                      ]}
                      selected={avProduction.video}
                      onToggle={(i) =>
                        toggleNestedList(
                          'video',
                          i,
                          avProduction,
                          setAvProduction
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Lighting"
                      items={[
                        'Stage Wash',
                        'Intelligent Lighting',
                        'Pin Spot Lighting',
                        'Architectural Lighting',
                        'Ambient Lighting',
                        'Custom Gobos',
                        'Dance Floor Lighting',
                      ]}
                      selected={avProduction.lighting}
                      onToggle={(i) =>
                        toggleNestedList(
                          'lighting',
                          i,
                          avProduction,
                          setAvProduction
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Streaming & Broadcast"
                      items={[
                        'Live Streaming',
                        'Hybrid Meeting',
                        'Zoom Integration',
                        'Microsoft Teams',
                        'Webinar Production',
                        'Multi-Camera Broadcast',
                        'Recording Services',
                      ]}
                      selected={avProduction.streaming}
                      onToggle={(i) =>
                        toggleNestedList(
                          'streaming',
                          i,
                          avProduction,
                          setAvProduction
                        )
                      }
                    />
                    <CheckboxGroup
                      title="Staging"
                      items={[
                        'Custom Stage',
                        'Runway',
                        'Risers',
                        'ADA Ramp',
                        'Pipe & Drape',
                        'Scenic Backdrop',
                        'Custom Fabrication',
                      ]}
                      selected={avProduction.staging}
                      onToggle={(i) =>
                        toggleNestedList(
                          'staging',
                          i,
                          avProduction,
                          setAvProduction
                        )
                      }
                    />
                  </div>
                </AccordionSection>

                <AccordionSection
                  title="Decor & Design"
                  isOpen={openAccordion === 'decor'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'decor' ? null : 'decor')
                  }
                >
                  <CheckboxGroup
                    items={[
                      'Floral Design',
                      'Lounge Furniture',
                      'Luxury Furniture',
                      'Centerpieces',
                      'Custom Branding',
                      'Vinyl Graphics',
                      'Step & Repeat',
                      'Entrance Feature',
                      'Digital Signage',
                      'LED Decor',
                      'Balloon Design',
                      'Ceiling Treatments',
                      'Draping',
                      'Dance Floor Wrap',
                    ]}
                    selected={decor}
                    onToggle={(i) => toggleList(i, decor, setDecor)}
                  />
                </AccordionSection>

                <AccordionSection
                  title="Entertainment"
                  isOpen={openAccordion === 'ent'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'ent' ? null : 'ent')
                  }
                >
                  <CheckboxGroup
                    items={[
                      'DJ',
                      'Live Band',
                      'Jazz Ensemble',
                      'String Quartet',
                      'Celebrity Entertainment',
                      'Emcee',
                      'Comedian',
                      'Motivational Speaker',
                      'Interactive Performers',
                      'Casino Tables',
                      'Photo Booth',
                      '360 Video Booth',
                      'Magician',
                      'Cultural Entertainment',
                    ]}
                    selected={entertainment}
                    onToggle={(i) =>
                      toggleList(i, entertainment, setEntertainment)
                    }
                  />
                </AccordionSection>

                <AccordionSection
                  title="Event Branding"
                  isOpen={openAccordion === 'brand'}
                  onToggle={() =>
                    setOpenAccordion(openAccordion === 'brand' ? null : 'brand')
                  }
                >
                  <CheckboxGroup
                    items={[
                      'Registration Website',
                      'Event App',
                      'Digital Invitations',
                      'Name Badges',
                      'Credential Printing',
                      'Signage',
                      'Wayfinding',
                      'Sponsor Branding',
                      'LED Content Design',
                      'Motion Graphics',
                    ]}
                    selected={branding}
                    onToggle={(i) => toggleList(i, branding, setBranding)}
                  />
                </AccordionSection>
              </div>
            )}

            {/* ── Step 5: Finalize ─────────────────────────── */}
            {step === 4 && (
              <div className="space-y-14">
                <div>
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Logistics
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FieldCard
                      label="Number of Vendors"
                      name="numVendors"
                      value={fields.numVendors || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Truck Deliveries"
                      name="truckDeliveries"
                      value={fields.truckDeliveries || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Freight Requirements"
                      name="freightRequirements"
                      value={fields.freightRequirements || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Security Requirements"
                      name="securityRequirements"
                      value={fields.securityRequirements || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Insurance Certificates (COIs)"
                      name="insuranceCOIs"
                      value={fields.insuranceCOIs || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Special Permits"
                      name="specialPermits"
                      value={fields.specialPermits || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Electrical Requirements"
                      name="electricalRequirements"
                      value={fields.electricalRequirements || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Storage Needs"
                      name="storageNeeds"
                      value={fields.storageNeeds || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Overnight Security"
                      name="overnightSecurity"
                      value={fields.overnightSecurity || ''}
                      onChange={updateField}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-12">
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Staffing
                  </h4>
                  <CheckboxGroup
                    items={[
                      'Event Manager',
                      'Production Manager',
                      'Technical Director',
                      'Audio Engineer',
                      'Video Engineer',
                      'Lighting Director',
                      'Stage Manager',
                      'Registration Staff',
                      'Hospitality Staff',
                      'Bartenders',
                      'Servers',
                      'Chefs',
                      'Security',
                      'EMT',
                      'Cleaning Crew',
                      'Load-In Crew',
                      'Strike Crew',
                    ]}
                    selected={staffing}
                    onToggle={(i) => toggleList(i, staffing, setStaffing)}
                  />
                </div>

                <div className="border-t border-gray-200 pt-12">
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Budget
                  </h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="border-primary/20 rounded border bg-gray-50/50 p-6">
                      <h4 className="font-secondary text-primary mb-1 text-xs font-semibold tracking-[0.2em] uppercase">
                        Total Budget
                      </h4>
                      <p className="font-secondary mb-4 text-[11px] text-gray-400">
                        Your estimated overall event spend
                      </p>
                      <input
                        type="text"
                        name="estimatedBudget"
                        value={fields.estimatedBudget || ''}
                        onChange={(e) =>
                          updateField('estimatedBudget', e.target.value)
                        }
                        placeholder="e.g. $50,000"
                        className="text-dark-black focus:border-primary font-primary w-full border-b-2 border-gray-300 bg-transparent py-2 text-2xl font-light placeholder-gray-300 transition-colors focus:outline-none"
                      />
                    </div>
                    <div className="border-primary/20 rounded border bg-gray-50/50 p-6">
                      <h4 className="font-secondary text-primary mb-1 text-xs font-semibold tracking-[0.2em] uppercase">
                        Per Guest
                      </h4>
                      <p className="font-secondary mb-4 text-[11px] text-gray-400">
                        Target spend per attendee
                      </p>
                      <input
                        type="text"
                        name="spendPerGuest"
                        value={fields.spendPerGuest || ''}
                        onChange={(e) =>
                          updateField('spendPerGuest', e.target.value)
                        }
                        placeholder="e.g. $250"
                        className="text-dark-black focus:border-primary font-primary w-full border-b-2 border-gray-300 bg-transparent py-2 text-2xl font-light placeholder-gray-300 transition-colors focus:outline-none"
                      />
                    </div>
                    <FieldCard
                      label="Preferred Pricing Tier"
                      name="pricingTier"
                      value={fields.pricingTier || ''}
                      onChange={updateField}
                    />
                    <FieldCard
                      label="Budget Flexibility"
                      name="budgetFlexibility"
                      value={fields.budgetFlexibility || ''}
                      onChange={updateField}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-12">
                  <h4 className="font-secondary text-primary mb-6 text-xs font-semibold tracking-[0.2em] uppercase">
                    Additional Information
                  </h4>
                  <div className="space-y-4">
                    <textarea
                      name="eventGoals"
                      value={fields.eventGoals || ''}
                      onChange={(e) =>
                        updateField('eventGoals', e.target.value)
                      }
                      placeholder="Event Goals"
                      rows={3}
                      className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm placeholder-gray-500 transition-colors focus:outline-none"
                    />
                    <textarea
                      name="brandGuidelines"
                      value={fields.brandGuidelines || ''}
                      onChange={(e) =>
                        updateField('brandGuidelines', e.target.value)
                      }
                      placeholder="Brand Guidelines"
                      rows={3}
                      className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm placeholder-gray-500 transition-colors focus:outline-none"
                    />
                    <textarea
                      name="specialRequests"
                      value={fields.specialRequests || ''}
                      onChange={(e) =>
                        updateField('specialRequests', e.target.value)
                      }
                      placeholder="Special Requests"
                      rows={3}
                      className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm placeholder-gray-500 transition-colors focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Navigation ───────────────────────────────── */}
            <div className="mt-12 flex items-center justify-between">
              <div>
                {step > 0 && (
                  <button
                    onClick={prevStep}
                    className="font-secondary text-dark-black/60 hover:text-dark-black flex cursor-pointer items-center gap-2 text-sm tracking-wide uppercase transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
              </div>
              <div>
                {step < STEP_LABELS.length - 1 ? (
                  <CustomButton variant="primary" onClick={nextStep}>
                    Continue
                  </CustomButton>
                ) : (
                  <CustomButton
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit RFP Request'}
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Thank You Modal ──────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-lg bg-white px-8 py-12 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="text-dark-black/40 hover:text-dark-black absolute top-4 right-4 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-primary text-dark-black mb-3 text-3xl font-light tracking-wide uppercase">
                Thank You
              </h3>
              <div className="bg-primary mx-auto mb-6 h-0.5 w-12" />
              <p className="font-secondary mb-2 text-base leading-relaxed text-gray-600">
                Your submission has been received.
              </p>
              <p className="font-secondary text-sm leading-relaxed text-gray-500">
                Your quote will be generated shortly and a Venue Specialist will
                reach out to you soon.
              </p>
              <div className="mt-8">
                <CustomButton
                  variant="primary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
