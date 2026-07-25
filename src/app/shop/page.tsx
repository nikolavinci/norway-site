'use client';

import { useCartStore } from '../../shared/utils/store';
import { PRODUCTS } from '../../shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';

export default function Shop() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#3A3532] font-sans pt-32 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-[#3A3532]/10 pb-6">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#3A3532]">Shop Collection</h1>
          <span className="text-sm uppercase tracking-widest text-[#3A3532]/60">{PRODUCTS.length} Products</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group flex flex-col relative">
              <Link href={`/shop/${product.id}`} className="block relative aspect-[4/5] bg-white overflow-hidden rounded-2xl mb-4 shadow-sm group-hover:shadow-md transition-all">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#3A3532] px-3 py-1 text-xs tracking-widest uppercase rounded-full">
                  {product.category}
                </div>
              </Link>
              <div className="flex justify-between items-start mb-2 gap-4">
                <Link href={`/shop/${product.id}`} className="text-base font-medium text-[#3A3532] leading-tight hover:text-[#C88267] transition-colors">
                  {product.name}
                </Link>
              </div>
              <p className="text-sm text-[#3A3532]/60 mb-6 flex-1 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-serif">{product.price} NOK</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addItem(product);
                  }}
                  className="px-6 py-2 bg-transparent border border-[#3A3532]/20 rounded-full text-xs uppercase tracking-widest hover:bg-[#C88267] hover:text-white hover:border-[#C88267] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}