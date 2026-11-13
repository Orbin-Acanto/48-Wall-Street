'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Eye, Loader2, RefreshCw, Search } from 'lucide-react';
import { PacketDocumentType, packetDocument } from '@/lib/documents/catalog';
import type { SignedDocumentRow } from '@/app/api/documents/files/route';
import { ClientLink, type ClientRef } from '@/components/DocumentClientPanel';

/** Every signed document on record (n8n table), with its stored PDF. */
export default function SignedDocuments({
  refreshKey,
  onOpenClient,
}: {
  refreshKey: number;
  onOpenClient: (client: ClientRef) => void;
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

  // One card per client; rows arrive newest first, so each card is too.
  const groups = useMemo(() => {
    const byClient = new Map<string, SignedDocumentRow[]>();
    for (const row of signed) {
      const key = row.clientEmail.trim().toLowerCase();
      byClient.set(key, [...(byClient.get(key) ?? []), row]);
    }
    return [...byClient];
  }, [signed]);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
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
        <ul className="space-y-4">
          {groups.map(([email, docs]) => (
            <li key={email} className="border border-gray-200 bg-white">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-100 px-4 py-3 sm:px-5">
                <p className="min-w-0">
                  <ClientLink
                    client={{
                      name: docs[0].clientName,
                      email: docs[0].clientEmail,
                    }}
                    onOpen={onOpenClient}
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    {docs[0].clientEmail}
                  </span>
                </p>
                <span className="text-xs text-gray-400">
                  {docs.length} {docs.length === 1 ? 'document' : 'documents'} ·
                  last signed {docs[0].signTime.split(' at ')[0]}
                </span>
              </div>
              <ul className="divide-y divide-gray-50">
                {docs.map((row) => (
                  <li
                    key={row.id}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5"
                  >
                    <span className="min-w-0 text-sm text-gray-700">
                      {packetDocument(row.documentType as PacketDocumentType)
                        ?.label ?? row.documentType}
                      {row.docId && (
                        <span className="ml-2 hidden text-xs text-gray-400 sm:inline">
                          {row.docId}
                        </span>
                      )}
                    </span>
                    {row.fileName ? (
                      <a
                        href={`/api/documents/files?file=${encodeURIComponent(row.fileName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary inline-flex flex-shrink-0 items-center gap-1.5 text-xs text-gray-600"
                      >
                        <Eye className="h-3.5 w-3.5" /> View PDF
                      </a>
                    ) : (
                      <span
                        className="flex-shrink-0 text-xs text-gray-400"
                        title={
                          row.documentType === 'credit_card_auth'
                            ? 'Card details are never stored'
                            : undefined
                        }
                      >
                        {row.documentType === 'credit_card_auth'
                          ? 'Emailed only'
                          : 'No file'}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
