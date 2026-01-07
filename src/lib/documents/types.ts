export type DocumentType =
  | 'venue_contract'
  | 'floor_plan'
  | 'catering_agreement'
  | 'staffing_contract';

export interface DocumentRequest {
  clientEmail: string;
  clientFullName: string;
  expirationDate: string;
  additionalNotes?: string;
}

export interface DocumentResponse {
  success: boolean;
  signingUrl: string;
  documentId: string;
  expiresAt: string;
}

export interface DocumentErrorResponse {
  success: false;
  error: string;
}

export interface SigningParams {
  doc: string;
  type: DocumentType;
  name: string;
  email: string;
  exp: string;
  token: string;
}

export interface InitialField {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  completed: boolean;
  value?: string;
}

export interface SignatureData {
  fullName: string;
  signature: string;
  date: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: number;
}

export interface CompletedDocument {
  documentId: string;
  documentType: DocumentType;
  clientEmail: string;
  clientFullName: string;
  initials: InitialField[];
  signature: SignatureData;
  completedAt: string;
  pdfUrl?: string;
}

export interface DocumentConfig {
  name: string;
  pdfTemplate: string;
  requiresInitials: number;
  requiresSignature: boolean;
  requiredFields: string[];
  initialPositions?: InitialField[];
}

export const API_ENDPOINTS: Record<DocumentType, string> = {
  venue_contract: '/api/documents/venue-contract',
  floor_plan: '/api/documents/floor-plan',
  catering_agreement: '/api/documents/catering-agreement',
  staffing_contract: '/api/documents/staffing-contract',
};

export const DOCUMENT_LABELS: Record<DocumentType, string> = {
  venue_contract: 'Venue Contract',
  floor_plan: 'Floor Plan Approval',
  catering_agreement: 'Catering Agreement',
  staffing_contract: 'Staffing Contract',
};

export const DOCUMENT_ICONS: Record<DocumentType, string> = {
  venue_contract: '🏛️',
  floor_plan: '📐',
  catering_agreement: '🍽️',
  staffing_contract: '👥',
};
