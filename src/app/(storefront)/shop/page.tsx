'use client';

import { useCartStore } from '@/shared/utils/store';
import { getProducts, Product, CATEGORIES } from '@/shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { trackViewItemList } from '@/shared/utils/analytics';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  // Ordered categories matching navigation
  const filterCategories = ['All', ...CATEGORIES];

  // Filter and sort products
  const displayProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'All') {
      const target = selectedCategory.toLowerCase().trim();
      result = result.filter(p => {
        const cat = p.category.toLowerCase().trim();
        if (cat === target) return true;
        if (target === 'cushion covers' && (cat.includes('cushion') || cat === 'cushion')) return true;
        if (target === 'blankets/shawls' && (cat.includes('blanket') || cat.includes('shawl') || cat === 'shawl')) return true;
        if (target === 'quilt bags' && (cat.includes('bag') || cat === 'bag')) return true;
        if (target === 'others' && cat === 'others') return true;
        return false;
      });
    }
    if (sortOrder === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, selectedCategory, sortOrder]);

  useEffect(() => {
    if (displayProducts.length > 0) {
      trackViewItemList(displayProducts, `Shop Page - ${selectedCategory}`);
    }
  }, [displayProducts, selectedCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#987C6F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-[#5D4E46]/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#5D4E46] mb-2 font-black">All Products</h1>
            <p className="text-[#5D4E46]/60 text-sm max-w-md">Discover our full collection of ethically sourced, handmade Nepalese pieces.</p>
          </div>
          <span className="text-sm uppercase tracking-widest text-[#5D4E46]/60 mt-4 md:mt-0 font-bold">{displayProducts.length} Products</span>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-12 gap-4">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5D4E46]/50 shrink-0">
              <Filter size={14} /> Filter:
            </span>
            {filterCategories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-colors touch-manipulation ${selectedCategory === cat ? 'bg-[#5D4E46] text-white' : 'bg-gray-100 text-[#5D4E46] hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
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

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#987C6F]" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
