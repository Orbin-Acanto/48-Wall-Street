'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Eye, Loader2, Plus, Search, Trash2, X } from 'lucide-react';
import { FLOOR_UNDERLAYS } from '@/components/FloorPlanEditor';
import { StaffHeader } from './StaffHeader';
import { TemplatePreview } from './TemplatePreview';
import type { FloorPlanTemplate } from '@/lib/floor-plan-templates';

const editorUrl = (id?: string) =>
  id
    ? `/admin/floor-plans/editor?template=${encodeURIComponent(id)}`
    : '/admin/floor-plans/editor';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

/** "20 × 60" Round Tables", most common first. */
function summary(template: FloorPlanTemplate) {
  const counts = new Map<string, number>();
  for (const f of template.plan.furniture) {
    // groupBy ids like "Staging-3" are internal; show the item name instead.
    const key = f.groupBy && !/-\d+$/.test(f.groupBy) ? f.groupBy : f.name;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1]);
}

export default function FloorPlanLibrary({ staffName }: { staffName: string }) {
  const [templates, setTemplates] = useState<FloorPlanTemplate[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [previewing, setPreviewing] = useState<FloorPlanTemplate | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/floor-plan-templates')
      .then((r) => r.json())
      .then((body) => {
        if (!body.success) throw new Error(body.error);
        setTemplates(body.templates);
      })
      .catch((e) => setError(e.message || 'Could not load templates.'));
  }, []);

  useEffect(() => {
    if (!previewing) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setPreviewing(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewing]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (templates ?? []).filter(
      (t) =>
        !q ||
        t.name.toLowerCase().includes(q) ||
        FLOOR_UNDERLAYS[t.floor]?.label.toLowerCase().includes(q) ||
        t.updatedBy.toLowerCase().includes(q)
    );
  }, [templates, query]);

  const remove = async (template: FloorPlanTemplate) => {
    if (
      !confirm(`Delete the template "${template.name}"? This cannot be undone.`)
    )
      return;
    setDeleting(template.id);
    const response = await fetch(
      `/api/admin/floor-plan-templates/${encodeURIComponent(template.id)}`,
      { method: 'DELETE' }
    );
    const body = await response.json().catch(() => ({}));
    setDeleting(null);
    if (!response.ok) {
      alert(body.error || 'Could not delete the template.');
      return;
    }
    setTemplates((all) => all?.filter((t) => t.id !== template.id) ?? null);
    setPreviewing(null);
  };

  return (
    <div className="min-h-screen bg-[#f6f4ef] pt-22 pb-20">
      <StaffHeader
        title="Floor Plan Templates"
        staffName={staffName}
        active="/admin/floor-plans"
      />

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl text-gray-900">Template library</h2>
            <p className="mt-1 text-sm text-gray-600">
              Start from a saved layout, or design a new one and save it here
              for the team.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <label className="relative flex-1 sm:w-64 sm:flex-none">
              <span className="sr-only">Search templates</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, floor or author"
                className="focus:border-primary focus:ring-primary/30 w-full border border-gray-300 bg-white py-2.5 pr-3 pl-9 text-sm focus:ring-2 focus:outline-none"
              />
            </label>
            <Link
              href={editorUrl()}
              className="bg-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium tracking-wider text-white uppercase hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> New design
            </Link>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {!templates && !error && (
          <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading templates…
          </div>
        )}

        {templates && shown.length === 0 && (
          <p className="border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
            No templates match “{query}”.
          </p>
        )}

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t) => (
            <li
              key={t.id}
              className="group flex flex-col border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => setPreviewing(t)}
                className="relative block aspect-[4/3] overflow-hidden border-b border-gray-100 bg-white"
                aria-label={`Preview ${t.name}`}
              >
                <TemplatePreview
                  plan={t.plan}
                  floor={t.floor}
                  className="pointer-events-none h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs font-medium tracking-wider text-gray-900 uppercase">
                    <Eye className="h-4 w-4" /> Preview
                  </span>
                </span>
                {t.builtIn && (
                  <span className="absolute top-3 left-3 bg-[#0a0a0a] px-2 py-1 text-[10px] tracking-[0.2em] text-[#d2b371] uppercase">
                    Starter
                  </span>
                )}
              </button>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg leading-tight text-gray-900">
                  {t.name}
                </h3>
                <p className="mt-1 text-xs tracking-widest text-[#a88a4a] uppercase">
                  {FLOOR_UNDERLAYS[t.floor]?.label ?? t.floor}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                  {t.plan.furniture.length === 0
                    ? 'Blank floor'
                    : summary(t)
                        .slice(0, 3)
                        .map(([name, n]) => `${n} × ${name}`)
                        .join(' · ')}
                </p>
                <p className="mt-auto pt-4 text-xs text-gray-500">
                  {t.builtIn
                    ? 'Starter template'
                    : `${t.updatedBy} · ${formatDate(t.updatedAt)}`}
                </p>
                <div className="mt-3 flex items-center justify-end gap-2">
                  {!t.builtIn && (
                    <button
                      type="button"
                      onClick={() => remove(t)}
                      disabled={deleting === t.id}
                      aria-label={`Delete ${t.name}`}
                      className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-1.5 text-xs font-medium tracking-wider text-red-600 uppercase hover:border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
                    >
                      {deleting === t.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </button>
                  )}
                  <Link
                    href={editorUrl(t.id)}
                    className="border-primary text-primary hover:bg-primary border px-3 py-1.5 text-xs font-medium tracking-wider uppercase hover:text-white"
                  >
                    Use template
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {previewing && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreviewing(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${previewing.name} preview`}
            className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs tracking-widest text-[#a88a4a] uppercase">
                  {FLOOR_UNDERLAYS[previewing.floor]?.label ?? previewing.floor}
                </p>
                <h3 className="text-xl text-gray-900">{previewing.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewing(null)}
                className="p-2 text-gray-500 hover:text-gray-900"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid min-h-0 flex-1 overflow-auto md:grid-cols-[1fr_240px]">
              <TemplatePreview
                plan={previewing.plan}
                floor={previewing.floor}
                className="pointer-events-none h-full max-h-[70vh] w-full"
              />
              <aside className="border-t border-gray-200 bg-[#faf9f6] p-5 md:border-t-0 md:border-l">
                <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                  In this layout
                </p>
                {previewing.plan.furniture.length === 0 ? (
                  <p className="mt-3 text-sm text-gray-600">Blank floor.</p>
                ) : (
                  <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                    {summary(previewing).map(([name, n]) => (
                      <li key={name} className="flex justify-between gap-3">
                        <span>{name}</span>
                        <span className="font-medium text-gray-900">{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-5 text-xs text-gray-500">
                  {previewing.builtIn
                    ? 'Starter template'
                    : `Saved by ${previewing.updatedBy}, ${formatDate(previewing.updatedAt)}`}
                </p>
                <Link
                  href={editorUrl(previewing.id)}
                  className="bg-primary mt-5 block px-4 py-3 text-center text-sm font-medium tracking-widest text-white uppercase hover:opacity-90"
                >
                  Use template
                </Link>
                {!previewing.builtIn && (
                  <button
                    type="button"
                    onClick={() => remove(previewing)}
                    disabled={deleting === previewing.id}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-red-200 px-4 py-2.5 text-xs font-medium tracking-widest text-red-600 uppercase hover:border-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete template
                  </button>
                )}
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
