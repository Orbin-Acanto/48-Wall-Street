'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Eye, FileText, Loader2, Send, X } from 'lucide-react';
import { PacketDocumentType, packetDocument } from '@/lib/documents/catalog';
import { formatLongDate } from '@/lib/email-templates';
import type { PacketRecord } from '@/lib/documents/packets';
import type { SignedDocumentRow } from '@/app/api/documents/files/route';

export interface ClientRef {
  name: string;
  email: string;
}

export function timeAgo(iso?: string): string {
  if (!iso) return '';
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

// Links never expire; past the deadline is only a nudge to remind.
export const isOverdue = (packet: PacketRecord) =>
  packet.status === 'sent' &&
  !!packet.deadline &&
  new Date(`${packet.deadline}T23:59:59`) < new Date();

export function StatusPill({ packet }: { packet: PacketRecord }) {
  const overdue = isOverdue(packet);
  const style = overdue
    ? 'border-red-200 bg-red-50 text-red-700'
    : {
        sent: 'bg-amber-50 text-amber-800 border-amber-200',
        signed: 'bg-green-50 text-green-800 border-green-200',
        cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
      }[packet.status];
  return (
    <span
      className={`border px-2 py-0.5 text-[11px] tracking-wide whitespace-nowrap uppercase ${style}`}
    >
      {overdue
        ? 'overdue'
        : packet.status === 'sent'
          ? 'awaiting signature'
          : packet.status}
    </span>
  );
}

/** Clickable client name that opens the client view. */
export function ClientLink({
  client,
  onOpen,
}: {
  client: ClientRef;
  onOpen: (client: ClientRef) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(client)}
      className="hover:text-primary text-left font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-current"
    >
      {client.name || client.email}
    </button>
  );
}

const sameEmail = (a: string, b: string) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();

/** Slide-over with everything on record for one client. */
export function ClientPanel({
  client,
  onClose,
  onNewRequest,
}: {
  client: ClientRef;
  onClose: () => void;
  onNewRequest: (client: ClientRef) => void;
}) {
  const [packets, setPackets] = useState<PacketRecord[] | null>(null);
  const [files, setFiles] = useState<SignedDocumentRow[] | null>(null);
  const [filesError, setFilesError] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/documents/packets', { cache: 'no-store' })
      .then((r) => r.json())
      .then((body) =>
        setPackets(
          (body.packets ?? []).filter((p: PacketRecord) =>
            sameEmail(p.clientEmail, client.email)
          )
        )
      )
      .catch(() => setPackets([]));
    fetch('/api/documents/files', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((body) =>
        setFiles(
          (body.documents ?? []).filter(
            (row: SignedDocumentRow) =>
              row.signTime && sameEmail(row.clientEmail, client.email)
          )
        )
      )
      .catch(() => {
        setFiles([]);
        setFilesError(true);
      });
  }, [client.email]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const initials =
    (client.name || client.email)
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?';
  const awaiting = packets?.filter((p) => p.status === 'sent').length ?? 0;

  const copy = async (packet: PacketRecord) => {
    await navigator.clipboard.writeText(packet.signingUrl);
    setCopied(packet.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-black/50"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Client: ${client.name}`}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-xl flex-col bg-[#f6f4ef] shadow-2xl"
      >
        <div className="bg-[#0a0a0a] px-6 pt-5 pb-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs tracking-[0.25em] text-[#d2b371] uppercase">
              Client
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close client view"
              className="-m-2 p-2 text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[#d2b371]/60 text-lg text-[#d2b371]">
              {initials}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-2xl">{client.name}</h2>
              <a
                href={`mailto:${client.email}`}
                className="block truncate text-sm text-white/70 hover:text-white"
              >
                {client.email}
              </a>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-3 border border-white/10 text-center">
            {[
              ['Requests', packets?.length],
              ['Awaiting', packets ? awaiting : undefined],
              ['Signed files', files?.length],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-r border-white/10 px-2 py-3 last:border-r-0"
              >
                <dd className="text-xl">{value ?? '–'}</dd>
                <dt className="text-[10px] tracking-widest text-white/50 uppercase">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
          <button
            type="button"
            onClick={() => onNewRequest(client)}
            className="bg-primary mt-5 inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-xs font-medium tracking-widest text-white uppercase hover:opacity-90"
          >
            <Send className="h-4 w-4" /> New request for this client
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
          <section>
            <h3 className="mb-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
              Requests
            </h3>
            {packets === null ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-gray-400" />
            ) : packets.length === 0 ? (
              <p className="border border-dashed border-gray-300 bg-white p-5 text-center text-sm text-gray-500">
                No requests on record.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 border border-gray-200 bg-white">
                {packets.map((packet) => (
                  <li key={packet.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-gray-800">
                        {packet.documents
                          .map((t) => packetDocument(t)?.label ?? t)
                          .join(' · ')}
                      </p>
                      <StatusPill packet={packet} />
                    </div>
                    <p className="mt-1.5 text-xs text-gray-400">
                      Sent by {packet.sentBy.name} · {timeAgo(packet.sentAt)}
                      {packet.eventDate &&
                        ` · Event ${formatLongDate(packet.eventDate)}`}
                      {packet.status === 'signed' &&
                        ` · Signed ${timeAgo(packet.signedAt)}`}
                      {packet.status === 'sent' &&
                        packet.deadline &&
                        ` · Due ${formatLongDate(packet.deadline)}`}
                    </p>
                    {packet.status === 'sent' && (
                      <button
                        type="button"
                        onClick={() => copy(packet)}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900"
                      >
                        {copied === packet.id ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied === packet.id ? 'Copied' : 'Copy signing link'}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="mb-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
              Signed files
            </h3>
            {files === null ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-gray-400" />
            ) : files.length === 0 ? (
              <p className="border border-dashed border-gray-300 bg-white p-5 text-center text-sm text-gray-500">
                {filesError
                  ? 'Could not load signed files.'
                  : 'No signed documents yet.'}
              </p>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {files.map((row) => (
                  <li
                    key={row.id}
                    className="flex flex-col border border-gray-200 bg-white p-4"
                  >
                    <FileText className="text-primary h-5 w-5" />
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {packetDocument(row.documentType as PacketDocumentType)
                        ?.label ?? row.documentType}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      Signed {row.signTime}
                      {row.docId && ` · Ref ${row.docId}`}
                    </p>
                    <div className="mt-auto pt-3">
                      {row.fileName ? (
                        <a
                          href={`/api/documents/files?file=${encodeURIComponent(row.fileName)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="h-3.5 w-3.5" /> View PDF
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">
                          {row.documentType === 'credit_card_auth'
                            ? 'Emailed only (card details are not stored)'
                            : 'No file on record'}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
