import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Compass, Mountain, ShieldCheck, Mail } from 'lucide-react';

export const metadata = {
  title: 'About Us | Pust Atelier',
  description: 'Pust Atelier brings a bit of the Himalayas into Norwegian homes through handcrafted cushions, bags, and blankets made by master Nepalese craftspeople.',
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
              Pust Atelier started with a simple wish: to bring the warmth, texture, and soul of the Himalayas into Norwegian homes.
            </p>
            <p className="text-sm sm:text-base text-[#5D4E46]/75 mb-8 leading-relaxed">
              Everything we sell is handmade in Nepal by craftspeople who have spent years—sometimes whole lifetimes—learning and perfecting their art. Every cushion cover, bag, and blanket is made by hand, one at a time. That's why no two pieces are ever exactly alike, and we think that's the best part.
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
              Handwoven with care, patience, and generational knowledge in Nepal.
            </div>
          </div>
        </div>
      </section>

      {/* Story & How it started */}
      <section className="bg-[#F4ECE1] py-20 md:py-24 mb-20 md:mb-28 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-[#987C6F] block">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#5D4E46]">How It Started</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/70 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="space-y-5 text-sm sm:text-base text-[#5D4E46]/85 leading-relaxed">
              <p>
                It began quite small. We brought a few handcrafted pieces home from Nepal for our own house, and before long, family and friends started noticing them and asking where they came from.
              </p>
              <p>
                The kind words kept coming, and that got us thinking.
              </p>
              <p>
                Our founder, <strong>Emilie Westlie</strong>, has always been fascinated by home interiors, so turning that deep appreciation into a passion project felt entirely natural. Pust Atelier is what came out of it.
              </p>
            </div>
            <div className="space-y-5 text-sm sm:text-base text-[#5D4E46]/85 leading-relaxed border-t md:border-t-0 md:border-l border-[#5D4E46]/10 pt-6 md:pt-0 md:pl-10">
              <h3 className="text-xl font-bold text-[#5D4E46]">Why we're doing this</h3>
              <p>
                This isn't just a shop for us. It's a genuine passion project, and every item means something personal to us. We choose each piece with care, and we'd honestly be happy to have every single one in our own home.
              </p>
              <p>
                Most of what's sold today is mass-produced, identical, and made to be quickly replaced. We wanted to offer something different: pieces with a story, made by real people, that you'll cherish for years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Himalayan Colour, Nordic Calm */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F0E3] rounded-full text-xs font-bold uppercase tracking-wider text-[#987C6F]">
              <Compass size={14} /> Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight text-[#5D4E46]">
              Himalayan colour, <br />Nordic calm.
            </h2>
            <p className="text-base text-[#5D4E46]/85 leading-relaxed">
              Norwegian homes are beautiful: clean, calm, and cosy. Our idea is to add a little warmth and colour to that sanctuary.
            </p>
            <p className="text-base text-[#5D4E46]/85 leading-relaxed">
              Think soft Nordic shapes with rich Himalayan patterns and bright, earthy colours. A handwoven cushion cover on a calm grey sofa. A warm wool blanket for long winter evenings. A distinctive bag that makes you smile every time you pick it up.
            </p>
            <blockquote className="border-l-4 border-[#987C6F] pl-5 py-2 font-serif text-lg italic text-[#5D4E46]">
              "We're not trying to change your style. We just hope to add a bit of life to it."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Supporting Nepalese craftspeople */}
      <section className="max-w-[1440px] mx-auto px-6 mb-20 md:mb-28">
        <div className="rounded-3xl bg-[#5D4E46] text-white p-8 sm:p-14 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-[#FFD6A5] mb-4">
              <Mountain size={14} /> Ethical Craft
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black mb-6 leading-tight">
              Supporting Nepalese craftspeople
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
              Buying a handmade piece from Pust Atelier means directly supporting traditional Nepalese handicrafts and the dedicated artisans who keep them alive.
            </p>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              We want to see these generational skills valued and sustained for the long run—not replaced by fast, disposable, machine-made production.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15 text-left">
              <div>
                <h4 className="font-bold text-base text-white mb-1">100% Handmade</h4>
                <p className="text-xs text-white/70">Each item is crafted individually, celebrating natural uniqueness.</p>
              </div>
              <div>
                <h4 className="font-bold text-base text-white mb-1">Direct & Fair</h4>
                <p className="text-xs text-white/70">Ethical collaboration honoring the artisan's time, mastery, and materials.</p>
              </div>
              <div>
                <h4 className="font-bold text-base text-white mb-1">Pieces With A Story</h4>
                <p className="text-xs text-white/70">Heirloom textiles and accessories crafted to be kept and cherished.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank you note & Signoff */}
      <section className="max-w-[1100px] mx-auto px-6 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-white border border-[#5D4E46]/10 shadow-sm">
          <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46] mx-auto mb-4">
            <Heart size={22} className="text-[#987C6F]" fill="#987C6F" />
          </span>
          <h2 className="text-3xl font-serif font-black text-[#5D4E46] mb-4">Thank You</h2>
          <p className="text-base text-[#5D4E46]/85 max-w-2xl mx-auto leading-relaxed mb-6">
            We're a small team doing this with a lot of heart and a lot to learn. If you've bought something, shared us with a friend, or just stopped by to look around, thank you. It truly means the world to us.
          </p>
          <p className="text-sm text-[#5D4E46]/80 mb-8">
            If you have questions, ideas, or just want to say hi, send us an email at{' '}
            <a href="mailto:pustatelier@gmail.com" className="font-bold underline text-[#5D4E46] hover:text-[#987C6F]">
              pustatelier@gmail.com
            </a>.
          </p>
          <div className="pt-6 border-t border-[#5D4E46]/10 inline-block">
            <p className="italic text-base font-serif text-[#5D4E46]">Warm regards,</p>
            <p className="font-bold text-sm tracking-wider uppercase text-[#5D4E46] mt-1">Emilie and the Pust Atelier team</p>
          </div>
        </div>
      </section>
    </div>
  );
}
