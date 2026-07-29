'use client';

import { useCartStore } from '@/shared/utils/store';
import { getProductById, getProducts, Product } from '@/shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Minus, Plus, ChevronDown, ChevronRight, ChevronLeft, Star, Heart, Loader2 } from 'lucide-react';

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
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function loadData() {
      const p = await getProductById(id as string);
      if (p) {
        setProduct(p);
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
        
        {/* Left: Images */}
        <div className="lg:col-span-6 xl:col-span-5 flex gap-4">
          <div className="hidden md:flex flex-col gap-4 w-20 flex-shrink-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square bg-white rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#987C6F] transition-colors shadow-sm">
                <Image src={product.image} alt={`${product.name} view ${i}`} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <div className="relative flex-1 bg-[#FDFBF7] rounded-xl overflow-hidden shadow-sm aspect-square">
            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized priority />
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur rounded-full text-[#5D4E46] hover:text-[#FF5A5F] hover:bg-white transition-all shadow-md"
              title="Add to Favorites"
            >
              <Heart size={20} strokeWidth={2.5} fill={isFavorite ? "#FF5A5F" : "none"} className={isFavorite ? "text-[#FF5A5F]" : ""} />
            </button>
          </div>
        </div>

        {/* Middle: Details */}
        <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
          <div className="mb-4">
            <div className="inline-block px-3 py-1 bg-[#F7F0E3] text-[#5D4E46]/80 text-[10px] tracking-widest uppercase rounded-sm mb-4 font-bold">
              Organic . Home-Made . Ethical
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#5D4E46] leading-tight">{product.name}</h1>
            <p className="text-xl font-bold text-[#5D4E46]">{product.price.toLocaleString('no-NO')} NOK</p>
            <p className="text-[10px] text-[#5D4E46]/50 uppercase tracking-widest mt-1">Tax included.</p>
          </div>

          <div className="border-t border-[#5D4E46]/10 py-4 mb-4">
            <div className="flex items-center gap-2 mb-4 text-xs text-[#5D4E46]/70 font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-[#AAB084] animate-pulse" />
              <span>300 in stock</span>
            </div>
            
            <p className="text-[#5D4E46]/80 leading-relaxed text-sm mb-6">
              {product.description}
              <br/><br/>
              This charming piece features a textured finish paired with authentic materials, making it the perfect cozy addition. The soft and breathable material ensures comfort all day, offering both practicality and charm. Add the finishing touch to your space with this versatile staple.
            </p>

            {/* Goes well with */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-black text-[#5D4E46]">Goes well with</h3>
                <div className="flex gap-1">
                  <button className="text-[#5D4E46]/50 hover:text-[#5D4E46]"><ChevronLeft size={16}/></button>
                  <button className="text-[#5D4E46]/50 hover:text-[#5D4E46]"><ChevronRight size={16}/></button>
                </div>
              </div>
              <div className="bg-[#F7F0E3] p-4 rounded-xl flex gap-4 items-center">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-white shadow-sm">
                  <Image src={relatedProducts.length > 0 ? relatedProducts[0].image : '/placeholder.png'} alt="Related" fill className="object-cover" unoptimized />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#5D4E46]">Baby Essentials Set</h4>
                  <p className="text-[10px] font-bold text-[#5D4E46]/70">89,00 NOK <span className="line-through font-normal ml-1">99,00 NOK</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Checkout & Support */}
        <div className="lg:col-span-12 xl:col-span-3 flex flex-col gap-6">
          <div className="space-y-2">
            <div className="bg-[#F7F0E3] rounded-md overflow-hidden">
              <div onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')} className="px-4 py-3 flex justify-between items-center cursor-pointer">
                <span className="text-xs font-medium flex items-center gap-2"><span className="text-sm">🚚</span> Shipping & Returns</span>
                <ChevronDown size={14} className={`text-[#5D4E46]/50 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`}/>
              </div>
              {openAccordion === 'shipping' && (
                <div className="px-4 pb-3 text-xs text-[#5D4E46]/80 leading-relaxed">
                  We offer free standard shipping on all orders. Returns are accepted within 30 days of delivery. Custom items are non-refundable.
                </div>
              )}
            </div>
            
            <div className="bg-[#F7F0E3] rounded-md overflow-hidden">
              <div onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')} className="px-4 py-3 flex justify-between items-center cursor-pointer">
                <span className="text-xs font-medium flex items-center gap-2"><span className="text-sm">✨</span> Product Care</span>
                <ChevronDown size={14} className={`text-[#5D4E46]/50 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`}/>
              </div>
              {openAccordion === 'care' && (
                <div className="px-4 pb-3 text-xs text-[#5D4E46]/80 leading-relaxed">
                  Spot clean with a damp cloth and mild soap. Avoid harsh chemicals. For textiles, machine wash cold on a gentle cycle and air dry.
                </div>
              )}
            </div>

            <div className="bg-[#F7F0E3] rounded-md overflow-hidden">
              <div onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')} className="px-4 py-3 flex justify-between items-center cursor-pointer">
                <span className="text-xs font-medium flex items-center gap-2"><span className="text-sm">🌿</span> Materials</span>
                <ChevronDown size={14} className={`text-[#5D4E46]/50 transition-transform ${openAccordion === 'materials' ? 'rotate-180' : ''}`}/>
              </div>
              {openAccordion === 'materials' && (
                <div className="px-4 pb-3 text-xs text-[#5D4E46]/80 leading-relaxed">
                  100% organic cotton and sustainably sourced vegan leather. All our products are handcrafted in small batches to ensure the highest quality.
                </div>
              )}
            </div>

            <div className="bg-[#F7F0E3] rounded-md overflow-hidden">
              <div onClick={() => setOpenAccordion(openAccordion === 'support' ? null : 'support')} className="px-4 py-3 flex justify-between items-center cursor-pointer">
                <span className="text-xs font-medium flex items-center gap-2"><span className="text-sm">🎧</span> 24/7 Support</span>
                <ChevronDown size={14} className={`text-[#5D4E46]/50 transition-transform ${openAccordion === 'support' ? 'rotate-180' : ''}`}/>
              </div>
              {openAccordion === 'support' && (
                <div className="px-4 pb-3 text-xs text-[#5D4E46]/80 leading-relaxed">
                  Our dedicated support team is available around the clock. Reach out via live chat or email us at support@pustatelier.no for immediate assistance.
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#987C6F] text-white text-[10px] font-bold uppercase tracking-widest text-center py-2.5 rounded-sm shadow-sm flex items-center justify-center gap-2">
            <span>📦</span> Delivery between: {getDeliveryDates()}
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#5D4E46]/50 tracking-wider mb-2">Size</label>
            <div className="flex items-center justify-between bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-md p-3 cursor-pointer">
              <span className="text-xs font-medium">Standard</span>
              <ChevronDown size={14} className="text-[#5D4E46]/50"/>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#5D4E46]/50 tracking-wider mb-2">Quantity</label>
            <div className="flex items-center border border-[#5D4E46]/20 rounded-md bg-[#FDFBF7] w-full max-w-[120px]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors"><Minus size={14} /></button>
              <span className="flex-1 text-center text-xs font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors"><Plus size={14} /></button>
            </div>
          </div>

          <div className="flex flex-col gap-3 relative">
            <button 
              onClick={() => {
                for(let i=0; i<quantity; i++) addItem(product);
              }}
              className="w-full py-3.5 border-2 border-[#5D4E46] rounded-full text-xs font-bold hover:bg-[#5D4E46] hover:text-white transition-colors text-center"
            >
              Add to cart
            </button>
            <button 
              onClick={() => {
                for(let i=0; i<quantity; i++) addItem(product);
                router.push('/checkout');
              }}
              className="w-full py-3.5 bg-[#5D4E46] text-white rounded-full text-xs font-bold hover:bg-[#3A3532] transition-colors shadow-md text-center"
            >
              Buy it now
            </button>
          </div>

          <div className="flex flex-col gap-1.5 mt-2 text-[10px] text-[#5D4E46]/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#AAB084] flex items-center justify-center text-white text-[8px]">✓</div>
              <span>Pickup available at <span className="font-bold text-[#5D4E46]">Oslo Store</span></span>
            </div>
            <span className="ml-5 text-[#5D4E46]/50">Usually ready in 24 hours</span>
            <button className="ml-5 text-left underline underline-offset-4 decoration-[#5D4E46]/30 hover:decoration-[#5D4E46] font-medium">View store information</button>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center mt-2">
            <div className="h-5 px-2 bg-[#1A1F71] rounded-sm text-white flex items-center justify-center text-[10px] font-black italic shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">VISA</div>
            <div className="h-5 px-1.5 bg-[#252525] rounded-sm flex items-center justify-center gap-0.5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B] mix-blend-screen opacity-90 relative z-10" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] mix-blend-screen opacity-90 relative -ml-1 z-0" />
            </div>
            <div className="h-5 px-2 bg-[#006FCF] rounded-sm text-white flex flex-col items-center justify-center text-[5px] leading-[5px] font-black shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
              <span>AM</span><span>EX</span>
            </div>
            <div className="h-5 px-2 bg-white rounded-sm text-[#003087] flex items-center justify-center text-[10px] font-black italic shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">P</div>
            <div className="h-5 px-1 bg-white rounded-sm flex items-center justify-center shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
              <div className="flex text-[#0079C1]">
                <div className="w-1.5 h-3 border-l-2 border-current rounded-l-full" />
                <div className="w-1.5 h-3 border-r-2 border-current rounded-r-full -ml-0.5" />
              </div>
            </div>
            <div className="h-5 px-1.5 bg-white rounded-sm flex items-center justify-center gap-0.5 shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
              <span className="text-[6px] font-black text-black">DISCOVER</span>
            </div>
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
               <Image src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69958c7c30895633d86899b0.webp" alt="Lifestyle Bags" fill className="object-cover" unoptimized />
               <span className="absolute bottom-4 left-4 bg-[#7A75A5] text-white text-[10px] font-bold uppercase px-3 py-1 rounded">Bags</span>
             </div>
             <div className="relative h-full bg-[#F7F0E3]">
               <Image src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp" alt="Lifestyle Textiles" fill className="object-cover" unoptimized />
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
                  <Image src={p.image} alt={p.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform" unoptimized />
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#5D4E46]/10 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] animate-fade-in-up">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <div className="hidden sm:block w-12 h-12 relative bg-[#FDFBF7] rounded-md overflow-hidden shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
              </div>
              <div className="block flex-1 min-w-0">
                <h4 className="font-bold text-[10px] sm:text-sm text-[#5D4E46] truncate">{product.name}</h4>
                <p className="text-[10px] sm:text-xs font-bold text-[#5D4E46]/70">{product.price} NOK</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="flex items-center border border-[#5D4E46]/10 rounded-md bg-[#FDFBF7] w-16 sm:w-24">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1.5 sm:p-2 text-[#5D4E46]/60"><Minus size={12} /></button>
                <span className="flex-1 text-center text-[10px] sm:text-xs font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1.5 sm:p-2 text-[#5D4E46]/60"><Plus size={12} /></button>
              </div>
              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addItem(product);
                }}
                className="px-8 py-3 bg-[#7A75A5] text-white rounded-full text-sm font-bold hover:bg-[#635f8d] transition-colors whitespace-nowrap shadow-md"
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
