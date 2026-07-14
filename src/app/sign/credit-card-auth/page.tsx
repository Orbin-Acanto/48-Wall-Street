'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import SignaturePad from '@/components/SignaturePad';
import { CreditCardAuthFormData, LocationData } from '@/types';

function CreditCardAuthContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [docId, setDocId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [viewTime] = useState<string>(new Date().toISOString());
  const [signature, setSignature] = useState<string | null>(null);
  const [signedDate, setSignedDate] = useState<string>('');
  const [typedName, setTypedName] = useState<string>('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [formValues, setFormValues] = useState<CreditCardAuthFormData>({
    cardType: '',
    creditCardNumber: '',
    expirationDate: '',
    cvvCode: '',
    cardholderName: '',
    billingAddress: '',
    homePhone: '',
    workPhone: '',
    cellPhone: '',
    eventDate: '',
    typeOfEvent: '',
    eventLocation: '',
    authorizedAmount: '',
  });

  const signatureSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Invalid or missing signing link.');
        setIsLoading(false);
        return;
      }

      try {
        const [payload, sig] = token.split('.');

        const response = await fetch('/api/documents/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload, signature: sig }),
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
          cardholderName: data.name || '',
        }));
        setIsLoading(false);
      } catch (err) {
        setError('Invalid or corrupted signing link.');
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setFormValues((prev) => ({
      ...prev,
      creditCardNumber: formatted.substring(0, 19),
    }));
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormValues((prev) => ({
      ...prev,
      expirationDate: value.substring(0, 5),
    }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setFormValues((prev) => ({ ...prev, cvvCode: value }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    const decimalParts = value.split('.');
    if (decimalParts.length === 2 && decimalParts[1].length > 3) {
      value = decimalParts[0] + '.' + decimalParts[1].substring(0, 3);
    }

    setFormValues((prev) => ({ ...prev, authorizedAmount: value }));
  };

  const isFormComplete =
    formValues.cardType &&
    formValues.creditCardNumber.replace(/\s/g, '').length >= 15 &&
    formValues.expirationDate.length === 5 &&
    formValues.cvvCode.length >= 3 &&
    formValues.cardholderName &&
    formValues.billingAddress &&
    formValues.cellPhone &&
    formValues.eventDate &&
    formValues.typeOfEvent &&
    formValues.eventLocation &&
    formValues.authorizedAmount;

  const isReadyToSubmit =
    isFormComplete &&
    signature &&
    signedDate &&
    typedName.trim().length > 0 &&
    agreedToTerms;

  const missingFormFields: string[] = [];
  if (!formValues.cardType) missingFormFields.push('Card type');
  if (formValues.creditCardNumber.replace(/\s/g, '').length < 15)
    missingFormFields.push('Credit card number');
  if (formValues.expirationDate.length !== 5)
    missingFormFields.push('Expiration date');
  if (formValues.cvvCode.length < 3) missingFormFields.push('CVV code');
  if (!formValues.cardholderName) missingFormFields.push('Cardholder name');
  if (!formValues.billingAddress) missingFormFields.push('Billing address');
  if (!formValues.cellPhone) missingFormFields.push('Cell phone');
  if (!formValues.eventDate) missingFormFields.push('Event date');
  if (!formValues.typeOfEvent) missingFormFields.push('Type of event');
  if (!formValues.eventLocation) missingFormFields.push('Event location');
  if (!formValues.authorizedAmount) missingFormFields.push('Authorized amount');

  const handleSubmit = async () => {
    if (!isReadyToSubmit) {
      setShowErrors(true);
      signatureSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

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
          documentType: 'credit_card_auth',
          viewTime,
          signTime,
          location: location
            ? `${location.city}, ${location.region}, ${location.country}`
            : 'Unknown',
          ipAddress: location?.ip || 'Unknown',
          initials: {},
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
  }, [isReadyToSubmit, signature, signedDate, typedName, agreedToTerms]);

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
              Authorization Submitted Successfully
            </h1>
            <p className="mb-6 text-gray-600">
              Thank you, {clientName}. Your Credit Card Authorization Form has
              been submitted securely and a copy will be sent to {clientEmail}.
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

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-4 border-b border-gray-200 pb-4">
            <h1 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">
              CREDIT CARD AUTHORIZATION FORM
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              48 Wall St • New York, NY 10005 • LI: 631.777.2244 • NYC:
              212.971.5353 • Fax: 631.980.0271
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
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

        {/* Form Information Box */}
        <div className="mb-6 rounded-lg border-2 border-yellow-500 bg-yellow-50 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            FORM INFORMATION
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-sm text-gray-700">
            <li>
              Fill in all blank spaces. Specify charges to be paid with this
              card. <strong>ONLY THE CARDHOLDER CAN SIGN THIS FORM.</strong>
            </li>
            <li>
              Please send back to:
              <div className="mt-2 ml-6">
                <p className="font-semibold">48 WALL STREET EVENTS INC.</p>
                <p>140 Florida St</p>
                <p>Farmingdale, NY 11735</p>
                <p>LI: 631.777.2244</p>
                <p>NYC: 212.971.5353</p>
                <p>FAX: 631.980.0271</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Authorization Text */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <p className="leading-relaxed text-gray-700">
              I,{' '}
              <input
                type="text"
                name="cardholderName"
                value={formValues.cardholderName}
                onChange={handleInputChange}
                className="focus:ring-primary mx-1 w-48 border-b border-gray-400 bg-transparent px-2 py-1 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                placeholder="[Cardholder Name]"
              />{' '}
              hereby authorize 48 Wall Street Events Inc. to charge the credit
              card listed below in the amount of $
              <input
                type="text"
                name="authorizedAmount"
                value={formValues.authorizedAmount}
                onChange={handleAmountChange}
                className="focus:ring-primary mx-1 w-32 border-b border-gray-400 bg-transparent px-2 py-1 text-gray-900 focus:border-transparent focus:ring-1 focus:outline-none"
                placeholder="0.00"
              />{' '}
              (&quot;the charge&quot;).
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              I further authorize 48 Wall Street Events Inc. to apply my
              signature to any and all documents required to complete this
              charge and future charges between myself and 48 Wall Street Events
              Inc. and indemnify and hold harmless 48 Wall Street Events Inc.
              for any liability arising herefrom or therefrom. I understand and
              agree that for a period of two years from the date of signing, I
              am authorizing 48 Wall Street Events Inc. to charge this credit
              card for any amounts owed to 48 Wall Street Events Inc.,
              including, among other things, retainer payments, final payments
              or remaining payments to satisfy a contract balance, debts arising
              from having additional guests at an event beyond a contracted
              amount, charges arising from damage to the venue, equipment, or
              persons at an event, an event lasting beyond its scheduled end
              time, additional labor required to put on an event, and any
              additional goods or services requested at an event.
            </p>
            <p>
              Nothing in this Credit Card Authorization shall cause 48 Wall
              Street Events Inc. to waive its rights to charge the credit card
              for any of the amounts owed to 48 Wall Street Events Inc. under
              any other agreement.
            </p>
          </div>

          <div className="mt-6 rounded-lg border-2 border-red-400 bg-red-50 p-4">
            <p className="text-center text-sm font-semibold text-red-700">
              **Please note, all sales are FINAL and that your credit card
              billing statement will reflect the above amount, plus the
              additional 5.85% processing fee for Visa, Discover, Mastercard or
              a 6.75% processing fee for American Express.**
            </p>
          </div>
        </div>

        {/* Cardholder's Information */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 border-b pb-2 text-lg font-semibold text-gray-900">
            CARDHOLDER&apos;S INFORMATION
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Type of Card *
              </label>
              <select
                name="cardType"
                value={formValues.cardType}
                onChange={handleInputChange}
                required
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              >
                <option value="">Select Card</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="discover">Discover</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Credit Card Number *
              </label>
              <input
                type="text"
                value={formValues.creditCardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Exp Date *
                </label>
                <input
                  type="text"
                  value={formValues.expirationDate}
                  onChange={handleExpDateChange}
                  placeholder="MM/YY"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  CVV *
                </label>
                <input
                  type="text"
                  value={formValues.cvvCode}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cardholder&apos;s Name *
              </label>
              <input
                type="text"
                name="cardholderName"
                value={formValues.cardholderName}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Billing Address *
              </label>
              <input
                type="text"
                name="billingAddress"
                value={formValues.billingAddress}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Home Phone
              </label>
              <input
                type="tel"
                name="homePhone"
                value={formValues.homePhone}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Work Phone
              </label>
              <input
                type="tel"
                name="workPhone"
                value={formValues.workPhone}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cell Phone *
              </label>
              <input
                type="tel"
                name="cellPhone"
                value={formValues.cellPhone}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 border-b pb-2 text-lg font-semibold text-gray-900">
            EVENT INFORMATION
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formValues.eventDate}
                onChange={handleInputChange}
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Type of Event *
              </label>
              <input
                type="text"
                name="typeOfEvent"
                value={formValues.typeOfEvent}
                onChange={handleInputChange}
                placeholder="e.g., Wedding, Corporate Event"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Event Location *
              </label>
              <input
                type="text"
                name="eventLocation"
                value={formValues.eventLocation}
                onChange={handleInputChange}
                placeholder="e.g., 48 Wall Street"
                className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:ring-1"
              />
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div
          ref={signatureSectionRef}
          className="border-primary/30 mb-6 rounded-lg border-2 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="mb-6 border-b pb-2 text-lg font-semibold text-gray-900">
            CARDHOLDER SIGNATURE
          </h2>

          <div
            className={`mb-6 rounded-lg ${
              showErrors && !agreedToTerms
                ? 'border border-red-300 bg-red-50 p-3'
                : ''
            }`}
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="text-primary focus:ring-primary mt-1 h-5 w-5 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                I confirm that I am the cardholder and I have read, understood,
                and agree to all terms and conditions stated in this Credit Card
                Authorization Form. I understand that this authorization is
                valid for a period of two years from the date of signing.
              </span>
            </label>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Legal Name (as it appears on card) *
              </label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Enter your full name"
                className={`focus:ring-primary w-full rounded-lg border px-4 py-3 text-black focus:border-transparent focus:ring-2 focus:outline-none ${
                  showErrors && !typedName.trim()
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-300'
                }`}
              />
              {showErrors && !typedName.trim() && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  Please type your full legal name.
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cardholder Signature *
              </label>
              <div
                className={
                  showErrors && !signature
                    ? 'rounded-lg ring-2 ring-red-300'
                    : ''
                }
              >
                <SignaturePad
                  onSignatureChange={setSignature}
                  width={500}
                  height={200}
                />
              </div>
              {showErrors && !signature && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  Please draw your signature.
                </p>
              )}
            </div>

            {signature && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date *
                </label>
                <div
                  onClick={handleDateClick}
                  className={`w-full cursor-pointer rounded-lg border px-4 py-3 transition-colors ${
                    signedDate
                      ? 'border-gray-300 bg-gray-50 text-gray-900'
                      : showErrors
                        ? 'border-red-400 bg-red-50 text-red-600'
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

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 focus:ring-primary mt-6 w-full rounded-lg px-4 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? 'Submitting...'
              : isReadyToSubmit
                ? 'Submit Authorization'
                : 'Review Required Fields'}
          </button>

          {isSubmitting && (
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="border-primary h-5 w-5 animate-spin rounded-full border-b-2"></div>
              <p className="text-sm text-blue-600">
                Submitting your authorization...
              </p>
            </div>
          )}

          {!isReadyToSubmit && !isSubmitting && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
                Complete these to submit:
              </p>
              <ul className="space-y-1 text-sm text-red-600">
                {missingFormFields.map((field) => (
                  <li key={field}>• {field}</li>
                ))}
                {!agreedToTerms && <li>• Agree to the terms and conditions</li>}
                {!typedName.trim() && <li>• Type your full legal name</li>}
                {!signature && <li>• Add your signature</li>}
                {!signedDate && signature && <li>• Click to add the date</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CreditCardAuthPage() {
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
      <CreditCardAuthContent />
    </Suspense>
  );
}
