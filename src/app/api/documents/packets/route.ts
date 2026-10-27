import { NextResponse } from 'next/server';
import { listPackets } from '@/lib/documents/packets';
import { releaseHeldInvitations } from '@/lib/documents/held';

export const dynamic = 'force-dynamic';

/** Recent packets for the staff dashboard. Staff-only via middleware. */
export async function GET() {
  // Opening the Document Center sends any invitations no longer on hold.
  await releaseHeldInvitations().catch((error) =>
    console.error('releasing held invitations failed:', error)
  );
  return NextResponse.json({ packets: await listPackets() });
}
