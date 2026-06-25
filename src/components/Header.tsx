import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Főoldal' },
    { path: '/apartman-terei', label: 'Felszereltség' },
    { path: '/elmenyek', label: 'Élmények a közelben' },
    { path: '/galeria', label: 'Galéria' },
    { path: '/hazirend', label: 'Házirend' },
    { path: '/partnereink', label: 'Partnereink' },
    { path: '/ajanlatkeres', label: 'Foglalás' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isBooking = (path: string) => path === '/ajanlatkeres';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-24 md:h-40 lg:h-48 py-2">
          <Link to="/" className="flex items-center">
            <img
              src="/files_8595244-2026-03-12T14-40-23-896Z-image.webp"
              alt="Fifteen Apartman"
              style={{ height: 'auto', width: 'auto', objectFit: 'contain', verticalAlign: 'middle', maxHeight: '200px' }}
              className="block h-24 md:h-40 lg:h-48"
            />
          </Link>

          <nav className="hidden lg:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm md:text-base lg:text-lg transition-colors ${
                  isBooking(item.path)
                    ? 'font-semibold text-white hover:text-gray-100'
                    : 'font-medium text-gray-300 hover:text-white'
                }`}
                style={{
                  borderBottom: isActive(item.path) ? '2px solid #ffffff' : isBooking(item.path) ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                  paddingBottom: '4px'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-700">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-md text-base transition-colors ${
                  isBooking(item.path)
                    ? 'font-semibold text-white'
                    : 'font-medium text-gray-300'
                }`}
                style={{
                  backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
