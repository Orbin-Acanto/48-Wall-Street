import { NextResponse } from 'next/server';
import { verifySigningToken } from '@/lib/documents/signing-tokens';

export async function POST(request: Request) {
  const { payload, signature } = await request.json();

  if (!payload || !signature) {
    return NextResponse.json(
      { error: 'Invalid signing link' },
      { status: 400 }
    );
  }

  const result = await verifySigningToken(`${payload}.${signature}`);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json({ data: result.data });
}
