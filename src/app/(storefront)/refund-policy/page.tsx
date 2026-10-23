import Link from 'next/link';
import { 
  RotateCcw, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  PackageCheck, 
  Mail,
  Sparkles,
  ShieldCheck,
  Building2,
  Phone
} from 'lucide-react';

export const metadata = {
  title: 'Returns & Refunds | Pust Atelier',
  description: '14-day statutory right of withdrawal (angrerett), condition of items, return shipping, and refund process for Pust Atelier Oslo.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans antialiased pt-28 sm:pt-32 pb-24 px-6">
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
            Returns & Refunds
          </h1>
          <p className="text-sm md:text-base text-[#5D4E46]/80 leading-relaxed max-w-2xl">
            We want you to love your handmade Himalayan items. If something isn't right, you have a straightforward, 14-day right of withdrawal in accordance with Norwegian consumer law (<em>Angrerettloven</em>).
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5D4E46]/60 mt-4">
            <span>Pust Atelier Oslo</span>
            <span>•</span>
            <span>Org. no. 938 220 530</span>
            <span>•</span>
            <span>pustatelier@gmail.com</span>
          </div>
        </header>

        {/* Policy Highlights / Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          <div className="p-6 rounded-2xl bg-white border border-[#5D4E46]/10 shadow-sm flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#987C6F] mb-3">
              <Clock size={22} />
            </span>
            <h3 className="font-bold text-base text-[#5D4E46] mb-1">14-Day Right of Withdrawal</h3>
            <p className="text-xs text-[#5D4E46]/70 leading-relaxed">
              Return any item within 14 days of receiving it, without giving any reason.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#5D4E46]/10 shadow-sm flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#987C6F] mb-3">
              <CreditCard size={22} />
            </span>
            <h3 className="font-bold text-base text-[#5D4E46] mb-1">Full Refund</h3>
            <p className="text-xs text-[#5D4E46]/70 leading-relaxed">
              We refund the full price, including standard delivery, within 14 days of notice.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#5D4E46]/10 shadow-sm flex flex-col items-center text-center">
            <span className="w-12 h-12 rounded-full bg-[#F7F0E3] flex items-center justify-center text-[#987C6F] mb-3">
              <PackageCheck size={22} />
            </span>
            <h3 className="font-bold text-base text-[#5D4E46] mb-1">Fault Protection</h3>
            <p className="text-xs text-[#5D4E46]/70 leading-relaxed">
              Statutory complaint right: 2 years (5 years for long-life textiles).
            </p>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Right of withdrawal (14 days) */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <RotateCcw size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Right of withdrawal (14 days)</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                You can return any item within <strong>14 days</strong> of receiving it, without giving a reason.
              </p>
              <p>
                To initiate a return, email us at{' '}
                <a href="mailto:pustatelier@gmail.com" className="text-[#987C6F] font-bold underline">
                  pustatelier@gmail.com
                </a>{' '}
                with your order number to notify us that you are returning the item. Then send the item back within <strong>14 days</strong> of that notice.
              </p>
            </div>
          </section>

          {/* Section 2: Condition of items */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <CheckCircle2 size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Condition of items</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                You may open and inspect items as you would in a physical shop. Please return them <strong>unused, unwashed, and in their original packaging</strong> where possible.
              </p>
              <p>
                We may deduct for any loss of value caused by handling beyond what is necessary to establish the nature, characteristics, and functioning of the goods. <strong>Any item that, upon inspection, is found to have been used will not qualify for a refund.</strong>
              </p>
            </div>
          </section>

          {/* Section 3: Exceptions */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <AlertCircle size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Exceptions</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                Custom-made or personalised items tailored to unique customer specifications cannot be returned.
              </p>
            </div>
          </section>

          {/* Section 4: Return shipping */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <PackageCheck size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Return shipping</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                You pay the cost of returning the item, unless it is faulty or we sent the wrong item.
              </p>
              <p>
                We recommend choosing a tracked shipping method with Posten/Bring or your local parcel carrier so you can follow the package until it safely arrives back with us.
              </p>
            </div>
          </section>

          {/* Section 5: Refunds */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <CreditCard size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Refunds</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                We refund the full price, including standard delivery costs, within <strong>14 days</strong> of receiving your withdrawal notice.
              </p>
              <p>
                We may withhold the refund until we have received the returned goods back, or until you have supplied evidence of having sent them back. The refund will always be issued to your <strong>original payment method</strong> (Vipps, Klarna, card, etc.).
              </p>
            </div>
          </section>

          {/* Section 6: Faulty items */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <ShieldCheck size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Faulty items</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                If an item is damaged or faulty upon arrival, please contact us within a reasonable time after discovering the fault, including photos and your order number.
              </p>
              <p>
                Under the Norwegian Consumer Purchases Act (*Forbrukerkjøpsloven*), you have a <strong>2-year complaint right</strong> (5 years for items meant to last much longer, such as quilts and bedding). We will repair, replace, or issue a full refund, and we cover all return shipping costs in these cases.
              </p>
            </div>
          </section>

          {/* Section 7: Handmade products notice */}
          <section className="bg-white p-7 sm:p-9 rounded-3xl border border-[#5D4E46]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                <Sparkles size={18} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#5D4E46]">Handmade products</h2>
            </div>
            <div className="space-y-3 text-sm text-[#5D4E46]/85 leading-relaxed">
              <p>
                Since our products are crafted by hand from natural fibres and materials, slight variations in colour, pattern, and size are normal, authentic, and are <strong>not defects</strong>.
              </p>
            </div>
          </section>

        </div>

        {/* Company & Contact Card */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#F7F0E3] border border-[#E2DEBB] shadow-sm">
          <h3 className="font-serif text-2xl font-black text-[#5D4E46] mb-3">Contact Information</h3>
          <p className="text-sm text-[#5D4E46]/80 mb-6 leading-relaxed">
            Need to notify us of a return, report an issue, or ask a question? Get in touch with our team:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-[#5D4E46]">
            <div className="p-4 rounded-2xl bg-white border border-[#5D4E46]/10">
              <span className="text-[10px] uppercase font-bold text-[#987C6F] block mb-1">Company</span>
              <p className="font-bold">Pust Atelier Oslo</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#5D4E46]/10">
              <span className="text-[10px] uppercase font-bold text-[#987C6F] block mb-1">Org. No.</span>
              <p className="font-bold">938 220 530</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#5D4E46]/10">
              <span className="text-[10px] uppercase font-bold text-[#987C6F] block mb-1">Phone</span>
              <a href="tel:+4746425715" className="font-bold hover:text-[#987C6F]">+47 464 25 715</a>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#5D4E46]/10">
              <span className="text-[10px] uppercase font-bold text-[#987C6F] block mb-1">Email</span>
              <a href="mailto:pustatelier@gmail.com" className="font-bold underline hover:text-[#987C6F] truncate block">
                pustatelier@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
