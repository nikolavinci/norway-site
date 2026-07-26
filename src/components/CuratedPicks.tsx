'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../shared/utils/products';

export default function CuratedPicks({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('Bags');

  const tabs = ['Bags', 'Home & Living', 'Accessories'];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'Bags') return p.category.toLowerCase().includes('bag');
    if (activeTab === 'Home & Living') return p.category.toLowerCase().includes('home') || p.category.toLowerCase().includes('textile');
    if (activeTab === 'Accessories') return !p.category.toLowerCase().includes('bag') && !p.category.toLowerCase().includes('home');
    return true;
  }).slice(0, 4);

  // Fallback if filtering is too strict
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products.slice(0, 4);

  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-[#5D4E46]">
        Authentic Craftsmanship, <br/><span className="underline decoration-[#987C6F] underline-offset-4 decoration-4">Bohemian Soul</span>
      </h1>
      <p className="text-[#5D4E46]/70 max-w-2xl mx-auto text-sm md:text-base mb-16 leading-relaxed">
        Thoughtfully designed and ethically made—every piece brings warmth and texture to your everyday life. Discover timeless essentials crafted with love.
      </p>
      
      <h2 className="text-2xl md:text-3xl font-black text-[#5D4E46] mb-8">Curated Picks for the Modern Bohemian</h2>
      
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12 text-xs font-bold">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full uppercase tracking-wider transition-colors ${
              activeTab === tab 
                ? 'bg-[#7A75A5] text-white' 
                : 'border border-[#7A75A5]/30 text-[#7A75A5] hover:bg-[#7A75A5]/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 min-h-[300px]">
        {displayProducts.map((product) => (
          <Link href={`/shop/${product.id}`} key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center animate-fade-in-up">
            <div className="relative w-full aspect-square bg-[#FDFBF7] rounded-lg mb-4 overflow-hidden">
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
            </div>
            <h3 className="font-bold text-sm text-[#5D4E46] mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-xs text-[#5D4E46]/60 font-medium">{product.price} NOK</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
