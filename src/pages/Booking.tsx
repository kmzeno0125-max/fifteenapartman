import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Users, Dog, CreditCard, MessageSquare, CheckCircle2, X } from 'lucide-react';
import BookingSidebar from '../components/BookingSidebar';

const CONTACT_EMAIL = 'info@fifteenapartman.hu';

const MAIL_SUBJECT = 'Foglalási kérés - Fifteen Apartman';
const MAIL_BODY = `Kedves Fifteen Apartman csapat!

Érkezés dátuma:
Távozás dátuma:
Éjszakák száma:
Vendégek száma (felnőtt/gyermek):
Kisállat érkezik-e:
Fizetési mód:
Név:
Telefonszám:
Megjegyzés:

Köszönettel:`;

const encodedSubject = encodeURIComponent(MAIL_SUBJECT);
const encodedBody = encodeURIComponent(MAIL_BODY);

const MAIL_OPTIONS = [
  {
    key: 'gmail',
    label: 'Gmail',
    description: 'Megnyitás a Gmail webes felületén',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodedSubject}&body=${encodedBody}`,
    external: true,
  },
  {
    key: 'outlook',
    label: 'Outlook',
    description: 'Megnyitás az Outlook webes felületén',
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${CONTACT_EMAIL}&subject=${encodedSubject}&body=${encodedBody}`,
    external: true,
  },
  {
    key: 'yahoo',
    label: 'Yahoo Mail',
    description: 'Megnyitás a Yahoo Mail felületén',
    href: `https://compose.mail.yahoo.com/?to=${CONTACT_EMAIL}&subject=${encodedSubject}&body=${encodedBody}`,
    external: true,
  },
  {
    key: 'default',
    label: 'Alapértelmezett e-mail kliens',
    description: 'Apple Mail, Outlook desktop, Thunderbird stb.',
    href: `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`,
    external: false,
  },
];

const CHECKLIST: { icon: typeof Calendar; text: string }[] = [
  { icon: Calendar, text: 'Érkezés és távozás dátuma' },
  { icon: Calendar, text: 'Éjszakák száma' },
  { icon: Users, text: 'Vendégek száma (felnőtt / gyermek)' },
  { icon: Dog, text: 'Kisállat érkezik-e (ha igen, milyen méretű)' },
  { icon: CreditCard, text: 'Tervezett fizetési mód (banki átutalás, SZÉP kártya, készpénz)' },
  { icon: Phone, text: 'Kapcsolattartási adatok (név, telefonszám)' },
  { icon: MessageSquare, text: 'Esetleges különleges kérések, kérdések' },
];

export default function Booking() {
  const [showMailPicker, setShowMailPicker] = useState(false);

  useEffect(() => {
    if (!showMailPicker) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowMailPicker(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [showMailPicker]);

  return (
    <div className="min-h-screen booking-background">
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl font-light mb-6 opacity-0 animate-fadeInSlide"
              style={{ color: '#111828', animationFillMode: 'forwards' }}
            >
              Foglalás
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              E-mailes foglalási és érdeklődési folyamat – személyre szabott ajánlattal
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 right-[10%] w-32 h-32 rounded-full bg-gradient-radial from-amber-400/20 via-orange-300/10 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>

          <svg className="absolute top-[10%] left-[5%] w-48 h-48 opacity-25" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 100 Q 40 80, 60 100 T 100 100 T 140 100 T 180 100" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M20 120 Q 45 100, 70 120 T 110 120 T 150 120 T 190 120" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M15 140 Q 50 125, 85 140 T 125 140 T 165 140 T 200 140" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          <svg className="absolute bottom-[15%] right-[8%] w-56 h-56 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 120 Q 35 100, 60 120 T 100 120 T 140 120 T 180 120" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M15 140 Q 45 120, 75 140 T 115 140 T 155 140 T 195 140" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M5 160 Q 40 140, 75 160 T 125 160 T 175 160" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>

          <svg className="absolute top-[35%] right-[15%] w-40 h-40 opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 140 Q 55 120, 80 140 T 120 140 T 160 140" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M25 160 Q 60 145, 95 160 T 135 160 T 175 160" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          <svg className="absolute top-[20%] left-[45%] w-24 h-32 opacity-25" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 120 L50 20 L75 50 M50 20 L25 50" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 120 L45 25 Q 70 30, 70 55" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          <svg className="absolute bottom-[30%] left-[12%] w-28 h-36 opacity-20" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 120 L50 25 L72 50 M50 25 L28 50" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46 120 L46 30 Q 68 35, 68 55" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          <svg className="absolute top-[50%] right-[35%] w-20 h-28 opacity-18" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 120 L50 30 L70 52 M50 30 L30 52" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M47 120 L47 35 Q 65 38, 65 55" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>

          <div className="absolute bottom-[25%] left-[40%] w-96 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute top-[30%] left-[20%] w-64 h-1.5 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

          <div className="absolute top-1/3 right-[5%] w-72 h-72 rounded-full border-2 border-cyan-200/10 animate-pulse" style={{ animationDuration: '5s' }}></div>
          <div className="absolute bottom-1/4 left-[8%] w-80 h-80 rounded-full border-2 border-blue-200/8 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div
                className="shadow-lg p-8 md:p-12 rounded-lg"
                style={{
                  background: 'linear-gradient(160deg, #111828 0%, #1E3A5F 100%)',
                  color: '#E8EAF0',
                }}
              >
                <h2
                  className="text-3xl md:text-4xl font-light mb-6"
                  style={{ color: '#FFFFFF', lineHeight: '1.2' }}
                >
                  Foglalás és érdeklődés
                </h2>
                <p
                  className="text-base md:text-lg mb-10"
                  style={{ color: '#C6CEDB', lineHeight: '1.6' }}
                >
                  Szállásunk foglalása és az érdeklődés e-mailben vagy telefonon történik.
                  Nálunk nincs automata rendszer – minden kérésedre személyesen mi válaszolunk,
                  így biztos lehetsz benne, hogy minden részletet a Te igényeidre szabunk.
                </p>

                <div className="h-px w-16 mb-10" style={{ backgroundColor: '#D4A574' }}></div>

                <h3
                  className="text-xl md:text-2xl font-medium mb-4 flex items-center gap-3"
                  style={{ color: '#FFFFFF' }}
                >
                  <Mail size={22} style={{ color: '#D4A574' }} />
                  Foglalási kérés e-mailben
                </h3>
                <p
                  className="text-base mb-6"
                  style={{ color: '#C6CEDB', lineHeight: '1.6' }}
                >
                  Ahhoz, hogy a lehető legpontosabb ajánlatot tudjuk küldeni, kérjük, az alábbi
                  adatokat add meg az e-mailben:
                </p>

                <ul className="space-y-3 mb-10">
                  {CHECKLIST.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 text-base"
                      style={{ color: '#E8EAF0', lineHeight: '1.5' }}
                    >
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: 'rgba(212, 165, 116, 0.15)' }}
                      >
                        <Icon size={16} style={{ color: '#D4A574' }} />
                      </span>
                      <span className="pt-1">{text}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className="text-base mb-10"
                  style={{ color: '#C6CEDB', lineHeight: '1.6' }}
                >
                  Megkeresésedre általában 24 órán belül válaszolunk visszaigazoló e-mail
                  formájában. Ammenyiben kérdésed van, vagy egyedi ajánlatot szeretnél,
                  telefonon is szívesen állunk rendelkezésedre.
                </p>

                <button
                  type="button"
                  onClick={() => setShowMailPicker(true)}
                  className="group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-lg font-medium text-base transition-all duration-300"
                  style={{
                    backgroundColor: '#D4A574',
                    color: '#111828',
                    boxShadow: '0 4px 14px rgba(212, 165, 116, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E0B584';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4A574';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(212, 165, 116, 0.3)';
                  }}
                >
                  <Mail size={20} />
                  <span>Foglalási kérés küldése e-mailben</span>
                </button>

                <div
                  className="mt-8 pt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: '#C6CEDB' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#C6CEDB'; }}
                  >
                    <Mail size={16} />
                    <span>{CONTACT_EMAIL}</span>
                  </a>
                  <a
                    href="tel:+36204530000"
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: '#C6CEDB' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#C6CEDB'; }}
                  >
                    <Phone size={16} />
                    <span>+36 20 453 0000</span>
                  </a>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#9BA4B5' }}>
                    <CheckCircle2 size={16} style={{ color: '#D4A574' }} />
                    <span>Válasz 24 órán belül</span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Balatonf%C3%B6ldv%C3%A1r,+Hunyadi+J%C3%A1nos+u.+15,+8623/@46.8562004,17.884909,17.01z/data=!4m6!3m5!1s0x4769ba28bb6412ab:0xd187ab08c537bd8f!8m2!3d46.8563702!4d17.8875188!16s%2Fg%2F11rqtss86q?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src="/files_8595244-2026-02-17T08-38-14-373Z-image.webp"
                  alt="Hunyadi János u. 15, Balatonföldvár - Google Maps"
                  className="w-full h-auto"
                />
              </a>
            </div>

            <BookingSidebar />
          </div>
        </div>
      </section>

      {showMailPicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fadeInSlide"
          style={{ animationDuration: '200ms', animationFillMode: 'forwards' }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(17, 24, 40, 0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowMailPicker(false)}
          />
          <div
            className="relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #111828 0%, #1E3A5F 100%)', color: '#E8EAF0' }}
          >
            <div className="flex items-start justify-between p-6 pb-4">
              <div>
                <h3 className="text-xl font-medium mb-1" style={{ color: '#FFFFFF' }}>
                  Válaszd ki az e-mail platformot
                </h3>
                <p className="text-sm" style={{ color: '#9BA4B5' }}>
                  Az üzenet előre kitöltve nyílik meg
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMailPicker(false)}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#C6CEDB' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; }}
                aria-label="Bezárás"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 pb-6 space-y-2">
              {MAIL_OPTIONS.map((opt) => (
                <a
                  key={opt.key}
                  href={opt.href}
                  target={opt.external ? '_blank' : undefined}
                  rel={opt.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setShowMailPicker(false)}
                  className="flex items-center gap-4 p-4 rounded-lg transition-all"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 165, 116, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.4)';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(212, 165, 116, 0.15)' }}
                  >
                    <Mail size={18} style={{ color: '#D4A574' }} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium" style={{ color: '#FFFFFF' }}>{opt.label}</span>
                    <span className="block text-xs mt-0.5" style={{ color: '#9BA4B5' }}>{opt.description}</span>
                  </span>
                </a>
              ))}
            </div>
            <div
              className="px-6 py-4 text-xs"
              style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: '#9BA4B5', backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
            >
              Címzett: <span style={{ color: '#D4A574' }}>{CONTACT_EMAIL}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
