import { useState } from 'react';
import { X, MapPin, Camera } from 'lucide-react';

interface GalleryImage {
  url: string;
  alt: string;
  category: string;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('property');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());

  const handleImageError = (url: string) => {
    setErroredImages(prev => new Set(prev).add(url));
  };

  const categories = [
    { id: 'property', label: 'Ingatlan' },
    { id: 'area', label: 'Környék' }
  ];

  const images: GalleryImage[] = [
    { url: '/gallery/konyha/konyha_es_etkezo_kep.jpg', alt: 'Konyha és étkező', category: 'property' },
    { url: '/gallery/konyha/konyha_fenyes_kep.jpg', alt: 'Konyha', category: 'property' },
    { url: '/gallery/konyha/konya_kozelrol.jpg', alt: 'Konyha közelről', category: 'property' },
    { url: '/gallery/konyha/konyha_asztalrol.jpg', alt: 'Konyha asztalról', category: 'property' },
    { url: '/gallery/konyha/konyha_asztalon_virag_jobbik.jpg', alt: 'Konyha virággal', category: 'property' },
    { url: '/gallery/haloszobak/haloszoba_1_agyrol.jpg', alt: 'Hálószoba 1 ágyról', category: 'property' },
    { url: '/gallery/haloszobak/ajto_bejarat_haloszoba.jpg', alt: 'Hálószoba bejárat', category: 'property' },
    { url: '/gallery/haloszobak/haloszoba_1_tvrol.jpg', alt: 'Hálószoba 1 TV-től', category: 'property' },
    { url: '/gallery/haloszobak/haloszoba_2_galreia_fokep.jpg', alt: 'Hálószoba 2', category: 'property' },
    { url: '/gallery/haloszobak/haloszoba_2_felszert.jpg', alt: 'Hálószoba 2 felszerelt', category: 'property' },
    { url: '/gallery/haloszobak/szoba_2_felsz_2.jpg', alt: 'Hálószoba 2 részlet', category: 'property' },
    { url: '/gallery/bathroom-wc/furdo_wc_1.jpg', alt: 'Fürdőszoba', category: 'property' },
    { url: '/gallery/bathroom-wc/furdo_wc_2.jpg', alt: 'WC', category: 'property' },
    { url: '/gallery/bathroom-wc/furdo_wc_3.jpg', alt: 'Zuhanyzó', category: 'property' },
    { url: '/gallery/kulter-parkolas/kulter_2.jpg', alt: 'Kültéri terasz', category: 'property' },
    { url: '/gallery/bathroom-wc/Wc_tabla.jpg', alt: 'WC tábla', category: 'property' },
    { url: '/gallery/haloszobak/Haloszoba_2_bejarat_kep_ajton.jpg', alt: 'Hálószoba bejárat tábla', category: 'property' },
    { url: '/gallery/konyha/files_8595244-2026-02-13T12-49-41-787Z-konyha_kep.jpg', alt: 'Konyha és étkező átfogó', category: 'property' },
    { url: '/gallery/konyha/Konyha_uj_2.jpg', alt: 'Konyha panoráma', category: 'property' },
    { url: '/gallery/konyha/Konyha_uj_3.jpg', alt: 'Konyha virágokkal', category: 'property' },
    { url: '/gallery/kulter-parkolas/Fifteen_apartman_kezdooldal_1kep.jpg', alt: 'Fifteen Apartman áttekintés', category: 'property' },
    { url: '/gallery/kornyek/image.png', alt: 'Környék térképe', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-03-19T14-32-27-769Z-image.webp', alt: 'Kerti ülőhely és grillező', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-03-19T14-34-17-337Z-image.webp', alt: 'Erkély kilátással', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-03-19T19-13-50-778Z-image.webp', alt: 'Kerti ülőhely napernyővel', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T17-38-12-211Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 1', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T17-38-21-037Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 2', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T17-38-29-999Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 3', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T17-38-34-232Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 4', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T17-38-37-014Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 5', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T18-12-14-101Z-files_8595244-2026-04-26T18-08-44-031Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 6', category: 'property' },
    { url: '/gallery/ingatlan/files_8595244-2026-04-26T18-12-16-979Z-files_8595244-2026-04-26T18-09-25-928Z-image.webp', alt: 'Fifteen Apartman - Ingatlan 7', category: 'property' },
    { url: '/gallery/kornyek/files_8595244-2026-01-28t07-33-34-002z-files_8595244-2026-01-27t15-01-34-570z-balatonfoldvar_keleti_strand_7.jpg', alt: 'Balatonfölvári keleti strand', category: 'area' },
    { url: '/gallery/kornyek/files_8595244-2026-01-28t07-33-23-532z-files_8595244-2026-01-27t15-06-48-835z-balatonfoldvar-kilato.webp', alt: 'Balatonföldvári kilátó', category: 'area' },
    { url: '/gallery/kornyek/files_8595244-2026-01-28t07-31-08-027z-files_8595244-2026-01-27t15-09-15-108z-10913-balatonfoldvari-vitorlaskikoto-vitorlazas.jpg', alt: 'Balatonföldvári vitorláskikötő', category: 'area' },
    { url: '/gallery/kornyek/files_8595244-2026-01-28t07-29-52-127z-files_8595244-2026-01-27t15-31-21-396z-wittman.jpg', alt: 'Wittmann étterem', category: 'area' },
    { url: '/gallery/kornyek/files_8595244-2026-01-28t07-29-35-299z-files_8595244-2026-01-27t15-36-16-283z-29738.webp', alt: 'Balatoni sétány', category: 'area' },
    { url: '/gallery/kornyek/download.jpg', alt: 'Balatonföldi I ♥ felirat', category: 'area' },
    { url: '/gallery/kornyek/balatonfoldvar.png', alt: 'Balatonföldi kikötő madártávlatból', category: 'area' },
    { url: '/gallery/kornyek/tavcso-balatonfoldvar-kilato-muzeum-balatontipp-gyorffya.jpg', alt: 'Kilátó távcsővel', category: 'area' },
    { url: '/gallery/kornyek/fonix-hotel-balatonfoldvar-photo-7.jpg', alt: 'Vitorláskikötő panoráma', category: 'area' },
    { url: '/gallery/kornyek/image.png', alt: 'Környék térképe', category: 'area' }
  ];

  const filteredImages = images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: '#111828' }}>
              {['Galéria'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-xl" style={{ color: '#6b7280' }}>
              {['Tekintsd', 'meg', 'apartmanunk', 'és', 'környezetének', 'fotóit'].map((word, index) => (
                <span
                  key={index}
                  className="inline-block opacity-0 animate-fadeInSlide"
                  style={{
                    animationDelay: `${(index + 1) * 0.1}s`,
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

      <section className="py-8 bg-white border-b-2" style={{ borderBottomColor: '#B8B8B8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-6 py-2 font-medium transition-all border-2 rounded-lg"
                style={{
                  backgroundColor: selectedCategory === cat.id ? '#111828' : 'white',
                  color: selectedCategory === cat.id ? '#C6C6C6' : '#111828',
                  borderColor: selectedCategory === cat.id ? '#111828' : '#B8B8B8'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory === 'property' && (
        <section className="pt-12 md:pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-center" style={{ color: '#111828' }}>
              Videós bemutató
            </h2>

            <div className="flex justify-center mb-8 animate-fadeInSlide">
              <div
                className="inline-flex items-center gap-3 md:gap-4 px-5 md:px-7 py-3 md:py-4 rounded-full bg-white relative"
                style={{
                  boxShadow: '0 4px 20px rgba(11, 20, 48, 0.08), 0 1px 3px rgba(11, 20, 48, 0.06)',
                  border: '1px solid rgba(11, 20, 48, 0.06)',
                }}
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-[1px] h-px w-16 md:w-24"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(11, 20, 48, 0.5), transparent)',
                  }}
                />
                <div
                  className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#0b1430' }}
                >
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p
                    className="text-sm md:text-base font-medium leading-tight"
                    style={{ color: '#0b1430' }}
                  >
                    Mindössze 150 méterre a strandtól
                  </p>
                  <p
                    className="text-xs md:text-sm mt-0.5 leading-tight"
                    style={{ color: '#6b7280' }}
                  >
                    Pár perc séta, és már a Balaton partján vagy.
                  </p>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg shadow-md bg-black">
              <iframe
                src="https://www.youtube.com/embed/nyxmelxaG2g?rel=0&modestbranding=1"
                title="Fifteen Apartman bemutató videó"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </section>
      )}

      {selectedCategory === 'property' && (
        <section className="pt-12 md:pt-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center rounded-2xl bg-white px-6 py-8 md:px-10 md:py-10 animate-fadeInSlide"
              style={{
                boxShadow: '0 4px 24px rgba(11, 20, 48, 0.06), 0 1px 3px rgba(11, 20, 48, 0.04)',
                border: '1px solid rgba(11, 20, 48, 0.05)',
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span
                  className="h-px w-10 md:w-14"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(11, 20, 48, 0.4))' }}
                />
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full"
                  style={{ backgroundColor: '#0b1430' }}
                >
                  <Camera className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <span
                  className="h-px w-10 md:w-14"
                  style={{ background: 'linear-gradient(90deg, rgba(11, 20, 48, 0.4), transparent)' }}
                />
              </div>
              <h2
                className="text-2xl md:text-3xl font-light tracking-tight"
                style={{ color: '#0b1430' }}
              >
                Képek az ingatlanról
              </h2>
              <p
                className="mt-3 text-sm md:text-base leading-relaxed max-w-xl mx-auto"
                style={{ color: '#6b7280' }}
              >
                Tekintsd meg apartmanunk belső tereit és hangulatát képekben.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredImages.filter(image => !erroredImages.has(image.url)).map((image, index) => (
              <div
                key={index}
                onClick={() => setLightboxImage(image.url)}
                className="group relative overflow-hidden cursor-pointer bg-gray-100 transition-all duration-300 rounded-lg shadow-md hover:shadow-xl"
                style={{ height: '250px' }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ display: 'block' }}
                  onError={() => handleImageError(image.url)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="rounded-full p-3 bg-white shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#111828' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: '#B8B8B8' }}>Nincs megjeleníthető kép ebben a kategóriában.</p>
            </div>
          )}
        </div>
      </section>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full transition-all hover:scale-110 shadow-lg z-10 border-2"
            style={{ backgroundColor: '#C6C6C6', borderColor: '#111828' }}
            aria-label="Bezárás"
          >
            <X size={28} style={{ color: '#111828' }} />
          </button>
          <div className="relative max-w-7xl max-h-full flex items-center justify-center">
            <img
              src={lightboxImage}
              alt="Nagyított kép"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
