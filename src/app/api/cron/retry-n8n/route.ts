import { NextRequest, NextResponse } from 'next/server';
import { retryQueued } from '@/lib/n8n-queue';

/**
 * Vercel Cron (see vercel.json): re-sends form submissions that were queued
 * while n8n was down. Vercel calls this with `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await retryQueued();
  if (result.sent || result.remaining) console.log('n8n retry queue:', result);
  return NextResponse.json(result);
}
