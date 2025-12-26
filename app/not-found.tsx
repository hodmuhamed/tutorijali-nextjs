import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-xl font-bold mb-2">Stranica nije pronađena</h1>
        <p className="text-gray-600">
          Ova stranica ne postoji ili je premještena.
        </p>
      </div>
    </div>
  )
}

