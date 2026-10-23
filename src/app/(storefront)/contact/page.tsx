'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save inquiry to localStorage for persistence
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pust_contact_inquiries');
        const list = stored ? JSON.parse(stored) : [];
        list.push({
          ...formState,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('pust_contact_inquiries', JSON.stringify(list));
      } catch {
        // Safe fallback
      }
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2C2C2A] font-sans antialiased pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#987C6F] font-bold block mb-2">
            Get in touch
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#5D4E46] mb-4">
            Contact Us
          </h1>
          <p className="text-[#5D4E46]/80 text-base leading-relaxed">
            Have a question about an order, our artisan collection, or returns? We’re always here to assist you and strive to reply within the same working day.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email */}
          <div className="bg-white border border-[#5D4E46]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F6F1EA] text-[#5D4E46] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#5D4E46] font-medium mb-1">Email Us</h3>
              <p className="text-xs text-[#5D4E46]/70 leading-relaxed mb-4">
                For order support, questions or return requests.
              </p>
            </div>
            <a 
              href="mailto:pustatelier@gmail.com" 
              className="text-sm font-semibold text-[#5D4E46] hover:text-[#987C6F] underline underline-offset-4 break-all"
            >
              pustatelier@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white border border-[#5D4E46]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F6F1EA] text-[#5D4E46] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#5D4E46] font-medium mb-1">Call Us</h3>
              <p className="text-xs text-[#5D4E46]/70 leading-relaxed mb-4">
                Monday to Friday, 09:00 – 17:00 CET.
              </p>
            </div>
            <a 
              href="tel:+4746425715" 
              className="text-sm font-semibold text-[#5D4E46] hover:text-[#987C6F] underline underline-offset-4"
            >
              +47 464 25 715
            </a>
          </div>

          {/* Location & Organization */}
          <div className="bg-white border border-[#5D4E46]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F6F1EA] text-[#5D4E46] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#5D4E46] font-medium mb-1">Pust Atelier Oslo</h3>
              <p className="text-xs text-[#5D4E46]/70 leading-relaxed mb-4">
                Online artisan studio based in Oslo, Norway.
              </p>
            </div>
            <p className="text-xs text-[#5D4E46]/80 font-mono">
              Org. no. 938 220 530
            </p>
          </div>
        </div>

        {/* Main Content Grid: Form + Fast FAQ Support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#5D4E46]/10 rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="font-serif text-2xl text-[#5D4E46] mb-2">Send us a message</h2>
            <p className="text-xs text-[#5D4E46]/70 mb-8">
              Fill out the form below and we will get back to your email inbox shortly.
            </p>

            {submitted ? (
              <div className="py-12 px-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl text-[#5D4E46] mb-2">Message Received!</h3>
                <p className="text-sm text-[#5D4E46]/80 max-w-md mb-6 leading-relaxed">
                  Thank you for reaching out, <strong>{formState.name || 'there'}</strong>. We have received your inquiry and will reply to <strong>{formState.email}</strong> as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#5D4E46] text-xs font-semibold text-[#5D4E46] hover:bg-[#5D4E46] hover:text-white transition-all cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5D4E46] uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ingrid Hansen"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#5D4E46]/20 bg-[#FDFCF8] text-sm text-[#5D4E46] focus:outline-none focus:border-[#5D4E46] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5D4E46] uppercase tracking-wider mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ingrid@example.no"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#5D4E46]/20 bg-[#FDFCF8] text-sm text-[#5D4E46] focus:outline-none focus:border-[#5D4E46] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4E46] uppercase tracking-wider mb-2">
                    Subject / Order Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Order #1042 inquiry or Product question"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#5D4E46]/20 bg-[#FDFCF8] text-sm text-[#5D4E46] focus:outline-none focus:border-[#5D4E46] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5D4E46] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#5D4E46]/20 bg-[#FDFCF8] text-sm text-[#5D4E46] focus:outline-none focus:border-[#5D4E46] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full py-3.5 px-6 rounded-full bg-[#5D4E46] text-white text-sm font-medium hover:bg-[#483c36] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Info & FAQs Callout */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick response badge */}
            <div className="bg-[#F6F1EA] rounded-3xl p-7 border border-[#5D4E46]/10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#5D4E46]">
                <Clock className="w-5 h-5 text-[#987C6F]" />
                <h3 className="font-serif text-lg font-medium">Response Time</h3>
              </div>
              <p className="text-xs text-[#5D4E46]/80 leading-relaxed">
                We read and respond to every inquiry personally. You can expect a response within <strong>the same working day</strong> (Monday to Friday).
              </p>
              <div className="border-t border-[#5D4E46]/10 pt-4 flex flex-col gap-2 text-xs text-[#5D4E46]/70">
                <div className="flex justify-between">
                  <span>Monday – Friday:</span>
                  <span className="font-medium text-[#5D4E46]">09:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday – Sunday:</span>
                  <span className="font-medium text-[#5D4E46]">Limited availability</span>
                </div>
              </div>
            </div>

            {/* Need instant answers? */}
            <div className="bg-white rounded-3xl p-7 border border-[#5D4E46]/10 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#5D4E46]">
                <HelpCircle className="w-5 h-5 text-[#987C6F]" />
                <h3 className="font-serif text-lg font-medium">Frequently Asked Questions</h3>
              </div>
              <p className="text-xs text-[#5D4E46]/80 leading-relaxed">
                Looking for answers regarding shipping times, accepted payment methods, or returns within Norway?
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FDFCF8] border border-[#5D4E46]/10 text-xs font-semibold text-[#5D4E46] hover:border-[#5D4E46]/30 hover:bg-[#F6F1EA] transition-all"
                >
                  <span>Explore FAQs</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/refund-policy"
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#FDFCF8] border border-[#5D4E46]/10 text-xs font-semibold text-[#5D4E46] hover:border-[#5D4E46]/30 hover:bg-[#F6F1EA] transition-all"
                >
                  <span>Returns & Refunds Policy (14 days)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Note on Physical Store */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-[#5D4E46]/10 text-xs text-[#5D4E46]/75 leading-relaxed">
              <div className="flex items-center gap-2 font-serif text-[#5D4E46] font-medium text-sm mb-1.5">
                <MessageSquare className="w-4 h-4 text-[#987C6F]" />
                <span>Online Artisan Studio</span>
              </div>
              Pust Atelier currently operates as an online studio delivering across Norway. Our artisan products are handpicked and shipped directly from our Oslo hub.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
