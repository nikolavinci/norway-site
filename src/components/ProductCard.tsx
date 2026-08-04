'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../shared/utils/products';
import { useCartStore } from '../shared/utils/store';
import { trackSelectItem, trackAddToCart } from '../shared/utils/analytics';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  discount?: string;
}

export default function ProductCard({ product, isNew, discount }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdded) return;
    
    addItem(product);
    trackAddToCart(product, 1);
    setIsAdded(true);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="group flex flex-col text-left animate-fade-in-up">
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-[#FDFBF7] shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-[#FFD6A5] text-[#D97D27] text-[10px] font-black uppercase px-2 py-1 rounded">New</span>
          )}
          {discount && (
            <span className="bg-[#E4D1FF] text-[#6A3F9C] text-[10px] font-black uppercase px-2 py-1 rounded">{discount}</span>
          )}
        </div>

        <button aria-label="Add to wishlist" className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5D4E46]/40 hover:text-[#FF5A5F] transition-all shadow-sm">
          <Heart size={16} strokeWidth={2.5} />
        </button>

        <Link href={`/shop/${product.id}`} onClick={() => trackSelectItem(product, 'Product Card', 1)}>
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        </Link>

        <div className="absolute bottom-3 left-3 right-3 translate-y-0 lg:translate-y-[150%] lg:group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button 
            onClick={handleQuickAdd}
            className={`w-full py-3 rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2
              ${isAdded 
                ? 'bg-green-600 text-white' 
                : 'bg-white/95 backdrop-blur text-[#5D4E46] hover:bg-[#5D4E46] hover:text-white'
              }
            `}
          >
            {isAdded ? (
              <>
                <Check size={14} className="animate-bounce" /> Added!
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      <Link href={`/shop/${product.id}`} onClick={() => trackSelectItem(product, 'Product Card', 1)} className="flex flex-col flex-1 pt-1">
        <span className="text-[10px] text-[#5D4E46]/50 uppercase tracking-widest font-bold mb-1">Pust Atelier</span>
        <h2 className="font-bold text-sm text-[#5D4E46] mb-1 group-hover:text-[#A3BCB6] transition-colors line-clamp-1">{product.name}</h2>
        <p className="text-sm text-[#5D4E46] font-medium">
          {product.price} NOK
          {discount && <span className="text-[#5D4E46]/40 line-through ml-2 text-xs font-normal">{(product.price * 1.15).toFixed(0)} NOK</span>}
        </p>
      </Link>
    </div>
  );
}
