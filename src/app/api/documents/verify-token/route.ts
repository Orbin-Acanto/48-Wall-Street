import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getTokenState } from '@/lib/documents/signing-tokens';

export async function POST(request: Request) {
  const { payload, signature } = await request.json();

  if (!payload || !signature) {
    return NextResponse.json(
      { error: 'Invalid signing link' },
      { status: 400 }
    );
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.SIGNING_SECRET!)
    .update(payload)
    .digest('hex');

  const provided = Buffer.from(String(signature));
  const expected = Buffer.from(expectedSignature);
  const signatureValid =
    provided.length === expected.length &&
    crypto.timingSafeEqual(provided, expected);

  if (!signatureValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const data = JSON.parse(Buffer.from(payload, 'base64').toString());

  // The token carries its own deadline; enforce it rather than trusting the UI.
  if (data.exp) {
    const expiresAt = new Date(data.exp);
    if (!Number.isNaN(expiresAt.getTime())) {
      // Treat a date-only deadline as end-of-day so the link stays usable
      // through the whole final day.
      if (/^\d{4}-\d{2}-\d{2}$/.test(String(data.exp))) {
        expiresAt.setHours(23, 59, 59, 999);
      }
      if (expiresAt.getTime() < Date.now()) {
        return NextResponse.json(
          { error: 'expired', message: 'This signing link has expired.' },
          { status: 410 }
        );
      }
    }
  }

  // Refuse links that have already been signed.
  const token = `${payload}.${signature}`;
  if ((await getTokenState(token)) === 'consumed') {
    return NextResponse.json(
      {
        error: 'already_signed',
        message: 'This document has already been signed and submitted.',
      },
      { status: 409 }
    );
  }

  return NextResponse.json({ data });
}
