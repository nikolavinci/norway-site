'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../shared/utils/store';
import { Search, ShoppingBag, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../shared/utils/supabase';
import { Product, getProducts } from '../shared/utils/products';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const [user, setUser] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isSearchOpen && products.length === 0) {
      getProducts().then(setProducts);
    }
    
    // Prevent scrolling when search is open
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, products.length]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100 font-sans">
        <div className="w-full max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="text-2xl font-serif tracking-widest text-black flex-shrink-0 flex-1">
            <Link href="/">Pust Atelier</Link>
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
            {/* Search Trigger */}
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-black transition-colors">
              <Search size={20} />
            </button>
            
            <div className="flex gap-5 items-center">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 hover:text-black transition-colors">
                    <User size={20} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#5D4E46] truncate">{user.user_metadata?.full_name || 'My Account'}</p>
                      <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <Link href="/dashboard" className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Dashboard</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-xs font-medium text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">Log out</button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="hover:text-black transition-colors">
                  <User size={20} />
                </Link>
              )}
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

      {/* Cinematic Dark Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fade-in flex flex-col pt-24 px-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full relative">
            <button 
              onClick={() => setIsSearchOpen(false)} 
              className="absolute right-0 -top-12 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="relative border-b-2 border-white/20 pb-4 mb-12">
              <Search size={32} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              <input 
                type="text"
                autoFocus
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white text-3xl md:text-5xl font-black outline-none pl-20 pr-4 placeholder:text-white/20"
              />
            </div>

            <div className="pb-24">
              {searchQuery.length > 0 && (
                <div className="mb-6 flex justify-between items-end">
                  <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest">
                    {filteredProducts.length} Results Found
                  </h3>
                </div>
              )}
              
              {searchQuery.length === 0 && (
                <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-6">Trending Items</h3>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(searchQuery ? filteredProducts : products.slice(0, 4)).map((product) => (
                  <Link 
                    href={`/shop/${product.id}`} 
                    key={product.id} 
                    onClick={() => setIsSearchOpen(false)}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] bg-white/5 rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
                      <Image src={product.image} alt={product.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-[#AAB084] transition-colors">{product.name}</h4>
                    <p className="text-white/60 text-xs font-medium">{product.price} NOK</p>
                  </Link>
                ))}
                
                {searchQuery.length > 0 && filteredProducts.length === 0 && (
                  <div className="col-span-full text-center py-20">
                    <p className="text-white/40 text-xl font-medium mb-2">No products found</p>
                    <p className="text-white/20 text-sm">Try checking your spelling or searching for a different term.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
