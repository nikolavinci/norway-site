import Link from 'next/link';
import { RefreshCw, ArrowLeft, Clock, CheckCircle2, AlertCircle, CreditCard, PackageCheck, Mail } from 'lucide-react';

export const metadata = {
  title: 'Refund & Return Policy | Pust Atelier',
  description: 'Learn about our 14-day return policy, statutory right of withdrawal (angrerett), and refund process at Pust Atelier.',
};

export default function RefundPolicyPage() {
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
            Customer Care & Guarantees
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4">
            Refund & Return Policy
          </h1>
          <p className="text-sm md:text-base text-[#5D4E46]/80 leading-relaxed max-w-2xl">
            At Pust Atelier, we want you to love your bohemian handcrafts. If an item isn't quite right for your space or style, we provide a transparent, hassle-free return and refund policy in accordance with Norwegian consumer law (<em>Angrerettloven</em>).
          </p>
          <p className="text-xs text-[#5D4E46]/50 mt-4">
            Last updated: October 2026 • Valid for all online purchases in Norway and international orders
          </p>
        </header>

        {/* Policy Highlights / Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <div className="p-6 rounded-2xl bg-white border border-[#5D4E46]/10 shadow-sm flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5] mb-3">
              <Clock size={22} />
            </span>
            <h3 className="font-bold text-base text-[#5D4E46] mb-1">14-Day Angrerett</h3>
            <p className="text-xs text-[#5D4E46]/70">Full right of withdrawal within 14 calendar days of delivery.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#5D4E46]/10 shadow-sm flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5] mb-3">
              <CreditCard size={22} />
            </span>
            <h3 className="font-bold text-base text-[#5D4E46] mb-1">Fast Processing</h3>
            <p className="text-xs text-[#5D4E46]/70">Refunds processed to your original payment method in 5–10 business days.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#5D4E46]/10 shadow-sm flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5] mb-3">
              <PackageCheck size={22} />
            </span>
            <h3 className="font-bold text-base text-[#5D4E46] mb-1">2-Year Reklamasjon</h3>
            <p className="text-xs text-[#5D4E46]/70">Free replacement or full refund on any artisan or material defects.</p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-10">
          
          {/* Section 1: 14-Day Right of Withdrawal */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5]">
                <RefreshCw size={18} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">1. Right of Withdrawal (Angrerett)</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                In compliance with the Norwegian Cancellation Act (<em>Lov om opplysningsplikt og angrerett ved fjernsalg mv.</em>), you are entitled to cancel your purchase within <strong>14 days</strong> of receiving your package without giving any reason.
              </p>
              <p>
                To exercise your right of withdrawal, you must notify us before the 14-day withdrawal period has expired. You may use our cancellation standard form or simply email our support team at <a href="mailto:info@pustatelier.com" className="text-[#7A75A5] underline font-medium">info@pustatelier.com</a> with your order number.
              </p>
            </div>
          </section>

          {/* Section 2: Eligibility & Return Conditions */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5]">
                <CheckCircle2 size={18} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">2. Return Conditions</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                To be eligible for a full refund, your returned merchandise must satisfy the following conditions:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#7A75A5] shrink-0 mt-0.5" />
                  <span>Items must be in new, unused, and unwashed condition with all original tags attached.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#7A75A5] shrink-0 mt-0.5" />
                  <span>Artisan textiles, quilts, and handwoven bags must be packaged securely in their original protective dust bag/box to prevent snagging during transport.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#7A75A5] shrink-0 mt-0.5" />
                  <span>The package must include the return packing slip or order number clearly indicated.</span>
                </li>
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-[#FDFBF7] border border-[#5D4E46]/10 text-xs">
                <strong>Non-Returnable Items:</strong> Customized or personalized products tailored to bespoke customer dimensions, and gift cards cannot be returned unless defective.
              </div>
            </div>
          </section>

          {/* Section 3: Step-by-Step Return Process */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5]">
                <PackageCheck size={18} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">3. How to Initiate a Return</h2>
            </div>
            <div className="space-y-4 text-sm text-[#5D4E46]/85 leading-relaxed">
              <ol className="list-decimal list-inside space-y-3 pl-2">
                <li>
                  <strong>Contact Customer Support:</strong> Send an email to{' '}
                  <a href="mailto:info@pustatelier.com" className="text-[#7A75A5] underline font-medium">info@pustatelier.com</a>{' '}
                  with the subject <em>"Return Request - [Your Order Number]"</em> and list the item(s) you wish to return.
                </li>
                <li>
                  <strong>Receive Return Authorization:</strong> Our team will reply within 24 hours with return instructions and our return warehouse address in Oslo, Norway.
                </li>
                <li>
                  <strong>Pack & Ship:</strong> Securely wrap the items and drop off the package at your local Posten/Bring or courier service. We recommend using a trackable shipping service.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 4: Return Shipping & Costs */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5]">
                <AlertCircle size={18} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">4. Return Shipping Fees</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                In accordance with Norwegian law, customers cover the return shipping postage when exercising their standard right of withdrawal (*angrerett*).
              </p>
              <p>
                <strong>Free Return Shipping on Defects:</strong> If you are returning an item due to a defect, transit damage, or if you received an incorrect item, Pust Atelier covers 100% of return shipping expenses and will provide a pre-paid shipping label.
              </p>
            </div>
          </section>

          {/* Section 5: Refunds & Timelines */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5]">
                <CreditCard size={18} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">5. Refunds & Payment Method</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                Once your return is delivered to our atelier and inspected, we will send an email confirmation of your refund status.
              </p>
              <p>
                Approved refunds are processed back to your original payment method (e.g. Visa, Mastercard, AMEX via Stripe) within <strong>5–10 business days</strong>. Depending on your bank or card issuer, the funds may take an additional 2–3 business days to post to your statement.
              </p>
            </div>
          </section>

          {/* Section 6: Reklamasjon (Warranty & Defective Goods) */}
          <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#7A75A5]">
                <CheckCircle2 size={18} />
              </span>
              <h2 className="text-2xl font-bold text-[#5D4E46]">6. Claims & Warranty (Reklamasjon)</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                Under the Norwegian Consumer Purchases Act (<em>Forbrukerkjøpsloven</em>), consumers have a statutory <strong>2-year claim period</strong> (or 5 years for goods intended to last significantly longer) against manufacturing and material flaws.
              </p>
              <p>
                If your handcrafted product exhibits a flaw or failure during normal use, please email photos and description to <a href="mailto:info@pustatelier.com" className="text-[#7A75A5] underline font-medium">info@pustatelier.com</a>. We will gladly repair, replace, or issue a full refund including shipping costs.
              </p>
            </div>
          </section>

        </div>

        {/* Support Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-[#F7F0E3] border border-[#E2DEBB] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#5D4E46] shrink-0 shadow-sm">
              <Mail size={22} />
            </span>
            <div>
              <h3 className="font-bold text-[#5D4E46] text-base mb-0.5">Need help with a return or exchange?</h3>
              <p className="text-xs text-[#5D4E46]/80">Our Oslo customer care team is here to assist you Monday through Friday.</p>
            </div>
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
