import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const { payload, signature } = await request.json();

  const expectedSignature = crypto
    .createHmac('sha256', process.env.SIGNING_SECRET!)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const data = JSON.parse(Buffer.from(payload, 'base64').toString());
  return NextResponse.json({ data });
}
