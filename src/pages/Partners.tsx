import { Users, Utensils, Calendar, Globe, ShoppingBag, Phone, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Partner {
  id: string;
  name: string;
  motto: string;
  logo: string;
  description: string[];
  website: string;
  isOnline: boolean;
  isRecommended: boolean;
  customBadgeText?: string;
  extraBadgeText?: string;
  buttonText?: string;
}

const partners: Partner[] = [
  {
    id: 'cipooutlet',
    name: 'CipőOutlet',
    motto: 'MÁRKÁS CIPŐK OUTLET ÁRON',
    logo: '/files_8595244-2026-01-29t13-17-47-836z-files_8595244-2026-01-29t13-07-58-812z-files_8595244-2026-01-29t13-02-35-009z-files_8595244-2026-01-29t10-59-08-437z-logo_cipo.jpg',
    description: [
      'A **CipőOutlet** egy magyarországi **online cipő webshop**, ahol női, férfi és gyermek **márkás cipők** érhetők el **outlet áron**.',
      'A kínálatban sportcipők, utcai cipők és szezonális lábbelik is megtalálhatók, kényelmes online vásárlással, országos kiszállítással.'
    ],
    website: 'https://cipooutlet.hu/',
    isOnline: true,
    isRecommended: true,
    buttonText: 'Webshop megtekintése'
  },
  {
    id: 'centralwake',
    name: 'CENTRALWAKE',
    motto: 'CENTRALWAKE',
    logo: '/logo_centralwake.webp',
    description: [
      'A **Centralwake** egy wakeboard élményeket kínáló hely, ahol kezdők és haladók is megtalálják a számukra ideális kikapcsolódást.',
      'Fókuszban a sport, a közösség és az aktív szabadidő – szezonális programokkal és élményekkel.'
    ],
    website: 'https://www.centralwake.hu/',
    isOnline: false,
    isRecommended: true,
    customBadgeText: 'Wakeboard élmények – Centralwake',
    buttonText: 'Weboldal megtekintése'
  },
  {
    id: 'malna',
    name: 'Málna',
    motto: 'MÁLNA',
    logo: '/image copy copy copy copy.png',
    description: [
      'Ha szeretnél egy finomat enni a Balaton közelében, a **Málna** szeretettel vár Balatonlellén.',
      'Barátságos hangulatával és megbízható szolgáltatásával jó választás lehet mindenkinek.'
    ],
    website: 'https://www.facebook.com/share/1EAgrVmYvZ/?mibextid=wwXIfr',
    isOnline: false,
    isRecommended: true,
    customBadgeText: 'Helyi partner – Facebookon elérhető',
    buttonText: 'Facebook oldal megtekintése'
  }
];

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#111828' }}>
              <span
                className="inline-block opacity-0 animate-fadeInSlide"
                style={{
                  animationDelay: '0s',
                  animationFillMode: 'forwards'
                }}
              >
                Partnereink
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#6b7280' }}>
              {['Olyan', 'megbízható', 'partnerekkel', 'dolgozunk', 'együtt,', 'akik', 'hozzájárulnak', 'a', 'Fifteen', 'Apartman', 'magas', 'színvonalú', 'működéséhez', 'és', 'vendégeink', 'kényelméhez.', 'Az', 'együttműködések', 'célja,', 'hogy', 'a', 'foglalás,', 'az', 'érkezés', 'és', 'az', 'itt-tartózkodás', 'minden', 'szakasza', 'zökkenőmentes', 'legyen.'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${(index + 1) * 0.08}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 30 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>

          <div ref={sectionRef} className="flex flex-col items-center gap-8 mb-16">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                id={partner.id === 'malna' ? 'malna-partner' : undefined}
                className={`group max-w-lg w-full bg-white rounded-2xl p-8 text-center scroll-mt-24
                  transition-all duration-300 ease-out border-2
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  borderColor: '#B8B8B8'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#111828';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#B8B8B8';
                }}
              >
                <div className="flex justify-center mb-8 overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logó`}
                    className="max-w-[280px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {partner.motto}
                </h2>

                <div className="text-base leading-relaxed text-gray-600 mb-6">
                  {partner.description.map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                      })}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-600 mb-8">
                  {partner.isRecommended && (
                    <span className="flex items-center gap-1 font-medium">
                      Vendégeinknek ajánlott
                    </span>
                  )}
                  <ShoppingBag className="w-6 h-6 text-slate-700 transition-transform duration-300 group-hover:scale-110" />
                  {partner.customBadgeText ? (
                    <span className="font-medium">{partner.customBadgeText}</span>
                  ) : partner.isOnline ? (
                    <span className="font-medium">Online vásárlás – országosan elérhető</span>
                  ) : null}
                </div>

                {partner.id === 'malna' && (
                  <div className="flex flex-col items-center gap-2 text-sm text-gray-600 mb-8">
                    <div className="flex items-start justify-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-700 mt-0.5 flex-shrink-0" />
                      <a
                        href="https://www.google.com/maps/place/M%C3%A1lna/@46.7873955,17.6803466,20.49z/data=!4m6!3m5!1s0x4769af4530809c23:0x39ab92af6db552a6!8m2!3d46.7873992!4d17.6804733!16s%2Fg%2F11h3yh1p7w?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline text-center"
                      >
                        Margaréta köz 2., Balatonlelle, Hungary, 8638
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-slate-700" />
                      <span className="font-medium">
                        Telefon:{' '}
                        <a href="tel:+36300709553" className="hover:underline">
                          (30) 070 9553
                        </a>
                      </span>
                    </div>
                  </div>
                )}

                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 border-2 font-semibold rounded-lg transition-all duration-300 ease-out"
                  style={{ borderColor: '#111828', color: '#111828' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#111828';
                    e.currentTarget.style.color = '#C6C6C6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#111828';
                  }}
                >
                  {partner.buttonText || 'Webshop megtekintése'}
                </a>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50/40 via-white to-gray-50/40 rounded-2xl border-2 border-dashed border-slate-300/60 p-12 md:p-16
              transition-all duration-500 hover:border-slate-400/80 hover:shadow-lg">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-slate-100 rounded-full blur-xl opacity-50"></div>
                    <div className="relative bg-white rounded-full p-4 shadow-lg">
                      <Users className="w-12 h-12 text-slate-700" />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                  További partnereink hamarosan
                </h3>

                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Folyamatosan bővítjük partnerhálózatunkat, hogy vendégeink számára még több
                  kiváló helyi szolgáltatást és élményt ajánlhassunk.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('malna-partner')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                    className="group flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-100
                    transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-700/40 cursor-pointer">
                    <Utensils className="w-8 h-8 text-gray-400 transition-colors duration-300 group-hover:text-slate-700" />
                    <span className="text-sm font-medium text-gray-600">Éttermek</span>
                  </button>

                  <div className="group flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-100
                    transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-700/40"
                    style={{ transitionDelay: '50ms' }}>
                    <Calendar className="w-8 h-8 text-gray-400 transition-colors duration-300 group-hover:text-slate-700" />
                    <span className="text-sm font-medium text-gray-600">Programok</span>
                  </div>

                  <div className="group flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-sm border border-gray-100
                    transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-700/40"
                    style={{ transitionDelay: '100ms' }}>
                    <Globe className="w-8 h-8 text-gray-400 transition-colors duration-300 group-hover:text-slate-700" />
                    <span className="text-sm font-medium text-gray-600">Szolgáltatók</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
