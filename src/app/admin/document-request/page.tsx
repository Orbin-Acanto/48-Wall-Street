'use client';

import { useState } from 'react';

type DocumentType =
  // | 'floor_plan'
  'client_guidelines' | 'credit_card_auth' | 'av_production';

interface FormData {
  clientFullName: string;
  clientEmail: string;
  documentType: DocumentType | '';
  expirationDate: string;
}

export default function DocumentRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    clientFullName: '',
    clientEmail: '',
    documentType: '',
    expirationDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const generateSigningURL = async (): Promise<string> => {
    const response = await fetch('/api/documents/generate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.clientFullName,
        email: formData.clientEmail,
        type: formData.documentType,
        deadline: formData.expirationDate,
      }),
    });
    const { token } = await response.json();
    return `${window.location.origin}/sign?token=${token}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const docsURL = await generateSigningURL();
      const docId =
        'DOC-' +
        new Date().toISOString().slice(0, 10).replace(/-/g, '') +
        '-' +
        Math.random().toString(36).substring(2, 8).toUpperCase();

      const response = await fetch('/api/documents/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientFullName,
          clientEmail: formData.clientEmail,
          documentType: formData.documentType,
          deadline: formData.expirationDate,
          docsURL: docsURL,
          docId: docId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate signing link');
      }

      setGeneratedLink(docsURL);
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      clientFullName: '',
      clientEmail: '',
      documentType: '',
      expirationDate: '',
    });
    setGeneratedLink(null);
    setCopied(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="up mb-6 text-center text-2xl font-semibold text-gray-900">
            Document Sign
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="clientFullName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Client Full Name
              </label>
              <input
                type="text"
                id="clientFullName"
                name="clientFullName"
                value={formData.clientFullName}
                onChange={handleInputChange}
                required
                placeholder="John Smith"
                className="focus:ring-primary/70 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="clientEmail"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Client Email
              </label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                required
                placeholder="client@example.com"
                className="focus:ring-primary/70 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="documentType"
                  className="text-sm font-medium text-gray-700"
                >
                  Document Type
                </label>

                <div className="relative">
                  <select
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleInputChange}
                    required
                    className="focus:border-primary focus:ring-primary/30 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 pr-10 text-sm text-gray-900 shadow-sm focus:ring-2 focus:outline-none"
                  >
                    <option value="">Document type</option>
                    <option value="client_guidelines">
                      Client Guidelines & Authorization Agreement
                    </option>
                    {/* <option value="floor_plan">Floor Plan Agreement</option> */}
                    <option value="av_production">AV/Production Form</option>
                    <option value="credit_card_auth">
                      Credit Card Authorization
                    </option>
                  </select>

                  <svg
                    className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="expirationDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Signature Deadline
                </label>

                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  required
                  min={getMinDate()}
                  className="focus:border-primary focus:ring-primary/30 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary/95 focus:ring-primary/70 bg-primary w-full cursor-pointer rounded-md px-4 py-2 font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Generating...' : 'Generate Signing Link'}
            </button>
          </form>
        </div>
      </div>

      {showModal && generatedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Document Sent
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
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

            <div className="mb-4">
              <div className="mb-4 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-green-700">
                  Client will receive this document to sign in their email.
                </p>
              </div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Signing URL
              </label>
              <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="flex-1 truncate bg-transparent text-sm text-gray-600 outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {copied && (
                <p className="mt-1 text-xs text-green-600">
                  Copied to clipboard!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
