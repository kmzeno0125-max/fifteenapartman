import { Link } from 'react-router-dom';
import { Waves, CheckCircle, Car, MapPin, Mail, Star, Quote } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import LandingHero from '../components/LandingHero';
import { CarIcon, WineGlassesIcon, BeachIcon, WiFiIcon, AirConditioningIcon } from '../components/CustomIcons';

export default function Home() {
  const [isFeatureVisible, setIsFeatureVisible] = useState(false);
  const featureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = featureRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFeatureVisible) {
            setIsFeatureVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [isFeatureVisible]);

  const features = [
    { icon: 'car', text: 'Parkolási lehetőség' },
    { icon: 'wine', text: 'Hangulat' },
    { icon: 'beach', text: '150 méter a strandtól' },
    { icon: 'wifi', text: 'Ingyenes WiFi' },
    { icon: 'ac', text: 'Légkondicionált' }
  ];

  return (
    <div className="min-h-screen">
      <LandingHero />

      <section id="main-content" className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#111828' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700/20 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">Balatonföldvár</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  <span style={{ fontSize: '0.65em' }}>Bemutatkozik a</span> <span className="text-white font-normal" style={{ fontFamily: "'Pacifico', cursive", fontSize: '0.95em', letterSpacing: '0.02em' }}>Fifteen Apartman</span>
                </h1>
                <div className="w-20 h-0.5 bg-gradient-to-r from-white to-transparent"></div>
              </div>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md">
                Egy{' '}
                <span className="inline-flex items-center gap-0.5 align-baseline">
                  <Star size={13} className="inline" style={{ color: '#d4b96a', fill: '#d4b96a', verticalAlign: 'middle' }} />
                  <Star size={13} className="inline" style={{ color: '#d4b96a', fill: '#d4b96a', verticalAlign: 'middle' }} />
                  <Star size={13} className="inline" style={{ color: '#d4b96a', fill: '#d4b96a', verticalAlign: 'middle' }} />
                </span>{' '}
                barátságos, otthonos hely, ahol a{' '}
                <br />
                <span className="inline-flex items-center gap-0.5 align-baseline">
                  <Star size={13} className="inline" style={{ color: '#d4b96a', fill: '#d4b96a', verticalAlign: 'middle' }} />
                  <Star size={13} className="inline" style={{ color: '#d4b96a', fill: '#d4b96a', verticalAlign: 'middle' }} />
                  <Star size={13} className="inline" style={{ color: '#d4b96a', fill: '#d4b96a', verticalAlign: 'middle' }} />
                </span>{' '}
                kikapcsolódásé a főszerep.
              </p>

              <Link
                to="/ajanlatkeres"
                className="inline-block group relative"
              >
                <div className="absolute inset-0 blur-xl transition-all duration-500" style={{ backgroundColor: 'rgba(198, 198, 198, 0.2)' }}></div>
                <div className="relative border-2 px-10 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105" style={{ borderColor: '#C6C6C6', color: '#C6C6C6' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#C6C6C6';
                    e.currentTarget.style.color = '#111828';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#C6C6C6';
                  }}
                >
                  Foglalás
                </div>
              </Link>

              <div className="mt-4 space-y-2" style={{ opacity: 0.75 }}>
                <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">Fizetési lehetőségek</p>
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {[
                    {
                      label: 'Visa',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <path d="M9 12l1.5 4 1.5-5 1.5 4 1.5-4"/>
                        </svg>
                      )
                    },
                    {
                      label: 'Mastercard',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <circle cx="9.5" cy="12" r="3.5"/>
                          <circle cx="14.5" cy="12" r="3.5"/>
                        </svg>
                      )
                    },
                    {
                      label: 'Bankkártya',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                          <line x1="6" y1="15" x2="9" y2="15"/>
                        </svg>
                      )
                    },
                    {
                      label: 'Készpénz',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2"/>
                          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                          <circle cx="12" cy="14" r="2"/>
                        </svg>
                      )
                    },
                    {
                      label: 'Átutalás',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l4-4 4 4"/>
                          <path d="M7 5v14"/>
                          <path d="M21 15l-4 4-4-4"/>
                          <path d="M17 19V5"/>
                        </svg>
                      )
                    },
                    {
                      label: 'OTP SZÉP kártya',
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <path d="M6 10h4"/>
                          <path d="M6 14h8"/>
                          <path d="M14 10h4"/>
                        </svg>
                      )
                    }
                  ].map(({ label, icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 md:hover:opacity-100 md:hover:-translate-y-0.5 transition-all duration-200 ease-out"
                      style={{ color: '#FFFFFF', opacity: 0.85 }}
                    >
                      {icon}
                      <span className="text-xs font-light whitespace-nowrap">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div className="space-y-3 lg:space-y-4 translate-y-6">
                  <div className="group relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src="/files_8595244-2026-01-29t17-51-42-922z-www.economx.webp"
                      alt="Balatonföldvár felirat"
                      className="w-full h-48 lg:h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      style={{ objectPosition: '35% center' }}
                    />
                  </div>
                  <div className="group relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src="/files_8595244-2026-01-28t12-59-21-418z-files_8595244-2026-01-28t12-51-21-101z-balatonfoldvar.webp"
                      alt="Balatonföldvár kikötő"
                      className="w-full h-48 lg:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-3 lg:space-y-4">
                  <div className="group relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src="/image%20copy%20copy.png"
                      alt="Balatonföldvár strand és vízi csúszdák"
                      className="w-full h-56 lg:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="group relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <img
                      src="/files_8595244-2026-01-28t07-31-08-027z-files_8595244-2026-01-27t15-09-15-108z-10913-balatonfoldvari-vitorlaskikoto-vitorlazas.jpg"
                      alt="Balatonföldvár vitorlás kikötő"
                      className="w-full h-40 lg:h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-gray-700/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      <section ref={featureRef} className="relative pt-20 md:pt-32 pb-8 md:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {features.map((feature, index) => {
              const getIcon = () => {
                switch(feature.icon) {
                  case 'car': return <CarIcon />;
                  case 'wine': return <WineGlassesIcon />;
                  case 'beach': return <BeachIcon />;
                  case 'wifi': return <WiFiIcon />;
                  case 'ac': return <AirConditioningIcon />;
                  default: return null;
                }
              };
              return (
                <div
                  key={index}
                  className="group text-center"
                  style={{
                    opacity: isFeatureVisible ? 1 : 0,
                    transform: isFeatureVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`
                  }}
                >
                  <div
                    className="relative inline-flex items-center justify-center w-24 h-24 mb-5 transition-all duration-300 ease-out group-hover:-translate-y-1.5"
                    style={{
                      filter: 'drop-shadow(0 0 0 transparent)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.08))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'drop-shadow(0 0 0 transparent)';
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300 ease-out border-2"
                      style={{
                        borderColor: '#B8B8B8',
                        backgroundColor: 'white',
                        borderWidth: '2px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#111828';
                        e.currentTarget.style.borderWidth = '2.5px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#B8B8B8';
                        e.currentTarget.style.borderWidth = '2px';
                      }}
                    ></div>
                    <div
                      className="relative z-10 transition-all duration-300 ease-out"
                      style={{ transform: 'scale(1)', color: '#4A5568' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.color = '#111828';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.color = '#4A5568';
                      }}
                    >
                      {getIcon()}
                    </div>
                  </div>
                  <p
                    className="font-medium transition-all duration-300 ease-out"
                    style={{
                      color: '#111828',
                      letterSpacing: '0em'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.letterSpacing = '0.02em';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.letterSpacing = '0em';
                    }}
                  >
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative pt-8 md:pt-12 pb-20 md:pb-32 overflow-hidden" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20 items-center">
            <div className="lg:pr-8">
              <div className="inline-block mb-4">
                <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#B8B8B8' }}>Apartman részletei</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight" style={{ color: '#111828' }}>
                Kiváló <span className="font-semibold">elhelyezkedés</span>
              </h2>
              <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: '#6b7280' }}>
                A strand pár perc sétára, mégis csendes, nyugodt környezetben.
              </p>
              <div className="space-y-7">
                <div className="group flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="relative flex-shrink-0 mt-1">
                    <CheckCircle className="relative" size={22} style={{ color: '#111828' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5" style={{ color: '#111828' }}>Otthonos környezet</h3>
                    <p className="leading-relaxed" style={{ color: '#6b7280' }}>
                      Barátságos, természetes színvilág és berendezés, amely nyugalmat áraszt
                    </p>
                  </div>
                </div>
                <div className="group flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="relative flex-shrink-0 mt-1">
                    <CheckCircle className="relative" size={22} style={{ color: '#111828' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5" style={{ color: '#111828' }}>Kényelmesen felszerelt apartman</h3>
                    <p className="leading-relaxed" style={{ color: '#6b7280' }}>
                      Ami kell, az mind megvan egy kellemes balatoni pihenéshez
                    </p>
                  </div>
                </div>
                <div className="group flex items-start space-x-4 hover:translate-x-2 transition-transform duration-300">
                  <div className="relative flex-shrink-0 mt-1">
                    <CheckCircle className="relative" size={22} style={{ color: '#111828' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5" style={{ color: '#111828' }}>Kiemelt lokáció</h3>
                    <p className="leading-relaxed" style={{ color: '#6b7280' }}>
                      Percek alatt a strandon, mégis csendes, nyugodt környezetben
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group lg:-mr-12">
              <div className="relative overflow-hidden rounded-lg border-2" style={{ borderColor: '#B8B8B8' }}>
                <img
                  src="/files_8595244-2026-02-10T15-28-11-736Z-image.png"
                  alt="Fifteen Apartman belső tér"
                  className="w-full h-[500px] lg:h-[650px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#111828' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-base font-medium tracking-widest uppercase mb-4 inline-block" style={{ color: '#B8B8B8' }}>Elhelyezkedés</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" style={{ color: '#C6C6C6' }}>
              Nyugodt környezet, <span className="font-semibold">remek elhelyezkedéssel</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#C6C6C6' }}>
              Balatonföldvár békés, családbarát hely, közel a strandhoz és minden fontos szolgáltatáshoz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group relative p-10 text-center transition-all duration-500 border-2" style={{ borderColor: '#B8B8B8', backgroundColor: 'rgba(198, 198, 198, 0.1)' }}>
              <div className="relative">
                <div className="relative inline-flex items-center justify-center w-14 h-14 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 group-hover:scale-110 transition-transform duration-500" style={{ borderColor: '#C6C6C6' }}></div>
                  <Waves size={26} className="relative z-10" style={{ color: '#C6C6C6' }} />
                </div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#C6C6C6' }}>Közel a strandhoz</h3>
                <p className="leading-relaxed" style={{ color: '#C6C6C6' }}>
                  150 méter a Balaton-partig. Tiszta víz, homokos part, családbarát strand.
                </p>
              </div>
            </div>

            <div className="group relative p-10 text-center transition-all duration-500 border-2 md:translate-y-4" style={{ borderColor: '#B8B8B8', backgroundColor: 'rgba(198, 198, 198, 0.1)' }}>
              <div className="relative">
                <div className="relative inline-flex items-center justify-center w-14 h-14 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 group-hover:scale-110 transition-transform duration-500" style={{ borderColor: '#C6C6C6' }}></div>
                  <MapPin size={26} className="relative z-10" style={{ color: '#C6C6C6' }} />
                </div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#C6C6C6' }}>Sétány és kikötő</h3>
                <p className="leading-relaxed" style={{ color: '#C6C6C6' }}>
                  Esti sétákhoz és hajókázáshoz jó kiindulópont.
                </p>
              </div>
            </div>

            <div className="group relative p-10 text-center transition-all duration-500 border-2" style={{ borderColor: '#B8B8B8', backgroundColor: 'rgba(198, 198, 198, 0.1)' }}>
              <div className="relative">
                <div className="relative inline-flex items-center justify-center w-14 h-14 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 group-hover:scale-110 transition-transform duration-500" style={{ borderColor: '#C6C6C6' }}></div>
                  <Car size={26} className="relative z-10" style={{ color: '#C6C6C6' }} />
                </div>
                <h3 className="font-semibold mb-3 text-lg" style={{ color: '#C6C6C6' }}>Könnyen megközelíthető</h3>
                <p className="leading-relaxed" style={{ color: '#C6C6C6' }}>
                  Érkezés után nem kell parkolóhelyet keresni – az ingyenes parkolás az apartmannál biztosított.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-sm font-medium tracking-widest uppercase mb-4 inline-block" style={{ color: '#B8B8B8' }}>Vendégeink véleménye</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" style={{ color: '#111828' }}>
              Akik már <span className="font-semibold">nálunk pihentek</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                name: 'Balázs',
                source: 'Google',
                sourceLabel: 'Google-vélemény',
                rating: 5,
                meta: '5 napja',
                text: 'Szép, tiszta, otthonos szállás. A tulajdonosok nagyon kedvesek, barátságosak és segítőkészek. Mindenkinek ajánlom a szállást! Két gyerekkel érkeztünk négyen, kényelmesen elfértünk.'
              },
              {
                name: 'Viktória',
                source: 'Booking.com',
                sourceLabel: 'Booking.com vendégvélemény',
                rating: 5,
                meta: 'Magyarország',
                text: 'Gyönyörű, tiszta, kulturált szállás, minden igényt kielégített, egy karnyújtásnyira van a Balaton parttól. Nem beszélve a szállásadók kedvességükről, és segítő készségükről.'
              }
            ].map((review) => (
              <div
                key={review.name}
                className="relative bg-white rounded-2xl border p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                style={{ borderColor: '#E5E7EB' }}
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 opacity-10" style={{ color: '#111828' }} />
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#111828' }}>{review.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex" aria-label={`${review.rating} / 5 értékelés`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'fill-current' : ''}
                            style={{ color: i < review.rating ? '#D4A017' : '#D1D5DB' }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium tracking-wide uppercase" style={{ color: '#6b7280' }}>
                        {review.source}
                      </span>
                    </div>
                  </div>
                </div>
                <blockquote className="text-base md:text-lg leading-relaxed italic flex-1" style={{ color: '#374151' }}>
                  „{review.text}”
                </blockquote>
                <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: '#F3F4F6', color: '#9CA3AF' }}>
                  <span>{review.sourceLabel}</span>
                  <span>{review.meta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-10 md:p-12 rounded-2xl border-2" style={{ borderColor: '#B8B8B8' }}>
              <div className="text-center space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold" style={{ color: '#111828' }}>
                  Te írod az első benyomást.
                </h3>
                <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: '#6b7280' }}>
                  Most nyitottunk, ezért még kevés a vendégvéleményünk. Ha már jártál nálunk és jól érezted magad, írj pár sort e-mailben — örömmel megosztjuk a visszajelzésedet.
                </p>
                <div className="pt-4">
                  <a
                    href="mailto:info@fifteenapartman.hu?subject=Vendégvélemény%20-%20Fifteen%20Apartman&body=Szia!%0A%0AEnnyire%20voltunk%20elégedettek:%0A%0A-%20...%0A%0AÜdv,%0A[Név]"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#111828', color: '#C6C6C6' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#C6C6C6';
                      e.currentTarget.style.color = '#111828';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#111828';
                      e.currentTarget.style.color = '#C6C6C6';
                    }}
                  >
                    <Mail size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Véleményt küldök e-mailben</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 text-white overflow-hidden" style={{ backgroundColor: '#111828' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700/20 via-transparent to-transparent"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="text-xs font-medium tracking-widest uppercase mb-6 inline-block" style={{ color: '#B8B8B8' }}>Lépj velünk kapcsolatba</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" style={{ color: '#C6C6C6' }}>
            Érdekel az <span className="font-semibold">apartman?</span>
          </h2>
          <Link
            to="/ajanlatkeres"
            className="group relative inline-block"
          >
            <div className="relative px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 border-2" style={{ backgroundColor: '#C6C6C6', color: '#111828', borderColor: '#C6C6C6' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#C6C6C6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C6C6C6';
                e.currentTarget.style.color = '#111828';
              }}
            >
              Foglalás
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
