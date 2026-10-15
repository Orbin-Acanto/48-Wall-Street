'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  FileCheck2,
  Loader2,
  ShieldCheck,
  Upload,
} from 'lucide-react';

interface Result {
  found: boolean;
  title?: string;
  reference?: string;
  signerName?: string;
  signedAt?: string;
  sealed?: boolean;
}

async function sha256Hex(file: File): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    await file.arrayBuffer()
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function VerifyDocumentPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const check = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setResult(null);
    setError(null);
    setChecking(true);
    try {
      const fingerprint = await sha256Hex(file);
      setHash(fingerprint);
      const response = await fetch(
        `/api/verify-document?sha256=${fingerprint}`
      );
      if (!response.ok) throw new Error();
      setResult(await response.json());
    } catch {
      setError('We could not check this file right now. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] px-4 pt-32 pb-20">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <ShieldCheck className="text-primary mx-auto mb-4 h-10 w-10" />
          <h1 className="text-3xl text-gray-900 md:text-4xl">
            Verify a document
          </h1>
          <p className="mt-3 text-gray-600">
            Confirm a signed 48 Wall Street document is authentic and has not
            been changed. Your file is checked on your device and is never
            uploaded.
          </p>
        </div>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            check(e.dataTransfer.files[0]);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-white px-6 py-12 text-center transition-colors ${
            dragging
              ? 'border-primary bg-[#faf7f0]'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Upload className="mb-3 h-8 w-8 text-gray-400" />
          <span className="text-gray-900">
            Drop the PDF here or tap to choose
          </span>
          <span className="mt-1 text-sm text-gray-500">
            {fileName ?? 'The file from your confirmation email'}
          </span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(e) => check(e.target.files?.[0])}
          />
        </label>

        <div aria-live="polite" className="mt-6">
          {checking && (
            <p className="flex items-center justify-center gap-2 text-gray-600">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking…
            </p>
          )}

          {error && (
            <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          {result?.found && (
            <div className="border border-green-200 bg-white p-5">
              <p className="mb-3 flex items-center gap-2 text-lg text-green-800">
                <FileCheck2 className="h-5 w-5" /> Authentic and unmodified
              </p>
              <dl className="grid grid-cols-[8rem_1fr] gap-y-1.5 text-sm">
                <dt className="text-gray-500">Document</dt>
                <dd className="text-gray-900">{result.title}</dd>
                <dt className="text-gray-500">Signed by</dt>
                <dd className="text-gray-900">{result.signerName}</dd>
                <dt className="text-gray-500">Signed</dt>
                <dd className="text-gray-900">
                  {result.signedAt &&
                    new Date(result.signedAt).toLocaleString('en-US', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                </dd>
                <dt className="text-gray-500">Reference</dt>
                <dd className="text-gray-900">{result.reference}</dd>
              </dl>
            </div>
          )}

          {result && !result.found && (
            <div className="border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <p className="mb-1 flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4" /> No match in our records
              </p>
              This file is not an executed document issued by 48 Wall Street, or
              it has been changed since it was signed. Please contact our Event
              Services team at 212.971.5353.
            </div>
          )}

          {hash && (
            <p className="mt-4 text-center font-mono text-[11px] break-all text-gray-400">
              SHA-256 {hash}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
