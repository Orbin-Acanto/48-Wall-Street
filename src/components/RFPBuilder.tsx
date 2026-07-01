'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CustomButton from './CustomButton';

interface AccordionSectionProps {
  id: string;
  number: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({
  number,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div
      className={`border bg-white transition-all duration-300 ${
        isOpen
          ? 'border-primary/30 shadow-md'
          : 'border-gray-200 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50/50"
      >
        <div className="flex items-center gap-5">
          <div
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-colors duration-300 ${
              isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <span className="font-secondary text-xs font-bold">{number}</span>
          </div>
          <span className="font-primary text-dark-black text-lg font-light tracking-wide uppercase md:text-xl">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`text-dark-black/40 h-5 w-5 transition-transform duration-300 ${
            isOpen ? 'text-primary rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-100 px-6 py-8">{children}</div>
      </div>
    </div>
  );
}

function FieldCard({
  label,
  name,
  type = 'text',
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="group rounded border border-gray-200 bg-white px-4 py-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      <label className="font-secondary mb-2 flex items-center gap-2 text-[10px] tracking-[0.15em] text-gray-400 uppercase">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-200 bg-transparent px-0 py-1 text-sm placeholder-gray-400 transition-colors focus:outline-none"
      />
    </div>
  );
}

function CounterCard({ label, name }: { label: string; name: string }) {
  return (
    <div className="group flex flex-col items-center rounded border border-gray-200 bg-white px-4 py-6 text-center transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
      <span className="font-secondary mb-3 text-[10px] tracking-[0.15em] text-gray-400 uppercase">
        {label}
      </span>
      <input
        type="number"
        name={name}
        min="0"
        placeholder="0"
        className="text-dark-black focus:border-primary font-primary w-full border-b border-gray-200 bg-transparent py-1 text-center text-2xl font-light placeholder-gray-300 transition-colors focus:outline-none"
      />
    </div>
  );
}

function CheckboxGroup({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

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
              onChange={() => toggle(item)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function RadioGroup({ items }: { items: string[] }) {
  const [selected, setSelected] = useState('');

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
            onChange={() => setSelected(item)}
          />
        </label>
      ))}
    </div>
  );
}

export default function RFPBuilder() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section className="bg-whitesmoke px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-secondary text-primary mb-4 text-center text-sm tracking-[0.3em] uppercase">
          Plan Every Detail
        </p>
        <h2 className="heading-hero text-center">
          Build Your Own AI RFP Quote
        </h2>
        <p className="text-lead mb-6 text-center">
          Create a customized event proposal in minutes. Select your venue
          needs, guest count, services, food and beverage options, AV
          requirements, and event style, and our AI-assisted RFP tool will help
          generate a tailored quote for your upcoming event.
        </p>
        <p className="text-lead mb-16 text-center">
          Design your event in just a few minutes. Our AI-powered Request for
          Proposal (RFP) Builder allows you to customize every aspect of your
          event and instantly submit a comprehensive request to our event
          specialists. Once submitted, our team will review your selections and
          prepare a customized proposal, budget, floor plan, and event timeline.
        </p>

        <div className="space-y-3">
          {/* 1. Event Information */}
          <AccordionSection
            id="event-info"
            number="01"
            title="Event Information"
            isOpen={openSection === 'event-info'}
            onToggle={() => toggleSection('event-info')}
          >
            <div className="space-y-8">
              <div>
                <h4 className="font-secondary text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FieldCard label="Event Name" name="eventName" />
                  <FieldCard
                    label="Company / Organization"
                    name="companyOrganization"
                  />
                  <FieldCard label="Contact Name" name="contactName" />
                  <FieldCard
                    label="Email Address"
                    name="emailAddress"
                    type="email"
                  />
                  <FieldCard
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                  />
                  <FieldCard label="Preferred Venue" name="preferredVenue" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h4 className="font-secondary text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                  Event Schedule
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <FieldCard label="Event Date(s)" name="eventDates" />
                  <FieldCard label="Alternate Date(s)" name="alternateDates" />
                  <FieldCard
                    label="Event Start & End Time"
                    name="eventStartEndTime"
                  />
                  <FieldCard
                    label="Load-In Date & Time"
                    name="loadInDateTime"
                  />
                  <FieldCard
                    label="Vendor Load-In Required"
                    name="vendorLoadIn"
                  />
                  <FieldCard
                    label="Load-Out Date & Time"
                    name="loadOutDateTime"
                  />
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* 2. Event Type */}
          <AccordionSection
            id="event-type"
            number="02"
            title="Event Type"
            isOpen={openSection === 'event-type'}
            onToggle={() => toggleSection('event-type')}
          >
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
            />
          </AccordionSection>

          {/* 3. Estimated Attendance */}
          <AccordionSection
            id="attendance"
            number="03"
            title="Estimated Attendance"
            isOpen={openSection === 'attendance'}
            onToggle={() => toggleSection('attendance')}
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <CounterCard label="Guests" name="guestCount" />
              <CounterCard label="VIP" name="vipCount" />
              <CounterCard label="Staff" name="staffCount" />
              <CounterCard label="Vendors" name="vendorCount" />
              <CounterCard label="Speakers" name="speakerCount" />
              <CounterCard label="Exhibitors" name="exhibitorCount" />
              <CounterCard label="Press / Media" name="pressCount" />
            </div>
          </AccordionSection>

          {/* 4. Venue Requirements */}
          <AccordionSection
            id="venue-requirements"
            number="04"
            title="Venue Requirements"
            isOpen={openSection === 'venue-requirements'}
            onToggle={() => toggleSection('venue-requirements')}
          >
            <CheckboxGroup
              items={[
                'Ballroom',
                'Historic Banking Hall',
                'Outdoor Space',
                'Rooftop',
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
            />
          </AccordionSection>

          {/* 5. Room Setup */}
          <AccordionSection
            id="room-setup"
            number="05"
            title="Room Setup"
            isOpen={openSection === 'room-setup'}
            onToggle={() => toggleSection('room-setup')}
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
            />
          </AccordionSection>

          {/* 6. Food & Beverage */}
          <AccordionSection
            id="food-beverage"
            number="06"
            title="Food & Beverage"
            isOpen={openSection === 'food-beverage'}
            onToggle={() => toggleSection('food-beverage')}
          >
            <div className="space-y-6">
              <CheckboxGroup
                title="Breakfast"
                items={[
                  'Continental',
                  'Full Breakfast',
                  'Executive Breakfast',
                ]}
              />
              <CheckboxGroup
                title="Lunch"
                items={[
                  'Box Lunches',
                  'Buffet',
                  'Plated Lunch',
                  'Food Stations',
                ]}
              />
              <CheckboxGroup
                title="Dinner"
                items={[
                  'Buffet',
                  'Plated Dinner',
                  'Multi-Course Dinner',
                  "Chef's Table Experience",
                ]}
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
              />
            </div>
          </AccordionSection>

          {/* 7. Culinary Preferences */}
          <AccordionSection
            id="culinary"
            number="07"
            title="Culinary Preferences"
            isOpen={openSection === 'culinary'}
            onToggle={() => toggleSection('culinary')}
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
            />
          </AccordionSection>

          {/* 8. Audio Visual & Production */}
          <AccordionSection
            id="av-production"
            number="08"
            title="Audio Visual & Production"
            isOpen={openSection === 'av-production'}
            onToggle={() => toggleSection('av-production')}
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
              />
            </div>
          </AccordionSection>

          {/* 9. Decor & Design */}
          <AccordionSection
            id="decor"
            number="09"
            title="Decor & Design"
            isOpen={openSection === 'decor'}
            onToggle={() => toggleSection('decor')}
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
            />
          </AccordionSection>

          {/* 10. Entertainment */}
          <AccordionSection
            id="entertainment"
            number="10"
            title="Entertainment"
            isOpen={openSection === 'entertainment'}
            onToggle={() => toggleSection('entertainment')}
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
            />
          </AccordionSection>

          {/* 11. Event Branding */}
          <AccordionSection
            id="branding"
            number="11"
            title="Event Branding"
            isOpen={openSection === 'branding'}
            onToggle={() => toggleSection('branding')}
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
            />
          </AccordionSection>

          {/* 12. Logistics */}
          <AccordionSection
            id="logistics"
            number="12"
            title="Logistics"
            isOpen={openSection === 'logistics'}
            onToggle={() => toggleSection('logistics')}
          >
            <div className="space-y-8">
              <div>
                <h4 className="font-secondary text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                  Vendor & Delivery
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FieldCard label="Number of Vendors" name="numVendors" />
                  <FieldCard
                    label="Truck Deliveries"
                    name="truckDeliveries"
                  />
                  <FieldCard
                    label="Freight Requirements"
                    name="freightRequirements"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h4 className="font-secondary text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                  Compliance & Security
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FieldCard
                    label="Security Requirements"
                    name="securityRequirements"
                  />
                  <FieldCard
                    label="Insurance Certificates (COIs)"
                    name="insuranceCOIs"
                  />
                  <FieldCard label="Special Permits" name="specialPermits" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h4 className="font-secondary text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                  Facilities
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FieldCard
                    label="Electrical Requirements"
                    name="electricalRequirements"
                  />
                  <FieldCard label="Storage Needs" name="storageNeeds" />
                  <FieldCard
                    label="Overnight Security"
                    name="overnightSecurity"
                  />
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* 13. Staffing */}
          <AccordionSection
            id="staffing"
            number="13"
            title="Staffing"
            isOpen={openSection === 'staffing'}
            onToggle={() => toggleSection('staffing')}
          >
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
            />
          </AccordionSection>

          {/* 14. Budget */}
          <AccordionSection
            id="budget"
            number="14"
            title="Budget"
            isOpen={openSection === 'budget'}
            onToggle={() => toggleSection('budget')}
          >
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
                  placeholder="e.g. $250"
                  className="text-dark-black focus:border-primary font-primary w-full border-b-2 border-gray-300 bg-transparent py-2 text-2xl font-light placeholder-gray-300 transition-colors focus:outline-none"
                />
              </div>

              <FieldCard label="Preferred Pricing Tier" name="pricingTier" />
              <FieldCard label="Budget Flexibility" name="budgetFlexibility" />
            </div>
          </AccordionSection>

          {/* 15. Additional Information */}
          <AccordionSection
            id="additional"
            number="15"
            title="Additional Information"
            isOpen={openSection === 'additional'}
            onToggle={() => toggleSection('additional')}
          >
            <div className="space-y-4">
              <textarea
                name="eventGoals"
                placeholder="Event Goals"
                rows={3}
                className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm placeholder-gray-500 transition-colors focus:outline-none"
              />
              <textarea
                name="brandGuidelines"
                placeholder="Brand Guidelines"
                rows={3}
                className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm placeholder-gray-500 transition-colors focus:outline-none"
              />
              <textarea
                name="specialRequests"
                placeholder="Special Requests"
                rows={3}
                className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm placeholder-gray-500 transition-colors focus:outline-none"
              />
              <div className="pt-2">
                <p className="font-secondary mb-2 text-sm text-gray-500">
                  Upload Files (Inspiration Photos, Floor Plans, Event Agenda,
                  RFP Documents)
                </p>
                <input
                  type="file"
                  multiple
                  className="font-secondary text-dark-black file:bg-primary hover:file:bg-primary/80 w-full text-sm file:mr-4 file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />
              </div>
            </div>
          </AccordionSection>
        </div>

        <div className="mt-12 flex justify-center">
          <CustomButton variant="primary">Submit RFP Request</CustomButton>
        </div>
      </div>
    </section>
  );
}
