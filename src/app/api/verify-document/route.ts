import { NextRequest, NextResponse } from 'next/server';
import { findSealedDocument } from '@/lib/documents/packets';

export const dynamic = 'force-dynamic';

/**
 * Is this SHA-256 one of our executed documents? The browser hashes the file
 * locally, so the PDF itself never leaves the visitor's device. A 256-bit hash
 * cannot be guessed, so answering openly reveals nothing to strangers.
 */
export async function GET(request: NextRequest) {
  const sha256 =
    request.nextUrl.searchParams.get('sha256')?.toLowerCase() ?? '';
  if (!/^[0-9a-f]{64}$/.test(sha256)) {
    return NextResponse.json({ error: 'Invalid fingerprint' }, { status: 400 });
  }

  const record = await findSealedDocument(sha256);
  return NextResponse.json(
    record ? { found: true, ...record } : { found: false },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
