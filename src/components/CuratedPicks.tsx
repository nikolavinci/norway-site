'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../shared/utils/products';
import ProductCard from './ProductCard';

export default function CuratedPicks({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('Bags');

  const tabs = ['Bags', 'Home & Living', 'Accessories'];

  const filteredProducts = products.filter((p) => {
    const isBag = p.name.toLowerCase().includes('bag') || p.name.toLowerCase().includes('tote') || p.name.toLowerCase().includes('shopper');
    if (activeTab === 'Bags') return isBag;
    if (activeTab === 'Home & Living') return p.category.toLowerCase().includes('bedding') || p.category.toLowerCase().includes('living') || p.category.toLowerCase().includes('home');
    if (activeTab === 'Accessories') return p.category.toLowerCase().includes('accessories') && !isBag;
    return true;
  }).slice(0, 4);

  // Use the filtered products directly so pills actually work instead of silently falling back
  const displayProducts = filteredProducts;

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

      <div className="max-w-[1440px] mx-auto min-h-[300px]">
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-[#5D4E46]/50">
            No products found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
