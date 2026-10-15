import { NextResponse } from 'next/server';
import { listPackets } from '@/lib/documents/packets';

export const dynamic = 'force-dynamic';

/** Recent packets for the staff dashboard. Staff-only via middleware. */
export async function GET() {
  return NextResponse.json({ packets: await listPackets() });
}
