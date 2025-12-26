'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  slug: string;
  isHome?: boolean;
}

interface MobileMenuProps {
  categories: Category[];
}

export function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Otvori meni"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <span className="text-lg font-bold text-gray-900">Meni</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Zatvori meni"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pretraži vodiče..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </form>

              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Kategorije
                </h3>
                <nav>
                  <ul className="space-y-1">
                    {categories.map((category) => (
                      <li key={category.slug || 'home'}>
                        <Link
                          href={category.isHome ? '/' : `/c/${category.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Brzi pristup
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                    >
                      <TrendingUp className="w-5 h-5" />
                      Najčitanije
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                    >
                      <Clock className="w-5 h-5" />
                      Najnovije
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                © 2024 Go2Njemačka
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
