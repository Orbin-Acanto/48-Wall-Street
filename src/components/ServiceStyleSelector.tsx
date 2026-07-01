'use client';

import { useState } from 'react';
import { Volume2, Lightbulb, Monitor, Radio, Headphones, Wrench, Coffee, UtensilsCrossed, Wine, Sandwich, Salad, ChefHat, IceCreamCone, GlassWater } from 'lucide-react';

const AV_SERVICES = [
  { label: 'Audio', icon: Volume2 },
  { label: 'Lighting', icon: Lightbulb },
  { label: 'Staging', icon: Monitor },
  { label: 'Video / LED Walls', icon: Radio },
  { label: 'Live Streaming Services', icon: Headphones },
  { label: 'Technical Production Support', icon: Wrench },
];

const FOOD_BEVERAGE = [
  { label: 'Breakfast', icon: Coffee },
  { label: 'Lunch', icon: Sandwich },
  { label: 'AM / PM Snacks', icon: IceCreamCone },
  { label: 'Cocktail Reception', icon: Wine },
  { label: 'Sit-Down Dinner', icon: UtensilsCrossed },
  { label: 'Food Stations', icon: Salad },
  { label: 'Bar Service', icon: GlassWater },
  { label: 'Custom Menu Design', icon: ChefHat },
];

export default function ServiceStyleSelector() {
  const [selectedAV, setSelectedAV] = useState<string[]>([]);
  const [selectedFB, setSelectedFB] = useState<string[]>([]);

  const toggleItem = (
    item: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-secondary text-primary mb-4 text-center text-sm tracking-[0.3em] uppercase">
          Customize Your Event
        </p>
        <h2 className="heading-hero text-center">Style of Services</h2>
        <p className="text-lead mb-16 text-center">
          Please select the services you would like included in your event
          proposal. This quick form helps our team better understand your needs
          and prepare a customized RFP quote for your event.
        </p>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-primary flex h-10 w-10 items-center justify-center">
                <Volume2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-primary text-dark-black text-2xl font-light tracking-wide uppercase">
                  AV Services
                </h3>
                <p className="font-secondary text-xs text-gray-400">
                  Select all that apply
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {AV_SERVICES.map(({ label, icon: Icon }) => {
                const isSelected = selectedAV.includes(label);
                return (
                  <label
                    key={label}
                    className={`group flex cursor-pointer items-center gap-4 px-5 py-4 transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary/5'
                        : 'bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-500'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`font-secondary text-sm transition-colors duration-200 ${
                        isSelected
                          ? 'text-dark-black font-medium'
                          : 'text-dark-black/70'
                      }`}
                    >
                      {label}
                    </span>
                    <div className="ml-auto">
                      <div
                        className={`flex h-5 w-5 items-center justify-center border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover:border-gray-400'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-3 w-3 text-white"
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
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() =>
                        toggleItem(label, selectedAV, setSelectedAV)
                      }
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-primary flex h-10 w-10 items-center justify-center">
                <UtensilsCrossed className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-primary text-dark-black text-2xl font-light tracking-wide uppercase">
                  Food & Beverage
                </h3>
                <p className="font-secondary text-xs text-gray-400">
                  Select all that apply
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {FOOD_BEVERAGE.map(({ label, icon: Icon }) => {
                const isSelected = selectedFB.includes(label);
                return (
                  <label
                    key={label}
                    className={`group flex cursor-pointer items-center gap-4 px-5 py-4 transition-all duration-200 ${
                      isSelected
                        ? 'bg-primary/5'
                        : 'bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-500'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`font-secondary text-sm transition-colors duration-200 ${
                        isSelected
                          ? 'text-dark-black font-medium'
                          : 'text-dark-black/70'
                      }`}
                    >
                      {label}
                    </span>
                    <div className="ml-auto">
                      <div
                        className={`flex h-5 w-5 items-center justify-center border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover:border-gray-400'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-3 w-3 text-white"
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
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() =>
                        toggleItem(label, selectedFB, setSelectedFB)
                      }
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
