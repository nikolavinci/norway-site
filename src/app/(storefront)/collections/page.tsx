import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/shared/utils/products';

export const metadata = {
  title: 'Our Collections | Pust Atelier',
  description: 'Explore handmade Cushion covers, Blankets & Shawls, Quilt bags, and artisan home textiles from Nepal.',
};

export default async function Collections() {
  const categories = [
    {
      title: 'Cushion covers',
      slug: 'Cushion covers',
      description: 'Warm, textural artisan cushion covers handwoven to bring Himalayan colour and soul to your sofa and sanctuary.',
      image: '/images/products/green_tree_tablecover.webp',
    },
    {
      title: 'Blankets/Shawls',
      slug: 'Blankets/Shawls',
      description: 'Elegantly draped, sustainably hand-spun blankets and wool shawls perfect for cozy Nordic winter evenings.',
      image: '/images/products/blue_lily_quilt.webp',
    },
    {
      title: 'Quilt bags',
      slug: 'Quilt bags',
      description: 'Handcrafted bohemian totes, quilted bags, and vintage upholstery carriers that make you smile every day.',
      image: '/images/bags/bag1.png',
    },
    {
      title: 'Others',
      slug: 'Others',
      description: 'Distinctive artisan table runners, decorative textiles, and unique handcrafted home decor pieces from Nepal.',
      image: '/images/boho_feature_showcase.jpg',
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans antialiased pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <span className="inline-block px-3.5 py-1 bg-[#F7F0E3] text-[#5D4E46] text-[11px] font-bold tracking-widest uppercase rounded-full mb-4">
            Curated Categories
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-serif">
            Our Collections
          </h1>
          <p className="text-[#5D4E46]/75 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Every piece is handmade one at a time in Nepal by generational artisans, bringing rich colour, texture, and story to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat, index) => (
            <Link 
              href={`/shop?category=${encodeURIComponent(cat.slug)}`} 
              key={cat.slug} 
              className="group block relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg animate-fade-in-up bg-[#F7F4EE]" 
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <Image 
                src={cat.image} 
                alt={cat.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-7 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-1.5 block">
                  Explore Category
                </span>
                <h2 className="text-white text-2xl font-black mb-2">{cat.title}</h2>
                <p className="text-white/80 text-xs leading-relaxed line-clamp-3">
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
