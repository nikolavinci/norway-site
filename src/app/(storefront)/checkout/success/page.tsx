'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '../../../shared/utils/store';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Suspense } from 'react';

function CheckoutSuccessContent() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#3A3532] font-sans flex flex-col items-center justify-center pt-20 px-6">
      <div className="bg-white rounded-3xl p-12 md:p-16 shadow-lg max-w-2xl w-full text-center border border-[#3A3532]/10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#A3BCB6]" />
        
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#A3BCB6] rounded-full blur-xl opacity-40 animate-pulse" />
            <CheckCircle2 size={80} className="text-[#A3BCB6] relative z-10" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-[#3A3532]">Order Confirmed</h1>
        
        <p className="text-lg text-[#3A3532]/70 font-light mb-2">
          Thank you for your purchase! 
        </p>
        <p className="text-[#3A3532]/70 font-light mb-10">
          Your authentic handcrafted pieces are being prepared for you. We will send you an email confirmation shortly.
        </p>

        {paymentIntent && (
          <div className="mb-10 p-4 bg-[#F9F7F2] rounded-xl text-xs font-mono text-[#3A3532]/60 inline-block">
            Order Ref: {paymentIntent.split('_')[1].toUpperCase()}
          </div>
        )}

        <div>
          <Link 
            href="/shop" 
            className="inline-block px-10 py-4 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest hover:bg-[#C88267] transition-colors shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
