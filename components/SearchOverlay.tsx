'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Zatvori pretragu"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 text-center">
            Pretražite portal
          </h2>

          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Unesite pojam za pretragu..."
                className="w-full px-6 py-5 pr-16 text-lg bg-white rounded-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-shadow"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                aria-label="Pretraži"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          <p className="text-gray-400 text-sm text-center mt-6">
            Pritisnite <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300">ESC</kbd> za zatvaranje
          </p>
        </div>
      </div>
    </div>
  );
}
