import Image from 'next/image';
import Link from 'next/link';
import { getPopularProducts, getProductsByCategory } from '@/shared/utils/products';
import { ChevronRight } from 'lucide-react';
import HeroSlider from '@/components/HeroSlider';
import FeaturedCarousel from '@/components/FeaturedCarousel';

export default async function Home() {
  const popularProducts = await getPopularProducts(8);
  const bagProducts = await getProductsByCategory('Bag', 8);
  const cushionProducts = await getProductsByCategory('Cushion', 8);
  
  return (
    <div className="flex flex-col min-h-screen text-[#5D4E46] font-sans antialiased bg-[#FDFBF7]">
      <main className="flex-1 relative z-10">
        
        {/* Clean Boho Hero Section */}
        <section className="relative bg-[#FDFBF7] pt-24 md:pt-26 pb-5 md:pb-6 px-4 md:px-8 overflow-hidden">
          <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center">
            
            {/* Expanded Hero Slider */}
            <div className="w-full relative z-20">
              <HeroSlider />
            </div>

            {/* Shop Now CTA Button below slider (included above the fold) */}
            <div className="flex justify-center mt-4 md:mt-6 z-20">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center bg-[#5D4E46] text-white px-9 py-3.5 md:px-11 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-[#3A3532] transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                Shop Now <ChevronRight size={18} className="ml-2 opacity-80" />
              </Link>
            </div>
            
          </div>
        </section>

        {/* Featured Selection: Trending Handcrafts (Most Viewed / Popular Products) */}
        <section className="max-w-[1440px] mx-auto px-6 relative z-20 pt-8 pb-12 md:pt-10 md:pb-14">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#7A75A5] block mb-1">
                Featured Selection
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#5D4E46]">
                Trending Handcrafts
              </h2>
            </div>
            <Link 
              href="/shop" 
              className="text-xs font-bold text-[#5D4E46]/70 hover:text-[#7A75A5] uppercase tracking-wider flex items-center transition-colors"
            >
              Shop All <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <FeaturedCarousel products={popularProducts} />
        </section>

        {/* Bags Product Section */}
        <section className="max-w-[1440px] mx-auto px-6 relative z-20 py-10 md:py-12 border-t border-[#5D4E46]/5">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#987C6F] block mb-1">
                Artisan Collection
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#5D4E46]">
                Handcrafted Bags
              </h2>
            </div>
            <Link 
              href="/shop?category=Bag" 
              className="text-xs font-bold text-[#5D4E46]/70 hover:text-[#7A75A5] uppercase tracking-wider flex items-center transition-colors"
            >
              Explore Bags <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <FeaturedCarousel products={bagProducts} />
        </section>

        {/* Cushions Product Section */}
        <section className="max-w-[1440px] mx-auto px-6 relative z-20 py-10 md:py-12 border-t border-[#5D4E46]/5">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#987C6F] block mb-1">
                Home & Living
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#5D4E46]">
                Artisan Cushions
              </h2>
            </div>
            <Link 
              href="/shop?category=Cushion" 
              className="text-xs font-bold text-[#5D4E46]/70 hover:text-[#7A75A5] uppercase tracking-wider flex items-center transition-colors"
            >
              Explore Cushions <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <FeaturedCarousel products={cushionProducts} />
        </section>

        {/* Full-width Feature Banner Section */}
        <section className="bg-white py-14 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[320px] md:min-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl group">
              <Image 
                src="/images/boho_feature_showcase.jpg" 
                alt="Artisan Handcrafts and Bohemian Home Living" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-3xl font-black text-[#5D4E46] mb-12 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Sophia Johnson", text: "The handcrafted tote is absolutely stunning. The quality of the upholstery fabric is outstanding. Highly recommend!" },
                { name: "Emma Harrison", text: "I bought some boho bedding and it completely transformed my space. Soft, beautiful, and sustainable." },
                { name: "Liam Wilson", text: "The details on these bags are fantastic. You can really feel the artisan craftsmanship in every stitch." }
              ].map((review, i) => (
                <div key={i} className="bg-[#FDFBF7] p-8 rounded-xl text-center flex flex-col items-center shadow-sm relative pt-12 mt-6">
                  <div className="absolute -top-6 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 15}.jpg`} alt="Avatar" fill className="object-cover" />
                  </div>
                  <div className="flex gap-1 text-[#7A75A5] mb-4">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-sm text-[#5D4E46]/80 font-medium mb-6 flex-1">"{review.text}"</p>
                  <p className="text-xs font-black uppercase tracking-wider">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
