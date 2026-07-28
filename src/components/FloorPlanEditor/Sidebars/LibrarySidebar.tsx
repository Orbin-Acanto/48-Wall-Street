import React, { useMemo, useState } from 'react';
import { DraggableItem } from './DraggableItem';
import { DraggableLibraryItem } from '@/types/floorplan.types';
import {
  matchesQuery,
  searchAllLibraries,
  LIBRARY_LABELS,
} from '@/utils/librarySearch';

interface LibrarySidebarProps {
  title: string;
  subtitle: string;
  items: DraggableLibraryItem[];
  categories: string[];
  /** Placeholder for the search box, e.g. "Search furniture...". */
  searchPlaceholder: string;
}

/**
 * Shared sidebar used by Furniture / AV / Catering / Decor.
 *
 * Two search improvements over the old per-sidebar logic:
 *  - Fuzzy, tokenized matching (via `matchesQuery`) so multi-word and partial
 *    queries stop missing items that clearly exist.
 *  - A "Search all categories" toggle that searches every library at once and
 *    shows grouped results, so users don't have to guess which tab an item is in.
 */
export const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  title,
  subtitle,
  items,
  categories,
  searchPlaceholder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allCategories = ['All', ...categories];

  const localItems = useMemo(() => {
    let list = items;
    if (selectedCategory !== 'All') {
      list = list.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      list = list.filter((item) => matchesQuery(item, searchQuery));
    }
    return list;
  }, [items, selectedCategory, searchQuery]);

  // Any search query always searches across every library, so users never have
  // to guess which tab an item lives in.
  const globalGroups = useMemo(
    () => (searchQuery.trim() ? searchAllLibraries(searchQuery) : []),
    [searchQuery]
  );

  const showingGlobal = searchQuery.trim().length > 0;
  const globalCount = globalGroups.reduce((n, g) => n + g.items.length, 0);
  const totalCount = showingGlobal ? globalCount : localItems.length;

  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
      </div>

      {/* Search (always across all categories) */}
      <div className="border-b border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            title="Searches all categories (furniture, A/V, catering, decor)"
            className="text-dark-black w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <svg
            className="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Categories (hidden while showing global search results) */}
      {!showingGlobal && (
        <div className="overflow-x-auto border-b border-gray-200 px-4 py-3">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {totalCount === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <svg
              className="mb-2 h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-sm">No items found</p>
            <p className="mt-1 text-xs">Try different keywords</p>
          </div>
        ) : showingGlobal ? (
          // Grouped global results
          <div className="space-y-5">
            {globalGroups.map((group) => (
              <div key={group.source}>
                <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
                  {LIBRARY_LABELS[group.source]} ({group.items.length})
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <DraggableItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {localItems.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-center text-xs text-gray-500">
          {totalCount} {totalCount === 1 ? 'item' : 'items'}
          {showingGlobal && ' across all categories'}
        </p>
      </div>
    </div>
  );
};
