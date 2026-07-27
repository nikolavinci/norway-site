'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '../../shared/utils/store';
import Link from 'next/link';

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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

  const inputClasses = "w-full border border-[#3A3532]/20 rounded-md p-3 bg-white text-[#3A3532] font-light placeholder:text-[#3A3532]/40 focus:outline-none focus:border-[#C88267] focus:ring-1 focus:ring-[#C88267] transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-serif text-[#3A3532] mb-4">Contact Information</h2>
        <input type="email" placeholder="Email Address" required className={inputClasses} />
      </div>
      
      <div>
        <h2 className="text-xl font-serif text-[#3A3532] mb-4">Shipping Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" required className={inputClasses} />
          <input type="text" placeholder="Last Name" required className={inputClasses} />
        </div>
        <input type="text" placeholder="Address" required className={`${inputClasses} mt-4`} />
        <input type="text" placeholder="City" required className={`${inputClasses} mt-4`} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input type="text" placeholder="Postal Code" required className={inputClasses} />
          <input type="text" placeholder="Norway" disabled className={`${inputClasses} bg-[#F9F6F0] opacity-70`} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-serif text-[#3A3532] mb-4">Payment</h2>
        <div className="border border-[#3A3532]/20 rounded-md p-4 bg-white">
          <PaymentElement />
        </div>
      </div>

      {errorMessage && <div className="text-red-500 text-sm mt-4">{errorMessage}</div>}

      <button 
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[#C88267] transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay ${totalAmount} NOK`}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { items, getCartTotal } = useCartStore();
  const [clientSecret, setClientSecret] = useState('');
  const [stripeError, setStripeError] = useState(false);
  
  const shippingCost = 150;
  const totalAmount = getCartTotal() > 0 ? getCartTotal() + shippingCost : 0;

  useEffect(() => {
    if (totalAmount > 0) {
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
  }, [totalAmount]);

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#3A3532] font-sans pt-32 px-6 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-serif font-light mb-10 text-[#3A3532]">Secure Checkout</h1>
          {stripeError ? (
            <div className="space-y-8">
              <div className="bg-red-50 text-red-600 border border-red-200 rounded-md p-4 text-sm mb-6">
                The Stripe API key has expired. Displaying mock checkout interface.
              </div>
              <div>
                <h2 className="text-xl font-serif mb-4">Payment (Mock)</h2>
                <div className="border border-[#3A3532]/20 rounded-md p-4 space-y-4 bg-white">
                  <input type="text" placeholder="Card Number" disabled className="w-full border border-[#3A3532]/20 rounded p-3 bg-[#F9F6F0] opacity-50 font-light" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" disabled className="w-full border border-[#3A3532]/20 rounded p-3 bg-[#F9F6F0] opacity-50 font-light" />
                    <input type="text" placeholder="CVC" disabled className="w-full border border-[#3A3532]/20 rounded p-3 bg-[#F9F6F0] opacity-50 font-light" />
                  </div>
                </div>
              </div>
              <button 
                className="w-full py-4 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[#C88267] transition-colors"
              >
                Pay {totalAmount} NOK (Mock)
              </button>
            </div>
          ) : clientSecret && totalAmount > 0 ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <CheckoutForm clientSecret={clientSecret} totalAmount={totalAmount} />
            </Elements>
          ) : (
            <div className="text-[#3A3532]/60 font-light">
              {totalAmount > 0 ? 'Loading secure gateway...' : 'Your cart is empty. Please add items before checking out.'}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl p-8 border border-[#3A3532]/10 sticky top-32 shadow-sm">
            <h2 className="text-2xl font-serif font-light mb-6 text-[#3A3532]">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-2">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-[#3A3532] text-white flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                    <span className="font-medium text-[#3A3532]">{item.name}</span>
                  </div>
                  <span className="font-serif text-[#3A3532]">{item.price * item.quantity} NOK</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#3A3532]/10 pt-6 space-y-3 text-sm font-light text-[#3A3532]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif text-[#3A3532]">{getCartTotal()} NOK</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-serif text-[#3A3532]">{items.length > 0 ? `${shippingCost} NOK` : '0 NOK'}</span>
              </div>
            </div>
            <div className="border-t border-[#3A3532]/10 pt-6 mt-6 flex justify-between font-serif text-2xl text-[#3A3532]">
              <span>Total</span>
              <span>{totalAmount} NOK</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
