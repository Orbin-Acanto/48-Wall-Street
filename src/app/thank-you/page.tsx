'use client';

import React, { useEffect } from 'react';
import { InlineWidget } from 'react-calendly';

export default function ThankYouScheduling() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <div className="h-22" />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-3xl font-bold md:text-5xl lg:text-6xl">
              <span className="bg-primary bg-clip-text text-transparent">
                THANK YOU FOR CONTACTING 48 WALL STREET
              </span>
            </h1>

            <h2 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
              You can schedule a call now with the click of button!
            </h2>

            <p className="mx-auto max-w-4xl text-base leading-relaxed text-gray-600 md:text-lg">
              To make scheduling easier, you may now select a convenient time to
              speak with one of our event specialists. Please use the calendar
              below to choose the time that works best for you. If you choose
              not to schedule a call at this time a member of our team will
              still contact you directly. We look forward to speaking with you.
            </p>
          </div>

          <div className="overflow-hidden">
            <InlineWidget
              url="https://calendly.com/mmeconsult/mme-appointment"
              styles={{
                height: '800px',
                minWidth: '100%',
              }}
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: 'd2b371',
                textColor: '0a0a0a',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
