'use client';

import { FormDataType } from '@/types';
import React, { useState } from 'react';
import CustomButton from './CustomButton';

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
    attachments: [],
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...fileArray],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index) || [],
    }));
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
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== 'attachments') {
          formDataToSend.append(
            key,
            formData[key as keyof FormDataType] as string
          );
        }
      });

      if (formData.attachments && formData.attachments.length > 0) {
        formData.attachments.forEach((file) => {
          formDataToSend.append('attachments', file);
        });
      }

      const response = await fetch('/api/contact-form', {
        method: 'POST',
        body: formDataToSend,
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
          attachments: [],
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
    <div className="bg-whitesmoke min-h-screen px-6 py-20">
      <h1 className="text-primary heading-hero text-center">Enquire</h1>
      <p className="text-lead mb-8 text-center">
        Please fill out the contact form, email info@48WallNYC.com or call
        212-971-5353 to schedule a visit.
      </p>

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

              <div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="font-secondary text-dark-black file:bg-primary hover:file:bg-primary/80 file:text-dark-black w-full text-sm file:mr-4 file:rounded file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                />

                {formData.attachments && formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded bg-gray-100 px-3 py-2"
                      >
                        <span className="font-secondary text-sm text-gray-700">
                          {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Remove file"
                        >
                          <svg
                            className="h-5 w-5"
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
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <CustomButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
