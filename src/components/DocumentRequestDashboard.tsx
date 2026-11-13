'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { StaffHeader } from '@/components/FloorPlanTemplates/StaffHeader';
import {
  Bell,
  Check,
  ClipboardList,
  Copy,
  CreditCard,
  Eye,
  FileText,
  Landmark,
  Loader2,
  RefreshCw,
  Search,
  ScrollText,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  PacketDocumentType,
  SELECTABLE_DOCUMENTS,
  normalizePacketTypes,
  packetDocument,
} from '@/lib/documents/catalog';
import {
  DEFAULT_EVENT_PACKET_URL,
  formatLongDate,
  packetInvitationEmail,
} from '@/lib/email-templates';
import type { PacketRecord } from '@/lib/documents/packets';
import SignedDocuments from '@/components/SignedDocuments';
import {
  ClientLink,
  ClientPanel,
  StatusPill,
  isOverdue,
  timeAgo,
  type ClientRef,
} from '@/components/DocumentClientPanel';

type Tab = 'new' | 'requests' | 'signed';
const TABS: { id: Tab; label: string }[] = [
  { id: 'new', label: 'New request' },
  { id: 'requests', label: 'Requests' },
  { id: 'signed', label: 'Signed documents' },
];

type StatusFilter = 'all' | 'awaiting' | 'overdue' | 'signed' | 'cancelled';
const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'awaiting', label: 'Awaiting' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'signed', label: 'Signed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const matchesFilter = (packet: PacketRecord, filter: StatusFilter) =>
  filter === 'all' ||
  (filter === 'overdue'
    ? isOverdue(packet)
    : filter === 'awaiting'
      ? packet.status === 'sent' && !isOverdue(packet)
      : packet.status === filter);

const ICONS: Record<PacketDocumentType, typeof FileText> = {
  client_guidelines: ScrollText,
  rules_regulations: FileText,
  av_production: ClipboardList,
  credit_card_auth: CreditCard,
  ach_auth: Landmark,
  event_packet_ack: ShieldCheck,
};

const PACKET_URL_KEY = 'doc-center:packet-url';

const inputClass =
  'focus:border-primary focus:ring-primary/30 w-full border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 placeholder-gray-400 focus:ring-2 focus:outline-none sm:text-sm';

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium tracking-widest text-gray-600 uppercase"
    >
      {children}
    </label>
  );
}

function tomorrow(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

function inDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/* ------------------------------------------------------------------ */

function RecentRequests({
  refreshKey,
  onOpenClient,
  onCount,
}: {
  refreshKey: number;
  onOpenClient: (client: ClientRef) => void;
  onCount: (awaiting: number) => void;
}) {
  const [packets, setPackets] = useState<PacketRecord[] | null>(null);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/documents/packets', {
        cache: 'no-store',
      });
      const body = await response.json();
      const list: PacketRecord[] = body.packets ?? [];
      setPackets(list);
      onCount(list.filter((p) => p.status === 'sent').length);
    } catch {
      setPackets([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onCount is a state setter
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const q = query.trim().toLowerCase();
  const shown = (packets ?? []).filter(
    (p) =>
      matchesFilter(p, filter) &&
      `${p.clientName} ${p.clientEmail}`.toLowerCase().includes(q)
  );

  const act = async (packet: PacketRecord, action: 'reminder' | 'cancel') => {
    if (
      action === 'cancel' &&
      !window.confirm(
        `Cancel the request for ${packet.clientName}? The link will stop working and they will be notified.`
      )
    ) {
      return;
    }
    setBusy(`${packet.id}:${action}`);
    setNotice(null);
    try {
      const response = await fetch(`/api/documents/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: packet.clientName,
          clientEmail: packet.clientEmail,
          documentType: 'packet',
          deadline: formatLongDate(packet.deadline),
          token: packet.token,
          packetId: packet.id,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (body.skipped === 'already_signed') {
        setNotice(`${packet.clientName} has already signed.`);
      } else if (!response.ok && !body.cancelled) {
        throw new Error(body.error);
      } else {
        setNotice(
          action === 'reminder'
            ? `Reminder sent to ${packet.clientEmail}.`
            : `Request for ${packet.clientName} cancelled.`
        );
      }
      await load();
    } catch (error) {
      setNotice(
        `Could not ${action === 'reminder' ? 'send the reminder' : 'cancel'}${
          error instanceof Error && error.message ? `: ${error.message}` : '.'
        }`
      );
    } finally {
      setBusy(null);
    }
  };

  const copy = async (packet: PacketRecord) => {
    await navigator.clipboard.writeText(packet.signingUrl);
    setCopied(packet.id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Filter by status"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`border px-3 py-1.5 text-xs tracking-wide ${
                filter === f.id
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
              }`}
            >
              {f.label}
              {packets && (
                <span className="ml-1.5 opacity-60">
                  {packets.filter((p) => matchesFilter(p, f.id)).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <span className="sr-only">Search requests</span>
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Client or email"
              className="focus:border-primary focus:ring-primary/30 w-52 border border-gray-300 bg-white py-1.5 pr-3 pl-8 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:outline-none"
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

      {notice && (
        <p className="mb-4 border border-gray-200 bg-white p-3 text-sm text-gray-700">
          {notice}
        </p>
      )}

      {packets === null ? (
        <div className="flex justify-center border border-gray-200 bg-white p-10">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      ) : shown.length === 0 ? (
        <p className="border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          {packets.length === 0
            ? 'Requests you and your team send will appear here.'
            : 'No requests match.'}
        </p>
      ) : (
        <ul className="divide-y divide-gray-100 border border-gray-200 bg-white">
          {shown.map((packet) => {
            return (
              <li key={packet.id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <ClientLink
                        client={{
                          name: packet.clientName,
                          email: packet.clientEmail,
                        }}
                        onOpen={onOpenClient}
                      />
                      <StatusPill packet={packet} />
                    </div>
                    <p className="truncate text-sm text-gray-500">
                      {packet.clientEmail}
                    </p>
                    <p className="mt-1.5 text-sm text-gray-700">
                      {packet.documents
                        .map((t) => packetDocument(t)?.label ?? t)
                        .join(' · ')}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Sent by {packet.sentBy.name} · {timeAgo(packet.sentAt)}
                      {packet.status === 'signed' &&
                        ` · Signed ${timeAgo(packet.signedAt)}`}
                      {packet.status === 'sent' &&
                        packet.deadline &&
                        ` · Due ${formatLongDate(packet.deadline)}`}
                      {packet.lastReminderAt &&
                        packet.status === 'sent' &&
                        ` · Reminded ${timeAgo(packet.lastReminderAt)}`}
                    </p>
                  </div>

                  {packet.status === 'sent' && (
                    <div className="flex flex-shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => copy(packet)}
                        className="inline-flex items-center gap-1.5 border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        {copied === packet.id ? (
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied === packet.id ? 'Copied' : 'Copy link'}
                      </button>
                      <button
                        type="button"
                        disabled={!!busy}
                        onClick={() => act(packet, 'reminder')}
                        className="inline-flex items-center gap-1.5 border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        {busy === `${packet.id}:reminder` ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Bell className="h-3.5 w-3.5" />
                        )}
                        Remind
                      </button>
                      <button
                        type="button"
                        disabled={!!busy}
                        onClick={() => act(packet, 'cancel')}
                        className="inline-flex items-center gap-1.5 border border-gray-300 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {busy === `${packet.id}:cancel` ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <X className="h-3.5 w-3.5" />
                        )}
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function DocumentRequestDashboard({
  staff,
}: {
  staff: { email: string; name: string };
}) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selected, setSelected] = useState<PacketDocumentType[]>([]);
  const [deadline, setDeadline] = useState(inDays(7));
  const [eventDate, setEventDate] = useState('');
  const [packetUrl, setPacketUrl] = useState(DEFAULT_EVENT_PACKET_URL);
  const [note, setNote] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{
    url: string;
    emailFailed: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [tab, setTab] = useState<Tab>('new');
  const [client, setClient] = useState<ClientRef | null>(null);
  const [awaiting, setAwaiting] = useState<number | null>(null);

  // The tab lives in the URL so a refresh or a shared link lands on it.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('tab');
    if (TABS.some((t) => t.id === fromUrl)) setTab(fromUrl as Tab);
  }, []);

  const openTab = (next: Tab) => {
    setTab(next);
    const url = new URL(window.location.href);
    if (next === 'new') url.searchParams.delete('tab');
    else url.searchParams.set('tab', next);
    window.history.replaceState(null, '', url);
  };

  const startRequestFor = (who: ClientRef) => {
    setClientName(who.name);
    setClientEmail(who.email);
    setClient(null);
    openTab('new');
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PACKET_URL_KEY);
      if (saved) setPacketUrl(saved);
    } catch {
      // Storage blocked; the default link is fine.
    }
  }, []);

  const toggle = (type: PacketDocumentType) =>
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const allSelected = selected.length === SELECTABLE_DOCUMENTS.length;

  const previewHtml = useMemo(() => {
    const types = normalizePacketTypes(
      selected.length ? selected : [SELECTABLE_DOCUMENTS[0].type]
    );
    return packetInvitationEmail({
      clientName: clientName.trim() || 'Client Name',
      documents: types.map((type) => packetDocument(type)!),
      deadline,
      signingUrl: '#',
      packetUrl,
      note,
      senderName: staff.name,
    }).html;
  }, [clientName, selected, deadline, packetUrl, note, staff.name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError('Select at least one document to send.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/documents/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          documentTypes: selected,
          deadline,
          eventDate: eventDate || undefined,
          packetUrl,
          note,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (response.status === 401) {
        window.location.assign('/admin/login?next=/admin/document-request');
        return;
      }
      if (body.signingUrl) {
        setSent({ url: body.signingUrl, emailFailed: !!body.emailFailed });
        setError(body.emailFailed ? body.error : null);
        setRefreshKey((k) => k + 1);
        try {
          localStorage.setItem(PACKET_URL_KEY, packetUrl);
        } catch {
          // Not critical.
        }
        return;
      }
      throw new Error(body.error || 'Could not send the request.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not send the request.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSent(null);
    setCopied(false);
    setError(null);
    setClientName('');
    setClientEmail('');
    setSelected([]);
    setEventDate('');
    setNote('');
    setDeadline(inDays(7));
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] pt-22 pb-20">
      <StaffHeader
        title="Document Center"
        staffName={staff.name}
        active="/admin/document-request"
      />

      <div className="sticky top-22 z-30 border-b border-gray-200 bg-white">
        <nav
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4"
          aria-label="Document Center sections"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => openTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
              className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-4 text-sm whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'border-primary text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {t.label}
              {t.id === 'requests' && !!awaiting && (
                <span
                  className="bg-primary min-w-5 rounded-full px-1.5 py-0.5 text-center text-[11px] leading-none text-white"
                  title={`${awaiting} awaiting signature`}
                >
                  {awaiting}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div
          hidden={tab !== 'new'}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-lg text-gray-900">Client</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="clientName">Full name</Label>
                  <input
                    id="clientName"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="off"
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Email</Label>
                  <input
                    id="clientEmail"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="jane@example.com"
                    autoComplete="off"
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="eventDate">Event date (optional)</Label>
                  <input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Sign by</Label>
                  <input
                    id="deadline"
                    type="date"
                    required
                    min={tomorrow()}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg text-gray-900">
                  Documents{' '}
                  <span className="text-sm text-gray-400">
                    ({selected.length} selected)
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setSelected(
                      allSelected ? [] : SELECTABLE_DOCUMENTS.map((d) => d.type)
                    )
                  }
                  className="text-primary text-sm hover:underline"
                >
                  {allSelected ? 'Clear all' : 'Select all'}
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SELECTABLE_DOCUMENTS.map((doc) => {
                  const Icon = ICONS[doc.type];
                  const active = selected.includes(doc.type);
                  return (
                    <button
                      key={doc.type}
                      type="button"
                      role="checkbox"
                      aria-checked={active}
                      onClick={() => toggle(doc.type)}
                      className={`relative flex items-start gap-3 border p-4 text-left transition-colors ${
                        active
                          ? 'border-primary ring-primary/30 bg-[#faf7f0] ring-1'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${active ? 'text-primary' : 'text-gray-400'}`}
                      />
                      <span className="min-w-0 pr-6">
                        <span className="block text-sm font-medium text-gray-900">
                          {doc.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-500">
                          {doc.description}
                        </span>
                      </span>
                      <span
                        className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center border ${
                          active
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="text-primary h-4 w-4 flex-shrink-0" />
                The Event Packet Acknowledgment is added to every request
                automatically.
              </p>
            </div>

            <div className="border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-lg text-gray-900">Email</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="packetUrl">Event packet link</Label>
                  <input
                    id="packetUrl"
                    type="url"
                    required
                    value={packetUrl}
                    onChange={(e) => setPacketUrl(e.target.value)}
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Remembered for next time on this device.
                  </p>
                </div>
                <div>
                  <Label htmlFor="note">Personal note (optional)</Label>
                  <textarea
                    id="note"
                    rows={3}
                    maxLength={1500}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Looking forward to your celebration on the 12th!"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 bg-white px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 lg:hidden"
              >
                <Eye className="h-4 w-4" /> Preview email
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting
                  ? 'Sending…'
                  : selected.length > 1
                    ? `Send ${selected.length} documents`
                    : 'Send for signature'}
              </button>
            </div>
          </form>

          {/* Live preview (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-2 text-xs tracking-widest text-gray-500 uppercase">
                Email preview
              </p>
              <iframe
                title="Email preview"
                srcDoc={previewHtml}
                sandbox=""
                className="h-[calc(100vh-10rem)] w-full border border-gray-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Kept mounted (just hidden) so filters survive tab switches and
            the Requests badge stays current. */}
        <div hidden={tab !== 'requests'}>
          <RecentRequests
            refreshKey={refreshKey}
            onOpenClient={setClient}
            onCount={setAwaiting}
          />
        </div>
        <div hidden={tab !== 'signed'}>
          <SignedDocuments refreshKey={refreshKey} onOpenClient={setClient} />
        </div>
      </div>

      {client && (
        <ClientPanel
          client={client}
          onClose={() => setClient(null)}
          onNewRequest={startRequestFor}
        />
      )}

      {/* Mobile preview */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-black/70 p-3"
          role="dialog"
          aria-modal="true"
          aria-label="Email preview"
        >
          <div className="flex items-center justify-between bg-white px-4 py-3">
            <span className="text-sm text-gray-900">Email preview</span>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              aria-label="Close preview"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <iframe
            title="Email preview"
            srcDoc={previewHtml}
            sandbox=""
            className="w-full flex-1 bg-white"
          />
        </div>
      )}

      {/* Sent */}
      {sent && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white p-6 shadow-xl">
            <div
              className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${sent.emailFailed ? 'bg-amber-50' : 'bg-green-50'}`}
            >
              {sent.emailFailed ? (
                <Bell className="h-6 w-6 text-amber-600" />
              ) : (
                <Check className="h-6 w-6 text-green-600" />
              )}
            </div>
            <h2 className="mb-1 text-center text-xl text-gray-900">
              {sent.emailFailed ? 'Link ready — email not sent' : 'Sent!'}
            </h2>
            <p className="mb-5 text-center text-sm text-gray-600">
              {sent.emailFailed
                ? 'Copy the link below and send it to your client yourself.'
                : `${clientName} will receive one email with ${selected.length === 1 ? 'the document' : `all ${selected.length} documents`} to sign.`}
            </p>
            <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 p-2">
              <input
                readOnly
                value={sent.url}
                className="min-w-0 flex-1 truncate bg-transparent px-1 text-sm text-gray-600 outline-none"
              />
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(sent.url);
                  setCopied(true);
                }}
                className="inline-flex flex-shrink-0 items-center gap-1 px-2 py-1 text-sm text-gray-700 hover:bg-gray-200"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-5 w-full bg-gray-900 px-4 py-3 text-sm text-white hover:bg-black"
            >
              Send another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
