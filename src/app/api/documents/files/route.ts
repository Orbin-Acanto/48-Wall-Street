import { NextRequest, NextResponse } from 'next/server';
import { AwsClient } from 'aws4fetch';
import { n8nAuthHeader } from '@/lib/documents/delivery';

export const dynamic = 'force-dynamic';

// Where n8n's DocuSign workflow uploads signed PDFs (Railway "Minio Storage").
// The bucket is private; we read it with a get-only key. The fileURL stored in
// the n8n table points at an old host, so only the file name is trusted.
const BUCKET = 'https://bucket-apde-production.up.railway.app/documents-signed';

function bucketClient(): AwsClient | null {
  const accessKeyId = process.env.SIGNED_DOCS_ACCESS_KEY;
  const secretAccessKey = process.env.SIGNED_DOCS_SECRET_KEY;
  if (!accessKeyId || !secretAccessKey) return null;
  return new AwsClient({
    accessKeyId,
    secretAccessKey,
    service: 's3',
    region: 'us-east-1',
  });
}

export interface SignedDocumentRow {
  id: string;
  clientName: string;
  clientEmail: string;
  documentType: string;
  docId: string;
  sentTime: string;
  signTime: string;
  signedAt: string;
  /** Null when there is no stored PDF (unsigned, or a card form: emailed only). */
  fileName: string | null;
}

type N8nRow = Record<string, string | number | null | undefined>;

const text = (value: N8nRow[string]) => (value == null ? '' : String(value));

function toRow(row: N8nRow): SignedDocumentRow {
  const documentType = text(row.documentType);
  const fileName = text(row.fileURL).split('/').pop() || null;
  return {
    id: text(row.id),
    clientName: text(row.clientName),
    clientEmail: text(row.clientEmail),
    documentType,
    docId: text(row.docID),
    sentTime: text(row.sentTime),
    signTime: text(row.signTime),
    signedAt: text(row.updatedAt),
    // Card authorizations are deliberately never uploaded.
    fileName: documentType === 'credit_card_auth' ? null : fileName,
  };
}

/**
 * Staff-only (middleware). Without `file`: every row of the n8n "Document Sign
 * In Table". With `file`: streams that signed PDF from the bucket.
 */
export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');

  if (file !== null) {
    if (!/^[\w.-]+\.pdf$/.test(file)) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }
    const bucket = bucketClient();
    if (!bucket) {
      return NextResponse.json(
        { error: 'SIGNED_DOCS_ACCESS_KEY is not configured' },
        { status: 503 }
      );
    }
    const response = await bucket.fetch(`${BUCKET}/${file}`, {
      cache: 'no-store',
    });
    if (!response.ok || !response.body) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return new Response(response.body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${file}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  }

  const url = process.env.N8N_DOCUSIGN_LIST_API;
  if (!url) {
    return NextResponse.json(
      { error: 'N8N_DOCUSIGN_LIST_API is not configured' },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(url, {
      headers: { Authorization: n8nAuthHeader() },
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`n8n responded ${response.status}`);
    const data: N8nRow[] | N8nRow = await response.json();
    const documents = (Array.isArray(data) ? data : [data])
      .filter((row) => row.documentType)
      .map(toRow)
      .sort((a, b) => Date.parse(b.signedAt) - Date.parse(a.signedAt));
    return NextResponse.json({ documents });
  } catch (error) {
    console.error('signed document list failed:', error);
    return NextResponse.json(
      { error: 'Could not load documents' },
      { status: 502 }
    );
  }
}
