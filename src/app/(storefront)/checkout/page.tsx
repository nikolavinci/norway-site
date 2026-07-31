'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/shared/utils/store';
import Link from 'next/link';

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'vipps' | 'card'>('vipps');
  
  const shippingCost = 150;
  const totalAmount = getCartTotal() > 0 ? getCartTotal() + shippingCost : 0;

  const handleStripeCheckout = async () => {
    if (totalAmount <= 0) return;
    
    // We get the setting from our public site_settings
    const { data: settings } = await import('@/shared/utils/supabase').then(m => m.supabase.from('site_settings').select('*').limit(1).single());
    
    try {
      const { supabase } = await import('@/shared/utils/supabase');
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          items, 
          email: 'customer@example.com', // In a real app, bind to the email input state
          isLive: settings?.is_stripe_live 
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to create checkout session:', err);
      alert('Stripe checkout failed. Check if Edge Functions are deployed.');
    }
  };

  const inputClasses = "w-full border border-[#3A3532]/20 rounded-md p-3 bg-white text-[#3A3532] font-medium placeholder:text-[#3A3532]/40 focus:outline-none focus:border-[#5D4E46] focus:ring-1 focus:ring-[#5D4E46] transition-all";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3A3532] font-sans pt-32 px-6 pb-24">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-black mb-10 text-[#5D4E46]">Secure Checkout</h1>
          
          <div className="space-y-12">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-bold text-[#5D4E46] mb-4">Contact Information</h2>
              <input type="email" placeholder="Email Address" required className={inputClasses} />
            </section>
            
            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-bold text-[#5D4E46] mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" required className={inputClasses} />
                  <input type="text" placeholder="Last Name" required className={inputClasses} />
                </div>
                <input type="text" placeholder="Address" required className={inputClasses} />
                <input type="text" placeholder="City" required className={inputClasses} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Postal Code" required className={inputClasses} />
                  <input type="text" placeholder="Norway" disabled className={`${inputClasses} bg-[#F9F6F0] opacity-70`} />
                </div>
              </div>
            </section>

            {/* Payment Selection */}
            <section>
              <h2 className="text-xl font-bold text-[#5D4E46] mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'vipps' ? 'border-[#FF5B24] bg-[#FF5B24]/5 ring-1 ring-[#FF5B24]' : 'border-[#3A3532]/20 hover:border-[#3A3532]/40 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="vipps" checked={paymentMethod === 'vipps'} onChange={() => setPaymentMethod('vipps')} className="w-4 h-4 accent-[#FF5B24]" />
                    <span className="font-bold">Vipps</span>
                  </div>
                  <div className="bg-[#FF5B24] text-white font-bold px-3 py-1 rounded-full text-xs">Vipps</div>
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#5D4E46] bg-[#5D4E46]/5 ring-1 ring-[#5D4E46]' : 'border-[#3A3532]/20 hover:border-[#3A3532]/40 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 accent-[#5D4E46]" />
                    <span className="font-bold">Credit Card & Klarna (Stripe)</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                  </div>
                </label>
              </div>

              {/* Payment Forms */}
              <div className="mt-8">
                {paymentMethod === 'vipps' ? (
                  <div className="bg-[#FF5B24]/10 border border-[#FF5B24]/20 rounded-xl p-8 text-center">
                    <h3 className="font-bold text-[#FF5B24] mb-2 text-lg">Pay easily with Vipps</h3>
                    <p className="text-[#3A3532]/70 text-sm mb-6 max-w-sm mx-auto">You will be redirected to the Vipps app to approve the transaction securely.</p>
                    <Link href="/checkout/success" onClick={() => clearCart()} className="block w-full py-4 bg-[#FF5B24] text-white rounded-full text-sm font-bold shadow-md hover:bg-[#e04a1b] transition-colors">
                      Betal med Vipps
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white border border-[#3A3532]/10 rounded-xl p-8 text-center shadow-sm">
                    <h3 className="font-bold text-[#5D4E46] mb-2 text-lg">Pay securely with Stripe</h3>
                    <p className="text-[#3A3532]/70 text-sm mb-6 max-w-sm mx-auto">You will be securely redirected to Stripe to pay via Credit Card, Apple Pay, or Klarna.</p>
                    <button onClick={handleStripeCheckout} className="block text-center w-full mt-6 py-4 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#C88267] transition-colors">
                      Proceed to Payment ({totalAmount} NOK)
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-8 border border-[#3A3532]/10 sticky top-32 shadow-sm">
            <h2 className="text-2xl font-black mb-6 text-[#5D4E46] border-b border-[#3A3532]/10 pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 divide-y divide-[#3A3532]/5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-4">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#5D4E46] text-white flex items-center justify-center text-xs font-bold">
                      {item.quantity}
                    </span>
                    <span className="font-bold text-[#5D4E46]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#5D4E46]">{item.price * item.quantity} NOK</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#3A3532]/10 pt-6 space-y-3 text-sm font-medium text-[#3A3532]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#5D4E46]">{getCartTotal()} NOK</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-[#5D4E46]">{items.length > 0 ? `${shippingCost} NOK` : '0 NOK'}</span>
              </div>
            </div>
            <div className="border-t border-[#3A3532]/10 pt-6 mt-6 flex justify-between font-black text-2xl text-[#5D4E46]">
              <span>Total</span>
              <span>{totalAmount} NOK</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
