'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp",
    alt: "Bohemian Interior"
  },
  {
    image: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp",
    alt: "Organic Textiles"
  },
  {
    image: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69958c7c30895633d86899b0.webp",
    alt: "Handmade Bag"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group mt-8 md:mt-0">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Image 
            src={slide.image} 
            alt={slide.alt} 
            fill 
            priority={index === 0}
            className="object-cover" />
        </div>
      ))}

      {/* Navigation Arrows (visible on hover) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/50"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/50"
      >
        <ChevronRight size={20} />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
