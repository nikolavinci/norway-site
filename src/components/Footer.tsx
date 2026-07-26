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
            <div className="flex gap-3 mt-4 text-[#5D4E46]/70">
              <a href="#" aria-label="Facebook" className="w-7 h-7 flex items-center justify-center border border-current rounded-full hover:bg-[#5D4E46] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-7 h-7 flex items-center justify-center border border-current rounded-full hover:bg-[#5D4E46] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-7 h-7 flex items-center justify-center border border-current rounded-full hover:bg-[#5D4E46] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.1 8.4 2 10.2 2 12s.1 3.6.5 4.9c.5 1.7 1.8 3 3.5 3.5 1.5.4 4.5.6 6 .6s4.5-.2 6-.6c1.7-.5 3-1.8 3.5-3.5.4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9c-.5-1.7-1.8-3-3.5-3.5-1.5-.4-4.5-.6-6-.6s-4.5.2-6 .6c-1.7.5-3 1.8-3.5 3.5z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="w-7 h-7 flex items-center justify-center border border-current rounded-full hover:bg-[#5D4E46] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
              <a href="#" aria-label="Pinterest" className="w-7 h-7 flex items-center justify-center border border-current rounded-full hover:bg-[#5D4E46] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 20l4-9"/><path d="M10.7 14c.498 1.144 2.227 1.874 3.3 1 1.776-1.448 3.037-5.068 1-7-2.316-2.2-7.142-1.31-7 2.5.023 1.155.105 2.595 1 3"/></svg>
              </a>
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
