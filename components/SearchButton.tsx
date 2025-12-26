'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { SearchOverlay } from './SearchOverlay';

export function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 transition-colors"
        aria-label="Otvori pretragu"
      >
        <Search className="w-5 h-5" />
        <span className="hidden md:inline text-sm">Pretražite...</span>
      </button>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
