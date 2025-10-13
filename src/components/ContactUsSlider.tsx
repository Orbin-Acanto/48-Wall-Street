'use client';

import React, { useState } from 'react';

const ContactUsSlider: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, robotCheck: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Trigger Button - Fixed on Left Side */}
      <button
        onClick={toggleForm}
        className="bg-primary font-secondary text-dark-black hover:bg-primary/80 fixed top-1/2 right-0 z-50 -translate-y-1/2 cursor-pointer px-8 py-5 text-sm font-semibold tracking-widest shadow-lg transition-all"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        BOOKING INQUIRIES
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleForm}
        />
      )}

      {/* Slide-out Contact Form Card */}
      <div
        className={`bg-whitesmoke fixed top-0 right-0 z-50 h-full w-full transform overflow-y-auto shadow-2xl transition-transform duration-500 ease-in-out md:w-[85vw] lg:w-[75vw] xl:w-[65vw] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleForm}
          className="text-primary hover:text-primary absolute top-6 right-6 z-10 transition-colors"
          aria-label="Close"
        >
          <svg
            className="h-8 w-8"
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

        {/* Form Content */}
        <div className="min-h-full px-6 py-16 md:px-12 lg:px-16">
          <h1 className="text-primary mb-4 text-center font-['Gilda_Display'] text-4xl tracking-wide md:text-5xl lg:text-6xl">
            BOOKING INQUIRIES
          </h1>
          <p className="font-secondary mb-12 text-center text-sm text-gray-600 md:text-base lg:mb-16">
            Please fill out the contact form, email
            inquiries@tribecarooftopnyc.com or call 212.625.2600 to schedule a
            visit.
          </p>

          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Left Side - First Form Fields */}
              <div className="text-dark-black">
                <div className="space-y-6">
                  <input
                    type="text"
                    name="fullname"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone*"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <input
                    type="text"
                    name="eventStartDate"
                    value={formData.eventStartDate}
                    onChange={handleInputChange}
                    placeholder="Event Start Date (MM/DD/YYYY)"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <div className="flex gap-2">
                    <select
                      name="eventStartHour"
                      value={formData.eventStartHour}
                      onChange={handleInputChange}
                      className="focus:border-primary font-secondary text-dark-black flex-1 border-b border-gray-400 bg-transparent px-0 py-3 focus:outline-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (hour) => (
                          <option
                            key={hour}
                            value={hour.toString().padStart(2, '0')}
                            className="bg-white"
                          >
                            {hour.toString().padStart(2, '0')}
                          </option>
                        )
                      )}
                    </select>
                    <select
                      name="eventStartMinute"
                      value={formData.eventStartMinute}
                      onChange={handleInputChange}
                      className="focus:border-primary font-secondary text-dark-black flex-1 border-b border-gray-400 bg-transparent px-0 py-3 focus:outline-none"
                    >
                      {['00', '15', '30', '45'].map((minute) => (
                        <option
                          key={minute}
                          value={minute}
                          className="bg-white"
                        >
                          {minute}
                        </option>
                      ))}
                    </select>
                    <select
                      name="eventStartPeriod"
                      value={formData.eventStartPeriod}
                      onChange={handleInputChange}
                      className="focus:border-primary font-secondary text-dark-black flex-1 border-b border-gray-400 bg-transparent px-0 py-3 focus:outline-none"
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
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <input
                    type="text"
                    name="numberOfGuests"
                    value={formData.numberOfGuests}
                    onChange={handleInputChange}
                    placeholder="Number of Guests"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <input
                    type="text"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    placeholder="How did you hear about us?"
                    className="focus:border-primary font-secondary text-dark-black w-full border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    rows={4}
                    className="focus:border-primary font-secondary text-dark-black w-full resize-none border-b border-gray-400 bg-transparent px-0 py-3 placeholder-gray-500 transition-colors focus:outline-none"
                  />

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSubmit}
                      className="bg-primary font-secondary text-dark-black hover:bg-primary cursor-pointer px-12 py-3 font-semibold tracking-wider transition-colors"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsSlider;
