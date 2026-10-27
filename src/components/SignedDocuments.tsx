'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, Loader2, RefreshCw, Search } from 'lucide-react';
import { PacketDocumentType, packetDocument } from '@/lib/documents/catalog';
import type { SignedDocumentRow } from '@/app/api/documents/files/route';

/** Every signed document on record (n8n table), with its stored PDF. */
export default function SignedDocuments({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [rows, setRows] = useState<SignedDocumentRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch('/api/documents/files', {
        cache: 'no-store',
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error);
      setRows(body.documents);
    } catch (e) {
      setRows([]);
      setError(e instanceof Error && e.message ? e.message : 'Could not load');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const signed = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows ?? []).filter(
      (row) =>
        row.signTime &&
        (!q ||
          `${row.clientName} ${row.clientEmail} ${row.docId}`
            .toLowerCase()
            .includes(q))
    );
  }, [rows, query]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl text-gray-900">Signed documents</h2>
        <div className="flex items-center gap-3">
          <label className="relative">
            <span className="sr-only">Search signed documents</span>
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Client, email or reference"
              className="focus:border-primary focus:ring-primary/30 w-56 border border-gray-300 bg-white py-1.5 pr-3 pl-8 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {rows === null ? (
        <div className="flex justify-center border border-gray-200 bg-white p-10">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      ) : signed.length === 0 ? (
        <p className="border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          {query
            ? 'No signed documents match.'
            : 'Signed documents will appear here.'}
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 border border-gray-200 bg-white">
          {signed.map((row) => (
            <li
              key={row.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900">
                  {row.clientName}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    {row.clientEmail}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {packetDocument(row.documentType as PacketDocumentType)
                    ?.label ?? row.documentType}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Signed {row.signTime}
                  {row.docId && ` · Ref ${row.docId}`}
                </p>
              </div>
              {row.fileName ? (
                <a
                  href={`/api/documents/files?file=${encodeURIComponent(row.fileName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-shrink-0 items-center gap-1.5 self-start border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 sm:self-auto"
                >
                  <Eye className="h-3.5 w-3.5" /> View PDF
                </a>
              ) : (
                <span className="flex-shrink-0 text-xs text-gray-400">
                  {row.documentType === 'credit_card_auth'
                    ? 'Emailed only (card details are not stored)'
                    : 'No file on record'}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
