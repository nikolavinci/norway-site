'use client';

import Link from 'next/link';
import { useCartStore } from '../shared/utils/store';
import { Search, ShoppingBag, User } from 'lucide-react';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100 font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-2xl font-serif tracking-widest text-black flex-shrink-0 flex-1">
          <Link href="/">Pust Atteliers</Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex gap-8 text-[13px] font-medium tracking-wide uppercase text-gray-600 justify-center">
          <Link href="/shop" className="hover:text-black transition-colors py-2">Shop</Link>
          <Link href="/collections" className="hover:text-black transition-colors py-2">Collections</Link>
          <Link href="/about" className="hover:text-black transition-colors py-2">About Us</Link>
          <Link href="/contact" className="hover:text-black transition-colors py-2">Contact</Link>
        </nav>
        
        {/* Right Nav & Search */}
        <div className="flex gap-6 items-center flex-1 justify-end text-gray-700">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-48 px-3"
            />
          </div>
          
          <div className="flex gap-5 items-center">
            <Link href="/account/login" className="hover:text-black transition-colors">
              <User size={20} />
            </Link>
            <button onClick={toggleCart} className="hover:text-black transition-colors relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C88267] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
