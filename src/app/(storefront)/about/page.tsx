import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Pust Atelier',
  description: 'Pust Atelier brings a bit of the Himalayas into Norwegian homes through handcrafted cushions, blankets, and bags made by generational Nepalese craftspeople.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans antialiased pt-28 sm:pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 mb-20 md:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1 animate-fade-in-up">
            <span className="inline-block px-3.5 py-1 bg-[#F7F0E3] text-[#5D4E46] text-[11px] font-bold tracking-widest uppercase rounded-full mb-4">
              Hi, we're Pust Atelier
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black mb-6 tracking-tight leading-tight">
              A bit of the Himalayas in Norwegian homes.
            </h1>
            <p className="text-base sm:text-lg text-[#5D4E46]/85 mb-6 leading-relaxed">
              Pust Atelier started with a simple wish: to bring a bit of the Himalayas into Norwegian homes.
            </p>
            <p className="text-sm sm:text-base text-[#5D4E46]/75 mb-8 leading-relaxed">
              Everything we sell is handmade in Nepal by people who have spent years, sometimes whole lifetimes, learning their craft. Every cushion cover, bag and blanket is made by hand, one at a time. That's why no two pieces are exactly alike, and we think that's the best part.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/shop" 
                className="bg-[#5D4E46] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#3A3532] transition-all shadow-md flex items-center gap-2"
              >
                Explore The Collection <ArrowRight size={16} />
              </Link>
              <Link 
                href="/faq" 
                className="border border-[#5D4E46]/30 text-[#5D4E46] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-white transition-all flex items-center gap-2"
              >
                Read Our FAQs
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/5] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl bg-[#F7F4EE]">
            <Image 
              src="/images/boho_feature_showcase.jpg" 
              alt="Artisan handcrafting textiles in Nepal"
              fill
              priority
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm font-medium backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/20">
              Handcrafted in Nepal with love, patience, and generational knowledge.
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="bg-[#F4ECE1] py-20 md:py-24 mb-20 md:mb-28 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* How it started */}
            <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-[#5D4E46]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-[#987C6F] block">Our Journey</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#5D4E46] mb-5">How it started</h2>
                <div className="space-y-4 text-sm sm:text-base text-[#5D4E46]/85 leading-relaxed">
                  <p>
                    It began quite small. We brought a few pieces home from Nepal for our own house, and before long family and friends started noticing them and asking where they came from. The kind words kept coming, and that got us thinking.
                  </p>
                  <p>
                    Our founder, <strong>Emilie Westlie</strong>, has always been fascinated by home interiors, so turning that into a little project felt natural. Pust Atelier is what came out of it.
                  </p>
                </div>
              </div>
            </div>

            {/* Why we're doing this */}
            <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-[#5D4E46]/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-[#987C6F] block">Our Purpose</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#5D4E46] mb-5">Why we're doing this</h2>
                <div className="space-y-4 text-sm sm:text-base text-[#5D4E46]/85 leading-relaxed">
                  <p>
                    This isn't just a shop for us. It's a passion project, and every item means something to us. We choose each piece with care, and we'd honestly be happy to have it in our own homes.
                  </p>
                  <p>
                    Most of what's sold today is mass-produced, identical and made to be replaced. We wanted to offer something different: pieces with a story, made by real people, that you'll want to keep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Himalayan colour, Nordic calm */}
      <section className="max-w-[1440px] mx-auto px-6 mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-xl bg-white">
            <Image 
              src="/images/products/green_tree_tablecover.webp" 
              alt="Himalayan textiles in a Nordic home" 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#987C6F] block">Living Harmony</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight text-[#5D4E46]">
              Himalayan colour, Nordic calm
            </h2>
            <p className="text-base text-[#5D4E46]/85 leading-relaxed">
              Norwegian homes are beautiful: clean, calm and cosy. Our idea is to add a little warmth and colour to that. Think soft Nordic shapes with rich Himalayan patterns and bright colours. A cushion cover on a grey sofa. A wool blanket for long winter evenings. A bag that makes you smile when you pick it up.
            </p>
            <p className="text-base text-[#5D4E46]/85 leading-relaxed">
              We're not trying to change your style. We just hope to add a bit of life to it.
            </p>
          </div>
        </div>
      </section>

      {/* Supporting Nepalese craftspeople */}
      <section className="max-w-[1440px] mx-auto px-6 mb-20 md:mb-28">
        <div className="rounded-3xl bg-[#5D4E46] text-white p-8 sm:p-14 lg:p-16 shadow-xl">
          <div className="max-w-3xl">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFD6A5] block mb-3">Artisan Support</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black mb-6 leading-tight">
              Supporting Nepalese craftspeople
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-4">
              Buying a handmade piece from us means supporting traditional Nepalese handicrafts and the people who keep them alive.
            </p>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We'd love to see these skills valued for the long run, not replaced by fast, cheap production.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section: Just the drafted Thank you paragraph with picture on the side */}
      <section className="max-w-[1440px] mx-auto px-6">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-white border border-[#5D4E46]/10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Drafted Paragraph on one side */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#5D4E46] mb-6">Thank you</h2>
              <p className="text-base sm:text-lg text-[#5D4E46]/85 leading-relaxed mb-6">
                We're a small team doing this with a lot of heart and a lot to learn. If you've bought something, shared us with a friend, or just stopped by to look around, thank you. It truly means a lot.
              </p>
              <p className="text-sm sm:text-base text-[#5D4E46]/80 leading-relaxed mb-8">
                If you have questions, ideas or just want to say hi, send us a message at{' '}
                <a href="mailto:pustatelier@gmail.com" className="font-bold underline text-[#5D4E46] hover:text-[#987C6F]">
                  pustatelier@gmail.com
                </a>.
              </p>
              <div className="pt-6 border-t border-[#5D4E46]/10">
                <p className="italic text-base font-serif text-[#5D4E46]">Warm regards,</p>
                <p className="font-bold text-sm tracking-wider uppercase text-[#5D4E46] mt-1">Emilie and the Pust Atelier team</p>
              </div>
            </div>

            {/* Picture on the side */}
            <div className="md:col-span-5 relative aspect-square sm:aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-[#F7F4EE]">
              <Image 
                src="/images/products/yellow_lotus_bedding.webp" 
                alt="Emilie and the Pust Atelier collection" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
