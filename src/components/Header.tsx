'use client';

import { useCartStore } from '@/shared/utils/store';
import { supabase } from '@/shared/utils/supabase';
import { getProducts, Product } from '@/shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, User, ChevronRight, LogOut } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { label: 'Cushion covers', href: '/shop?category=Cushion+covers' },
  { label: 'Blankets/Shawls', href: '/shop?category=Blankets%2FShawls' },
  { label: 'Quilt bags', href: '/shop?category=Quilt+bags' },
  { label: 'Others', href: '/shop?category=Others' },
];

function HeaderContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);

  const totalItems = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const itemCount = totalItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    // 1. Initial check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else if (typeof window !== 'undefined') {
        const localUser = localStorage.getItem('pust_active_user');
        if (localUser) {
          try {
            setUser(JSON.parse(localUser));
          } catch {
            setUser(null);
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else if (typeof window !== 'undefined') {
        const localUser = localStorage.getItem('pust_active_user');
        if (localUser) {
          try {
            setUser(JSON.parse(localUser));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    });

    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const localUser = localStorage.getItem('pust_active_user');
        if (localUser) {
          try {
            setUser(JSON.parse(localUser));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pust_active_user');
      window.dispatchEvent(new Event('storage'));
    }
    await supabase.auth.signOut();
    setUser(null);
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

          {/* Center: Reorganized Categories Menu */}
          <nav className="hidden lg:flex gap-7 text-[12px] xl:text-[13px] font-semibold tracking-wider uppercase text-gray-700 justify-center">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link 
                key={cat.label} 
                href={cat.href} 
                className="hover:text-black transition-colors py-2 whitespace-nowrap"
              >
                {cat.label}
              </Link>
            ))}
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
                {PRODUCT_CATEGORIES.map((item) => (
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
                  { label: 'Returns & Refunds', href: '/refund-policy' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-[#5D4E46]/80 hover:text-[#5D4E46] hover:bg-white/60 px-3 py-2 rounded-lg transition-all flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} className="text-[#5D4E46]/20 group-hover:text-[#5D4E46]/60 transition-colors" />
                  </Link>
                ))}
              </nav>

              {/* Promo Banner in Drawer */}
              <div className="mt-8 p-4 rounded-2xl bg-[#F7F0E3] border border-[#E2DEBB]/60 text-center">
                <p className="text-xs font-bold text-[#5D4E46] uppercase tracking-wider mb-1">Welcome Offer</p>
                <p className="text-xs text-[#5D4E46]/80">Use code <span className="font-black text-[#5D4E46]">WELCOME20</span> for 20% off your first purchase.</p>
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
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 bg-[#5D4E46] text-white text-center rounded-xl text-xs font-bold block hover:bg-[#3A3532] transition-colors"
                >
                  Log in or Create Account
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-[#5D4E46]/50">Search Products</span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#5D4E46]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Search cushions, blankets, quilt bags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-2xl font-serif bg-transparent border-b-2 border-[#5D4E46]/20 pb-4 focus:outline-none focus:border-[#5D4E46] text-[#5D4E46] placeholder:text-[#5D4E46]/30"
              />
              <Search className="absolute right-0 top-2 text-[#5D4E46]/40" size={24} />
            </div>

            {searchQuery && (
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-[#5D4E46]/50 mb-4">
                  {filteredProducts.length} Results
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <Link 
                      key={product.id} 
                      href={`/shop/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="group"
                    >
                      <div className="aspect-square bg-[#FDFBF7] rounded-xl overflow-hidden mb-2 relative">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-contain p-2 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-bold text-xs text-[#5D4E46] truncate group-hover:text-[#987C6F] transition-colors">{product.name}</h4>
                      <p className="text-xs text-[#5D4E46]/70">{product.price} NOK</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100 h-20" />
    }>
      <HeaderContent />
    </Suspense>
  );
}
