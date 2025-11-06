import {
  EVENT_TYPES,
  EventDetails,
  SERVICE_TYPES,
} from '@/types/floorplan.types';
import React, { useState } from 'react';

interface EventDetailsModalProps {
  isOpen: boolean;
  eventDetails: EventDetails;
  onSave: (details: EventDetails) => void;
  onClose: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  eventDetails,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<EventDetails>(eventDetails);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Event Details
              </h2>
              <p className="text-sm text-gray-500">
                Configure your event information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
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

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-140px)] overflow-y-auto"
        >
          <div className="space-y-6 px-6 py-6">
            {/* Event Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Name <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.eventName || ''}
                onChange={(e) =>
                  setFormData({ ...formData, eventName: e.target.value })
                }
                placeholder="e.g., Smith & Johnson Wedding"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Guest Count */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Guest Count <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guestCount: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter number of guests"
                min="0"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Total number of expected guests
              </p>
            </div>

            {/* Event Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              >
                <option value="">Select event type...</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Event Date <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="date"
                value={formData.eventDate || ''}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Services */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Required Services
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_TYPES.map((service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {formData.services.length} service
                {formData.services.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            {/* Summary */}
            {(formData.guestCount > 0 ||
              formData.eventType ||
              formData.services.length > 0) && (
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-2 text-sm font-semibold text-purple-900">
                  Summary
                </h4>
                <div className="space-y-1 text-sm text-purple-800">
                  {formData.eventName && (
                    <p>
                      • Event:{' '}
                      <span className="font-medium">{formData.eventName}</span>
                    </p>
                  )}
                  {formData.eventType && (
                    <p>
                      • Type:{' '}
                      <span className="font-medium">{formData.eventType}</span>
                    </p>
                  )}
                  {formData.guestCount > 0 && (
                    <p>
                      • Guests:{' '}
                      <span className="font-medium">{formData.guestCount}</span>
                    </p>
                  )}
                  {formData.eventDate && (
                    <p>
                      • Date:{' '}
                      <span className="font-medium">
                        {new Date(formData.eventDate).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                  {formData.services.length > 0 && (
                    <p>
                      • Services:{' '}
                      <span className="font-medium">
                        {formData.services.length}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
