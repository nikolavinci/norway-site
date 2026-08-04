'use client';

import { Product } from '@/shared/utils/products';
import ProductCard from './ProductCard';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

export default function FeaturedCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product, index) => (
            <div key={product.id} className="pl-4 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0">
              <ProductCard 
                product={product} 
                isNew={true} 
                discount={index === 1 ? '-15%' : undefined} 
              />
            </div>
          ))}
        </div>
      </div>
      <button 
        aria-label="Previous slide"
        onClick={scrollPrev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#5D4E46] hover:bg-[#FDFBF7] transition-colors z-10 hidden md:flex"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        aria-label="Next slide"
        onClick={scrollNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#5D4E46] hover:bg-[#FDFBF7] transition-colors z-10 hidden md:flex"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
