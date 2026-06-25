import { Phone, Mail, MapPin, CreditCard } from 'lucide-react';

export default function BookingSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm p-6 border" style={{ borderColor: '#B8B8B8' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-6">Áraink</h3>
        <div className="space-y-4">
          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: '#F7F7F7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Főszezon</p>
            <p className="text-xs mb-1" style={{ color: '#9CA3AF' }}>(Május 31. &ndash; Augusztus 31.)</p>
            <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>min. 4 éjszaka</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#1E3A5F' }}>70.000 Ft</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>/apartman/éj</p>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: '#F7F7F7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: '#6B7280' }}>Szezonon kívül</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#1E3A5F' }}>50.000 Ft</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>/apartman/éj</p>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{
              backgroundColor: '#F7F7F7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: '#6B7280' }}>Idegenforgalmi adó (IFA)</p>
            <p className="text-3xl font-bold mb-1" style={{ color: '#1E3A5F' }}>700 Ft</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>/fő/éj</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm p-4 border" style={{ borderColor: '#B8B8B8' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CreditCard size={20} style={{ color: '#1E3A5F' }} />
          <p className="text-base font-semibold" style={{ color: '#1E3A5F' }}>
            SZÉP Kártyát elfogadunk
          </p>
        </div>
        <p className="text-center text-sm" style={{ color: '#9CA3AF' }}>
          OTP
        </p>
      </div>

      <div className="bg-white shadow-sm p-6 border" style={{ borderColor: '#B8B8B8' }}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Elérhetőség</h3>
        <div className="space-y-4">
          <a
            href="tel:+36204530000"
            className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Phone size={20} className="mt-0.5 flex-shrink-0" />
            <span>+36 20 453 0000</span>
          </a>
          <a
            href="mailto:info@fifteenapartman.hu"
            className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Mail size={20} className="mt-0.5 flex-shrink-0" />
            <span>info@fifteenapartman.hu</span>
          </a>
          <a
            href="https://www.google.com/maps/place/Balatonf%C3%B6ldv%C3%A1r,+Hunyadi+J%C3%A1nos+u.+15,+8623/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <MapPin size={20} className="mt-0.5 flex-shrink-0" />
            <span>
              8623 Balatonföldvár,<br />
              Hunyadi János utca 15.
            </span>
          </a>
        </div>
      </div>

      <div className="bg-white shadow-sm p-6 border border-gray-900">
        <p className="text-center text-base font-medium text-gray-900">
          Egyedi, kedvezményes foglalásért hívjon minket!
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Foglalási folyamat</h3>
        <ol className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              1
            </span>
            <span>Dátumok és adatok megadása</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              2
            </span>
            <span>Visszaigazolás</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              3
            </span>
            <span>Foglaló befizetése (50%)</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center mr-3 mt-0.5">
              4
            </span>
            <span>Foglalás véglegesítése</span>
          </li>
        </ol>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Gyors válasz</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Kérésedre általában 24 órán belül válaszolunk. Sürgős esetben hívj minket telefonon.
        </p>
      </div>
    </div>
  );
}
