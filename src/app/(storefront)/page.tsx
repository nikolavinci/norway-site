import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/shared/utils/products';
import { ChevronRight, Plus } from 'lucide-react';
import CuratedPicks from '@/components/CuratedPicks';

// Reusable Wavy Divider Component
const WavyDivider = ({ fill, flip = false }: { fill: string, flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
    <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={fill}></path>
    </svg>
  </div>
);

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);
  
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

            {/* Right: Feature Image */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp"
                alt="Bohemian Interior" fill className="object-cover" priority unoptimized
              />
              <div className="absolute inset-0 bg-[#987C6F]/10 mix-blend-multiply"></div>
            </div>
            
          </div>
        </section>

        {/* Overlapping Featured Products */}
        <section className="max-w-[1440px] mx-auto px-6 -mt-32 relative z-20 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="bg-white rounded-3xl p-6 shadow-xl flex flex-col relative group hover:-translate-y-2 transition-transform duration-300">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#FFD6A5] text-[#D97D27] text-[10px] font-black uppercase px-2 py-1 rounded">New</span>
                </div>
                {index === 1 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#E4D1FF] text-[#6A3F9C] text-[10px] font-black uppercase px-2 py-1 rounded">-15%</span>
                  </div>
                )}
                
                <Link href={`/shop/${product.id}`} className="relative h-48 w-full mb-6">
                  <Image src={product.image} alt={product.name} fill className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" unoptimized />
                </Link>
                
                <div className="text-center mt-auto">
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="font-bold text-[#5D4E46] text-lg leading-tight mb-1 group-hover:text-[#A3BCB6] transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <div className="text-sm font-medium text-[#5D4E46]/80">
                    {product.price} NOK 
                    {index === 1 && <span className="text-gray-400 line-through ml-2 text-xs">{(product.price * 1.15).toFixed(0)} NOK</span>}
                  </div>
                </div>

                {/* Plus Button */}
                <Link href={`/shop/${product.id}`} className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#EAE5FE] text-[#7A5FCF] flex items-center justify-center hover:bg-[#D4CBFD] transition-colors shadow-sm">
                  <Plus size={18} strokeWidth={3} />
                </Link>
              </div>
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
              <Image src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp" alt="Playful Space" fill className="object-cover" unoptimized />
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
                  <Image src={cat.img} alt={cat.title} fill className="object-cover" unoptimized />
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
              <Image src="https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp" alt="Furniture" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest mb-1">Earthy Tones</span>
                <h3 className="text-2xl font-black text-white">Bohemian Decor</h3>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="flex-1 relative rounded-xl overflow-hidden group">
                <Image src={allProducts.length > 1 ? allProducts[1].image : '/placeholder.png'} alt="Accessories" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-6 text-center">
                  <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest mb-1">Artisan Quality</span>
                  <h3 className="text-2xl font-black text-white">Handcrafted Bags</h3>
                </div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden group">
                <Image src="https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_4361-8664.webp" alt="Playtime" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center p-6 text-center">
                  <h3 className="text-2xl font-black text-white">Living Essentials</h3>
                </div>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image src="https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_1325-9484.webp" alt="Wardrobe" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-black text-white">Textile Artistry</h3>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image src={allProducts.length > 3 ? allProducts[3].image : '/placeholder.png'} alt="Storage" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-black text-white">Sustainable Living</h3>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
              <Image src={allProducts.length > 4 ? allProducts[4].image : '/placeholder.png'} alt="Plushies" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
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
                    <Image src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 15}.jpg`} alt="Avatar" fill className="object-cover" unoptimized />
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((img, i) => (
                <div key={i} className="relative w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden group-hover:pause-animation">
                  <Image src={allProducts[i % allProducts.length]?.image || '/placeholder.png'} alt="Product" fill className="object-cover hover:scale-110 transition-transform duration-700" unoptimized />
                </div>
              ))}
            </div>
            {/* Duplicate for infinite effect */}
            <div className="animate-marquee flex gap-4 px-4 whitespace-nowrap min-w-full" aria-hidden="true">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((img, i) => (
                <div key={i} className="relative w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden group-hover:pause-animation">
                  <Image src={allProducts[i % allProducts.length]?.image || '/placeholder.png'} alt="Product" fill className="object-cover hover:scale-110 transition-transform duration-700" unoptimized />
                </div>
              ))}
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
                {[
                  { title: "Must-Have Bags for Your Summer Getaway", img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69958c7c30895633d86899b0.webp" },
                  { title: "Eco-Friendly Textiles for a Sustainable Home", img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp" },
                  { title: "Styling Your Space with Bohemian Prints", img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp" }
                ].map((blog, i) => (
                  <Link href={`/blog/${i}`} key={i} className="group cursor-pointer block">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                      <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    </div>
                    <p className="text-[10px] font-bold text-[#987C6F] uppercase tracking-widest mb-2">March 4, 2024</p>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-[#7A75A5] transition-colors">{blog.title}</h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Exclusive Deals */}
            <div>
              <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Exclusive Deals Await</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <Link href="/shop" className="flex-1 relative rounded-2xl overflow-hidden min-h-[400px] group cursor-pointer block">
                  <Image src="https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_0979-5376.webp" alt="Save Big" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
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
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
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
