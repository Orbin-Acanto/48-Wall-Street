'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import InitialsButton from '@/components/InitialsButton';
import SignaturePad from '@/components/SignaturePad';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { AVProductionFormData, InitialsData, LocationData } from '@/types';

function AVProductionFormContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [docId, setDocId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [viewTime] = useState<string>(new Date().toISOString());
  const [initials, setInitials] = useState<InitialsData>({});
  const [confirmedInitials, setConfirmedInitials] = useState<string | null>(
    null
  );
  const [signature, setSignature] = useState<string | null>(null);
  const [signedDate, setSignedDate] = useState<string>('');
  const [typedName, setTypedName] = useState<string>('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<AVProductionFormData>({
    nameCompany: '',
    eventDate: '',
    email: '',
    phone: '',
    numberOfMics: '',
    micTypes: [],
    audienceQAMics: '',
    audienceQAMicsCount: '',
    liveMusic: '',
    liveMusicDetails: '',
    stageMonitor: '',
    backgroundAudio: '',
    backgroundAudioSource: '',
    presentations: '',
    presentationFormat: [],
    presentationFormatOther: '',
    aspectRatio: '',
    displayEquipment: [],
    displayEquipmentOther: '',
    screenPositioning: '',
    confidenceMonitor: '',
    videoPlayback: '',
    videoPlaybackSource: '',
    liveVideoIMAG: '',
    streaming: '',
    streamingPlatform: [],
    streamingPlatformOther: '',
    multiCamera: '',
    multiCameraCount: '',
    multiCameraAngles: '',
    visualBranding: '',
    lightingType: [],
    lightingTone: '',
    specialLighting: '',
    specialLightingDetails: '',
    lightingAreas: [],
    outdoorLighting: '',
    outdoorLightingDetails: '',
    stagePlatform: '',
    stageSizeHeight: '',
    stageFeatures: [],
    stageFeaturesOther: '',
    maxPeopleOnStage: '',
    setDesign: '',
    setDesignDetails: '',
    stageFurniture: [],
    stageFurnitureOther: '',
    internetWifi: '',
    bandwidthSpecs: '',
    tempPowerOutlets: '',
    tempPowerPurpose: '',
    eventSchedule: '',
    eventScheduleDetails: '',
    breakoutRooms: '',
    breakoutRoomsCount: '',
    breakoutRoomsAV: '',
    rehearsals: '',
    rehearsalsTiming: '',
    specialPerformances: '',
    specialPerformancesDetails: '',
    timeSensitiveCues: '',
    timeSensitiveCuesDetails: '',
    recordingServices: '',
    recordingServicesDetails: '',
    technicalRider: '',
    technicalRiderDetails: '',
    onSiteContactName: '',
    onSiteContactPhone: '',
    avBudget: '',
    otherNotes: '',
  });

  const signatureSectionRef = useRef<HTMLDivElement>(null);

  // Verify token
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Invalid or missing signing link.');
        setIsLoading(false);
        return;
      }

      try {
        const [payload, signature] = token.split('.');

        const response = await fetch('/api/documents/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload, signature }),
        });

        if (!response.ok) {
          setError('Invalid or tampered signing link.');
          setIsLoading(false);
          return;
        }

        const { data } = await response.json();
        setClientName(data.name || '');
        setClientEmail(data.email || '');
        setDeadline(data.deadline || '');
        setDocId(data.docId || '');
        setFormValues((prev) => ({
          ...prev,
          nameCompany: data.name || '',
          email: data.email || '',
        }));
        setIsLoading(false);
      } catch (err) {
        setError('Invalid or corrupted signing link.');
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Get location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocation({
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country: data.country_name || 'Unknown',
          ip: data.ip || 'Unknown',
        });
      } catch (err) {
        console.error('Failed to get location:', err);
        setLocation({
          city: 'Unknown',
          region: 'Unknown',
          country: 'Unknown',
          ip: 'Unknown',
        });
      }
    };
    fetchLocation();
  }, []);

  const pageSections = ['page1', 'page2', 'page3', 'page4', 'page5'];
  const totalInitialsRequired = pageSections.length;
  const initialsCompleted = Object.keys(initials).length;
  const progress = Math.round(
    ((initialsCompleted + (signature ? 1 : 0)) / (totalInitialsRequired + 1)) *
      100
  );

  const handleInitialed = (sectionId: string, initialValue: string) => {
    if (!confirmedInitials) {
      setConfirmedInitials(initialValue);
    }
    setInitials((prev) => ({
      ...prev,
      [sectionId]: {
        initials: initialValue,
        timestamp: new Date().toISOString(),
      },
    }));
  };

  const handleDateClick = () => {
    if (!signedDate) {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
      setSignedDate(formatted);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    name: keyof AVProductionFormData,
    value: string
  ) => {
    setFormValues((prev) => {
      const currentValues = prev[name] as string[];
      if (currentValues.includes(value)) {
        return { ...prev, [name]: currentValues.filter((v) => v !== value) };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handleRadioChange = (
    name: keyof AVProductionFormData,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const firstUninitiatedSectionId = pageSections.find((s) => !initials[s]);

  const isReadyToSubmit =
    initialsCompleted === totalInitialsRequired &&
    signature &&
    signedDate &&
    typedName.trim().length > 0;

  const handleSubmit = async () => {
    if (!isReadyToSubmit) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const signTime = new Date().toISOString();

      const response = await fetch('/api/sign/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          documentType: 'av_production',
          viewTime,
          signTime,
          location: location
            ? `${location.city}, ${location.region}, ${location.country}`
            : 'Unknown',
          ipAddress: location?.ip || 'Unknown',
          initials,
          signature,
          signedDate,
          typedName,
          deadline,
          docId,
          formData: formValues,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit document');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isReadyToSubmit && !isSubmitting && !isSubmitted) {
      handleSubmit();
    }
  }, [isReadyToSubmit, signature, signedDate, typedName]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-gray-600">Loading your document...</p>
        </div>
      </div>
    );
  }

  if (error && !clientName) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
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
          </div>
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Invalid Link
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="mt-18 min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-gray-900">
              Form Submitted Successfully
            </h1>
            <p className="mb-6 text-gray-600">
              Thank you, {clientName}. Your AV/Production Requirements Form has
              been submitted and a copy will be sent to {clientEmail}.
            </p>
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
              <p>Signed on: {signedDate}</p>
              <p>
                Location: {location?.city}, {location?.region},{' '}
                {location?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   const Checkbox = ({
  //     name,
  //     value,
  //     label,
  //   }: {
  //     name: keyof FormValues;
  //     value: string;
  //     label: string;
  //   }) => (
  //     <label className="flex cursor-pointer items-center gap-2">
  //       <input
  //         type="checkbox"
  //         checked={(formValues[name] as string[]).includes(value)}
  //         onChange={() => handleCheckboxChange(name, value)}
  //         className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
  //       />
  //       <span className="text-sm text-gray-700">{label}</span>
  //     </label>
  //   );

  const Checkbox = ({
    name,
    value,
    label,
  }: {
    name: keyof AVProductionFormData;
    value: string;
    label: string;
  }) => {
    const isChecked = (formValues[name] as string[]).includes(value);

    return (
      <label className="flex cursor-pointer items-center gap-2 select-none">
        <CheckboxPrimitive.Root
          checked={isChecked}
          onCheckedChange={() => handleCheckboxChange(name, value)}
          className={`focus:ring-primary flex h-5 w-5 items-center justify-center rounded border border-gray-300 focus:ring-2 focus:outline-none ${isChecked ? 'bg-primary' : 'bg-white'}`}
        >
          <CheckboxPrimitive.Indicator>
            <Check className="h-4 w-4 text-white" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  };

  //   const RadioButton = ({
  //     name,
  //     value,
  //     label,
  //   }: {
  //     name: keyof FormValues;
  //     value: string;
  //     label: string;
  //   }) => (
  //     <label className="flex cursor-pointer items-center gap-2">
  //       <input
  //         type="radio"
  //         name={name}
  //         checked={formValues[name] === value}
  //         onChange={() => handleRadioChange(name, value)}
  //         className="text-primary focus:ring-primary h-4 w-4 border-gray-300"
  //       />
  //       <span className="text-sm text-gray-700">{label}</span>
  //     </label>
  //   );

  const RadioButton = ({
    name,
    value,
    label,
  }: {
    name: keyof AVProductionFormData;
    value: string;
    label: string;
  }) => (
    <RadioPrimitive.Root
      value={formValues[name] as string}
      onValueChange={(val: string) => handleRadioChange(name, val)}
      className="flex flex-col gap-2"
    >
      <RadioPrimitive.Item
        value={value}
        id={value}
        className="focus:ring-primary flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 focus:ring-2 focus:outline-none"
      >
        <RadioPrimitive.Indicator className="bg-primary h-3 w-3 rounded-full" />
      </RadioPrimitive.Item>
      <label htmlFor={value} className="cursor-pointer text-sm text-gray-700">
        {label}
      </label>
    </RadioPrimitive.Root>
  );

  const PageInitials = ({
    pageId,
    pageNum,
  }: {
    pageId: string;
    pageNum: number;
  }) => (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Page {pageNum} - Please initial to acknowledge:
        </span>
        <InitialsButton
          sectionId={pageId}
          clientName={clientName}
          onInitialed={handleInitialed}
          isInitialed={!!initials[pageId]}
          initials={initials[pageId]?.initials}
          isFirstInitial={
            !confirmedInitials && pageId === firstUninitiatedSectionId
          }
          confirmedInitials={confirmedInitials || undefined}
        />
      </div>
    </div>
  );

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="fixed top-22 right-0 left-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Signing Progress
            </span>
            <span className="text-sm text-gray-500">
              {initialsCompleted} of {totalInitialsRequired} pages completed
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            Event Production and AV Requirements Form
          </h1>
          <p className="text-gray-600">
            Please complete all sections of this form to help us understand your
            audio-visual and production needs.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <span className="block text-gray-500">Client Name</span>
              <span className="font-medium text-gray-900">{clientName}</span>
            </div>
            <div>
              <span className="block text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{clientEmail}</span>
            </div>
            <div>
              <span className="block text-gray-500">Deadline</span>
              <span className="font-medium text-gray-900">
                {deadline
                  ? new Date(deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Page 1: Client Details & Audio Requirements */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Client Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name/Company
              </label>
              <input
                type="text"
                name="nameCompany"
                value={formValues.nameCompany}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formValues.eventDate}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>
          </div>

          <h2 className="mt-8 mb-6 text-xl font-semibold text-gray-900">
            Audio Requirements
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                1. Number of Microphones Needed
              </label>
              <input
                type="text"
                name="numberOfMics"
                value={formValues.numberOfMics}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                2. Preferred Microphone Types
              </label>
              <div className="flex flex-wrap gap-4">
                <Checkbox
                  name="micTypes"
                  value="wireless_handheld"
                  label="Wireless Handheld"
                />
                <Checkbox name="micTypes" value="lavalier" label="Lavalier" />
                <Checkbox name="micTypes" value="headset" label="Headset" />
                <Checkbox name="micTypes" value="podium" label="Podium" />
                <Checkbox
                  name="micTypes"
                  value="combination"
                  label="Combination"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                3. Audience Q&A Mics Required?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="audienceQAMics" value="yes" label="Yes" />
                <RadioButton name="audienceQAMics" value="no" label="No" />
              </div>
              {formValues.audienceQAMics === 'yes' && (
                <input
                  type="text"
                  name="audienceQAMicsCount"
                  value={formValues.audienceQAMicsCount}
                  onChange={handleInputChange}
                  placeholder="If yes, how many?"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                4. Live Music or Performances?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="liveMusic" value="yes" label="Yes" />
                <RadioButton name="liveMusic" value="no" label="No" />
              </div>
              {formValues.liveMusic === 'yes' && (
                <textarea
                  name="liveMusicDetails"
                  value={formValues.liveMusicDetails}
                  onChange={handleInputChange}
                  placeholder="If yes, describe performers, instruments, riders"
                  rows={3}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                5. Stage Monitor Needed?
              </label>
              <div className="flex gap-4">
                <RadioButton name="stageMonitor" value="yes" label="Yes" />
                <RadioButton name="stageMonitor" value="no" label="No" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                6. Background or Pre-Recorded Audio?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="backgroundAudio" value="yes" label="Yes" />
                <RadioButton name="backgroundAudio" value="no" label="No" />
              </div>
              {formValues.backgroundAudio === 'yes' && (
                <input
                  type="text"
                  name="backgroundAudioSource"
                  value={formValues.backgroundAudioSource}
                  onChange={handleInputChange}
                  placeholder="Specify format/source"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>
          </div>

          <PageInitials pageId="page1" pageNum={1} />
        </div>

        {/* Page 2: Visual Requirements */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Visual Requirements
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                1. Will Presentations/Slideshows Be Shown?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="presentations" value="yes" label="Yes" />
                <RadioButton name="presentations" value="no" label="No" />
              </div>
              {formValues.presentations === 'yes' && (
                <>
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Format:</span>
                    <div className="mt-1 flex flex-wrap gap-4">
                      <Checkbox
                        name="presentationFormat"
                        value="powerpoint"
                        label="PowerPoint"
                      />
                      <Checkbox
                        name="presentationFormat"
                        value="keynote"
                        label="Keynote"
                      />
                      <Checkbox
                        name="presentationFormat"
                        value="pdf"
                        label="PDF"
                      />
                      <Checkbox
                        name="presentationFormat"
                        value="other"
                        label="Other"
                      />
                    </div>
                    {formValues.presentationFormat.includes('other') && (
                      <input
                        type="text"
                        name="presentationFormatOther"
                        value={formValues.presentationFormatOther}
                        onChange={handleInputChange}
                        placeholder="Specify other format"
                        className="focus:ring-primary mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Preferred Aspect Ratio:
                    </span>
                    <div className="mt-1 flex gap-4">
                      <RadioButton
                        name="aspectRatio"
                        value="16:9"
                        label="16:9"
                      />
                      <RadioButton name="aspectRatio" value="4:3" label="4:3" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                2. Display Equipment Needed
              </label>
              <div className="flex flex-wrap gap-4">
                <Checkbox
                  name="displayEquipment"
                  value="lcd_screens"
                  label="LCD Screens"
                />
                <Checkbox
                  name="displayEquipment"
                  value="monitors"
                  label="Monitors"
                />
                <Checkbox
                  name="displayEquipment"
                  value="video_wall"
                  label="Video Wall"
                />
                <Checkbox name="displayEquipment" value="other" label="Other" />
              </div>
              {formValues.displayEquipment.includes('other') && (
                <input
                  type="text"
                  name="displayEquipmentOther"
                  value={formValues.displayEquipmentOther}
                  onChange={handleInputChange}
                  placeholder="Specify other equipment"
                  className="focus:ring-primary mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                3. Number and Positioning of Screens
              </label>
              <input
                type="text"
                name="screenPositioning"
                value={formValues.screenPositioning}
                onChange={handleInputChange}
                placeholder="e.g., main stage, audience"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                4. Confidence Monitor for Presenter?
              </label>
              <div className="flex gap-4">
                <RadioButton name="confidenceMonitor" value="yes" label="Yes" />
                <RadioButton name="confidenceMonitor" value="no" label="No" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                5. Video Playback Needed?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="videoPlayback" value="yes" label="Yes" />
                <RadioButton name="videoPlayback" value="no" label="No" />
              </div>
              {formValues.videoPlayback === 'yes' && (
                <input
                  type="text"
                  name="videoPlaybackSource"
                  value={formValues.videoPlaybackSource}
                  onChange={handleInputChange}
                  placeholder="Format/Source"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                6. Live Video/IMAG for Large Audience?
              </label>
              <div className="flex gap-4">
                <RadioButton name="liveVideoIMAG" value="yes" label="Yes" />
                <RadioButton name="liveVideoIMAG" value="no" label="No" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                7. Streaming or Video Conferencing?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="streaming" value="yes" label="Yes" />
                <RadioButton name="streaming" value="no" label="No" />
              </div>
              {formValues.streaming === 'yes' && (
                <div className="flex flex-wrap gap-4">
                  <Checkbox
                    name="streamingPlatform"
                    value="zoom"
                    label="Zoom"
                  />
                  <Checkbox
                    name="streamingPlatform"
                    value="youtube"
                    label="YouTube"
                  />
                  <Checkbox
                    name="streamingPlatform"
                    value="other"
                    label="Other"
                  />
                  {formValues.streamingPlatform.includes('other') && (
                    <input
                      type="text"
                      name="streamingPlatformOther"
                      value={formValues.streamingPlatformOther}
                      onChange={handleInputChange}
                      placeholder="Specify platform"
                      className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                    />
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                8. Multi-Camera Setup?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="multiCamera" value="yes" label="Yes" />
                <RadioButton name="multiCamera" value="no" label="No" />
              </div>
              {formValues.multiCamera === 'yes' && (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    name="multiCameraCount"
                    value={formValues.multiCameraCount}
                    onChange={handleInputChange}
                    placeholder="How many?"
                    className="focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="multiCameraAngles"
                    value={formValues.multiCameraAngles}
                    onChange={handleInputChange}
                    placeholder="Desired Angles"
                    className="focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                9. Visual Branding Needs?
              </label>
              <input
                type="text"
                name="visualBranding"
                value={formValues.visualBranding}
                onChange={handleInputChange}
                placeholder="e.g., logo placement, custom graphics"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>
          </div>

          <PageInitials pageId="page2" pageNum={2} />
        </div>

        {/* Page 3: Lighting & Staging */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Lighting Requirements
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                1. Type of Lighting Required
              </label>
              <div className="flex flex-wrap gap-4">
                <Checkbox name="lightingType" value="stage" label="Stage" />
                <Checkbox name="lightingType" value="ambient" label="Ambient" />
                <Checkbox
                  name="lightingType"
                  value="spotlights"
                  label="Spotlights"
                />
                <Checkbox
                  name="lightingType"
                  value="decorative"
                  label="Decorative"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                2. Lighting Preferences for Tone
              </label>
              <input
                type="text"
                name="lightingTone"
                value={formValues.lightingTone}
                onChange={handleInputChange}
                placeholder="e.g., warm, bright, dramatic"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                3. Special Lighting Effects or Cues?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="specialLighting" value="yes" label="Yes" />
                <RadioButton name="specialLighting" value="no" label="No" />
              </div>
              {formValues.specialLighting === 'yes' && (
                <textarea
                  name="specialLightingDetails"
                  value={formValues.specialLightingDetails}
                  onChange={handleInputChange}
                  placeholder="Details"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                4. Areas Requiring Lighting
              </label>
              <div className="flex flex-wrap gap-4">
                <Checkbox name="lightingAreas" value="stage" label="Stage" />
                <Checkbox
                  name="lightingAreas"
                  value="audience"
                  label="Audience"
                />
                <Checkbox
                  name="lightingAreas"
                  value="entrances"
                  label="Entrances"
                />
                <Checkbox
                  name="lightingAreas"
                  value="vendor_booths"
                  label="Vendor Booths"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                5. Outdoor Lighting Needed?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="outdoorLighting" value="yes" label="Yes" />
                <RadioButton name="outdoorLighting" value="no" label="No" />
              </div>
              {formValues.outdoorLighting === 'yes' && (
                <textarea
                  name="outdoorLightingDetails"
                  value={formValues.outdoorLightingDetails}
                  onChange={handleInputChange}
                  placeholder="Describe"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>
          </div>

          <h2 className="mt-8 mb-6 text-xl font-semibold text-gray-900">
            Staging and Rigging
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                1. Stage or Platform Required?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="stagePlatform" value="yes" label="Yes" />
                <RadioButton name="stagePlatform" value="no" label="No" />
              </div>
              {formValues.stagePlatform === 'yes' && (
                <>
                  <input
                    type="text"
                    name="stageSizeHeight"
                    value={formValues.stageSizeHeight}
                    onChange={handleInputChange}
                    placeholder="Size/Height"
                    className="focus:ring-primary mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-4">
                    <span className="text-sm text-gray-600">Features:</span>
                    <Checkbox
                      name="stageFeatures"
                      value="stairs"
                      label="Stairs"
                    />
                    <Checkbox name="stageFeatures" value="ramp" label="Ramp" />
                    <Checkbox
                      name="stageFeatures"
                      value="other"
                      label="Other"
                    />
                  </div>
                  {formValues.stageFeatures.includes('other') && (
                    <input
                      type="text"
                      name="stageFeaturesOther"
                      value={formValues.stageFeaturesOther}
                      onChange={handleInputChange}
                      placeholder="Specify other features"
                      className="focus:ring-primary mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                    />
                  )}
                </>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                2. Max People on Stage at Once
              </label>
              <input
                type="text"
                name="maxPeopleOnStage"
                value={formValues.maxPeopleOnStage}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                3. Set Design or Décor Needs?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="setDesign" value="yes" label="Yes" />
                <RadioButton name="setDesign" value="no" label="No" />
              </div>
              {formValues.setDesign === 'yes' && (
                <textarea
                  name="setDesignDetails"
                  value={formValues.setDesignDetails}
                  onChange={handleInputChange}
                  placeholder="Describe"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                4. Stage Furniture Needed?
              </label>
              <div className="flex flex-wrap gap-4">
                <Checkbox name="stageFurniture" value="podium" label="Podium" />
                <Checkbox name="stageFurniture" value="table" label="Table" />
                <Checkbox name="stageFurniture" value="chairs" label="Chairs" />
                <Checkbox name="stageFurniture" value="other" label="Other" />
              </div>
              {formValues.stageFurniture.includes('other') && (
                <input
                  type="text"
                  name="stageFurnitureOther"
                  value={formValues.stageFurnitureOther}
                  onChange={handleInputChange}
                  placeholder="Specify other furniture"
                  className="focus:ring-primary mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>
          </div>

          <PageInitials pageId="page3" pageNum={3} />
        </div>

        {/* Page 4: Technical & Event Flow */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Technical and Power Requirements
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                1. Internet/Wi-Fi Required?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="internetWifi" value="yes" label="Yes" />
                <RadioButton name="internetWifi" value="no" label="No" />
              </div>
              {formValues.internetWifi === 'yes' && (
                <input
                  type="text"
                  name="bandwidthSpecs"
                  value={formValues.bandwidthSpecs}
                  onChange={handleInputChange}
                  placeholder="Bandwidth/Specs"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                2. Temporary Power Outlets Needed?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="tempPowerOutlets" value="yes" label="Yes" />
                <RadioButton name="tempPowerOutlets" value="no" label="No" />
              </div>
              {formValues.tempPowerOutlets === 'yes' && (
                <input
                  type="text"
                  name="tempPowerPurpose"
                  value={formValues.tempPowerPurpose}
                  onChange={handleInputChange}
                  placeholder="Purpose (e.g., power strips at booths)"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>
          </div>

          <h2 className="mt-8 mb-6 text-xl font-semibold text-gray-900">
            Event Flow and Logistics
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                1. Attach or Describe Full Event Schedule
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton
                  name="eventSchedule"
                  value="attached"
                  label="Attached"
                />
                <RadioButton
                  name="eventSchedule"
                  value="described"
                  label="Described Below"
                />
              </div>
              {formValues.eventSchedule === 'described' && (
                <textarea
                  name="eventScheduleDetails"
                  value={formValues.eventScheduleDetails}
                  onChange={handleInputChange}
                  placeholder="Describe your event schedule"
                  rows={4}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                2. Multiple Sessions/Breakout Rooms?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="breakoutRooms" value="yes" label="Yes" />
                <RadioButton name="breakoutRooms" value="no" label="No" />
              </div>
              {formValues.breakoutRooms === 'yes' && (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    name="breakoutRoomsCount"
                    value={formValues.breakoutRoomsCount}
                    onChange={handleInputChange}
                    placeholder="How many?"
                    className="focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="breakoutRoomsAV"
                    value={formValues.breakoutRoomsAV}
                    onChange={handleInputChange}
                    placeholder="AV needs?"
                    className="focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                3. Rehearsals or Tech Checks Planned?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="rehearsals" value="yes" label="Yes" />
                <RadioButton name="rehearsals" value="no" label="No" />
              </div>
              {formValues.rehearsals === 'yes' && (
                <input
                  type="text"
                  name="rehearsalsTiming"
                  value={formValues.rehearsalsTiming}
                  onChange={handleInputChange}
                  placeholder="Timing & Requirements"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                4. Special Performances or Segments?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton
                  name="specialPerformances"
                  value="yes"
                  label="Yes"
                />
                <RadioButton name="specialPerformances" value="no" label="No" />
              </div>
              {formValues.specialPerformances === 'yes' && (
                <textarea
                  name="specialPerformancesDetails"
                  value={formValues.specialPerformancesDetails}
                  onChange={handleInputChange}
                  placeholder="Details"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>
          </div>

          <PageInitials pageId="page4" pageNum={4} />
        </div>

        {/* Page 5: Additional Services */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                5. Time-Sensitive Cues/Transitions?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="timeSensitiveCues" value="yes" label="Yes" />
                <RadioButton name="timeSensitiveCues" value="no" label="No" />
              </div>
              {formValues.timeSensitiveCues === 'yes' && (
                <textarea
                  name="timeSensitiveCuesDetails"
                  value={formValues.timeSensitiveCuesDetails}
                  onChange={handleInputChange}
                  placeholder="Explain"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>
          </div>

          <h2 className="mt-8 mb-6 text-xl font-semibold text-gray-900">
            Additional Services and Preferences
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                1. Recording or Post-Production Services?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="recordingServices" value="yes" label="Yes" />
                <RadioButton name="recordingServices" value="no" label="No" />
              </div>
              {formValues.recordingServices === 'yes' && (
                <textarea
                  name="recordingServicesDetails"
                  value={formValues.recordingServicesDetails}
                  onChange={handleInputChange}
                  placeholder="Details"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                2. Technical Rider/Documentation?
              </label>
              <div className="mb-2 flex gap-4">
                <RadioButton name="technicalRider" value="yes" label="Yes" />
                <RadioButton name="technicalRider" value="no" label="No" />
              </div>
              {formValues.technicalRider === 'yes' && (
                <textarea
                  name="technicalRiderDetails"
                  value={formValues.technicalRiderDetails}
                  onChange={handleInputChange}
                  placeholder="Attach or Describe"
                  rows={2}
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                3. On-Site AV Contact or Coordinator
              </label>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <input
                  type="text"
                  name="onSiteContactName"
                  value={formValues.onSiteContactName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
                <input
                  type="text"
                  name="onSiteContactPhone"
                  value={formValues.onSiteContactPhone}
                  onChange={handleInputChange}
                  placeholder="Phone/Email"
                  className="focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                4. AV Budget Range (Optional)
              </label>
              <input
                type="text"
                name="avBudget"
                value={formValues.avBudget}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                5. Other Notes or Special Requests
              </label>
              <textarea
                name="otherNotes"
                value={formValues.otherNotes}
                onChange={handleInputChange}
                rows={4}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
              />
            </div>
          </div>

          <PageInitials pageId="page5" pageNum={5} />
        </div>

        {/* Signature Section */}
        <div
          ref={signatureSectionRef}
          className="border-primary/30 mb-6 rounded-lg border-2 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Client Signature
          </h2>

          <p className="mb-8 text-gray-700">
            By signing below, I confirm that the information provided in this
            form is accurate and complete to the best of my knowledge.
          </p>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Enter your full name"
                className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Signature
              </label>
              <SignaturePad
                onSignatureChange={setSignature}
                width={500}
                height={200}
              />
            </div>

            {signature && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div
                  onClick={handleDateClick}
                  className={`w-full cursor-pointer rounded-lg border px-4 py-3 transition-colors ${
                    signedDate
                      ? 'border-gray-300 bg-gray-50 text-gray-900'
                      : 'hover:border-primary hover:text-primary border-dashed border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {signedDate || "Click to add today's date and timestamp"}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {isSubmitting && (
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="border-primary h-5 w-5 animate-spin rounded-full border-b-2"></div>
              <p className="text-sm text-blue-600">Submitting your form...</p>
            </div>
          )}

          {!isReadyToSubmit && !isSubmitting && (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-700">
                Please complete all sections above to submit:
                {initialsCompleted < totalInitialsRequired && (
                  <span className="mt-1 block">
                    • Initial all {totalInitialsRequired} pages (
                    {totalInitialsRequired - initialsCompleted} remaining)
                  </span>
                )}
                {!typedName.trim() && (
                  <span className="mt-1 block">• Type your full name</span>
                )}
                {!signature && (
                  <span className="mt-1 block">• Add your signature</span>
                )}
                {!signedDate && signature && (
                  <span className="mt-1 block">• Click to add the date</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AVProductionFormPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
            <p className="text-gray-600">Loading your document...</p>
          </div>
        </div>
      }
    >
      <AVProductionFormContent />
    </Suspense>
  );
}
