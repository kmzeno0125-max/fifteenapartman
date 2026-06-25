import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Check } from 'lucide-react';
import EmergencyNumbers from '../components/EmergencyNumbers';

export default function Contact() {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '2',
    children: '0',
    pet: 'no',
    payment: 'card',
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#111828' }}>
              <span
                className="inline-block opacity-0 animate-fadeInSlide"
                style={{
                  animationDelay: '0s',
                  animationFillMode: 'forwards'
                }}
              >
                Ajánlatkérés
              </span>
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              {['Töltsd', 'ki', 'az', 'űrlapot', 'és', 'hamarosan', 'válaszolunk', 'minden', 'kérdésedre'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${(index + 1) * 0.08}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 8 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white shadow-sm p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="checkIn" className="block text-sm font-medium text-gray-900 mb-2">
                        Érkezés dátuma *
                      </label>
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        required
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      />
                    </div>

                    <div>
                      <label htmlFor="checkOut" className="block text-sm font-medium text-gray-900 mb-2">
                        Távozás dátuma *
                      </label>
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        required
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="adults" className="block text-sm font-medium text-gray-900 mb-2">
                        Felnőttek száma *
                      </label>
                      <select
                        id="adults"
                        name="adults"
                        required
                        value={formData.adults}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 bg-white transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      >
                        <option value="1">1 fő</option>
                        <option value="2">2 fő</option>
                        <option value="3">3 fő</option>
                        <option value="4">4 fő</option>
                        <option value="5">5 fő</option>
                        <option value="6">6 fő</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="children" className="block text-sm font-medium text-gray-900 mb-2">
                        Gyermekek száma
                      </label>
                      <select
                        id="children"
                        name="children"
                        value={formData.children}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 bg-white transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      >
                        <option value="0">0 fő</option>
                        <option value="1">1 fő</option>
                        <option value="2">2 fő</option>
                        <option value="3">3 fő</option>
                        <option value="4">4 fő</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="pet" className="block text-sm font-medium text-gray-900 mb-2">
                        Kisállat
                      </label>
                      <select
                        id="pet"
                        name="pet"
                        value={formData.pet}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 bg-white transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      >
                        <option value="no">Nem</option>
                        <option value="yes">Igen</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="payment" className="block text-sm font-medium text-gray-900 mb-2">
                        Fizetési mód
                      </label>
                      <select
                        id="payment"
                        name="payment"
                        value={formData.payment}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 bg-white transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      >
                        <option value="card">Bankkártya</option>
                        <option value="transfer">Banki átutalás</option>
                        <option value="szep">SZÉP kártya</option>
                        <option value="cash">Készpénz</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                        Név *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                        Telefonszám *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+36 20 123 4567"
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        E-mail cím *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 transition-colors"
                        style={{ borderColor: '#B8B8B8' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                      Megjegyzés
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ide írhatsz kérdéseket vagy speciális kéréseket..."
                      className="w-full px-4 py-3 border focus:outline-none focus:border-gray-900 resize-none transition-colors"
                      style={{ borderColor: '#B8B8B8' }}
                    />
                  </div>

                  <div className="bg-gray-50 p-4 text-sm text-gray-600">
                    <p>
                      * A foglalás csak visszaigazolás után válik véglegessé. Kérésed elküldése után 24 órán belül válaszolunk.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 font-medium transition-all flex items-center justify-center border-2"
                    style={{ backgroundColor: '#111828', color: '#C6C6C6', borderColor: '#111828' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C6C6C6';
                      e.currentTarget.style.color = '#111828';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#111828';
                      e.currentTarget.style.color = '#C6C6C6';
                    }}
                  >
                    {isSubmitted ? (
                      <>
                        <Check size={20} className="mr-2" />
                        Ajánlatkérés elküldve
                      </>
                    ) : (
                      'Foglalás'
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-sm p-6 border" style={{ borderColor: '#B8B8B8' }}>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Elérhetőség</h3>
                <div className="space-y-4">
                  <a href="tel:+36204530000" className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
                    <Phone size={20} className="mt-0.5 flex-shrink-0" />
                    <span>+36 20 453 0000</span>
                  </a>
                  <a href="mailto:info@fifteenapartman.hu" className="flex items-start space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
                    <Mail size={20} className="mt-0.5 flex-shrink-0" />
                    <span>info@fifteenapartman.hu</span>
                  </a>
                  <a
                    href="https://www.google.com/maps/place/Balatonf%C3%B6ldv%C3%A1r,+Hunyadi+J%C3%A1nos+u.+15,+8623/@46.8563738,17.8849439,17z/data=!3m1!4b1!4m6!3m5!1s0x4769ba28bb6412ab:0xd187ab08c537bd8f!8m2!3d46.8563702!4d17.8875188!16s%2Fg%2F11rqtss86q?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
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
                    <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Nyári szezonban</p>
                    <p className="text-xs mb-1" style={{ color: '#9CA3AF' }}>(Június 01. – Augusztus 31.)</p>
                    <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>min 4 éjszaka szükséges</p>
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

                  <div className="pt-3">
                    <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>Idegenforgalmi adó (IFA)</p>
                    <p className="text-sm font-medium" style={{ color: '#6B7280' }}>
                      700 Ft <span className="text-xs font-normal" style={{ color: '#9CA3AF' }}>/fő/éj</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-sm p-6 border border-gray-900">
                <p className="text-center text-base font-medium text-gray-900">
                  Egyedi, kedvezményes foglalásért hívjon minket!
                </p>
              </div>

              <div className="bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gyors válasz</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ajánlatkérésedre általában 24 órán belül válaszolunk. Sürgős esetben hívj minket telefonon.
                </p>
              </div>

              <div className="bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Foglalási folyamat</h3>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 mr-2">1.</span>
                    <span>Ajánlatkérés elküldése</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 mr-2">2.</span>
                    <span>Visszaigazolás és árajánlat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 mr-2">3.</span>
                    <span>Foglaló befizetése (50%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium text-gray-900 mr-2">4.</span>
                    <span>Foglalás véglegesítése</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow-sm overflow-hidden">
            <a
              href="https://www.google.com/maps/place/Balatonf%C3%B6ldv%C3%A1r,+Hunyadi+J%C3%A1nos+u.+15,+8623/@46.8563738,17.8849439,17z/data=!3m1!4b1!4m6!3m5!1s0x4769ba28bb6412ab:0xd187ab08c537bd8f!8m2!3d46.8563702!4d17.8875188!16s%2Fg%2F11rqtss86q?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <img
                src="/google_maps_copy.jpg"
                alt="Fifteen Apartman elhelyezkedése térképen"
                className="w-full h-auto"
              />
            </a>
          </div>

          <div className="mt-8">
            <EmergencyNumbers variant="compact" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#111828' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ color: '#C6C6C6' }}>
            Kérdésed van?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#C6C6C6' }}>
            Telefonon vagy e-mailben is elérhetsz minket minden nap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+36204530000"
              className="inline-block px-8 py-4 font-medium transition-all border-2 rounded-lg"
              style={{ backgroundColor: '#C6C6C6', color: '#111828', borderColor: '#C6C6C6' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#C6C6C6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C6C6C6';
                e.currentTarget.style.color = '#111828';
              }}
            >
              +36 20 453 0000
            </a>
            <a
              href="mailto:info@fifteenapartman.hu"
              className="inline-block px-8 py-4 font-medium transition-all border-2 rounded-lg"
              style={{ backgroundColor: 'transparent', color: '#C6C6C6', borderColor: '#C6C6C6' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C6C6C6';
                e.currentTarget.style.color = '#111828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#C6C6C6';
              }}
            >
              E-mail küldése
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
