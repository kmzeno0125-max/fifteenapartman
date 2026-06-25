import { MapPin, Phone, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111828', color: '#C6C6C6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/files_8595244-2026-01-29t18-11-10-081z-files_8595244-2026-01-29t15-36-45-838z-chatgpt_image_2026._jan._29._16_28_04.webp" alt="Fifteen Apartman" className="h-32 w-auto mb-4" />
            <p className="text-sm leading-relaxed">
              Kényelmes, modern apartman Balatonföldváron, ideális választás pihenéshez és feltöltődéshez.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4" style={{ color: '#FFFFFF' }}>Elérhetőség</h3>
            <div className="space-y-3">
              <a href="tel:+36204530000" className="flex items-start space-x-2 text-sm transition-colors" style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
              >
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>+36 20 453 0000</span>
              </a>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>8623 Balatonföldvár,<br />Hunyadi János utca 15.</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4" style={{ color: '#FFFFFF' }}>Jogi dokumentumok</h3>
            <nav className="space-y-2">
              <Link to="/altalanos-szerzodesi-feltetelek" className="block text-sm transition-colors" style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
              >
                Általános Szerződési Feltételek
              </Link>
              <Link to="/adatvedelmi-nyilatkozat" className="block text-sm transition-colors" style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
              >
                Adatvédelmi nyilatkozat
              </Link>
              <Link to="/jogi-nyilatkozat" className="block text-sm transition-colors" style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
              >
                Jogi nyilatkozat
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-medium mb-4" style={{ color: '#FFFFFF' }}>Hasznos linkek</h3>
            <nav className="space-y-2 mb-6">
              <Link to="/hazirend" className="block text-sm transition-colors" style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
              >
                Házirend
              </Link>
            </nav>

            <h3 className="font-medium mb-4" style={{ color: '#FFFFFF' }}>Kövess minket</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/179pmoksP8/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/fifteenapartman?igsh=MWhyMTR4MjBxZTlvbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: '#C6C6C6' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#B8B8B8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#C6C6C6'}
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 mt-12 pt-8 text-sm text-center" style={{ borderTopColor: '#B8B8B8' }}>
          <p>&copy; {new Date().getFullYear()} Fifteen Apartman. Minden jog fenntartva.</p>
          <p className="mt-2" style={{ color: '#E5E7EB' }}>
            Tervezés és fejlesztés:{' '}
            <a
              href="https://www.adyflow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-all"
              style={{ color: '#F3F4F6' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#F3F4F6';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              AdyFlow
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
