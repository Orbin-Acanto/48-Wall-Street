import React, { useState, useMemo } from 'react';
import { DraggableItem } from './DraggableItem';
import {
  CATERING_LIBRARY,
  getAllCateringCategories,
} from '@/constants/cateringStations';

export const CateringSidebar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...getAllCateringCategories()];

  const filteredItems = useMemo(() => {
    let items = CATERING_LIBRARY;

    if (selectedCategory !== 'All') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return items;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-900">Catering</h3>
        <p className="mt-1 text-xs text-gray-500">Drag stations to canvas</p>
      </div>

      {/* Search */}
      <div className="border-b border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search catering..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Categories */}
      <div className="overflow-x-auto border-b border-gray-200 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
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

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredItems.length === 0 ? (
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm">No stations found</p>
            <p className="mt-1 text-xs">Try different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-center text-xs text-gray-500">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>
    </div>
  );
};
