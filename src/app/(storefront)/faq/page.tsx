import Link from 'next/link';
import { 
  CreditCard, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Mail, 
  ArrowLeft, 
  HelpCircle,
  Tag,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata = {
  title: 'Frequently Asked Questions (FAQ) | Pust Atelier',
  description: 'Find answers about ordering, payments (Vipps, Klarna, BankAxept), Norway shipping, 14-day returns, and our Nepalese handmade products.',
};

const faqSections = [
  {
    id: 'orders-payment',
    title: 'Orders & Payment',
    icon: CreditCard,
    items: [
      {
        q: 'How do I place an order?',
        a: 'Add items to your cart, go to checkout, and follow the simple steps. You will receive an order confirmation by email or SMS (whatever you prefer).'
      },
      {
        q: 'Do I need an account to order?',
        a: 'No, you can check out as a guest. However, creating a user account gives you access to exclusive deals, order tracking, and discount codes.'
      },
      {
        q: 'Which payment methods do you accept?',
        a: 'We accept the most popular and secure payment methods in Norway: Vipps, Klarna, BankAxept, Visa, Mastercard, AMEX, as well as Apple Pay and Google Pay.'
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'Please email us at pustatelier@gmail.com as soon as possible with your order number. If the order has not yet shipped, we can change or cancel it free of charge.'
      },
      {
        q: 'How do I use my 20% first-order discount?',
        a: 'Sign up for our newsletter and enter the welcome code you receive at checkout. The code works on your first order only and cannot be combined with other offers.'
      }
    ]
  },
  {
    id: 'shipping-delivery',
    title: 'Shipping & Delivery',
    icon: Truck,
    items: [
      {
        q: 'Where do you ship?',
        a: 'We currently ship inside Norway only.'
      },
      {
        q: 'How much does shipping cost?',
        a: 'Standard shipping cost is calculated and added to the total amount at checkout. The exact cost is determined by which shipping partner you choose.'
      },
      {
        q: 'How long does delivery take?',
        a: 'Orders are dispatched within 2 working days. Delivery within Norway usually takes 3–5 working days.'
      },
      {
        q: 'How can I track my order?',
        a: 'You will receive an email with a tracking link as soon as your order ships from our Oslo warehouse.'
      },
      {
        q: 'What if my parcel arrives damaged?',
        a: 'Please contact us at pustatelier@gmail.com within a few days of receiving your parcel, including photos of both the outer packaging and the item, and we will promptly sort it out.'
      }
    ]
  },
  {
    id: 'returns-refunds',
    title: 'Returns & Refunds',
    icon: RotateCcw,
    items: [
      {
        q: 'Can I return an item?',
        a: 'Yes. You have 14 days from receiving your order to return it without giving any reason. See our Returns & Refunds page for full details.'
      },
      {
        q: 'Who pays for return shipping?',
        a: 'In accordance with Norwegian law, the customer pays return shipping unless the item is faulty or we accidentally sent the wrong item.'
      },
      {
        q: 'When will I get my refund?',
        a: 'Within 14 days of us receiving your withdrawal notice, refunded directly to your original payment method.'
      },
      {
        q: 'What if my item is faulty?',
        a: 'Email us at pustatelier@gmail.com with your order number and photos. You have a 2-year complaint right under Norwegian law (5 years for items meant to last much longer, such as quilts and bedding).'
      }
    ]
  },
  {
    id: 'our-products',
    title: 'Our Products',
    icon: Sparkles,
    items: [
      {
        q: 'Are your products really handmade?',
        a: 'Yes. Our pieces are crafted by skilled artisans in Nepal. Most of our products are completely handmade, unless specifically noted otherwise in an item description.'
      },
      {
        q: 'Why does my item look slightly different from the photos?',
        a: 'Because each piece is handmade from natural materials, small variations in colour, pattern, and size are normal, expected, and part of their authentic charm. Device screen settings can also slightly alter how colours appear.'
      },
      {
        q: 'What are your products made of?',
        a: 'Material details and fabric compositions are transparently listed on each individual product page.'
      },
      {
        q: 'Where are your products made?',
        a: 'All of our products are handmade in Nepal by generational craftspeople.'
      },
      {
        q: 'How do I care for my items?',
        a: 'Please check the care label on your specific item. Generally, gentle handwashing in cool water is recommended to preserve natural dyes and handwoven fibers.'
      },
      {
        q: 'Do you make custom or personalised items?',
        a: 'No, we do not offer custom or personalised orders at the moment.'
      }
    ]
  },
  {
    id: 'contact-store',
    title: 'Contact & Store',
    icon: Mail,
    items: [
      {
        q: 'How can I reach you?',
        a: 'Email us at pustatelier@gmail.com. We try our best to respond as quickly as possible (typically within the same working day).'
      },
      {
        q: 'Do you have a physical shop?',
        a: 'We are online-only at the moment. Our long-term goal is to establish a welcoming physical shop in Norway one day!'
      }
    ]
  }
];

export default function FAQ() {
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
            Help & Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-[#5D4E46]/80 leading-relaxed max-w-2xl">
            Everything you need to know about our handmade Himalayan products, Norwegian delivery, Vipps and Klarna payments, and simple returns.
          </p>
        </header>

        {/* Category Quick Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {faqSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="px-4 py-2 rounded-full bg-white border border-[#5D4E46]/10 hover:border-[#987C6F] hover:bg-[#F7F0E3] transition-all text-xs font-bold text-[#5D4E46] flex items-center gap-1.5 shadow-xs"
            >
              <sec.icon size={13} className="text-[#987C6F]" />
              <span>{sec.title}</span>
            </a>
          ))}
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {faqSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#5D4E46]/10">
                  <span className="w-8 h-8 rounded-xl bg-[#F7F0E3] flex items-center justify-center text-[#987C6F]">
                    <SectionIcon size={18} />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-black text-[#5D4E46]">
                    {section.title}
                  </h2>
                </div>

                <div className="bg-white rounded-2xl border border-[#5D4E46]/10 shadow-sm p-4 sm:p-6">
                  <Accordion type="single" collapsible className="space-y-3">
                    {section.items.map((item, idx) => (
                      <AccordionItem 
                        key={idx} 
                        value={`${section.id}-${idx}`}
                        className="bg-[#FDFBF7] rounded-xl px-4 sm:px-5 border border-[#5D4E46]/5 overflow-hidden"
                      >
                        <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-[#5D4E46] py-4 hover:no-underline hover:text-[#987C6F]">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-[#5D4E46]/85 leading-relaxed pb-4 pt-1 border-t border-[#5D4E46]/5">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            );
          })}
        </div>

        {/* Contact Support Box */}
        <div className="mt-16 p-8 rounded-3xl bg-[#F7F0E3] border border-[#E2DEBB] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#5D4E46] shrink-0 shadow-xs">
              <Mail size={22} className="text-[#987C6F]" />
            </span>
            <div>
              <h3 className="font-bold text-[#5D4E46] text-base mb-0.5">Still have questions?</h3>
              <p className="text-xs text-[#5D4E46]/80">
                Email us at <a href="mailto:pustatelier@gmail.com" className="font-bold underline text-[#5D4E46]">pustatelier@gmail.com</a>. We usually reply within the same working day.
              </p>
            </div>
          </div>
          <Link 
            href="/contact" 
            className="px-6 py-3 bg-[#5D4E46] text-white rounded-full font-bold text-xs hover:bg-[#3A3532] transition-colors shrink-0 shadow-sm"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}
