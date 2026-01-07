import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const data = await request.json();

  const payload = Buffer.from(JSON.stringify(data)).toString('base64');
  const signature = crypto
    .createHmac('sha256', process.env.SIGNING_SECRET!)
    .update(payload)
    .digest('hex');

  const token = `${payload}.${signature}`;

  return NextResponse.json({ token });
}
