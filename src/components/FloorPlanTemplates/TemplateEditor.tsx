'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, BookmarkPlus, Check, Loader2 } from 'lucide-react';
import { FloorPlanEditor } from '@/components/FloorPlanEditor';
import type { FloorKey, FloorPlanData } from '@/types/floorplan.types';
import type { FloorPlanTemplate } from '@/lib/floor-plan-templates';

const API = '/api/admin/floor-plan-templates';

const blankPlan = (): FloorPlanData => ({
  id: crypto.randomUUID(),
  name: 'Untitled Floor Plan',
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  walls: [],
  rooms: [],
  furniture: [],
  eventDetails: { eventType: '', guestCount: 0, services: [] },
  canvasSettings: {
    width: 3200,
    height: 2400,
    scale: 20,
    gridSize: 20,
    showGrid: true,
    showDimensions: false,
    snapToGrid: true,
    backgroundColor: '#FFFFFF',
  },
  isLocked: false,
});

/** The floor plan editor, opened on a library template (or blank). */
export default function TemplateEditor() {
  const templateId = useSearchParams().get('template');

  const [template, setTemplate] = useState<FloorPlanTemplate | null>(null);
  const [blank] = useState(blankPlan);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pending, setPending] = useState<{
    plan: FloorPlanData;
    floor: FloorKey;
  } | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedName, setSavedName] = useState<string | null>(null);

  // Keyed on the URL only: after a save, `template` already holds the new copy.
  useEffect(() => {
    if (!templateId || template?.id === templateId) return;
    fetch(`${API}/${encodeURIComponent(templateId)}`)
      .then((r) => r.json())
      .then((body) => {
        if (!body.success) throw new Error(body.error);
        setTemplate(body.template);
      })
      .catch((e) => setLoadError(e.message || 'Could not load the template.'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  const canUpdate = !!template && !template.builtIn;

  const save = async (asNew: boolean) => {
    if (!pending) return;
    setSaving(true);
    setSaveError(null);
    const response = await fetch(
      asNew ? API : `${API}/${encodeURIComponent(template!.id)}`,
      {
        method: asNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          floor: pending.floor,
          plan: pending.plan,
        }),
      }
    ).catch(() => null);
    const body = await response?.json().catch(() => ({}));
    setSaving(false);
    if (!response?.ok || !body?.success) {
      setSaveError(
        body?.error || 'Could not save. Check your connection and try again.'
      );
      return;
    }
    // Keep editing the saved copy; the editor keeps its state (no remount).
    setTemplate(body.template);
    setPending(null);
    setSavedName(body.template.name);
    setTimeout(() => setSavedName(null), 4000);
    // Not router.replace: that re-renders the page from the server and
    // remounts the editor, wiping undo history.
    window.history.replaceState(
      null,
      '',
      `/admin/floor-plans/editor?template=${body.template.id}`
    );
  };

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f6f4ef] px-4 pt-22">
        <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {loadError}
        </p>
        <Link
          href="/admin/floor-plans"
          className="text-primary text-sm underline"
        >
          Back to templates
        </Link>
      </div>
    );
  }

  if (templateId && !template) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 bg-[#f6f4ef] pt-22 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" /> Opening template…
      </div>
    );
  }

  return (
    <>
      <FloorPlanEditor
        initialPlan={template?.plan ?? blank}
        initialFloor={template?.floor}
        renderOverlay={(plan, floor) => (
          <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-stretch shadow-lg">
            <Link
              href="/admin/floor-plans"
              className="inline-flex items-center gap-2 bg-[#0a0a0a] px-4 py-2.5 text-xs tracking-widest whitespace-nowrap text-white uppercase hover:bg-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Templates
              {template && (
                <span className="max-w-48 truncate text-[#d2b371] normal-case">
                  · {template.name}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => {
                setName(template && !template.builtIn ? template.name : '');
                setSaveError(null);
                setPending({ plan, floor });
              }}
              className="bg-primary inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest whitespace-nowrap text-white uppercase hover:opacity-90"
            >
              <BookmarkPlus className="h-4 w-4" />
              Save to library
            </button>
          </div>
        )}
      />

      {savedName && (
        <div
          role="status"
          className="fixed right-5 bottom-5 z-[110] inline-flex items-center gap-2 bg-emerald-600 px-4 py-3 text-sm text-white shadow-lg"
        >
          <Check className="h-4 w-4" /> Saved “{savedName}” to the library
        </div>
      )}

      {pending && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => !saving && setPending(null)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="save-template-title"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              save(!canUpdate);
            }}
            className="w-full max-w-md bg-white p-6 shadow-2xl"
          >
            <p className="text-xs tracking-[0.25em] text-[#a88a4a] uppercase">
              Template library
            </p>
            <h3 id="save-template-title" className="mt-1 text-xl text-gray-900">
              {canUpdate ? 'Save changes' : 'Save as template'}
            </h3>
            <label
              htmlFor="template-name"
              className="mt-5 mb-1.5 block text-xs font-medium tracking-widest text-gray-600 uppercase"
            >
              Template name
            </label>
            <input
              id="template-name"
              autoFocus
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gala dinner – 200 guests"
              className="focus:border-primary focus:ring-primary/30 w-full border border-gray-300 px-3 py-3 text-base text-gray-900 focus:ring-2 focus:outline-none"
            />
            {template?.builtIn && (
              <p className="mt-2 text-xs text-gray-500">
                “{template.name}” is a starter template, so this saves a new
                copy.
              </p>
            )}
            {saveError && (
              <p
                role="alert"
                className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {saveError}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setPending(null)}
                disabled={saving}
                className="border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {canUpdate && (
                <button
                  type="button"
                  onClick={() => save(true)}
                  disabled={saving || !name.trim()}
                  className="border-primary text-primary border px-4 py-2.5 text-sm hover:bg-[#faf6ec] disabled:opacity-50"
                >
                  Save as new
                </button>
              )}
              <button
                type="submit"
                disabled={saving || !name.trim()}
                className="bg-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {canUpdate ? `Update “${template!.name}”` : 'Save template'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
