'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/shared/utils/store';
import Link from 'next/link';

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

function CheckoutForm({ clientSecret, totalAmount }: { clientSecret: string; totalAmount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An unknown error occurred');
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="border border-[#3A3532]/20 rounded-md p-4 bg-white shadow-sm">
        <PaymentElement />
      </div>
      {errorMessage && <div className="text-red-500 text-sm mt-4">{errorMessage}</div>}
      <button 
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 mt-6 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[#C88267] transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay ${totalAmount} NOK`}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [clientSecret, setClientSecret] = useState('');
  const [stripeError, setStripeError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'vipps' | 'card'>('vipps');
  
  const shippingCost = 150;
  const totalAmount = getCartTotal() > 0 ? getCartTotal() + shippingCost : 0;

  useEffect(() => {
    if (totalAmount > 0 && paymentMethod === 'card') {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch secret');
          return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch(() => setStripeError(true));
    }
  }, [totalAmount, paymentMethod]);

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
                    <span className="font-bold">Credit Card (Stripe)</span>
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
                  <div>
                    {stripeError ? (
                      <div className="bg-white border border-[#3A3532]/10 rounded-xl p-6 shadow-sm">
                        <div className="bg-orange-50 text-orange-800 text-xs font-bold px-3 py-2 rounded-md mb-6 inline-block">
                          Test Mode Active
                        </div>
                        <div className="space-y-4">
                          <input type="text" placeholder="Card Number" className="w-full border border-[#3A3532]/20 rounded p-3 bg-white" />
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="w-full border border-[#3A3532]/20 rounded p-3 bg-white" />
                            <input type="text" placeholder="CVC" className="w-full border border-[#3A3532]/20 rounded p-3 bg-white" />
                          </div>
                        </div>
                        <Link href="/checkout/success" onClick={() => clearCart()} className="block text-center w-full mt-6 py-4 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#C88267] transition-colors">
                          Pay {totalAmount} NOK (Mock)
                        </Link>
                      </div>
                    ) : clientSecret && totalAmount > 0 ? (
                      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                        <CheckoutForm clientSecret={clientSecret} totalAmount={totalAmount} />
                      </Elements>
                    ) : (
                      <div className="text-[#3A3532]/60 font-medium text-center py-8">
                        {totalAmount > 0 ? 'Loading secure gateway...' : 'Your cart is empty.'}
                      </div>
                    )}
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
