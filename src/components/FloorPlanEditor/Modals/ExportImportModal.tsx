import React, { useState, useRef, useEffect } from 'react';
import {
  ExportFormat,
  ExportImportModalProps,
  FloorLevel,
} from '@/types/floorplan.types';
import {
  exportToJSON,
  exportToSVG,
  exportToPNG,
  exportToPDF,
} from '@/utils/exportUtils';
import { exportFormats } from '@/data';

// Header title printed on exported PNG/PDF sheets, per floor level.
const FLOOR_LEVEL_LABELS: Record<FloorLevel, string> = {
  grand_mezzanine: 'Ground Floor & Mezzanine',
  concourse: 'Concourse Level',
  hamilton_ballroom: 'Alexander Hamilton Ballroom — 5th Floor',
};

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  floorPlan,
  onImport,
  onClose,
  eventDetails,
  legendItems,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [selectedFloor, setSelectedFloor] =
    useState<FloorLevel>('grand_mezzanine');
  const [clientName, setClientName] = useState<string>(
    eventDetails.clientName ?? ''
  );
  const [eventDate, setEventDate] = useState<string>(
    eventDetails.eventDate ?? ''
  );
  const [clientLogo, setClientLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClientLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setClientLogo(result);
    };
    reader.readAsDataURL(file);
  };

  const handleExport = async () => {
    const svgElement = document.querySelector(
      '#floor-plan-canvas svg'
    ) as SVGSVGElement | null;

    if (selectedFormat !== 'json' && selectedFormat !== 'svg' && !svgElement) {
      alert('Canvas not found. Please make sure the floor plan is visible.');
      return;
    }

    // Today Date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options)
      .format(now)
      .replace(/\//g, '-');

    // File name and header
    const headerClient = clientName.trim();
    const headerDate = eventDate || floorPlan.eventDetails?.eventDate || '';
    const fileName = clientName || floorPlan.name;

    switch (selectedFormat) {
      case 'json': {
        exportToJSON(floorPlan, `${fileName}_${formattedDate}.json`);
        break;
      }

      case 'svg': {
        if (svgElement) {
          exportToSVG(
            floorPlan,
            svgElement,
            `${fileName}_${formattedDate}.svg`
          );
        }
        break;
      }

      case 'png': {
        if (svgElement) {
          await exportToPNG(floorPlan, svgElement, {
            filename: `${fileName}_${formattedDate}.png`,
            hideGrid: true,
            headerTitle: FLOOR_LEVEL_LABELS[selectedFloor],
            clientName: headerClient,
            eventDate: headerDate,
            logoUrl: '/shared/logo/48-wall.svg',
            clientLogo: clientLogo ?? null,
          });
        }
        break;
      }

      case 'pdf': {
        if (svgElement) {
          await exportToPDF(floorPlan, svgElement, {
            filename: `${fileName}_${formattedDate}.pdf`,
            hideGrid: true,
            headerTitle: FLOOR_LEVEL_LABELS[selectedFloor],
            clientName: headerClient,
            eventDate: headerDate,
            logoUrl: '/shared/logo/48-wall.svg',
            clientLogo: clientLogo ?? null,
            legendItems: legendItems,
          });
        }
        break;
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        onImport(file);
      } else {
        alert('Please select a JSON file exported from this editor.');
      }
    }
  };

  useEffect(() => {
    setClientName(eventDetails.clientName ?? '');
    setEventDate(eventDetails.eventDate ?? '');
  }, [eventDetails]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#CBA35C]/10">
              <svg
                className="h-6 w-6 text-[#CBA35C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Export / Import Floor Plan
              </h2>
              <p className="text-xs tracking-wide text-gray-500 uppercase">
                Share with clients • Save versions • Reload layouts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/60">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'export'
                ? 'border-b-2 border-[#CBA35C] text-gray-900'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Export
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'import'
                ? 'border-b-2 border-[#CBA35C] text-gray-900'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Import
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'export' ? (
            <>
              {/* Floor + Client + Date + Logo row */}
              <div className="border border-gray-100 bg-gray-50/60 p-4">
                <div className="grid gap-4 md:grid-cols-4">
                  {/* Floor */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-[0.12em] text-gray-700 uppercase">
                      Floor Level
                    </label>
                    <select
                      value={selectedFloor}
                      onChange={(e) =>
                        setSelectedFloor(e.target.value as FloorLevel)
                      }
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#CBA35C] focus:ring-2 focus:ring-[#CBA35C]/30 focus:outline-none"
                    >
                      <option value="grand_mezzanine">
                        Ground Floor &amp; Mezzanine
                      </option>
                      <option value="concourse">Concourse Level</option>
                      <option value="hamilton_ballroom">
                        Alexander Hamilton Ballroom &mdash; 5th Floor
                      </option>
                    </select>
                  </div>

                  {/* Client Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-[0.12em] text-gray-700 uppercase">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Smith / ACME Corp"
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#CBA35C] focus:ring-2 focus:ring-[#CBA35C]/30 focus:outline-none"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-[0.12em] text-gray-700 uppercase">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#CBA35C] focus:ring-2 focus:ring-[#CBA35C]/30 focus:outline-none"
                    />
                  </div>

                  {/* Client Logo */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-[0.12em] text-gray-700 uppercase">
                      Client Logo (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleClientLogoUpload}
                      className="block w-full text-xs text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#CBA35C]/10 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#CBA35C] hover:file:bg-[#CBA35C]/20"
                    />
                    {clientLogo && (
                      <div className="mt-2 flex items-center gap-2">
                        <img
                          src={clientLogo}
                          alt="Client logo preview"
                          className="h-10 w-auto rounded border border-gray-200 object-contain"
                        />
                        <button
                          onClick={() => setClientLogo(null)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-[10px] text-gray-500">
                  These details are used in the export header and metadata for
                  PNG/PDF layouts.
                </p>
              </div>
              {/* Format selection */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-gray-700">
                  SELECT FORMAT
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {exportFormats.map((format) => {
                    const isActive = selectedFormat === format.id;
                    return (
                      <button
                        key={format.id}
                        type="button"
                        onClick={() => setSelectedFormat(format.id)}
                        className={`flex items-start gap-3 border p-4 text-left transition-all ${
                          isActive
                            ? 'border-[#CBA35C] bg-[#FFFDF7] shadow-sm'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div
                          className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 ${
                            isActive
                              ? 'border-[#CBA35C] bg-[#CBA35C]'
                              : 'border-gray-300'
                          }`}
                        >
                          {isActive && (
                            <div className="h-full w-full rounded-full bg-[#CBA35C]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {format.name}
                            </span>
                            {format.recommended && (
                              <span className="rounded-full bg-[#CBA35C]/10 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-[#CBA35C] uppercase">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-gray-600">
                            {format.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Helper text */}
              <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-xs text-gray-600">
                <p className="font-semibold text-gray-800">Layout notes:</p>
                <ul className="mt-1 space-y-1">
                  <li>
                    • PNG &amp; PDF exports hide the grid and crop to the actual
                    floor plan.
                  </li>
                  <li>
                    • A clean header with logo, event title, client and date is
                    added automatically.
                  </li>
                  <li>
                    • An approval line is included at the bottom for signatures.
                  </li>
                </ul>
              </div>

              {/* Export button */}
              <button
                type="button"
                onClick={handleExport}
                className="bg-primary hover:bg-primary/80 flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export as {selectedFormat.toUpperCase()}
              </button>
            </>
          ) : (
            // IMPORT TAB
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-700">
                  IMPORT FLOOR PLAN
                </h3>
                <p className="mb-4 text-xs text-gray-500">
                  Upload a JSON file previously exported from this floor plan
                  editor. Importing will replace your current layout.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/40 px-6 py-12 text-center transition-colors hover:border-[#CBA35C] hover:bg-[#FFFDF7]"
                >
                  <svg
                    className="h-10 w-10 text-gray-400 transition-colors group-hover:text-[#CBA35C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Click to select a JSON file
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      or drag &amp; drop into this area.
                    </p>
                  </div>
                </button>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-xs text-gray-600">
                <p className="font-semibold text-gray-800">Import notes:</p>
                <ul className="mt-1 space-y-1">
                  <li>
                    • Only JSON files produced by this editor are supported.
                  </li>
                  <li>
                    • Always export a backup of your current plan before
                    importing.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
