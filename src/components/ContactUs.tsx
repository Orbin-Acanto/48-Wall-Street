'use client';

import { FormDataType } from '@/types';
import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    eventStartDate: '',
    eventStartHour: '01',
    eventStartMinute: '00',
    eventStartPeriod: 'AM',
    eventType: '',
    numberOfGuests: '',
    howDidYouHear: '',
    message: '',
    robotCheck: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.fullName || !formData.email) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name and Email)',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message:
            result.message ||
            'Thank you for your inquiry! We will get back to you shortly.',
        });

        setFormData({
          fullName: '',
          company: '',
          phone: '',
          email: '',
          eventStartDate: '',
          eventStartHour: '01',
          eventStartMinute: '00',
          eventStartPeriod: 'AM',
          eventType: '',
          numberOfGuests: '',
          howDidYouHear: '',
          message: '',
          robotCheck: false,
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit form. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message:
          'Failed to submit form. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-whitesmoke min-h-screen px-6 py-18">
      <h1 className="text-primary font-primary mb-4 text-center text-5xl tracking-wide md:text-6xl lg:text-7xl">
        BOOKING INQUIRIES
      </h1>
      <p className="font-secondary mb-12 text-center text-base text-gray-400 lg:mb-16">
        Please fill out the contact form, email inquiries@mmeink.com or call
        212.625.2600 to schedule a visit.
      </p>

      {/* Status Message */}
      {submitStatus && (
        <div
          className={`mx-auto mb-6 max-w-7xl rounded-lg p-4 ${
            submitStatus.type === 'success'
              ? 'border border-green-200 bg-green-50 text-green-800'
              : 'border border-red-200 bg-red-50 text-red-800'
          }`}
          role="alert"
        >
          {submitStatus.message}
        </div>
      )}

      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Side - Title and First Form Fields */}
          <div className="text-dark-black">
            <div className="space-y-6">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone*"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
                required
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <input
                type="text"
                name="eventStartDate"
                value={formData.eventStartDate}
                onChange={handleInputChange}
                placeholder="Event Start Date (MM/DD/YYYY)"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />
              <div className="flex gap-2">
                <select
                  name="eventStartHour"
                  value={formData.eventStartHour}
                  onChange={handleInputChange}
                  className="text-dark-black focus:border-primary font-secondary flex-1 border-b border-gray-800 bg-transparent px-0 py-3 focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option
                      key={hour}
                      value={hour.toString().padStart(2, '0')}
                      className="bg-white"
                    >
                      {hour.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  name="eventStartMinute"
                  value={formData.eventStartMinute}
                  onChange={handleInputChange}
                  className="text-dark-black focus:border-primary font-secondary flex-1 border-b border-gray-800 bg-transparent px-0 py-3 focus:outline-none"
                >
                  {['00', '15', '30', '45'].map((minute) => (
                    <option key={minute} value={minute} className="bg-white">
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  name="eventStartPeriod"
                  value={formData.eventStartPeriod}
                  onChange={handleInputChange}
                  className="text-dark-black focus:border-primary font-secondary flex-1 border-b border-gray-800 bg-transparent px-0 py-3 focus:outline-none"
                >
                  <option value="AM" className="bg-white">
                    AM
                  </option>
                  <option value="PM" className="bg-white">
                    PM
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Side - Remaining Form Fields */}
          <div className="text-dark-black">
            <div className="space-y-6">
              <input
                type="text"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                placeholder="Event Type"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <input
                type="text"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                placeholder="Number of Guests"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <input
                type="text"
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleInputChange}
                placeholder="How did you hear about us?"
                className="text-dark-black focus:border-primary font-secondary w-full border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                rows={4}
                className="text-dark-black focus:border-primary font-secondary w-full resize-none border-b border-gray-800 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
              />

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary font-secondary hover:bg-primary/70 cursor-pointer px-12 py-3 font-semibold tracking-wider text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
