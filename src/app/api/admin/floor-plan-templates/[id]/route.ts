import { NextRequest, NextResponse } from 'next/server';
import {
  checkTemplateInput,
  deleteTemplate,
  getTemplate,
  saveTemplate,
} from '@/lib/floor-plan-templates';

type Context = { params: Promise<{ id: string }> };

const fail = (error: string, status: number) =>
  NextResponse.json({ success: false, error }, { status });

export async function GET(_request: NextRequest, { params }: Context) {
  try {
    const template = await getTemplate((await params).id);
    return template
      ? NextResponse.json({ success: true, template })
      : fail('Template not found.', 404);
  } catch (error) {
    console.error('get floor plan template failed:', error);
    return fail('Could not load the template.', 500);
  }
}

/** Overwrite a saved template. Starter templates are read-only. */
export async function PUT(request: NextRequest, { params }: Context) {
  const input = checkTemplateInput(await request.json().catch(() => null));
  if ('error' in input) return fail(input.error, 400);
  const staff =
    decodeURIComponent(request.headers.get('x-staff-name') ?? '') ||
    'Events Team';
  try {
    const template = await saveTemplate(input, staff, (await params).id);
    return template
      ? NextResponse.json({ success: true, template })
      : fail('Starter templates cannot be changed. Save as a new one.', 409);
  } catch (error) {
    console.error('update floor plan template failed:', error);
    return fail('Could not save the template.', 500);
  }
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  try {
    return (await deleteTemplate((await params).id))
      ? NextResponse.json({ success: true })
      : fail('Template not found, or it is a starter template.', 404);
  } catch (error) {
    console.error('delete floor plan template failed:', error);
    return fail('Could not delete the template.', 500);
  }
}
