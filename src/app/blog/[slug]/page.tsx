'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Link2, ChevronLeft } from 'lucide-react';

// Inline SVGs for social icons removed from lucide-react
const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const WavyDivider = ({ fill, flip = false }: { fill: string, flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
    <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={fill}></path>
    </svg>
  </div>
);

// Mock blog data
const BLOG_POSTS = [
  { 
    slug: '0', 
    title: "Must-Have Bags for Your Summer Getaway", 
    date: "March 4, 2024",
    img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69958c7c30895633d86899b0.webp",
    content: "When it comes to summer travel, having the perfect bag is essential. Not only does it need to carry all your essentials, but it should also effortlessly complement your sunny wardrobe. Our newest collection of handcrafted bohemian bags offers the perfect blend of style and practicality for any destination. Whether you're strolling through coastal towns or exploring vibrant city markets, these woven wonders are designed to be your most reliable companion."
  },
  { 
    slug: '1', 
    title: "Eco-Friendly Textiles for a Sustainable Home", 
    date: "March 4, 2024",
    img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp",
    content: "Transforming your living space into a sustainable sanctuary starts with the materials you choose. Our eco-friendly textiles are crafted with deep respect for the environment, utilizing natural dyes and ethically sourced fibers. By integrating these earthy elements into your home, you're not just enhancing its aesthetic appeal—you're supporting artisan communities and promoting a greener future. Discover how a simple throw or cushion can make a world of difference."
  },
  { 
    slug: '2', 
    title: "Styling Your Space with Bohemian Prints", 
    date: "March 4, 2024",
    img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp",
    content: "Bohemian interior design is all about breaking the rules and embracing creative freedom. Mixing and matching bold prints can breathe life into any room, adding layers of texture and personality. Start with a neutral base and introduce vibrant patterns through rugs, tapestries, and accent pillows. Don't be afraid to combine contrasting motifs—the key is to find a unifying color palette that ties the eclectic mix together into a harmonious and inviting space."
  }
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const postIndex = parseInt(slug as string);
  
  if (isNaN(postIndex) || postIndex < 0 || postIndex >= BLOG_POSTS.length) {
    return notFound();
  }

  const post = BLOG_POSTS[postIndex];
  const relatedPosts = BLOG_POSTS.filter((_, i) => i !== postIndex);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-32 pb-0">
      <main className="max-w-[1000px] mx-auto px-6 mb-24">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ChevronLeft size={16} className="mr-1" /> Back to Home
        </Link>

        {/* Header */}
        <header className="text-center mb-12">
          <p className="text-xs font-bold text-[#987C6F] uppercase tracking-widest mb-4">{post.date} · Lifestyle</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#5D4E46] leading-tight mb-8 max-w-3xl mx-auto">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm text-[#5D4E46]/60 font-medium">
            <span>By Pust Atelier</span>
            <span>·</span>
            <span>3 min read</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-lg">
          <Image src={post.img} alt={post.title} fill className="object-cover" unoptimized priority />
        </div>

        {/* Content & Sharing Layout */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left: Social Share */}
          <div className="md:w-16 flex-shrink-0">
            <div className="sticky top-32 flex flex-row md:flex-col gap-4 items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#5D4E46]/40 hidden md:block rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</span>
              <button className="w-10 h-10 rounded-full border border-[#5D4E46]/10 flex items-center justify-center text-[#5D4E46]/60 hover:bg-[#5D4E46] hover:text-white transition-colors">
                <TwitterIcon size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#5D4E46]/10 flex items-center justify-center text-[#5D4E46]/60 hover:bg-[#5D4E46] hover:text-white transition-colors">
                <FacebookIcon size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#5D4E46]/10 flex items-center justify-center text-[#5D4E46]/60 hover:bg-[#5D4E46] hover:text-white transition-colors">
                <Link2 size={18} />
              </button>
            </div>
          </div>

          {/* Right: Article Body */}
          <div className="flex-1 max-w-2xl text-lg text-[#5D4E46]/80 leading-relaxed space-y-8">
            <p className="text-xl leading-relaxed font-medium text-[#5D4E46]">
              {post.content}
            </p>
            <p>
              Embracing a bohemian lifestyle isn't just about aesthetics—it's a philosophy of intentional living. Every piece you bring into your home or carry with you should tell a story and resonate with your values. As we journey through changing seasons, our focus remains on curating items that offer both timeless beauty and practical longevity.
            </p>
            <h2 className="text-2xl font-black text-[#5D4E46] mt-12 mb-6">Crafting Your Personal Sanctuary</h2>
            <p>
              Whether you're redefining your living room or selecting the perfect tote for your daily adventures, remember that authenticity is key. Look for materials that age gracefully and designs that defy fleeting trends. Our commitment to ethical craftsmanship ensures that each item not only looks good but also does good.
            </p>
            <div className="my-12 p-8 bg-[#F7F0E3] rounded-2xl text-center italic font-medium text-xl text-[#5D4E46]">
              "Surround yourself with the things you love, crafted by hands that care."
            </div>
            <p>
              We invite you to explore our latest collection and find those special pieces that speak directly to your soul. Thank you for joining us on this beautiful journey of sustainable and stylish living.
            </p>
          </div>
        </div>
      </main>

      <WavyDivider fill="fill-white" />

      {/* Related Posts */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black text-[#5D4E46]">Read more posts like this</h2>
            <Link href="/" className="text-xs font-bold text-[#5D4E46]/60 hover:text-[#7A75A5] uppercase tracking-widest">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {relatedPosts.map((related) => (
              <Link href={`/blog/${related.slug}`} key={related.slug} className="group cursor-pointer block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 shadow-sm">
                  <Image src={related.img} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
                <p className="text-[10px] font-bold text-[#987C6F] uppercase tracking-widest mb-3">{related.date}</p>
                <h3 className="font-bold text-2xl leading-snug group-hover:text-[#7A75A5] transition-colors">{related.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
