import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans antialiased pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              Crafted with <br/><span className="underline decoration-[#987C6F] underline-offset-4 decoration-4">Intention.</span>
            </h1>
            <p className="text-lg text-[#5D4E46]/80 mb-8 max-w-lg leading-relaxed">
              At Pust Atelier, we believe that the objects you bring into your home should have a story. Our journey began with a simple mission: to preserve traditional craftsmanship while creating modern, timeless pieces for your sanctuary.
            </p>
            <div className="flex gap-4">
              <Link href="/shop" className="bg-[#5D4E46] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#AAB084] transition-colors flex items-center gap-2">
                Discover Our Craft <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800" 
              alt="Artisan crafting textiles"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#EAE4DC] py-24 mb-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDFBF7] rounded-full mix-blend-overlay opacity-50 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#AAB084] rounded-full mix-blend-overlay opacity-20 blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-[#987C6F]">Our Philosophy</h2>
          <p className="text-3xl md:text-5xl font-serif max-w-4xl mx-auto leading-snug">
            "We source our materials ethically, work directly with master artisans, and design pieces that are meant to be loved for a lifetime, not just a season."
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-[1440px] mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Ethically Sourced",
              desc: "We trace every fiber and material back to its roots, ensuring fair trade and sustainable harvesting practices.",
              img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400"
            },
            {
              title: "Master Craftsmanship",
              desc: "Our partners are generational artisans who pour decades of knowledge into every stitch, weave, and carve.",
              img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp"
            },
            {
              title: "Timeless Design",
              desc: "Trends fade, but true style endures. We design with a bohemian soul and a minimalist eye for pieces that last.",
              img: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp"
            }
          ].map((value, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg">
                <Image 
                  src={value.img} 
                  alt={value.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-black mb-3">{value.title}</h3>
              <p className="text-[#5D4E46]/70 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
