import { clientGuidelinesContent } from '@/lib/client-guidelines-content';
import { rulesRegulationsContent } from '@/lib/rules-regulations-content';

/**
 * The documents staff can bundle into one signing request. Shared by the admin
 * page, the invitation email, the client signing page and the submit API.
 *
 * `review` documents are read-only text; `form` documents need the client to
 * fill in details. Either way the client signs once, at the end.
 */

export type PacketDocumentType =
  | 'client_guidelines'
  | 'rules_regulations'
  | 'av_production'
  | 'credit_card_auth';

export interface PacketDocument {
  type: PacketDocumentType;
  label: string;
  description: string;
  kind: 'review' | 'form';
  minutes: number;
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
];

export function packetDocument(type: string): PacketDocument | undefined {
  return PACKET_DOCUMENTS.find((doc) => doc.type === type);
}

/** Keep only known types, de-duplicated, in catalog order. */
export function normalizePacketTypes(types: unknown): PacketDocumentType[] {
  const wanted = new Set(Array.isArray(types) ? types.map(String) : []);
  return PACKET_DOCUMENTS.filter((doc) => wanted.has(doc.type)).map(
    (doc) => doc.type
  );
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
