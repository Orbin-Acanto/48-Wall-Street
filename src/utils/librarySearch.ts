import { DraggableLibraryItem } from '../types/floorplan.types';

import { FURNITURE_LIBRARY } from '../constants/furnitureLibrary';
import { AV_EQUIPMENT_LIBRARY } from '../constants/avEquipment';
import { CATERING_LIBRARY } from '../constants/cateringStations';
import { DECOR_LIBRARY } from '../constants/decorLibrary';

/**
 * Shared search for the item libraries.
 *
 * The previous per-sidebar search did a single `name.includes(query)` check,
 * which missed items when the query words were out of order, abbreviated, or
 * only matched the category/keywords (e.g. "8 top" for "Round Table 8 Seat",
 * or "projector" for an AV screen). This tokenizes the query and requires every
 * token to appear somewhere in the item's searchable text, so partial and
 * multi-word queries match far more reliably.
 */

const buildHaystack = (item: {
  name: string;
  category: string;
  type?: string;
  keywords?: string[];
}): string =>
  [item.name, item.category, item.type ?? '', ...(item.keywords ?? [])]
    .join(' ')
    .toLowerCase();

/** True when every whitespace-separated token in `query` is found in the item. */
export const matchesQuery = (
  item: {
    name: string;
    category: string;
    type?: string;
    keywords?: string[];
  },
  query: string
): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = buildHaystack(item);
  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((t) => haystack.includes(t));
};

export type LibrarySource = 'furniture' | 'av' | 'catering' | 'decor';

export const LIBRARY_LABELS: Record<LibrarySource, string> = {
  furniture: 'Furniture',
  av: 'Audio / Visual',
  catering: 'Catering',
  decor: 'Decor / Props',
};

const ALL_LIBRARIES: Record<LibrarySource, DraggableLibraryItem[]> = {
  furniture: FURNITURE_LIBRARY,
  av: AV_EQUIPMENT_LIBRARY,
  catering: CATERING_LIBRARY,
  decor: DECOR_LIBRARY,
};

/**
 * Search across every library at once. Returns matches grouped by source
 * library, preserving library order and dropping empty groups.
 */
export const searchAllLibraries = (
  query: string
): { source: LibrarySource; items: DraggableLibraryItem[] }[] => {
  if (!query.trim()) return [];

  return (Object.keys(ALL_LIBRARIES) as LibrarySource[])
    .map((source) => ({
      source,
      items: ALL_LIBRARIES[source].filter((item) => matchesQuery(item, query)),
    }))
    .filter((group) => group.items.length > 0);
};
