import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sofa, Tv, Wind, Sun, Bed, Shirt as ShirtIcon, Moon, DoorClosed, Refrigerator, CookingPot, Coffee, UtensilsCrossed, Wine, Table, Droplets, ShowerHead, Sparkles, ThermometerSun, Car, Lock, Armchair, TreePine, Bike, Flame, CheckCircle2, Images } from 'lucide-react';

interface SpaceDetail {
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  images: string[];
}

const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();

  if (lowerFeature.includes('kanapé') || lowerFeature.includes('fotel')) return Sofa;
  if (lowerFeature.includes('tv')) return Tv;
  if (lowerFeature.includes('légkondicionálás') || lowerFeature.includes('hőmérséklet')) return Wind;
  if (lowerFeature.includes('ablak') || lowerFeature.includes('fény')) return Sun;
  if (lowerFeature.includes('ágy') || lowerFeature.includes('matrac')) return Bed;
  if (lowerFeature.includes('ágynemű') || lowerFeature.includes('törölköző')) return ShirtIcon;
  if (lowerFeature.includes('sötétítő') || lowerFeature.includes('függöny')) return Moon;
  if (lowerFeature.includes('szekrény') || lowerFeature.includes('tárolás')) return DoorClosed;
  if (lowerFeature.includes('hűtő') || lowerFeature.includes('fagyasztó')) return Refrigerator;
  if (lowerFeature.includes('főzőlap') || lowerFeature.includes('sütő')) return CookingPot;
  if (lowerFeature.includes('kávé') || lowerFeature.includes('forraló')) return Coffee;
  if (lowerFeature.includes('edény') || lowerFeature.includes('evőeszköz')) return UtensilsCrossed;
  if (lowerFeature.includes('mosogató')) return Wine;
  if (lowerFeature.includes('asztal') || lowerFeature.includes('szék')) return Table;
  if (lowerFeature.includes('zuhanykabin masszázsfunkcióval')) return ShowerHead;
  if (lowerFeature.includes('zuhany') || lowerFeature.includes('fürdő')) return Droplets;
  if (lowerFeature.includes('tiszta') || lowerFeature.includes('hajszárító')) return Sparkles;
  if (lowerFeature.includes('fűtött')) return ThermometerSun;
  if (lowerFeature.includes('parkoló')) return Car;
  if (lowerFeature.includes('zárt') || lowerFeature.includes('biztonság')) return Lock;
  if (lowerFeature.includes('ülő') || lowerFeature.includes('pihenő')) return Armchair;
  if (lowerFeature.includes('terasz') || lowerFeature.includes('kültér')) return TreePine;
  if (lowerFeature.includes('kerékpár')) return Bike;
  if (lowerFeature.includes('grill') || lowerFeature.includes('bogrács')) return Flame;

  return CheckCircle2;
};

export default function ApartmentSpaces() {
  const [expandedSpace, setExpandedSpace] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const spaces: Record<string, SpaceDetail> = {
    kitchen: {
      title: 'Konyha & Étkező',
      shortDesc: 'Teljesen felszerelt konyha minden szükséges eszközzel és étkező résszel.',
      fullDesc: 'A konyha minden eszközzel rendelkezik, amire szükség lehet. Főzőlap, hűtő, mikrohullámú sütő és minden alapvető konyhai kellék a rendelkezésedre áll.',
      features: [
        'Kerámia főzőlap',
        'Mikrohullámú sütő',
        'Hűtőszekrény fagyasztóval',
        'Kávéfőző és vízforraló',
        'Teljes edénykészlet és evőeszközök',
        'Álló porszívóval felszerelt',
        'Étkező asztal székekkel'
      ],
      images: [
        '/gallery/konyha/image.png',
        '/gallery/konyha/konyha_fenyes_kep.jpg',
        '/gallery/konyha/konya_kozelrol.jpg',
        '/gallery/konyha/files_8595244-2026-02-08t16-28-44-728z-konyha_asztalrol.jpg',
        '/gallery/konyha/konyha_asztalon_virag_jobbik.jpg',
        '/gallery/konyha/Konyha_uj_2.jpg',
        '/gallery/konyha/Konyha_uj_3.jpg'
      ]
    },
    bedroom: {
      title: 'Hálószoba 1',
      shortDesc: 'Nyugodt, csendes hálószobák kényelmes ágyakkal és sötétítő függönnyel.',
      fullDesc: 'Az apartman hálószobái nyugodtak és csendesek. Kényelmes matracok, tiszta ágyneműk, ahol jól lehet aludni.',
      features: [
        'Kényelmes franciaágy minőségi matraccal+terasszal',
        'Friss, tiszta ágynemű minden vendég számára',
        'Sötétítő függöny a nyugodt alváshoz',
        'Légkondicionálás',
        'Tágas beépített szekrények',
        'Kanapé pihenéshez vagy extra fekhelyként',
        'A szoba vasalóval, vasalódeszkával és terasszal rendelkezik',
        'Smart TV + WiFi'
      ],
      images: [
        '/gallery/haloszobak/files_8595244-2026-02-07t15-23-11-837z-haloszoba_1_agyrol.jpg',
        '/gallery/haloszobak/files_8595244-2026-02-07t14-56-21-756z-files_8595244-2026-02-07t14-50-52-882z-ajto_bejarat_haloszoba.jpg',
        '/files_8595244-2026-01-28t08-45-41-564z-img_0390.webp',
        '/gallery/haloszobak/image.png'
      ]
    },
    bedroom2: {
      title: 'Hálószoba 2',
      shortDesc: 'Világos, tágas hálószoba kényelmes ággyal, pihenősarokkal és nyugodt hangulattal.',
      fullDesc: 'A Hálószoba 2 egy kellemes, csendes tér, ahol a kényelmes franciaágy mellett egy kanapé is helyet kapott, így tökéletes választás pihenéshez vagy akár plusz fekvőhelyként is. A nagy ablakoknak és a sötétítő függönyöknek köszönhetően nappal világos, éjszaka pedig nyugodt alvást biztosít.',
      features: [
        'Kényelmes ágyak minőségi matracokkal+terasszal.',
        'Kanapé pihenéshez vagy extra fekvőhelyként',
        'Friss ágynemű és törölköző minden vendég számára',
        'Sötétítő függöny a zavartalan alváshoz',
        'Légkondicionálás a kellemes hőmérsékletért',
        'Tágas szekrények és tárolási lehetőség',
        'Nyugodt, csendes környezet az apartmanban',
        'TV + WiFi'
      ],
      images: [
        '/gallery/haloszobak/haloszoba_2_elso.jpg',
        '/gallery/haloszobak/Haloszoba_2_bejarat_kep_ajton.jpg',
        '/files_8595244-2026-01-28t09-19-24-812z-img_0393.webp',
        '/gallery/haloszobak/agy_1.jpg'
      ]
    },
    bathroom: {
      title: 'Fürdőszoba + WC',
      shortDesc: 'Tiszta, rendezett fürdőszoba zuhanyzóval és törölközőkkel, valamint külön WC minden szükséges felszereléssel.',
      fullDesc: 'A fürdőszoba és a WC tiszta és jól felszerelt. Minden vendég számára friss törölközőket, hajszárítót és alapvető fürdőszobai felszerelést biztosítunk a kényelmes tartózkodáshoz.',
      features: [
        'Zuhanykabin masszázsfunkcióval + rádióval',
        'Friss törölközők minden vendég számára',
        'Hajszárító',
        'Tiszta csempézés',
        'Rendezett fürdőszoba + WC'
      ],
      images: [
        '/files_8595244-2026-01-28t09-59-49-027z-img_0398.webp',
        '/gallery/bathroom-wc/Wc_tabla.jpg',
        '/files_8595244-2026-01-28t10-04-40-676z-img_0396.webp',
        '/gallery/bathroom-wc/zuhanyzo.jpg'
      ]
    },
    outdoor: {
      title: 'Kültér & Parkolás',
      shortDesc: 'Ingyenes zárt parkolóhely és kültéri ülőhely az apartmanhoz tartozóan.',
      fullDesc: 'Az apartmanhoz zárt udvari rész tartozik, amely ingyenes parkolási lehetőséget és pihenésre alkalmas teret biztosít.',
      features: [
        'Ingyenes parkolóhely',
        'Zárt, biztonságos udvar',
        'Kültéri ülőhely',
        'Grill, bográcsozási lehetőség és kinyitható napernyő biztosított.'
      ],
      images: [
        '/gallery/kulter-parkolas/image%20copy.png',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T06-45-43-004Z-image.webp',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T06-45-20-153Z-image.webp',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T06-45-09-395Z-image.png',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T06-45-32-828Z-image.webp',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T06-45-51-526Z-image.webp',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T07-20-29-763Z-image.webp',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T07-20-37-732Z-image.webp',
        '/gallery/kulter-parkolas/files_8595244-2026-04-27T07-20-58-313Z-image.webp'
      ]
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-space-key');
            if (key) {
              setVisibleCards((prev) => new Set([...prev, key]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    Object.keys(cardRefs.current).forEach((key) => {
      const element = cardRefs.current[key];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSpace = (spaceKey: string) => {
    setExpandedSpace(expandedSpace === spaceKey ? null : spaceKey);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#111828' }}>
              {['Ismerd', 'meg', 'a', 'Fifteen', 'Apartman', 'tereit'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 5 ? '\u00A0' : ''}
                </span>
              ))}
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              {['Praktikus', 'terek,', 'modern', 'felszereltség,', 'kényelmes', 'pihenés.'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${(index + 6) * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 5 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {Object.entries(spaces).map(([key, space], index) => {
              const isVisible = visibleCards.has(key);
              const Icon = getFeatureIcon(space.title);

              return (
                <div
                  key={key}
                  ref={(el) => (cardRefs.current[key] = el)}
                  data-space-key={key}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all duration-500 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                    group relative`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    borderColor: '#B8B8B8'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#111828';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#B8B8B8';
                  }}
                >

                  <div className="grid md:grid-cols-2 gap-0 relative z-10">
                    <div className="h-64 md:h-auto overflow-hidden rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl relative">
                      <img
                        src={space.images[0]}
                        alt={space.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {space.images.length > 1 && (
                        <button
                          onClick={() => toggleSpace(key)}
                          className="absolute top-3 left-3 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 z-20 group/icon"
                          style={{
                            backgroundColor: 'rgba(17, 24, 40, 0.6)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(17, 24, 40, 0.8)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(17, 24, 40, 0.6)';
                          }}
                          aria-label="View more photos"
                        >
                          <Images size={20} className="text-white" />
                        </button>
                      )}
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                          style={{
                            borderColor: '#B8B8B8',
                            color: '#111828'
                          }}
                        >
                          <Icon size={20} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-light" style={{ color: '#111828' }}>
                          {space.title}
                        </h2>
                      </div>
                      <p className="mb-6 leading-relaxed" style={{ color: '#6b7280' }}>
                        {space.shortDesc}
                      </p>
                      <button
                        onClick={() => toggleSpace(key)}
                        className="inline-flex items-center font-medium transition-all duration-300 group/btn"
                        style={{ color: '#111828' }}
                      >
                        <span className="group-hover/btn:opacity-70">{expandedSpace === key ? 'Kevesebb' : 'Részletek megtekintése'}</span>
                        <ChevronDown
                          size={20}
                          className={`ml-2 transition-transform duration-300 ${
                            expandedSpace === key ? 'rotate-180' : 'rotate-0'
                          }`}
                          style={{ color: '#111828' }}
                        />
                      </button>
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedSpace === key
                        ? 'max-h-[2000px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                    style={{
                      borderTop: expandedSpace === key ? '2px solid #B8B8B8' : 'none',
                      backgroundColor: '#f9fafb'
                    }}
                  >
                    <div className="max-w-5xl mx-auto p-8 md:p-12">
                      <p className="mb-8 text-lg leading-relaxed" style={{ color: '#374151' }}>
                        {space.fullDesc}
                      </p>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-5" style={{ color: '#111828' }}>Felszereltség:</h3>
                        <div className="flex flex-wrap gap-3">
                          {space.features.map((feature, idx) => {
                            const FeatureIcon = getFeatureIcon(feature);
                            return (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-full text-sm transition-all duration-300 group/chip border-2"
                                style={{
                                  borderColor: '#B8B8B8',
                                  color: '#374151'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = '#111828';
                                  e.currentTarget.style.backgroundColor = '#f9fafb';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = '#B8B8B8';
                                  e.currentTarget.style.backgroundColor = 'white';
                                }}
                              >
                                <FeatureIcon
                                  size={16}
                                  className="transition-transform duration-300 group-hover/chip:scale-110"
                                  style={{ color: '#111828' }}
                                />
                                <span>{feature}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {space.images.length > 1 && (
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                          {space.images.slice(1).map((img, idx) => (
                            <div key={idx} className="overflow-hidden rounded-xl group/img">
                              <img
                                src={img}
                                alt={`${space.title} ${idx + 2}`}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover/img:scale-105"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        to="/ajanlatkeres"
                        className="inline-block text-white px-8 py-3 rounded-lg font-medium hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          backgroundColor: '#111828'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1f2937';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#111828';
                        }}
                      >
                        Érdekel az apartman – ajánlatot kérek
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: '#111828' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8" style={{ color: '#C6C6C6' }}>
            Tetszik, amit láttál?
          </h2>
          <Link
            to="/ajanlatkeres"
            className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 border-2"
            style={{
              backgroundColor: '#C6C6C6',
              color: '#111828',
              borderColor: '#C6C6C6'
            }}
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
          </Link>
        </div>
      </section>
    </div>
  );
}
