import Link from 'next/link';
import { ShieldCheck, FileText, RefreshCw, Lock, Scale, Building2, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Legal Notice & Terms | Pust Atelier',
  description: 'Legal information, terms of service, privacy policy, and consumer rights for Pust Atelier.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans antialiased pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-[#5D4E46]/70 hover:text-[#5D4E46] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-[#5D4E46]/10 pb-10 mb-12">
          <span className="inline-block px-3.5 py-1 bg-[#F7F0E3] text-[#5D4E46] text-[11px] font-bold tracking-widest uppercase rounded-full mb-4">
            Legal & Compliance
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4">
            Legal Notice & Terms
          </h1>
          <p className="text-sm md:text-base text-[#5D4E46]/80 leading-relaxed max-w-2xl">
            This page outlines our company identification, terms of sale, privacy policy, and return policies in accordance with Norwegian and European consumer regulations.
          </p>
          <p className="text-xs text-[#5D4E46]/50 mt-4">
            Last updated: October 2026 • Governing Law: Norway
          </p>
        </header>

        {/* Quick Jump Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-14">
          <a href="#company" className="p-3.5 rounded-xl bg-white border border-[#5D4E46]/10 hover:border-[#7A75A5] transition-all text-xs font-bold flex items-center gap-2">
            <Building2 size={16} className="text-[#7A75A5] shrink-0" /> Company Details
          </a>
          <a href="#terms" className="p-3.5 rounded-xl bg-white border border-[#5D4E46]/10 hover:border-[#7A75A5] transition-all text-xs font-bold flex items-center gap-2">
            <FileText size={16} className="text-[#7A75A5] shrink-0" /> Terms of Sale
          </a>
          <a href="#returns" className="p-3.5 rounded-xl bg-white border border-[#5D4E46]/10 hover:border-[#7A75A5] transition-all text-xs font-bold flex items-center gap-2">
            <RefreshCw size={16} className="text-[#7A75A5] shrink-0" /> Returns & Right of Withdrawal
          </a>
          <a href="#privacy" className="p-3.5 rounded-xl bg-white border border-[#5D4E46]/10 hover:border-[#7A75A5] transition-all text-xs font-bold flex items-center gap-2">
            <Lock size={16} className="text-[#7A75A5] shrink-0" /> Privacy & GDPR
          </a>
          <a href="#ip" className="p-3.5 rounded-xl bg-white border border-[#5D4E46]/10 hover:border-[#7A75A5] transition-all text-xs font-bold flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#7A75A5] shrink-0" /> Intellectual Property
          </a>
          <a href="#disputes" className="p-3.5 rounded-xl bg-white border border-[#5D4E46]/10 hover:border-[#7A75A5] transition-all text-xs font-bold flex items-center gap-2">
            <Scale size={16} className="text-[#7A75A5] shrink-0" /> Dispute Resolution
          </a>
        </div>

        {/* Content Sections */}
        <div className="space-y-14">
          
          {/* 1. Company Information */}
          <section id="company" className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46]">
                <Building2 size={20} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">1. Company Information</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                <strong>Company Name:</strong> Pust Atelier AS
              </p>
              <p>
                <strong>Organization Number (Org. nr.):</strong> 938 220 530 MVA (Foretaksregisteret, Norway)
              </p>
              <p>
                <strong>Registered Business Address:</strong> Karl Johans gate 12, 0154 Oslo, Norway
              </p>
              <p>
                <strong>Customer Service Email:</strong>{' '}
                <a href="mailto:pustatelier@gmail.com" className="text-[#7A75A5] underline font-medium">
                  pustatelier@gmail.com
                </a>
              </p>
              <p>
                <strong>General Management:</strong> Pust Atelier Creative Direction & Operations
              </p>
            </div>
          </section>

          {/* 2. Terms of Sale */}
          <section id="terms" className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46]">
                <FileText size={20} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">2. Terms of Sale & Service</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                By placing an order via the Pust Atelier storefront, you agree to these Terms of Sale. All transactions are governed by the Norwegian Consumer Purchases Act (<em>Forbrukerkjøpsloven</em>) and the Cancellation Act (<em>Angrerettloven</em>).
              </p>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Pricing and Taxes</h3>
              <p>
                All prices on the website are displayed in Norwegian Kroner (NOK) and include 25% Norwegian value-added tax (MVA/VAT). Shipping fees, if applicable, are calculated and clearly shown prior to final order confirmation at checkout.
              </p>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Payment Methods</h3>
              <p>
                We accept secure payments processed through Stripe, including major debit/credit cards (Visa, MasterCard, American Express) and local payment methods where supported. Payment details are encrypted and never stored on our servers.
              </p>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Order Confirmation</h3>
              <p>
                Once an order is submitted, an automatic order confirmation is sent to your registered email address. A binding purchase agreement is concluded once we confirm dispatch of the goods.
              </p>
            </div>
          </section>

          {/* 3. Returns & Right of Withdrawal */}
          <section id="returns" className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46]">
                <RefreshCw size={20} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">3. Right of Withdrawal & Returns (Angrerett)</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                Under the Norwegian Cancellation Act (<em>Angrerettloven</em>), consumers have the right to withdraw from their purchase within <strong>14 days</strong> of receiving the items without providing any reason.
              </p>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Return Conditions</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Items must be returned in their original condition, unwashed, unused, and with original tags and packaging intact.</li>
                <li>Artisan handmade items and textiles should be handled with care to prevent snagging or damage during inspection.</li>
                <li>Customized or personalized items made to bespoke specifications are exempt from the right of withdrawal.</li>
              </ul>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Refund Processing</h3>
              <p>
                Upon receiving and inspecting returned items, we will process your refund to the original payment method within 7–14 business days. Return shipping costs are covered by the customer unless the return is due to a defect or error on our part.
              </p>
            </div>
          </section>

          {/* 4. Privacy & Data Protection */}
          <section id="privacy" className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46]">
                <Lock size={20} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">4. Privacy Policy & GDPR</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                Pust Atelier is committed to protecting your privacy in full compliance with the European General Data Protection Regulation (GDPR) and the Norwegian Personal Data Act (<em>Personopplysningsloven</em>).
              </p>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Data We Collect</h3>
              <p>
                We only collect information necessary to fulfill orders and enhance your browsing experience: name, shipping address, contact email, telephone number, and order history.
              </p>
              <h3 className="font-bold text-base text-[#5D4E46] pt-2">Your Rights</h3>
              <p>
                You have the right to request access to the personal data we hold about you, request corrections, or ask for deletion of your data at any time by contacting{' '}
                <a href="mailto:pustatelier@gmail.com" className="text-[#7A75A5] underline font-medium">pustatelier@gmail.com</a>.
              </p>
            </div>
          </section>

          {/* 5. Intellectual Property */}
          <section id="ip" className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46]">
                <ShieldCheck size={20} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">5. Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                All visual assets, artisan photography, product designs, textual descriptions, logos, and trademarks displayed on this site are the intellectual property of Pust Atelier AS and its creative partners. Unauthorized reproduction, duplication, or commercial exploitation is strictly prohibited without prior written consent.
              </p>
            </div>
          </section>

          {/* 6. Dispute Resolution */}
          <section id="disputes" className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-2xl bg-[#F7F0E3] flex items-center justify-center text-[#5D4E46]">
                <Scale size={20} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">6. Dispute Resolution & Consumer Rights</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                We always strive to resolve any disagreement amicably. If a satisfactory solution cannot be reached, complaints may be submitted to the Norwegian Consumer Authority (<em>Forbrukertilsynet</em>):
              </p>
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#5D4E46]/10 text-xs space-y-1">
                <p><strong>Forbrukertilsynet:</strong> Postboks 2862 Kjørbekk, 3702 Skien, Norway</p>
                <p><strong>Website:</strong> <a href="https://www.forbrukertilsynet.no" target="_blank" rel="noopener noreferrer" className="text-[#7A75A5] underline">www.forbrukertilsynet.no</a></p>
                <p><strong>EU Online Dispute Resolution (ODR):</strong> <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#7A75A5] underline">ec.europa.eu/consumers/odr</a></p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Help Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#F7F0E3] border border-[#E2DEBB] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-[#5D4E46] text-lg mb-1">Have any questions about our legal policies?</h3>
            <p className="text-xs text-[#5D4E46]/80">Our support team is always ready to assist you.</p>
          </div>
          <Link 
            href="/contact" 
            className="px-6 py-3 bg-[#5D4E46] text-white rounded-full font-bold text-xs hover:bg-[#3A3532] transition-colors shrink-0 shadow-sm"
          >
            Contact Customer Support
          </Link>
        </div>

      </div>
    </div>
  );
}
