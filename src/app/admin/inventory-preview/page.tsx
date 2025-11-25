import React from 'react';
import { AV_EQUIPMENT_LIBRARY } from '@/constants/avEquipment';
import { CATERING_LIBRARY } from '@/constants/cateringStations';
import { DECOR_LIBRARY } from '@/constants/decorLibrary';
import { FURNITURE_LIBRARY } from '@/constants/furnitureLibrary';

type DraggableLibraryItem = {
  id: string;
  type: string;
  category?: string;
  name: string;
  defaultDimensions: { width: number; height: number; unit: string };
  svgPath: string;
  groupBy?: string;
};

type Section = {
  title: string;
  items: DraggableLibraryItem[];
};

const SECTIONS: Section[] = [
  {
    title: 'Furniture Library',
    items: FURNITURE_LIBRARY as DraggableLibraryItem[],
  },
  { title: 'Decor Library', items: DECOR_LIBRARY as DraggableLibraryItem[] },
  {
    title: 'Catering Library',
    items: CATERING_LIBRARY as DraggableLibraryItem[],
  },
  {
    title: 'AV Equipment Library',
    items: AV_EQUIPMENT_LIBRARY as DraggableLibraryItem[],
  },
];

function groupByTypeAndCategory(items: DraggableLibraryItem[]) {
  const groups = new Map<string, DraggableLibraryItem[]>();

  for (const item of items) {
    const type = item.type || 'Unknown Type';
    const category = item.category || 'Uncategorized';
    const key = `${type} | ${category}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  for (const [key, arr] of groups.entries()) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    groups.set(key, arr);
  }

  return groups;
}

function buildSvgPreview(item: DraggableLibraryItem): string {
  const { width, height } = item.defaultDimensions;

  const SCALE = 2;
  const pxWidth = Math.max(80, width * SCALE);
  const pxHeight = Math.max(50, height * SCALE);

  const viewBox = `${-width / 2} ${-height / 2} ${width} ${height}`;

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${pxWidth}"
      height="${pxHeight}"
      viewBox="${viewBox}"
    >
      ${item.svgPath}
    </svg>
  `;
}

export default function InventoryPreviewPage() {
  return (
    <div className="min-h-screen bg-neutral-100 p-6 print:p-4">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between border-b border-neutral-300 pb-3 print:mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Event Planner Inventory
          </h1>
          <p className="text-sm text-neutral-600">
            Furniture, decor, catering & AV — grouped by type and category.
          </p>
        </div>
        <div className="hidden text-xs text-neutral-500 print:block">
          Generated from system data
        </div>
      </header>

      <main className="space-y-8">
        {SECTIONS.map((section) => {
          const groups = groupByTypeAndCategory(section.items);

          return (
            <section
              key={section.title}
              className="page-break-after-always break-inside-avoid-page"
            >
              <h2 className="mb-3 text-xl font-semibold text-neutral-900">
                {section.title}
              </h2>

              {[...groups.entries()].map(([groupKey, items]) => (
                <div
                  key={groupKey}
                  className="mb-4 rounded-lg border border-neutral-300 bg-white p-3"
                >
                  <h3 className="mb-2 text-sm font-semibold text-neutral-800">
                    {groupKey}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                      const svg = buildSvgPreview(item);
                      const { width, height, unit } = item.defaultDimensions;

                      return (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between rounded-md border border-neutral-200 bg-neutral-50 p-2"
                        >
                          <div className="mb-2 text-xs">
                            <div className="font-semibold text-neutral-900">
                              {item.name}
                            </div>
                            <div className="text-neutral-500">
                              ID: {item.id}
                            </div>
                            <div className="text-neutral-700">
                              Dimensions: {width}
                              {unit} × {height}
                              {unit}
                            </div>
                            {item.groupBy && (
                              <div className="text-neutral-600">
                                Group: {item.groupBy}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 items-center justify-center rounded border border-dashed border-neutral-300 bg-white p-2">
                            <div
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{ __html: svg }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </main>
    </div>
  );
}
