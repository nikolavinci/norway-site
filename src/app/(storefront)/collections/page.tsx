import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/shared/utils/products';

export default async function Collections() {
  const products = await getProducts();
  
  const categories = [
    {
      title: 'Bags & Totes',
      slug: 'bags',
      description: 'Handcrafted bags woven with traditional techniques.',
      image: products.find(p => p.category.toLowerCase().includes('bag'))?.image || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Home & Living',
      slug: 'home-living',
      description: 'Warm, textural pieces for your modern sanctuary.',
      image: products.find(p => p.category.toLowerCase().includes('cushion') || p.category.toLowerCase().includes('home'))?.image || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600',
    },
    {
      title: 'Accessories',
      slug: 'accessories',
      description: 'The little things that make a big difference.',
      image: products.find(p => p.category.toLowerCase().includes('accessory'))?.image || 'https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans antialiased pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our <span className="underline decoration-[#987C6F] underline-offset-4 decoration-4">Collections</span>
          </h1>
          <p className="text-[#5D4E46]/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our thoughtfully curated collections. Every piece is ethically made and designed to bring bohemian warmth to your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link href={`/shop?category=${cat.slug}`} key={cat.slug} className={`group block relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[2/3] shadow-lg animate-fade-in-up`} style={{ animationDelay: `${index * 150}ms` }}>
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white/70 text-xs font-black uppercase tracking-widest mb-2 block">View Collection</span>
                <h2 className="text-white text-3xl font-black mb-3">{cat.title}</h2>
                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}