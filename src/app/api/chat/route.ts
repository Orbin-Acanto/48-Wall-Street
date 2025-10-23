import { NextRequest } from 'next/server';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL!;
    const username = process.env.N8N_USERNAME!;
    const password = process.env.N8N_PASSWORD!;
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body,
    });

    const contentType = res.headers.get('content-type') || '';

    if (
      contentType.includes('text/event-stream') ||
      contentType.includes('text/plain')
    ) {
      return new Response(res.body, {
        status: res.status,
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: {
        ...corsHeaders,
        'Content-Type': res.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch (err) {
    console.error('Chat proxy error:', err);
    return new Response(JSON.stringify({ error: 'Proxy error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
