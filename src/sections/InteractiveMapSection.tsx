'use client';

import React, { useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';

export default function InteractiveMapSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHint, setShowHint] = useState(true);

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
            <h2 className="heading-hero text-primary">
              Visit Our Financial District Venue
            </h2>
            <p className="text-lead mb-8">
              Located in the heart of Lower Manhattan, our historic venue is
              easily accessible and offers a stunning backdrop for your event.
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

                    {showHint && (
                      <div className="absolute top-12 left-8 z-10 animate-bounce">
                        <div className="relative">
                          <svg
                            className="text-primary h-12 w-12"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
                              transform="rotate(225 12 12)"
                            />
                          </svg>

                          <div className="bg-primary absolute top-10 left-10 w-48 rounded-lg p-3 shadow-xl">
                            <button
                              onClick={() => setShowHint(false)}
                              className="text-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md"
                            >
                              <svg
                                className="h-3 w-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <p className="text-xs font-medium text-white">
                              👈 Click here to toggle Transportation, Hotels &
                              Parking locations
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Info Badge - Always visible */}
                    <div className="absolute bottom-25 left-3 z-10">
                      <div className="group/info relative">
                        <div className="bg-primary hover:bg-primary/80 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-110">
                          <Info className="h-5 w-5 text-white" />
                        </div>

                        {/* Persistent Tooltip on hover */}
                        <div className="pointer-events-none absolute bottom-full left-12 mb-2 w-56 scale-0 rounded-lg bg-gray-900 p-3 text-xs text-white shadow-xl transition-transform group-hover/info:scale-100">
                          <div className="mb-2 font-semibold">
                            Map Legend Available
                          </div>
                          <p className="leading-relaxed">
                            Click the button on the left edge of the map to see:
                          </p>
                          <ul className="mt-2 space-y-1 text-xs">
                            <li>🚇 Nearby Subway Stations</li>
                            <li>🏨 Hotels</li>
                            <li>🅿️ Parking Locations</li>
                            <li>📍 48 Wall St Venue</li>
                          </ul>

                          {/* Arrow pointing down */}
                          <div className="absolute top-1/2 -left-2 h-0 w-0 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                        </div>
                      </div>
                    </div>

                    {/* Fullscreen Button Overlay */}
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">View Larger Map</span>
                    </button>
                  </div>

                  {/* Map Info Footer */}
                  <div className="border-t border-gray-200 bg-gray-50 p-2.5">
                    <p className="text-center text-sm text-gray-600">
                      Click the{' '}
                      <span className="font-semibold text-blue-600">
                        left sidebar button
                      </span>{' '}
                      to view nearby locations • Drag to explore • Scroll to
                      zoom
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
