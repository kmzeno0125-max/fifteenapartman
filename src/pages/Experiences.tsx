import { Link } from 'react-router-dom';
import { Waves, Anchor, MapPin, Wine, Camera } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Experiences() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const experiences = [
    {
      icon: Waves,
      title: 'Balatonföldvár Keleti Strand',
      distance: 'Strandok és vízparti élmények',
      description: 'Balatonföldvár egyik legnépszerűbb strandja, nagy füves és homokos partszakasszal, napozóterületekkel és sportolási lehetőségekkel. A strand ideális fürdőzéshez, strandröplabdához, kosárlabdához, valamint SUP-ozáshoz is. Tökéletes választás családoknak és aktív pihenéshez egyaránt.',
      image: '/files_8595244-2026-01-28t07-33-34-002z-files_8595244-2026-01-27t15-01-34-570z-balatonfoldvar_keleti_strand_7.jpg'
    },
    {
      icon: Camera,
      title: 'Balatonföldvári Kilátó',
      distance: 'Kultúra & panoráma',
      description: 'A város egyik legszebb panorámája innen tárul eléd: lenyűgöző kilátás a Balatonra és Balatonföldvárra. Ideális hely naplementenézéshez, fotózáshoz vagy egy romantikus sétához. Az épületben helytörténeti kiállítás is található, amely tovább gazdagítja az élményt.',
      image: '/files_8595244-2026-01-28t07-33-23-532z-files_8595244-2026-01-27t15-06-48-835z-balatonfoldvar-kilato.webp'
    },
    {
      icon: Anchor,
      title: 'Kvassay sétány & Vitorlás kikötő',
      distance: 'Kultúra & panoráma',
      description: 'Több mint egy kilométer hosszú, platánfákkal szegélyezett sétány, amely Balatonföldvár igazi balatoni hangulatát adja vissza. A kikötő környékén kávézók, reggelizők és esti programlehetőségek várják a látogatókat. Ideális hely egy kellemes esti sétához.',
      image: '/files_8595244-2026-01-28t07-31-08-027z-files_8595244-2026-01-27t15-09-15-108z-10913-balatonfoldvari-vitorlaskikoto-vitorlazas.jpg'
    },
    {
      icon: Wine,
      title: 'Gasztronómia & vendéglátás',
      distance: 'Éttermek & gasztro-tippek',
      description: 'Pite Porta Kávézó és sütiző: Hangulatos kávézó kiváló kávékkal és friss süteményekkel. Tökéletes választás egy délutáni pihenéshez vagy könnyed beszélgetéshez. Helka Pub & Terász – Helka Sörfőzde: Barátságos kerthelyiség, helyben főzött sörkülönlegességekkel és laza hangulattal. Ideális hely egy kellemes esti beszélgetéshez vagy baráti találkozóhoz.',
      image: '/files_8595244-2026-01-28t07-29-52-127z-files_8595244-2026-01-27t15-31-21-396z-wittman.jpg'
    },
    {
      icon: MapPin,
      title: 'Vaskori földvár és Kelta sétány',
      distance: 'Kötelező helyi látnivaló',
      description: 'Balatonföldvár nevét a vaskori földvár maradványairól kapta. A környéken sétálva ma is felfedezhetők az egykori erődítések nyomai, amelyek különleges történelmi hangulatot adnak egy könnyű kiránduláshoz.',
      image: '/files_8595244-2026-01-28t07-29-35-299z-files_8595244-2026-01-27t15-36-16-283z-29738.webp'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#111828' }}>
              {['Fedezd', 'fel', 'Balatonföldvárt', 'és', 'környékét'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 4 ? '\u00A0' : ''}
                </span>
              ))}
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              {['Ideális', 'kiindulópont', 'a', 'Balaton', 'felfedezéséhez', '–', 'strand,', 'kultúra,', 'gasztronómia', 'és', 'természet', 'egy', 'helyen'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${(index + 5) * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}{index < 12 ? '\u00A0' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              const isEven = index % 2 === 0;
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`bg-white rounded-2xl overflow-hidden border-2 group relative transition-all duration-500 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{
                    borderColor: '#B8B8B8',
                    transitionDelay: `${index * 150}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#111828';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#B8B8B8';
                  }}
                >

                  <div className={`grid md:grid-cols-2 gap-0 ${!isEven ? 'md:grid-flow-dense' : ''}`}>
                    <div className={`h-80 md:h-auto overflow-hidden ${!isEven ? 'md:col-start-2' : ''}`}>
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div
                      className="p-10 md:p-14 flex flex-col justify-center relative z-10"
                      style={(index === 1 || index === 3) ? { backgroundColor: '#111828' } : {}}
                    >
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 mb-6 transition-all duration-300 group-hover:scale-110"
                        style={{
                          borderColor: (index === 1 || index === 3) ? '#d4d4d4' : '#B8B8B8',
                          color: (index === 1 || index === 3) ? '#d4d4d4' : '#111828'
                        }}
                      >
                        <Icon size={28} />
                      </div>

                      <h2
                        className="text-3xl md:text-4xl mb-3"
                        style={{
                          color: (index === 1 || index === 3) ? '#b8b8b8' : '#111828',
                          fontWeight: (index === 1 || index === 3) ? 600 : 300
                        }}
                      >
                        {experience.title}
                      </h2>

                      <p
                        className="text-xs font-semibold mb-5 uppercase tracking-wider"
                        style={{ color: (index === 1 || index === 3) ? '#d4d4d4' : '#111828' }}
                      >
                        {experience.distance}
                      </p>

                      <p
                        className="leading-relaxed text-base"
                        style={{
                          color: (index === 1 || index === 3) ? '#e5e5e5' : '#6b7280',
                          lineHeight: (index === 1 || index === 3) ? '1.75' : '1.625'
                        }}
                      >
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 md:p-16 rounded-2xl text-center border-2" style={{ backgroundColor: '#f9fafb', borderColor: '#B8B8B8' }}>
            <h2 className="text-3xl md:text-4xl font-light mb-8" style={{ color: '#111828' }}>
              Miért Balatonföldvár?
            </h2>
            <div className="max-w-2xl mx-auto space-y-5 leading-relaxed mb-10 text-base md:text-lg" style={{ color: '#6b7280' }}>
              <p>
                Balatonföldvár a Balaton déli partjának nyugodt, mégis minden igényt kielégítő települése.
                Nem a tömegturizmus jellemzi, hanem a családias hangulat és a vendégközpontúság.
              </p>
              <p>
                A strand közel van, a programlehetőségek bőségesek, mégis este nyugalomban pihenhetsz.
                Tökéletes választás pároknak, családoknak és baráti társaságoknak egyaránt.
              </p>
            </div>
            <Link
              to="/ajanlatkeres"
              className="inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 border-2"
              style={{
                backgroundColor: '#111828',
                color: '#C6C6C6',
                borderColor: '#111828'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C6C6C6';
                e.currentTarget.style.color = '#111828';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111828';
                e.currentTarget.style.color = '#C6C6C6';
              }}
            >
              Pihenést tervezek – Foglalás
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
