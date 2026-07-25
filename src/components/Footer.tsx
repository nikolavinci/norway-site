'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] pt-20 pb-8 px-6 mt-auto">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Newsletter section */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h3 className="font-serif text-2xl text-[#5D4E46]">Sign up to receive 20% off your first order.</h3>
            <p className="text-sm text-[#5D4E46]/70 leading-relaxed">
              Don't miss out — sign up now and make sure you have everything you need to look and feel your best!
            </p>
            <div className="mt-2 flex border border-[#5D4E46]/20 rounded-md overflow-hidden bg-white max-w-sm">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2 text-sm outline-none bg-transparent" />
              <button className="px-4 text-[#5D4E46]/50 hover:text-[#5D4E46]">›</button>
            </div>
            {/* Socials Placeholder */}
            <div className="flex gap-3 mt-4 text-[#5D4E46]/70">
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-full text-[10px]">f</span>
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-full text-[10px]">in</span>
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-full text-[10px]">yt</span>
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-full text-[10px]">tt</span>
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-full text-[10px]">p</span>
            </div>
          </div>

          {/* Our Shop */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-bold text-[#5D4E46] text-sm tracking-wide">Our Shop</h4>
            <p className="text-xs text-[#5D4E46]/70">Find a location nearest you.</p>
            <p className="text-xs text-[#5D4E46] font-medium flex items-center gap-1">📍 See Our Stores</p>
            <p className="text-xs text-[#5D4E46] font-medium flex items-center gap-1">✉ info@pustatteliers.com</p>
            <div className="border-t border-[#5D4E46]/10 my-1 w-8"></div>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">Privacy policy</Link>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">Refund policy</Link>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">Terms & Conditions</Link>
          </div>

          {/* Quick links */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <h4 className="font-bold text-[#5D4E46] text-sm tracking-wide">Quick links</h4>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">About</Link>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">FAQ</Link>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">Events</Link>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">Journal</Link>
            <Link href="#" className="text-xs text-[#5D4E46]/70 hover:text-[#5D4E46]">Search</Link>
          </div>

          {/* Promotional Image Block */}
          <div className="col-span-1 md:col-span-1">
            <div className="bg-[#987C6F] aspect-square rounded-lg flex flex-col items-center justify-center text-center p-6 text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2 font-bold opacity-80">Home & Lifestyle</p>
                <h3 className="font-serif text-3xl mb-4 group-hover:scale-105 transition-transform">Pust Atteliers</h3>
                <p className="text-xs opacity-90 mb-4">Our latest collection of authentic artisan home decor</p>
                <span className="inline-block px-4 py-2 border border-white/50 rounded-full text-xs hover:bg-white hover:text-[#987C6F] transition-colors">Shop Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#5D4E46]/10 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-[#5D4E46]/60">© 2026, Pust Atteliers. Brewed by nikolavinci</p>
          {/* Payment Methods */}
          <div className="flex flex-wrap gap-1.5 items-center mt-4">
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
              <span className="text-[6px] font-black text-[#5D4E46]">DISCOVER</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
