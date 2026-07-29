'use client';

import { useCartStore } from '@/shared/utils/store';
import { getProducts, Product } from '@/shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Loader2, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#987C6F]" />
      </div>
    );
  }

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter and sort products
  let displayProducts = [...products];
  
  if (selectedCategory !== 'All') {
    displayProducts = displayProducts.filter(p => p.category === selectedCategory);
  }

  if (sortOrder === 'price-low') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-high') {
    displayProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-[#5D4E46]/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#5D4E46] mb-2">All Products</h1>
            <p className="text-[#5D4E46]/60 text-sm max-w-md">Discover our full collection of ethically sourced, handmade bohemian pieces.</p>
          </div>
          <span className="text-sm uppercase tracking-widest text-[#5D4E46]/60 mt-4 md:mt-0">{displayProducts.length} Products</span>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-12 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5D4E46]/50">
              <Filter size={14} /> Filter:
            </span>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-[#5D4E46] text-white' : 'bg-gray-100 text-[#5D4E46] hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5D4E46]/50">Sort by:</span>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-100 border-none outline-none text-xs font-bold uppercase tracking-wider text-[#5D4E46] rounded-full px-4 py-2 cursor-pointer focus:ring-2 focus:ring-[#5D4E46]/20"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}