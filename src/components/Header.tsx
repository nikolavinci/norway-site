'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../shared/utils/store';
import { Search, ShoppingBag, User, X, LayoutGrid, List, Menu, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../shared/utils/supabase';
import { Product, getProducts } from '../shared/utils/products';
import ProductCard from './ProductCard';

export default function Header() {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const [user, setUser] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchLayout, setSearchLayout] = useState<'grid' | 'list'>('grid');

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
    
    // Prevent scrolling when search or navigation menu is open
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, isMobileMenuOpen, products.length]);

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
          {/* Left: Hamburger & Logo */}
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <button 
              aria-label="Open menu" 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="p-2 -ml-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            >
              <Menu size={22} />
            </button>
            <div className="text-2xl font-serif tracking-widest text-black flex-shrink-0">
              <Link href="/">Pust Atelier</Link>
            </div>
          </div>

          {/* Center: Categories */}
          <nav className="hidden md:flex gap-8 text-[13px] font-semibold tracking-wider uppercase text-gray-700 justify-center">
            <Link href="/shop?category=Bag" className="hover:text-black transition-colors py-2">Bags</Link>
            <Link href="/shop?category=Cushion" className="hover:text-black transition-colors py-2">Cushions</Link>
            <Link href="/shop?category=Shawl" className="hover:text-black transition-colors py-2">Shawls</Link>
          </nav>
          
          {/* Right Nav & Search */}
          <div className="flex gap-6 items-center flex-1 justify-end text-gray-700">
            {/* Search Trigger */}
            <button aria-label="Open search" onClick={() => setIsSearchOpen(true)} className="hover:text-black transition-colors">
              <Search size={20} />
            </button>
            
            <div className="flex gap-5 items-center">
              {user ? (
                <div className="relative">
                  <button aria-label="Toggle user menu" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 hover:text-black transition-colors">
                    <User size={20} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg transition-all z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-xs font-bold text-[#5D4E46] truncate">{user.user_metadata?.full_name || 'My Account'}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Dashboard</Link>
                        <button onClick={() => { handleLogout(); setIsUserMenuOpen(false); }} className="px-4 py-2 text-xs font-medium text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">Log out</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link aria-label="Login" href="/login" className="hover:text-black transition-colors">
                  <User size={20} />
                </Link>
              )}
              <button aria-label="Open cart" onClick={toggleCart} className="hover:text-black transition-colors relative">
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

      {/* Slide-out Navigation Drawer from Left */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 max-w-sm w-full bg-[#FDFBF7] shadow-2xl z-50 flex flex-col font-sans text-[#5D4E46] transition-transform">
            {/* Drawer Top Header */}
            <div className="px-6 py-5 border-b border-[#5D4E46]/10 flex justify-between items-center bg-white">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif tracking-widest text-black"
              >
                Pust Atelier
              </Link>
              <button 
                aria-label="Close menu" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#5D4E46]/60 hover:text-[#5D4E46] p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#987C6F] mb-3">
                Categories
              </span>
              <nav className="flex flex-col space-y-1 mb-6">
                {[
                  { label: 'Bags', href: '/shop?category=Bag' },
                  { label: 'Cushions', href: '/shop?category=Cushion' },
                  { label: 'Shawls', href: '/shop?category=Shawl' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-bold text-[#5D4E46] hover:text-[#7A75A5] hover:bg-white/60 px-3 py-2 rounded-xl transition-all flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className="text-[#5D4E46]/30 group-hover:text-[#7A75A5] transition-colors" />
                  </Link>
                ))}
              </nav>

              <span className="text-[10px] uppercase tracking-widest font-bold text-[#987C6F] mb-3">
                Information & Pages
              </span>
              <nav className="flex flex-col space-y-1">
                {[
                  { label: 'All Collections', href: '/collections' },
                  { label: 'Shop All Products', href: '/shop' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Shipping & Returns', href: '/shipping' },
                  { label: 'Refund Policy', href: '/refund-policy' },
                  { label: 'Legal Notice', href: '/legal' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-[#5D4E46]/80 hover:text-[#5D4E46] hover:bg-white/60 px-3 py-1.5 rounded-lg transition-all flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} className="text-[#5D4E46]/20 group-hover:text-[#5D4E46]/60 transition-colors" />
                  </Link>
                ))}
              </nav>

              {/* Promo Banner in Drawer */}
              <div className="mt-8 p-4 rounded-2xl bg-[#F7F0E3] border border-[#E2DEBB]/60 text-center">
                <p className="text-xs font-bold text-[#5D4E46] uppercase tracking-wider mb-1">Welcome Offer</p>
                <p className="text-xs text-[#5D4E46]/80">Use code <span className="font-black text-[#5D4E46]">WELCOME</span> for 15% off your first purchase.</p>
              </div>
            </div>

            {/* Drawer Bottom Bar: Account & Logout */}
            <div className="p-6 border-t border-[#5D4E46]/10 bg-white">
              {user ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-xs font-bold text-[#5D4E46] truncate">{user.email}</p>
                  <div className="flex gap-4 pt-2">
                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs font-bold text-[#5D4E46] hover:text-[#7A75A5] transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center bg-[#5D4E46] text-white py-3 rounded-full font-bold text-sm hover:bg-[#3A3532] transition-colors shadow-sm"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      {/* Cinematic Dark Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-fade-in flex flex-col pt-24 px-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full relative">
            <button 
              aria-label="Close search"
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
                className="w-full bg-transparent text-white text-xl md:text-5xl font-black outline-none pl-16 md:pl-20 pr-4 placeholder:text-white/20"
              />
            </div>

            <div className="pb-24">
              <div className="mb-6 flex justify-between items-end">
                <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest">
                  {searchQuery.length > 0 ? `${filteredProducts.length} Results Found` : 'Trending Items'}
                </h3>
                <div className="flex items-center gap-2 md:hidden">
                  <button aria-label="Grid view" onClick={() => setSearchLayout('grid')} className={`p-1.5 rounded-md transition-colors ${searchLayout === 'grid' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/60'}`}>
                    <LayoutGrid size={18} />
                  </button>
                  <button aria-label="List view" onClick={() => setSearchLayout('list')} className={`p-1.5 rounded-md transition-colors ${searchLayout === 'list' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/60'}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div className={searchLayout === 'grid' ? "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" : "flex flex-col gap-4"}>
                {(searchQuery ? filteredProducts : products.slice(0, 4)).map((product) => (
                  searchLayout === 'grid' ? (
                    <div key={product.id} onClick={() => setIsSearchOpen(false)}>
                      <ProductCard product={product} />
                    </div>
                  ) : (
                    <Link 
                      href={`/shop/${product.id}`} 
                      key={product.id} 
                      onClick={() => setIsSearchOpen(false)}
                      className="group flex gap-4 items-center bg-white/5 rounded-xl p-3 border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-lg overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-[#AAB084] transition-colors">{product.name}</h4>
                        <p className="text-white/60 text-xs font-medium">{product.price} NOK</p>
                      </div>
                    </Link>
                  )
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
