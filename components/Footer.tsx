import Link from 'next/link';
import { MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 border-t-4 border-blue-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-white text-xl font-black mb-4">Go2Njemačka</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Kompletan vodič i informacijski portal za Balkance koji žive ili planiraju da idu u Njemačku. Savjeti, vodiči i najnovije informacije.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Njemačka</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider">
              Kategorije
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/c/dolazak-u-njemacku" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Dolazak u Njemačku
                </Link>
              </li>
              <li>
                <Link href="/c/povrat-poreza" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Povrat poreza
                </Link>
              </li>
              <li>
                <Link href="/c/posao" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Posao
                </Link>
              </li>
              <li>
                <Link href="/c/zdravstvo" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Zdravstvo
                </Link>
              </li>
              <li>
                <Link href="/c/spajanje-porodice" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Porodica
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider">
              Korisni linkovi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Uslovi korištenja
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-blue-500">→</span>
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider">
              Popularni vodiči
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/c/povrat-poreza" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-green-500">★</span>
                  Povrat poreza u Njemačkoj
                </Link>
              </li>
              <li>
                <Link href="/c/spajanje-porodice" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-green-500">★</span>
                  Spajanje porodice
                </Link>
              </li>
              <li>
                <Link href="/c/posao" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-green-500">★</span>
                  Minimalna plata
                </Link>
              </li>
              <li>
                <Link href="/c/zdravstvo" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-green-500">★</span>
                  Zdravstveno osiguranje
                </Link>
              </li>
              <li>
                <Link href="/c/savjeti" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2 text-green-500">★</span>
                  Savjeti za život
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} Go2Njemačka. Sva prava zadržana.
            </p>
            <p className="text-sm text-gray-500 text-center md:text-right">
              Informacijski portal za Balkance u Njemačkoj
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
