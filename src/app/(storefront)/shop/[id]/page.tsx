'use client';

import { useCartStore } from '@/shared/utils/store';
import { getProductById, getProducts, Product } from '@/shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { supabase } from '@/shared/utils/supabase';
import { useState, useEffect } from 'react';
import { Minus, Plus, ChevronDown, ChevronRight, ChevronLeft, Star, Heart, Loader2 } from 'lucide-react';
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
    start.setDate(start.getDate() + 14);
    const end = new Date();
    end.setDate(end.getDate() + 18);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return `${start.toLocaleDateString('en-GB', options).toUpperCase()} - ${end.toLocaleDateString('en-GB', options).toUpperCase()}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-32 pb-0">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 mb-24">
        
        {/* Left Column: Image Showcase & Thumbnails */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {/* Main Featured Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] max-h-[460px] bg-[#F7F4EE] rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-3">
            <Image 
              src={selectedImage || product.image} 
              alt={product.name} 
              fill 
              className="object-contain p-2" 
              priority 
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur rounded-full text-[#5D4E46] hover:text-[#FF5A5F] hover:bg-white transition-all shadow-md"
              title="Add to Favorites"
            >
              <Heart size={18} strokeWidth={2.5} fill={isFavorite ? "#FF5A5F" : "none"} className={isFavorite ? "text-[#FF5A5F]" : ""} />
            </button>
          </div>

          {/* Alternate / Gallery Thumbnails below the featured image */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {/* Primary Image Thumbnail */}
            <button 
              type="button"
              onClick={() => setSelectedImage(product.image)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all shadow-sm ${
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
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all shadow-sm ${
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
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all shadow-sm opacity-60 hover:opacity-100 ${
                    selectedImage === product.image ? 'border-gray-200' : 'border-transparent'
                  }`}
                >
                  <Image src={product.image} alt={`${product.name} angle ${i}`} fill className="object-contain p-1" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Key Details, Purchase Actions & Accordions */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          {/* Header & Price Info */}
          <div className="mb-4">
            <div className="inline-block px-2.5 py-0.5 bg-[#F7F0E3] text-[#5D4E46]/80 text-[10px] tracking-widest uppercase rounded font-bold mb-2">
              Organic • Home-Made • Ethical
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#5D4E46] leading-tight mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#5D4E46]">{product.price.toLocaleString('no-NO')} NOK</span>
              <span className="text-xs text-[#5D4E46]/60 uppercase tracking-wider font-medium">Inkl. MVA</span>
              <div className="flex items-center gap-1.5 ml-2 text-xs text-[#5D4E46]/80 font-bold">
                <div className="w-2 h-2 rounded-full bg-[#AAB084] animate-pulse" />
                <span>På lager (In stock)</span>
              </div>
            </div>
          </div>

          {/* Quick Buy Card - Placed firmly above the fold */}
          <div className="bg-white p-5 rounded-2xl border border-[#5D4E46]/10 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-3">
              {/* Quantity */}
              <div className="flex items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mr-3">Qty:</span>
                <div className="flex items-center border border-[#5D4E46]/20 rounded-xl bg-[#FDFBF7] h-11 w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="w-10 h-full flex items-center justify-center text-[#5D4E46]/70 hover:text-[#5D4E46] hover:bg-[#5D4E46]/5 rounded-l-xl transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="flex-1 text-center text-sm font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="w-10 h-full flex items-center justify-center text-[#5D4E46]/70 hover:text-[#5D4E46] hover:bg-[#5D4E46]/5 rounded-r-xl transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Delivery notice */}
              <div className="flex-1 text-[11px] text-[#5D4E46]/80 bg-[#FDFBF7] px-3 py-2.5 rounded-xl border border-[#5D4E46]/5 flex items-center gap-2">
                <span>🚚</span>
                <span>Levering: <strong className="text-[#5D4E46]">{getDeliveryDates()}</strong></span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                  trackAddToCart(product, quantity);
                }}
                className="flex-1 py-3.5 border-2 border-[#5D4E46] rounded-xl text-xs sm:text-sm font-bold text-[#5D4E46] hover:bg-[#5D4E46] hover:text-white transition-all text-center shadow-sm"
              >
                Legg i handlekurv (Add to Cart)
              </button>
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                  trackAddToCart(product, quantity);
                  router.push('/checkout');
                }}
                className="flex-1 py-3.5 bg-[#5D4E46] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#3A3532] transition-all shadow-md text-center hover:scale-[1.01] active:scale-[0.99]"
              >
                Kjøp nå (Buy it Now)
              </button>
            </div>

            {/* Norwegian Payment Options */}
            <div className="pt-3 border-t border-[#5D4E46]/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D4E46]/60">Sikker betaling:</span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {/* Vipps */}
                <div title="Vipps" className="h-5 px-2 bg-[#FF5B24] rounded text-white flex items-center justify-center font-black tracking-tight text-[10px] select-none shadow-xs">
                  vipps
                </div>
                {/* Klarna */}
                <div title="Klarna" className="h-5 px-2 bg-[#FFB3C7] rounded text-black flex items-center justify-center font-black text-[9px] tracking-tight select-none shadow-xs">
                  Klarna.
                </div>
                {/* BankAxept */}
                <div title="BankAxept" className="h-5 px-1.5 bg-[#002855] rounded text-white flex items-center justify-center font-bold text-[8px] tracking-tight select-none shadow-xs">
                  Bank<span className="font-light">Axept</span>
                </div>
                {/* Visa */}
                <div title="Visa" className="h-5 px-2 bg-[#1A1F71] rounded text-white flex items-center justify-center text-[9px] font-black italic select-none shadow-xs">
                  VISA
                </div>
                {/* Mastercard */}
                <div title="Mastercard" className="h-5 px-1.5 bg-[#252525] rounded flex items-center justify-center gap-0.5 select-none shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B] mix-blend-screen opacity-90 relative z-10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] mix-blend-screen opacity-90 relative -ml-1 z-0" />
                </div>
                {/* Apple Pay */}
                <div title="Apple Pay" className="h-5 px-1.5 bg-black rounded text-white flex items-center justify-center text-[9px] font-bold select-none gap-0.5 shadow-xs">
                  <span>Pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Accordions */}
          <div className="mb-4">
            <p className="text-[#5D4E46]/80 leading-relaxed text-sm mb-4">
              {product.description}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-2 mb-6">
            <AccordionItem value="shipping" className="bg-[#F7F0E3] rounded-xl overflow-hidden border-none px-4">
              <AccordionTrigger className="text-xs font-semibold py-3 hover:no-underline">
                <span className="flex items-center gap-2"><span className="text-sm">🚚</span> Frakt & Angrerett (Shipping & Returns)</span>
              </AccordionTrigger>
              <AccordionContent className="text-xs text-[#5D4E46]/80 leading-relaxed pb-3">
                Gratis standardfrakt i hele Norge. 14 dagers ubetinget angrerett i henhold til Angrerettloven.
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

            {product.materials && (
              <AccordionItem value="materials" className="bg-[#F7F0E3] rounded-xl overflow-hidden border-none px-4">
                <AccordionTrigger className="text-xs font-semibold py-3 hover:no-underline">
                  <span className="flex items-center gap-2"><span className="text-sm">🌿</span> Materialer (Materials)</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#5D4E46]/80 leading-relaxed pb-3">
                  {product.materials}
                </AccordionContent>
              </AccordionItem>
            )}

            {product.dimensions && (
              <AccordionItem value="dimensions" className="bg-[#F7F0E3] rounded-xl overflow-hidden border-none px-4">
                <AccordionTrigger className="text-xs font-semibold py-3 hover:no-underline">
                  <span className="flex items-center gap-2"><span className="text-sm">📏</span> Mål / Størrelse (Dimensions)</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-[#5D4E46]/80 leading-relaxed pb-3">
                  {product.dimensions}
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="support" className="bg-[#F7F0E3] rounded-xl overflow-hidden border-none px-4">
              <AccordionTrigger className="text-xs font-semibold py-3 hover:no-underline">
                <span className="flex items-center gap-2"><span className="text-sm">🎧</span> Kundeservice & Støtte</span>
              </AccordionTrigger>
              <AccordionContent className="text-xs text-[#5D4E46]/80 leading-relaxed pb-3">
                Spørsmål om bestillingen din? Kontakt oss på support@pustatelier.no for rask bistand.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Goes well with recommendation */}
          <div className="bg-[#F7F0E3] p-4 rounded-xl flex gap-4 items-center">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-xs">
              <Image src={relatedProducts.length > 0 ? relatedProducts[0].image : '/placeholder.png'} alt="Related" fill className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#987C6F] block">Passer godt sammen med</span>
              <h4 className="font-bold text-xs text-[#5D4E46] truncate">{relatedProducts.length > 0 ? relatedProducts[0].name : 'Handmade Tote Bag'}</h4>
              <p className="text-[11px] font-bold text-[#5D4E46]/70">{relatedProducts.length > 0 ? `${relatedProducts[0].price} NOK` : '990 NOK'}</p>
            </div>
            {relatedProducts.length > 0 && (
              <Link 
                href={`/shop/${relatedProducts[0].id}`} 
                className="text-xs font-bold text-[#5D4E46] hover:text-[#987C6F] flex items-center"
              >
                Se produkt <ChevronRight size={14} className="ml-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <WavyDivider fill="fill-white" />

      {/* Testimonials */}
      <section className="bg-white py-16 pb-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-[#5D4E46]">Testimonials</h2>
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
              <p className="text-sm font-medium text-[#5D4E46]/80 mb-6">"The quality of the boho bags is outstanding! Soft, comfy, and perfect for my daily use. Will definitely buy again!"</p>
              <span className="text-[10px] uppercase font-bold tracking-wider">Emma Harrison</span>
            </div>
            <div className="bg-[#FDFBF7] p-8 rounded-xl flex flex-col relative text-center items-center shadow-sm">
              <div className="flex text-[#7A75A5] mb-4">
                {[1,2,3,4].map(s => <Star key={s} size={12} fill="currentColor" />)}<Star size={12} className="text-[#5D4E46]/20" />
              </div>
              <p className="text-sm font-medium text-[#5D4E46]/80 mb-6">"These textiles are just adorable! My daughter loves them and takes them everywhere."</p>
              <span className="text-[10px] uppercase font-bold tracking-wider">Oliver Smith</span>
            </div>
            <div className="bg-[#FDFBF7] p-8 rounded-xl flex flex-col relative text-center items-center shadow-sm">
              <div className="flex text-[#7A75A5] mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-[#5D4E46]/80 mb-6">"Great selection of stylish pieces for home. The fabrics are breathable and perfect for the living room."</p>
              <span className="text-[10px] uppercase font-bold tracking-wider">Isabella Turner</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 h-[400px] rounded-xl overflow-hidden shadow-sm">
             <div className="relative h-full bg-[#E4D1FF]">
               <Image src="/images/boho_hero_banner.png" alt="Lifestyle Bags" fill className="object-cover" />
               <span className="absolute bottom-4 left-4 bg-[#7A75A5] text-white text-[10px] font-bold uppercase px-3 py-1 rounded">Bags</span>
             </div>
             <div className="relative h-full bg-[#F7F0E3]">
               <Image src="/images/boho_hero_banner.png" alt="Lifestyle Textiles" fill className="object-cover" />
               <span className="absolute bottom-4 right-4 bg-[#7A75A5] text-white text-[10px] font-bold uppercase px-3 py-1 rounded">Textiles</span>
             </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-[#FDFBF7] py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black text-[#5D4E46]">Related Products</h2>
            <div className="flex gap-2">
              <button className="p-2 border border-[#5D4E46]/20 rounded-full hover:bg-[#5D4E46]/5"><ChevronLeft size={16}/></button>
              <button className="p-2 border border-[#5D4E46]/20 rounded-full hover:bg-[#5D4E46]/5"><ChevronRight size={16}/></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link href={`/shop/${p.id}`} key={p.id} className="group">
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-sm">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 right-3 bg-[#7A75A5] text-white text-[10px] font-black uppercase px-2 py-1 rounded">-15%</span>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-[#5D4E46] text-sm mb-1">{p.name}</h3>
                  <p className="text-xs font-medium text-[#5D4E46]/70">{p.price} NOK <span className="line-through opacity-50 ml-1">{(p.price * 1.15).toFixed(0)} NOK</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-24 pb-32 px-6 text-center border-t border-[#5D4E46]/5">
        <div className="max-w-3xl mx-auto">
          <span className="bg-[#7A75A5] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4 inline-block">Support FAQs</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#5D4E46] mb-12">Orders & Support</h2>
          
          <div className="space-y-4 text-left">
            {[
              { q: "How can I place an order?", a: "Placing an order is quick and easy. Simply browse our online store, select the products you desire, and add them to your cart. Proceed to checkout, where you'll provide your shipping and payment details." },
              { q: "What payment methods do you accept?", a: "We accept all major credit cards, Stripe, VIPPS, and Klarna for a seamless checkout experience." },
              { q: "How long will it take to receive my order?", a: "Orders are processed within 1-2 business days. Shipping times vary by location." },
              { q: "Can I track my order?", a: "Yes, you will receive a tracking link via email once your order has been dispatched." },
              { q: "What if I have questions or need assistance?", a: "Our support team is available 24/7. Reach out to us via email or the contact form." }
            ].map((faq, i) => (
              <div key={i} className="border border-[#5D4E46]/10 rounded-xl overflow-hidden shadow-sm">
                <div onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="bg-[#FDFBF7] px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-[#f5f3ef] transition-colors">
                  <h4 className="font-bold text-sm text-[#5D4E46]">{faq.q}</h4>
                  <ChevronDown size={16} className={`text-[#5D4E46]/50 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                </div>
                {openFaqIndex === i && (
                  <div className="px-6 py-4 bg-white text-sm text-[#5D4E46]/80 leading-relaxed border-t border-[#5D4E46]/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#5D4E46]/10 p-3 sm:p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] animate-fade-in-up">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div className="w-12 h-12 relative bg-[#FDFBF7] rounded-md overflow-hidden shrink-0 shadow-sm border border-[#5D4E46]/10">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="block flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-[#5D4E46] truncate">{product.name}</h4>
                <p className="text-[10px] sm:text-xs font-bold text-[#5D4E46]/70">{product.price} NOK</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="flex items-center border border-[#5D4E46]/10 rounded-md bg-[#FDFBF7] w-20 sm:w-24">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 sm:p-2 text-[#5D4E46]/60 hover:bg-[#5D4E46]/5"><Minus size={14} /></button>
                <span className="flex-1 text-center text-xs font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 sm:p-2 text-[#5D4E46]/60 hover:bg-[#5D4E46]/5"><Plus size={14} /></button>
              </div>
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                }}
                className="px-4 sm:px-8 py-3 bg-[#7A75A5] text-white rounded-md sm:rounded-full text-xs sm:text-sm font-bold hover:bg-[#635f8d] transition-colors whitespace-nowrap shadow-md"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
