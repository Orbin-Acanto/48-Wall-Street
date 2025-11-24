import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const driveUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  const res = await fetch(driveUrl, {
    redirect: 'follow',
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Drive fetch failed (${res.status})` },
      { status: 502 }
    );
  }

  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const buf = await res.arrayBuffer();

  return new NextResponse(buf, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
