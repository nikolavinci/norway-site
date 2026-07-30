import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/shared/utils/products';
import { getBlogs } from '@/shared/utils/blogs';
import { ChevronRight, Plus, Heart, ShoppingBag } from 'lucide-react';
import CuratedPicks from '@/components/CuratedPicks';
import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';

// Reusable Wavy Divider Component
const WavyDivider = ({ fill, flip = false }: { fill: string, flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} bg-[#FDFBF7]`}>
    <svg className="relative block w-full h-[40px] md:h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" className={fill}></path>
    </svg>
  </div>
);

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);
  const latestBlogs = await getBlogs().then(b => b.slice(0, 3));
  
  return (
    <div className="flex flex-col min-h-screen text-[#5D4E46] font-sans antialiased bg-[#FDFBF7]">
      <main className="flex-1 relative z-10">
        
        {/* Clean Boho Hero Section */}
        <section className="relative bg-[#FDFBF7] pt-32 pb-48 px-6 overflow-hidden">
          <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text & CTA */}
            <div className="max-w-xl text-[#5D4E46] z-20">
              <span className="inline-block px-4 py-1.5 bg-[#F7F0E3] text-[#5D4E46]/80 text-xs tracking-widest uppercase rounded-md mb-6 font-bold">
                Organic . Home-Made . Ethical
              </span>
              <h1 className="text-5xl md:text-7xl font-sans font-black leading-tight mb-6 tracking-tight">
                Goodness in <br/><span className="text-[#987C6F]">Every</span> Detail
              </h1>
              <p className="text-lg md:text-xl font-medium text-[#5D4E46]/80 mb-10 leading-relaxed">
                Nourish your space and delight your senses with handcrafted bohemian living.
              </p>
              <Link 
                href="/shop" 
                className="inline-flex items-center bg-[#5D4E46] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#3A3532] transition-colors shadow-md"
              >
                Shop Now <ChevronRight size={16} className="ml-2 opacity-70" />
              </Link>
            </div>

            {/* Right: Elegant Auto-Slider */}
            <div className="w-full relative z-20">
              <HeroSlider />
            </div>
            
          </div>
        </section>

        {/* Overlapping Featured Products */}
        <section className="max-w-[1440px] mx-auto px-6 -mt-32 relative z-20 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isNew={true} 
                discount={index === 1 ? '-15%' : undefined} 
              />
            ))}
          </div>
        </section>

        {/* Top Announcement Marquee */}
        <div className="bg-[#987C6F] text-white text-xs md:text-sm uppercase tracking-widest py-3 overflow-hidden whitespace-nowrap relative flex">
          <div className="animate-marquee flex whitespace-nowrap font-medium min-w-full">
            <span className="mx-8">Crafting Timeless Bohemian Handcrafts ✨ Ethically Sourced, Sustainably Made</span>
            <span className="mx-8">Crafting Timeless Bohemian Handcrafts ✨ Ethically Sourced, Sustainably Made</span>
            <span className="mx-8">Crafting Timeless Bohemian Handcrafts ✨ Ethically Sourced, Sustainably Made</span>
          </div>
          <div className="animate-marquee flex whitespace-nowrap font-medium min-w-full" aria-hidden="true">
            <span className="mx-8">Crafting Timeless Bohemian Handcrafts ✨ Ethically Sourced, Sustainably Made</span>
            <span className="mx-8">Crafting Timeless Bohemian Handcrafts ✨ Ethically Sourced, Sustainably Made</span>
            <span className="mx-8">Crafting Timeless Bohemian Handcrafts ✨ Ethically Sourced, Sustainably Made</span>
          </div>
        </div>

        {/* Hero Section -> Replaced with Curated Picks Client Component */}
        <CuratedPicks products={allProducts} />

        <div className="w-full h-px bg-[#5D4E46]/10 mb-20" />

        {/* Split Feature Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16 mb-16">
            <div className="flex-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
              <Image src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp" alt="Playful Space" fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#7A75A5]">New Arrival</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#5D4E46] leading-tight">Elevate Your Everyday Style</h2>
              <p className="text-[#5D4E46]/70 leading-relaxed text-sm md:text-base">
                Discover our latest collection of handcrafted bags and home textiles. Each piece is carefully woven to bring warmth, comfort, and a touch of bohemian elegance to your lifestyle, crafted sustainably by skilled artisans.
              </p>
              <button className="px-8 py-3 bg-[#7A75A5] text-white font-bold rounded-full text-sm hover:bg-[#635f8d] transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Colored Category Blocks */}
          <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
            {[
              { bg: 'bg-[#7A75A5]', title: 'Handwoven Details', sub: 'Artisan Bags', img: 'https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp' },
              { bg: 'bg-[#F7F0E3]', title: 'Warm Textures', sub: 'Bohemian Living', img: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_0979-5376.webp', text: 'text-[#5D4E46]' },
              { bg: 'bg-[#AAB084]', title: 'Sustainable Materials', sub: 'Ethical Craftsmanship', img: 'https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69958c7c30895633d86899b0.webp' },
              { bg: 'bg-[#987C6F]', title: 'Everyday Elegance', sub: 'Versatile Totes', img: allProducts.find(p => p.category.toLowerCase().includes('bag'))?.image || allProducts[0]?.image || '/placeholder.png' }
            ].map((cat, i) => (
              <div key={i} className={`${cat.bg} p-8 flex flex-col items-center justify-center text-center aspect-square text-white ${cat.text || ''}`}>
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white/20 shadow-md">
                  <Image src={cat.img} alt={cat.title} fill className="object-cover" />
                </div>
                <p className="text-[10px] uppercase tracking-wider mb-1 opacity-80 font-bold">{cat.sub}</p>
                <h3 className="font-black text-lg">{cat.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <WavyDivider fill="fill-[#FDFBF7]" />

        {/* Masonry Grid Section */}
        <section className="py-20 px-6 max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#5D4E46]">Inspiration Gallery</h2>
            <p className="text-[#5D4E46]/70 text-sm mt-4">Discover how our pieces come to life in beautiful spaces.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1 */}
            <div className="md:col-span-1 relative aspect-square md:aspect-[3/4] rounded-xl overflow-hidden group">
              <Image src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp" alt="Furniture" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest mb-1">Earthy Tones</span>
                <h3 className="text-2xl font-black text-white">Bohemian Decor</h3>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="flex-1 relative rounded-xl overflow-hidden group">
                <Image src={allProducts.length > 1 ? allProducts[1].image : '/placeholder.png'} alt="Accessories" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-6 text-center">
                  <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest mb-1">Artisan Quality</span>
                  <h3 className="text-2xl font-black text-white">Handcrafted Bags</h3>
                </div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden group">
                <Image src="https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_4361-8664.webp" alt="Playtime" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center p-6 text-center">
                  <h3 className="text-2xl font-black text-white">Living Essentials</h3>
                </div>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image src="https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_1325-9484.webp" alt="Wardrobe" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-black text-white">Textile Artistry</h3>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image src={allProducts.length > 3 ? allProducts[3].image : '/placeholder.png'} alt="Storage" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-black text-white">Sustainable Living</h3>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image src={allProducts.length > 4 ? allProducts[4].image : '/placeholder.png'} alt="Plushies" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-black text-white">Unique Accessories</h3>
              </div>
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

        <WavyDivider fill="fill-[#FDFBF7]" flip />

        {/* Unveiling Our Best (Carousel-style image strip) */}
        <section className="py-20 overflow-hidden">
          <h2 className="text-3xl font-black text-[#5D4E46] mb-12 text-center">Unveiling Our Best</h2>
          <div className="relative flex overflow-hidden group">
            <div className="animate-marquee flex gap-4 px-4 whitespace-nowrap min-w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => {
                const product = allProducts[i % allProducts.length];
                if (!product) return null;
                return (
                  <Link href={`/shop/${product.id}`} key={i} className="relative w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden group/item">
                    <Image src={product.image || '/placeholder.png'} alt={product.name} fill className="object-cover group-hover/item:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                      <span className="text-white font-bold text-lg">{product.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Duplicate for infinite effect */}
            <div className="animate-marquee flex gap-4 px-4 whitespace-nowrap min-w-full" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => {
                const product = allProducts[i % allProducts.length];
                if (!product) return null;
                return (
                  <Link href={`/shop/${product.id}`} key={i} className="relative w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden group/item">
                    <Image src={product.image || '/placeholder.png'} alt={product.name} fill className="object-cover group-hover/item:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                      <span className="text-white font-bold text-lg">{product.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog & Exclusive Deals */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-[1440px] mx-auto space-y-24">
            
            {/* Featured Blog */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-black text-[#5D4E46]">Featured Blog</h2>
                <a href="#" className="text-xs font-bold text-[#5D4E46]/60 hover:text-[#7A75A5] uppercase tracking-widest">View All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(latestBlogs.length > 0 ? latestBlogs : [
                  {
                    id: 'dummy-1',
                    title: 'The Art of Bohemian Living',
                    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800',
                    created_at: new Date().toISOString()
                  },
                  {
                    id: 'dummy-2',
                    title: 'Ethical Sourcing: Behind the Seams',
                    img: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800',
                    created_at: new Date().toISOString()
                  },
                  {
                    id: 'dummy-3',
                    title: '5 Ways to Elevate Your Space with Textiles',
                    img: 'https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp',
                    created_at: new Date().toISOString()
                  }
                ]).map((blog, i) => (
                  <Link href={`/blog/${blog.id}`} key={blog.id} className="group cursor-pointer block">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <Image src={blog.img || '/placeholder.png'} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-[10px] font-bold text-[#987C6F] uppercase tracking-widest mb-2">{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-[#7A75A5] transition-colors line-clamp-2">{blog.title}</h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Exclusive Deals */}
            <div>
              <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Exclusive Deals Await</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <Link href="/shop" className="flex-1 relative rounded-2xl overflow-hidden min-h-[400px] group cursor-pointer block">
                  <Image src="https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_0979-5376.webp" alt="Save Big" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10 text-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#AAB084] mb-2">Sale Event</span>
                    <h3 className="text-5xl font-black mb-4 group-hover:text-[#AAB084] transition-colors">Save Big</h3>
                    <p className="font-medium opacity-90 mb-6 max-w-sm">Get amazing deals on your favorite items. Limited time only!</p>
                    <button className="self-start px-8 py-3 bg-[#AAB084] text-white font-bold rounded-full text-sm group-hover:bg-[#8d946d] transition-colors">
                      Explore Now
                    </button>
                  </div>
                </Link>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {featuredProducts.slice(0, 2).map((product) => (
                    <Link href={`/shop/${product.id}`} key={product.id} className="bg-[#FDFBF7] p-4 rounded-2xl flex flex-col group cursor-pointer block hover:shadow-md transition-shadow">
                      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4">
                        <div className="absolute top-2 right-2 z-10 bg-[#7A75A5] text-white text-[10px] font-black uppercase px-2 py-1 rounded">-20%</div>
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="font-bold text-sm text-[#5D4E46] line-clamp-1 mb-1 group-hover:text-[#7A75A5] transition-colors">{product.name}</h4>
                      <p className="text-xs font-bold text-[#5D4E46]/60 line-through mb-1">{(product.price * 1.2).toFixed(0)} NOK</p>
                      <p className="text-sm font-black text-[#987C6F]">{product.price} NOK</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
