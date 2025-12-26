import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string | null;
  prevCursor: string | null;
  baseUrl: string;
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextCursor,
  prevCursor,
  baseUrl,
}: PaginationProps) {
  if (!hasNextPage && !hasPreviousPage) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {hasPreviousPage && prevCursor ? (
        <Link
          href={`${baseUrl}?after=${prevCursor}`}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prethodna</span>
        </Link>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span>Prethodna</span>
        </div>
      )}

      {hasNextPage && nextCursor ? (
        <Link
          href={`${baseUrl}?after=${nextCursor}`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Sljedeća</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed">
          <span>Sljedeća</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
