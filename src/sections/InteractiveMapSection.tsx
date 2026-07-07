'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Maximize2, X } from 'lucide-react';

const LocationMap = dynamic(() => import('@/components/LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <span className="font-secondary text-sm text-gray-400">
        Loading map…
      </span>
    </div>
  ),
});

export default function InteractiveMapSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

          <div className="mx-auto max-w-7xl">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/[0.02] transition-all hover:shadow-2xl">
              {/* Map with always-open sidebar */}
              <div className="relative md:h-[760px]">
                <LocationMap />

                {/* Fullscreen Button Overlay */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-4 right-4 z-[500] hidden items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:flex"
                >
                  <Maximize2 className="h-4 w-4" />
                  <span className="hidden sm:inline">View Larger Map</span>
                </button>
              </div>

              {/* Map Info Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-2.5">
                <p className="text-center text-sm text-gray-600">
                  Use the{' '}
                  <span className="font-semibold text-gray-800">sidebar</span> to
                  show subway, bus, hotel &amp; parking locations • Drag to
                  explore • Scroll to zoom
                </p>
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
                onClick={() => setIsFullscreen(false)}
                className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close fullscreen map"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Fullscreen Map */}
            <div className="flex-1 bg-white">
              <LocationMap />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
