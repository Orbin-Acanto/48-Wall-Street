import { FloorPlanData } from '@/types/floorplan.types';
import { exportToJSON, exportToPNG, exportToSVG } from '@/utils/exportUtils';
import React, { useState, useRef } from 'react';

interface ExportImportModalProps {
  isOpen: boolean;
  floorPlan: FloorPlanData;
  onImport: (file: File) => void;
  onClose: () => void;
}

type ExportFormat = 'json' | 'svg' | 'png' | 'pdf';

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  floorPlan,
  onImport,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    switch (selectedFormat) {
      case 'json':
        exportToJSON(floorPlan, `${floorPlan.name}.json`);
        break;
      case 'svg':
        const svgElement = document.querySelector(
          '#floor-plan-canvas svg'
        ) as SVGSVGElement;
        if (svgElement) {
          exportToSVG(floorPlan, svgElement, `${floorPlan.name}.svg`);
        } else {
          alert('Canvas not found. Please try again.');
        }
        break;
      case 'png':
        const svgEl = document.querySelector(
          '#floor-plan-canvas svg'
        ) as SVGSVGElement;
        if (svgEl) {
          exportToPNG(svgEl, `${floorPlan.name}.png`, 2);
        } else {
          alert('Canvas not found. Please try again.');
        }
        break;
      case 'pdf':
        const pdfElement = document.querySelector(
          '#floor-plan-canvas svg'
        ) as SVGSVGElement;
        if (pdfElement) {
          exportToSVG(floorPlan, pdfElement, `${floorPlan.name}.svg`);
        } else {
          alert('Canvas not found. Please try again.');
        }
        break;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        onImport(file);
      } else {
        alert('Please select a JSON file');
      }
    }
  };

  const exportFormats = [
    {
      id: 'json' as ExportFormat,
      name: 'JSON',
      description: 'Full floor plan data with all settings',
      icon: (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      recommended: true,
    },
    {
      id: 'svg' as ExportFormat,
      name: 'SVG',
      description: 'Scalable vector graphics for editing',
      icon: (
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 'png' as ExportFormat,
      name: 'PNG',
      description: 'High-resolution image for sharing',
      icon: (
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 'pdf' as ExportFormat,
      name: 'PDF',
      description: 'PDF for sharing',
      icon: (
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
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
                Export / Import
              </h2>
              <p className="text-sm text-gray-500">
                Save or load your floor plan
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'export'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Export
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'import'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Import
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'export' ? (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Select Format
                </h3>
                <div className="grid gap-3">
                  {exportFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`flex items-start gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                        selectedFormat === format.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 ${selectedFormat === format.id ? 'text-blue-600' : 'text-gray-400'}`}
                      >
                        {format.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {format.name}
                          </h4>
                          {format.recommended && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {format.description}
                        </p>
                      </div>
                      <div
                        className={`h-5 w-5 flex-shrink-0 rounded-full border-2 transition-all ${
                          selectedFormat === format.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedFormat === format.id && (
                          <svg
                            className="h-full w-full text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-900">
                      Export Tips
                    </h4>
                    <ul className="mt-1 space-y-1 text-sm text-yellow-800">
                      <li>
                        • JSON format preserves all data and can be re-imported
                      </li>
                      <li>
                        • SVG format is ideal for further editing in design
                        tools
                      </li>
                      <li>
                        • PNG format creates a high-resolution image (2x scale)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handleExport}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
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
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Import Floor Plan
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  Select a JSON file that was previously exported from this
                  application.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-300 px-6 py-12 transition-colors hover:border-blue-400 hover:bg-blue-50"
                >
                  <svg
                    className="h-12 w-12 text-gray-400 transition-colors group-hover:text-blue-500"
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
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                      Click to select a file
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      or drag and drop a JSON file here
                    </p>
                  </div>
                </button>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">
                      Import Notes
                    </h4>
                    <ul className="mt-1 space-y-1 text-sm text-blue-800">
                      <li>
                        • Only JSON files exported from this app can be imported
                      </li>
                      <li>• Importing will replace your current floor plan</li>
                      <li>
                        • Make sure to export your current work before importing
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
