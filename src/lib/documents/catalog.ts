import { clientGuidelinesContent } from '@/lib/client-guidelines-content';
import { rulesRegulationsContent } from '@/lib/rules-regulations-content';

/**
 * The documents staff can bundle into one signing request. Shared by the admin
 * page, the invitation email, the client signing page and the submit API.
 *
 * `review` documents are read-only text; `form` documents need the client to
 * fill in details. Either way the client signs each one as they go.
 */

export type PacketDocumentType =
  | 'client_guidelines'
  | 'rules_regulations'
  | 'av_production'
  | 'credit_card_auth'
  | 'event_packet_ack';

export interface PacketDocument {
  type: PacketDocumentType;
  label: string;
  description: string;
  kind: 'review' | 'form';
  minutes: number;
  /** Added to every packet; not offered as a choice to staff. */
  always?: boolean;
}

export const PACKET_DOCUMENTS: PacketDocument[] = [
  {
    type: 'client_guidelines',
    label: 'Client Guidelines & Authorization Agreement',
    description: 'Venue policies, planning requirements and authorization.',
    kind: 'review',
    minutes: 6,
  },
  {
    type: 'rules_regulations',
    label: 'Rules & Regulations',
    description: 'House rules that protect our landmark building.',
    kind: 'review',
    minutes: 4,
  },
  {
    type: 'av_production',
    label: 'AV & Production Form',
    description: 'Your audio, visual, lighting and staging needs.',
    kind: 'form',
    minutes: 8,
  },
  {
    type: 'credit_card_auth',
    label: 'Credit Card Authorization',
    description: 'Card on file for event charges, completed securely.',
    kind: 'form',
    minutes: 3,
  },
  {
    type: 'event_packet_ack',
    label: 'Event Packet Acknowledgment',
    description: 'Acceptance of the Event Packet and authority to sign.',
    kind: 'form',
    minutes: 2,
    always: true,
  },
];

/** The documents staff choose from; `always` ones are added automatically. */
export const SELECTABLE_DOCUMENTS = PACKET_DOCUMENTS.filter((d) => !d.always);

export function packetDocument(type: string): PacketDocument | undefined {
  return PACKET_DOCUMENTS.find((doc) => doc.type === type);
}

/**
 * Keep only known types, de-duplicated, in catalog order, plus the documents
 * every packet carries. An empty selection stays empty.
 */
export function normalizePacketTypes(types: unknown): PacketDocumentType[] {
  const wanted = new Set(Array.isArray(types) ? types.map(String) : []);
  const chosen = PACKET_DOCUMENTS.filter(
    (doc) => !doc.always && wanted.has(doc.type)
  );
  if (!chosen.length) return [];
  return PACKET_DOCUMENTS.filter(
    (doc) => doc.always || chosen.includes(doc)
  ).map((doc) => doc.type);
}

/** Every place a document asks for initials — where adopted initials land. */
export function initialPlacements(type: string): string[] {
  switch (type) {
    case 'client_guidelines':
      return clientGuidelinesContent
        .filter((s) => s.requiresInitials)
        .map((s) => s.id);
    case 'rules_regulations':
      return rulesRegulationsContent
        .filter((s) => s.requiresInitials)
        .map((s) => s.id);
    case 'av_production':
      return ['page1', 'page2', 'page3', 'page4', 'page5'];
    default:
      return [];
  }
}

/** "Jane van der Berg" → "JB". */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.trim().substring(0, 2).toUpperCase();
}
