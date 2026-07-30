'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../shared/utils/products';
import { useCartStore } from '../shared/utils/store';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  discount?: string;
}

export default function ProductCard({ product, isNew, discount }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toggleCart();
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col text-left animate-fade-in-up">
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-[#FDFBF7]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-[#FFD6A5] text-[#D97D27] text-[10px] font-black uppercase px-2 py-1 rounded">New</span>
          )}
          {discount && (
            <span className="bg-[#E4D1FF] text-[#6A3F9C] text-[10px] font-black uppercase px-2 py-1 rounded">{discount}</span>
          )}
        </div>

        <button className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#5D4E46]/40 hover:text-[#FF5A5F] transition-all shadow-sm">
          <Heart size={16} strokeWidth={2.5} />
        </button>

        <Link href={`/shop/${product.id}`}>
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        </Link>

        <div className="absolute bottom-3 left-3 right-3 translate-y-0 lg:translate-y-[150%] lg:group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button 
            onClick={handleQuickAdd}
            className="w-full bg-white/95 backdrop-blur text-[#5D4E46] py-3 rounded-lg text-xs font-bold shadow-md hover:bg-[#5D4E46] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </div>

      <Link href={`/shop/${product.id}`} className="flex flex-col flex-1 px-1">
        <span className="text-[10px] text-[#5D4E46]/50 uppercase tracking-widest font-bold mb-1">Pust Atelier</span>
        <h3 className="font-bold text-sm text-[#5D4E46] mb-1 group-hover:text-[#A3BCB6] transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-sm text-[#5D4E46] font-medium">
          {product.price} NOK
          {discount && <span className="text-[#5D4E46]/40 line-through ml-2 text-xs font-normal">{(product.price * 1.15).toFixed(0)} NOK</span>}
        </p>
      </Link>
    </div>
  );
}
