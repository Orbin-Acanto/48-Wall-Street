import { NextRequest, NextResponse } from 'next/server';
import {
  checkTemplateInput,
  listTemplates,
  saveTemplate,
} from '@/lib/floor-plan-templates';

// Staff-only: middleware gates this path and sets x-staff-name.
const staffName = (request: NextRequest) =>
  decodeURIComponent(request.headers.get('x-staff-name') ?? '') ||
  'Events Team';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      templates: await listTemplates(),
    });
  } catch (error) {
    console.error('list floor plan templates failed:', error);
    return NextResponse.json(
      { success: false, error: 'Could not load templates.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const input = checkTemplateInput(await request.json().catch(() => null));
  if ('error' in input) {
    return NextResponse.json(
      { success: false, error: input.error },
      { status: 400 }
    );
  }
  try {
    const template = await saveTemplate(input, staffName(request));
    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error('save floor plan template failed:', error);
    return NextResponse.json(
      { success: false, error: 'Could not save the template.' },
      { status: 500 }
    );
  }
}
