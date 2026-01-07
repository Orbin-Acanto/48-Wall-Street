import { v4 as uuidv4 } from 'uuid';

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

export type DocumentType = 'floor_plan' | 'client_guidelines';

export function generateDocumentId(type: DocumentType): string {
  const prefixes: Record<DocumentType, string> = {
    floor_plan: 'FP',
    client_guidelines: 'CG',
  };

  const prefix = prefixes[type];
  const timestamp = Date.now().toString(36).toUpperCase();
  const uniqueId = uuidv4().split('-')[0].toUpperCase();

  return `${prefix}-${timestamp}-${uniqueId}`;
}

export function formatExpirationDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateSigningUrl(
  baseUrl: string,
  documentId: string,
  documentType: DocumentType,
  request: DocumentRequest
): string {
  const params = new URLSearchParams({
    doc: documentId,
    type: documentType,
    name: request.clientFullName,
    email: request.clientEmail,
    exp: request.expirationDate,
  });

  const token = Buffer.from(
    JSON.stringify({
      docId: documentId,
      email: request.clientEmail,
      exp: request.expirationDate,
      iat: Date.now(),
    })
  ).toString('base64url');

  params.append('token', token);

  return `${baseUrl}/sign/${documentType}?${params.toString()}`;
}

export function validateDocumentRequest(
  request: DocumentRequest
): string | null {
  if (!request.clientEmail || !isValidEmail(request.clientEmail)) {
    return 'Invalid email address';
  }

  if (!request.clientFullName || request.clientFullName.trim().length < 2) {
    return 'Client name is required';
  }

  if (!request.expirationDate) {
    return 'Expiration date is required';
  }

  const expDate = new Date(request.expirationDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (expDate <= today) {
    return 'Expiration date must be in the future';
  }

  return null;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function createDocumentRequest(
  documentType: DocumentType,
  request: DocumentRequest,
  baseUrl: string
): Promise<DocumentResponse> {
  const validationError = validateDocumentRequest(request);
  if (validationError) {
    throw new Error(validationError);
  }

  const documentId = generateDocumentId(documentType);

  const signingUrl = generateSigningUrl(
    baseUrl,
    documentId,
    documentType,
    request
  );

  const expiresAt = formatExpirationDate(request.expirationDate);

  return {
    success: true,
    signingUrl,
    documentId,
    expiresAt,
  };
}

export const documentConfigs: Record<
  DocumentType,
  {
    name: string;
    pdfTemplate: string;
    requiresInitials: number;
    requiresSignature: boolean;
    requiredFields: string[];
  }
> = {
  floor_plan: {
    name: 'Floor Plan',
    pdfTemplate: '/templates/floor-plan.pdf',
    requiresInitials: 2,
    requiresSignature: true,
    requiredFields: ['date', 'fullName', 'signature'],
  },
  client_guidelines: {
    name: 'Client Guidelines & Authorization Agreement',
    pdfTemplate: '/templates/client-guidelines.pdf',
    requiresInitials: 3,
    requiresSignature: true,
    requiredFields: ['date', 'fullName', 'signature'],
  },
};
