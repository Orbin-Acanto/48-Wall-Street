'use client';

import { useEffect, useState } from 'react';
import {
  eventPacketAckCheckbox,
  eventPacketAckText,
  eventPacketAckTitle,
} from '@/lib/event-packet-ack-content';

/**
 * Event Packet acknowledgment, hosted in a signing packet. Signer name,
 * signature and date come from the packet's adopted signature at signing.
 */
export default function EventPacketAckForm({
  clientName,
  eventDate,
  packetUrl,
  packetVersion,
  documents,
  showErrors,
  onChange,
}: {
  clientName: string;
  eventDate?: string;
  packetUrl: string;
  packetVersion: string;
  /** The other documents in this packet, listed as part of the Event Packet. */
  documents: string[];
  showErrors: boolean;
  onChange: (formData: Record<string, unknown>, missing: string[]) => void;
}) {
  const [legalEntity, setLegalEntity] = useState(clientName);
  const [date, setDate] = useState(eventDate ?? '');
  const [signerTitle, setSignerTitle] = useState('');
  const [agreed, setAgreed] = useState(false);

  const missing = [
    !legalEntity.trim() && 'Enter the client / legal entity',
    !date && 'Enter the event date',
    !signerTitle.trim() && 'Enter your title / capacity',
    !agreed && 'Tick the acknowledgment box',
  ].filter((m): m is string => !!m);

  useEffect(() => {
    onChange(
      {
        legalEntity,
        eventDate: date,
        signerTitle,
        agreed,
        packetUrl,
        packetVersion,
      },
      missing
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [legalEntity, date, signerTitle, agreed]);

  const field = (bad: boolean) =>
    `focus:border-primary focus:ring-primary/30 w-full border px-3 py-2.5 text-base text-gray-900 focus:ring-2 focus:outline-none ${
      showErrors && bad ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  return (
    <div className="space-y-5 border border-gray-200 bg-white p-5 md:p-8">
      <h3 className="text-lg text-gray-900 md:text-xl">
        {eventPacketAckTitle}
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 md:text-[15px]">
        {eventPacketAckText}
      </p>

      <div className="bg-[#faf7f0] p-4 text-sm text-gray-700">
        <p className="mb-2 font-semibold text-gray-900">The Event Packet</p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <a
              href={packetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              48 Wall Street Event Packet
            </a>
          </li>
          {documents.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>

      <label
        className={`flex cursor-pointer items-start gap-3 p-3 text-sm font-semibold text-gray-900 ${
          showErrors && !agreed
            ? 'border border-red-300 bg-red-50'
            : 'border border-gray-200'
        }`}
      >
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="accent-primary mt-0.5 h-5 w-5 flex-shrink-0"
        />
        <span>{eventPacketAckCheckbox}</span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ack-entity"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Client / Legal Entity
          </label>
          <input
            id="ack-entity"
            value={legalEntity}
            onChange={(e) => setLegalEntity(e.target.value)}
            className={field(!legalEntity.trim())}
          />
        </div>
        <div>
          <label
            htmlFor="ack-date"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Event Date
          </label>
          <input
            id="ack-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={field(!date)}
          />
        </div>
        <div>
          <label
            htmlFor="ack-title"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Title / Capacity
          </label>
          <input
            id="ack-title"
            value={signerTitle}
            onChange={(e) => setSignerTitle(e.target.value)}
            placeholder="e.g. Event Director, Owner"
            className={field(!signerTitle.trim())}
          />
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-medium text-gray-700">
            Event Packet Version / Date
          </span>
          <p className="border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
            {packetVersion}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Your full name, electronic signature and the date are added when you
        sign below.
      </p>
    </div>
  );
}
