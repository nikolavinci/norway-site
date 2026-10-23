'use client';

import { useCartStore } from '@/shared/utils/store';
import { getProductById, getProducts, Product } from '@/shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { supabase } from '@/shared/utils/supabase';
import { useState, useEffect } from 'react';
import { Minus, Plus, ChevronLeft, ChevronRight, Star, Heart, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { trackViewItem, trackAddToCart } from '@/shared/utils/analytics';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const WavyDivider = ({ fill, flip = false }: { fill: string, flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} bg-[#FDFBF7]`}>
    <svg className="relative block w-full h-[40px] md:h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" className={fill}></path>
    </svg>
  </div>
);

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const p = await getProductById(id as string);
      if (p) {
        setProduct(p);
        setSelectedImage(p.image);
        trackViewItem(p);
        
        // Native Edge Function Tracking
        let sessionId = localStorage.getItem('guest_session_id');
        if (!sessionId) {
          sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('guest_session_id', sessionId);
        }
        
        supabase.functions.invoke('track-view', {
          body: { productId: p.id, sessionId }
        }).catch(err => console.error("Error tracking native view:", err));

        const all = await getProducts();
        setRelatedProducts(all.filter(x => x.id !== p.id).slice(0, 4));
      }
      setIsLoading(false);
    }
    loadData();
  }, [id]);

  // Dynamic Date calculation
  const getDeliveryDates = () => {
    const start = new Date();
    start.setDate(start.getDate() + 3);
    const end = new Date();
    end.setDate(end.getDate() + 5);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return `${start.toLocaleDateString('no-NO', options)} - ${end.toLocaleDateString('no-NO', options)}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#987C6F]" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-22 sm:pt-28 md:pt-32 pb-16 lg:pb-0">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-4 sm:px-6 mb-16 lg:mb-24">
        
        {/* Left Column: Image Showcase & Thumbnails */}
        <div className="lg:col-span-6 flex flex-col gap-2.5 sm:gap-3">
          {/* Main Featured Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] max-h-[360px] sm:max-h-[440px] lg:max-h-[460px] bg-[#F7F4EE] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs flex items-center justify-center p-2 sm:p-3">
            <Image 
              src={selectedImage || product.image} 
              alt={product.name} 
              fill 
              className="object-contain p-1.5 sm:p-2" 
              priority 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
            />
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 backdrop-blur rounded-full text-[#5D4E46] hover:text-[#FF5A5F] hover:bg-white transition-all shadow-md touch-manipulation"
              title="Add to Favorites"
            >
              <Heart size={18} strokeWidth={2.5} fill={isFavorite ? "#FF5A5F" : "none"} className={isFavorite ? "text-[#FF5A5F]" : ""} />
            </button>
          </div>

          {/* Alternate / Gallery Thumbnails below the featured image */}
          <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {/* Primary Image Thumbnail */}
            <button 
              type="button"
              onClick={() => setSelectedImage(product.image)}
              className={`relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all shadow-xs touch-manipulation ${
                (selectedImage === product.image || !selectedImage) 
                  ? 'border-[#987C6F] ring-2 ring-[#987C6F]/20' 
                  : 'border-transparent hover:border-[#987C6F]/50 opacity-80'
              }`}
            >
              <Image src={product.image} alt={`${product.name} main thumbnail`} fill className="object-contain p-1" />
            </button>

            {/* Gallery Images */}
            {product.gallery && product.gallery.length > 0 ? (
              product.gallery.map((imgUrl, i) => (
                <button 
                  key={i} 
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all shadow-xs touch-manipulation ${
                    selectedImage === imgUrl 
                      ? 'border-[#987C6F] ring-2 ring-[#987C6F]/20' 
                      : 'border-transparent hover:border-[#987C6F]/50 opacity-80'
                  }`}
                >
                  <Image src={imgUrl} alt={`${product.name} gallery ${i + 1}`} fill className="object-contain p-1" />
                </button>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <button 
                  key={i} 
                  type="button"
                  onClick={() => setSelectedImage(product.image)}
                  className={`relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-white rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all shadow-xs opacity-60 hover:opacity-100 touch-manipulation ${
                    selectedImage === product.image ? 'border-gray-200' : 'border-transparent'
                  }`}
                >
                  <Image src={product.image} alt={`${product.name} angle ${i}`} fill className="object-contain p-1" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Key Details, Purchase Actions & Product Description */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          {/* Header & Price Info */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#5D4E46] leading-tight mb-2 font-serif">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#5D4E46]">{product.price.toLocaleString('no-NO')} NOK</span>
              <span className="text-xs text-[#5D4E46]/60 uppercase tracking-wider font-medium">Inkl. MVA</span>
              <div className="flex items-center gap-1.5 ml-2 text-xs text-[#5D4E46]/80 font-bold">
                <div className="w-2 h-2 rounded-full bg-[#AAB084] animate-pulse" />
                <span>På lager (In stock)</span>
              </div>
            </div>
          </div>

          {/* Quick Buy Card - Placed firmly above the fold on mobile and desktop */}
          <div className="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#5D4E46]/10 shadow-xs sm:shadow-sm mb-5 sm:mb-6">
            <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-4 mb-3">
              {/* Quantity */}
              <div className="flex items-center">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mr-2 sm:mr-3">Antall:</span>
                <div className="flex items-center border border-[#5D4E46]/20 rounded-lg sm:rounded-xl bg-[#FDFBF7] h-9 sm:h-11 w-28 sm:w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="w-8 sm:w-10 h-full flex items-center justify-center text-[#5D4E46]/70 hover:text-[#5D4E46] hover:bg-[#5D4E46]/5 rounded-l-lg sm:rounded-l-xl transition-colors touch-manipulation"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="flex-1 text-center text-xs sm:text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="w-8 sm:w-10 h-full flex items-center justify-center text-[#5D4E46]/70 hover:text-[#5D4E46] hover:bg-[#5D4E46]/5 rounded-r-lg sm:rounded-r-xl transition-colors touch-manipulation"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Delivery notice */}
              <div className="flex-1 text-[10px] sm:text-[11px] text-[#5D4E46]/80 bg-[#FDFBF7] px-2.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-[#5D4E46]/5 flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="shrink-0">🚚</span>
                <span className="truncate">Levering i Norge: <strong className="text-[#5D4E46]">{getDeliveryDates()}</strong></span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 mb-3 sm:mb-4">
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                  trackAddToCart(product, quantity);
                }}
                className="flex-1 py-3 sm:py-3.5 border-2 border-[#5D4E46] rounded-xl text-xs sm:text-sm font-bold text-[#5D4E46] hover:bg-[#5D4E46] hover:text-white transition-all text-center shadow-xs touch-manipulation active:scale-[0.98]"
              >
                Legg i handlekurv
              </button>
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                  trackAddToCart(product, quantity);
                  router.push('/checkout');
                }}
                className="flex-1 py-3 sm:py-3.5 bg-[#5D4E46] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#3A3532] transition-all shadow-md text-center touch-manipulation active:scale-[0.98]"
              >
                Kjøp nå (Buy it Now)
              </button>
            </div>

            {/* Norwegian Payment Options */}
            <div className="pt-2.5 sm:pt-3 border-t border-[#5D4E46]/10 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5D4E46]/60">Sikker betaling:</span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 items-center">
                <div title="Vipps" className="h-4.5 sm:h-5 px-1.5 sm:px-2 bg-[#FF5B24] rounded text-white flex items-center justify-center font-black tracking-tight text-[9px] sm:text-[10px] select-none shadow-xs">
                  vipps
                </div>
                <div title="Klarna" className="h-4.5 sm:h-5 px-1.5 sm:px-2 bg-[#FFB3C7] rounded text-black flex items-center justify-center font-black text-[8px] sm:text-[9px] tracking-tight select-none shadow-xs">
                  Klarna.
                </div>
                <div title="BankAxept" className="h-4.5 sm:h-5 px-1.5 bg-[#002855] rounded text-white flex items-center justify-center font-bold text-[7.5px] sm:text-[8px] tracking-tight select-none shadow-xs">
                  Bank<span className="font-light">Axept</span>
                </div>
                <div title="Visa" className="h-4.5 sm:h-5 px-1.5 sm:px-2 bg-[#1A1F71] rounded text-white flex items-center justify-center text-[8.5px] sm:text-[9px] font-black italic select-none shadow-xs">
                  VISA
                </div>
                <div title="Mastercard" className="h-4.5 sm:h-5 px-1 sm:px-1.5 bg-[#252525] rounded flex items-center justify-center gap-0.5 select-none shadow-xs">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#EB001B] mix-blend-screen opacity-90 relative z-10" />
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#F79E1B] mix-blend-screen opacity-90 relative -ml-1 z-0" />
                </div>
                <div title="Apple Pay" className="h-4.5 sm:h-5 px-1 sm:px-1.5 bg-black rounded text-white flex items-center justify-center text-[8px] sm:text-[9px] font-bold select-none gap-0.5 shadow-xs">
                  <span>Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item Description Section */}
          <div className="mb-6 bg-white p-5 rounded-2xl border border-[#5D4E46]/10 shadow-xs">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#987C6F] mb-2">Item Description</h3>
            <p className="text-[#5D4E46]/85 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Item Specification Section */}
          <div className="mb-6 bg-white p-5 rounded-2xl border border-[#5D4E46]/10 shadow-xs">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#987C6F] mb-3">Item Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5D4E46]">
              {product.specification && (
                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/5 col-span-1 sm:col-span-2">
                  <span className="font-bold text-[#5D4E46]/70 block mb-0.5">Overview</span>
                  <p className="font-medium">{product.specification}</p>
                </div>
              )}
              {product.materials && (
                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/5">
                  <span className="font-bold text-[#5D4E46]/70 block mb-0.5">Materials</span>
                  <p className="font-medium">{product.materials}</p>
                </div>
              )}
              {product.dimensions && (
                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/5">
                  <span className="font-bold text-[#5D4E46]/70 block mb-0.5">Dimensions</span>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
              )}
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/5">
                <span className="font-bold text-[#5D4E46]/70 block mb-0.5">Origin</span>
                <p className="font-medium">{product.origin || 'Handmade in Nepal'}</p>
              </div>
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/5">
                <span className="font-bold text-[#5D4E46]/70 block mb-0.5">Craft</span>
                <p className="font-medium">{product.craftsmanship || 'Handcrafted individually by artisans'}</p>
              </div>
            </div>
          </div>

          {/* Collapsible Info: Shipping, Returns & Care */}
          <Accordion type="single" collapsible className="space-y-2 mb-6">
            <AccordionItem value="shipping" className="bg-[#F7F0E3] rounded-xl overflow-hidden border-none px-4">
              <AccordionTrigger className="text-xs font-semibold py-3 hover:no-underline">
                <span className="flex items-center gap-2"><span className="text-sm">🚚</span> Frakt & 14 dagers angrerett (Shipping & Returns)</span>
              </AccordionTrigger>
              <AccordionContent className="text-xs text-[#5D4E46]/80 leading-relaxed pb-3">
                Vi sender til hele Norge (3–5 virkedager). Du har 14 dagers ubetinget angrerett i henhold til Angrerettloven.
              </AccordionContent>
            </AccordionItem>

            {product.care_instructions && (
              <AccordionItem value="care" className="bg-[#F7F0E3] rounded-xl overflow-hidden border-none px-4">
                <AccordionTrigger className="text-xs font-semibold py-3 hover:no-underline">
                  <span className="flex items-center gap-2"><span className="text-sm">✨</span> Vedlikehold (Product Care)</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#5D4E46]/80 leading-relaxed pb-3">
                  {product.care_instructions}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

        </div>
      </div>

      <WavyDivider fill="fill-white" />

      {/* Testimonials */}
      <section className="bg-white py-16 pb-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-[#5D4E46] font-serif">Customer Experiences</h2>
            <div className="flex gap-2">
              <button className="p-2 border border-[#5D4E46]/20 rounded-full hover:bg-[#5D4E46]/5"><ChevronLeft size={16}/></button>
              <button className="p-2 border border-[#5D4E46]/20 rounded-full hover:bg-[#5D4E46]/5"><ChevronRight size={16}/></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FDFBF7] p-8 rounded-xl flex flex-col relative text-center items-center shadow-sm">
              <div className="flex text-[#7A75A5] mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-[#5D4E46]/80 mb-6">"The quality of the boho bags and blankets is outstanding! Soft, comfy, and perfect for my daily use. Will definitely buy again!"</p>
              <span className="text-[10px] uppercase font-bold tracking-wider">Emma Harrison</span>
            </div>
            <div className="bg-[#FDFBF7] p-8 rounded-xl flex flex-col relative text-center items-center shadow-sm">
              <div className="flex text-[#7A75A5] mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-[#5D4E46]/80 mb-6">"These textiles are just adorable! You can immediately feel the quality of handmade craftsmanship."</p>
              <span className="text-[10px] uppercase font-bold tracking-wider">Sophia Johnson</span>
            </div>
            <div className="bg-[#FDFBF7] p-8 rounded-xl flex flex-col relative text-center items-center shadow-sm">
              <div className="flex text-[#7A75A5] mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-[#5D4E46]/80 mb-6">"The cushion cover brought so much life to our neutral living room. Beautiful natural textures."</p>
              <span className="text-[10px] uppercase font-bold tracking-wider">Liam Wilson</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile & Desktop */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-md border-t border-[#5D4E46]/15 px-3 py-3 sm:px-6 sm:py-3.5 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] pb-[max(0.75rem,env(safe-area-inset-bottom))] animate-fade-in-up">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-center gap-2.5 sm:gap-4 shrink min-w-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 relative bg-[#F7F4EE] rounded-xl overflow-hidden shrink-0 shadow-xs border border-[#5D4E46]/10 p-0.5">
                <Image src={product.image} alt={product.name} fill className="object-contain" />
              </div>
              <div className="block min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#5D4E46] truncate max-w-[110px] xs:max-w-[160px] sm:max-w-none">{product.name}</h4>
                <p className="text-xs sm:text-sm font-black text-[#5D4E46]">{product.price.toLocaleString('no-NO')} NOK</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial justify-end">
              <div className="hidden sm:flex items-center border border-[#5D4E46]/20 rounded-xl bg-[#FDFBF7] h-11 w-28">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="w-9 h-full flex items-center justify-center text-[#5D4E46]/70 hover:bg-[#5D4E46]/5 rounded-l-xl touch-manipulation"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="flex-1 text-center text-xs font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="w-9 h-full flex items-center justify-center text-[#5D4E46]/70 hover:bg-[#5D4E46]/5 rounded-r-xl touch-manipulation"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                  trackAddToCart(product, quantity);
                }}
                className="flex-1 sm:flex-initial px-4 sm:px-6 h-12 sm:h-12 border-2 border-[#5D4E46] rounded-xl text-xs sm:text-sm font-bold text-[#5D4E46] hover:bg-[#5D4E46] hover:text-white transition-all text-center flex items-center justify-center touch-manipulation active:scale-[0.98]"
              >
                Legg i handlekurv
              </button>

              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                  trackAddToCart(product, quantity);
                  router.push('/checkout');
                }}
                className="flex-1 sm:flex-initial px-4 sm:px-7 h-12 sm:h-12 bg-[#5D4E46] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#3A3532] transition-all whitespace-nowrap shadow-md flex items-center justify-center touch-manipulation active:scale-[0.98]"
              >
                Kjøp nå (Buy Now)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
