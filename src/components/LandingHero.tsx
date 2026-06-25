import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LandingHero() {
  const images = [
    '/fifteen_apartman_kezdooldal_1kep.jpg',
    '/files_8595244-2026-03-23T09-58-21-641Z-files_8595244-2026-03-23T09-47-13-684Z-image.webp',
    '/image.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-screen overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: '#1a1a1a' }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {index === 2 && (
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ filter: 'blur(32px) brightness(0.7)' }}
              />
            )}
            <img
              src={image}
              alt={`Fifteen Apartman ${index + 1}`}
              className={`relative w-full h-full ${index === 2 ? 'object-contain' : 'object-cover'}`}
              style={
                index === 1
                  ? { objectPosition: 'center 20%' }
                  : { objectPosition: 'center center' }
              }
            />
          </div>
        ))}
      </div>

      <div className="relative min-h-[60vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white font-light tracking-wide"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5)' }}
          >
            Kényelmes pihenés a Balaton partján
          </p>

          <button
            onClick={scrollToContent}
            className="group relative inline-block mt-8"
          >
            <div className="absolute inset-0 bg-black/30 rounded-full blur-xl group-hover:bg-black/40 transition-all duration-500"></div>
            <div
              className="relative border-2 border-white text-white px-12 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
            >
              Fedezd fel az apartmant
            </div>
          </button>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-all duration-300 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={40} strokeWidth={1.5} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
