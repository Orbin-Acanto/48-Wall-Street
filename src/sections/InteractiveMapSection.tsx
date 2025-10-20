import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function InteractiveMapSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Location & Map Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="font-secondary text-3xl text-gray-900 md:text-4xl lg:text-5xl">
              Visit Our Venue
            </h2>
            <p className="font-primary mt-4 text-lg text-gray-600">
              Located in the heart of the Financial District, our historic venue
              is easily accessible and offers a stunning backdrop for your
              event.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="sticky top-24">
                <div className="group relative overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl">
                  {/* Map Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <iframe
                      src="https://www.google.com/maps/d/u/0/embed?mid=1YNDkCXySQkVw_9cHgTByM1m875yIANQ&ehbc=2E312F&noprof=1"
                      className="h-full w-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="48 Wall Street Location Map"
                    />

                    {/* Fullscreen Button Overlay */}
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">View Larger Map</span>
                    </button>
                  </div>

                  {/* Map Info Footer */}
                  <div className="border-t border-gray-200 bg-gray-50 p-2.5">
                    <p className="text-center text-sm text-gray-600">
                      Click and drag to explore • Scroll to zoom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Map Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="flex h-full flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-6 py-4">
              <h3 className="font-secondary text-xl text-white">
                48 Wall Street - Location Map
              </h3>
              <button
                onClick={toggleFullscreen}
                className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close fullscreen map"
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

            {/* Fullscreen Map */}
            <div className="flex-1">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1YNDkCXySQkVw_9cHgTByM1m875yIANQ&ehbc=2E312F&noprof=1"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="48 Wall Street Location Map - Fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
