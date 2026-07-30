'use client';

import { useCartStore } from '@/shared/utils/store';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCartStore();

  const total = getCartTotal();
  const freeShippingThreshold = 1000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - total);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-[#5D4E46] mb-12 border-b border-[#5D4E46]/10 pb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
            <p className="text-[#5D4E46]/60 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our beautiful handcrafted collections.</p>
            <Link href="/shop" className="px-8 py-4 bg-[#7A75A5] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#635f8d] transition-colors shadow-md">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="flex-1">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#5D4E46]/20 text-xs font-bold uppercase tracking-widest text-[#5D4E46]/50">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-[#5D4E46]/10">
                {items.map(item => (
                  <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                      <Link href={`/shop/${item.id}`} className="relative w-24 h-32 bg-[#F9F6F0] rounded-xl overflow-hidden flex-shrink-0 shadow-sm group">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </Link>
                      <div>
                        <Link href={`/shop/${item.id}`} className="font-bold text-lg hover:text-[#AAB084] transition-colors block mb-1">{item.name}</Link>
                        <p className="text-sm font-medium text-[#5D4E46]/60 mb-3">{item.price} NOK</p>
                        <button onClick={() => removeItem(item.id)} className="text-[#5D4E46]/40 hover:text-red-500 transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-widest">
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center">
                      <div className="flex items-center border border-[#5D4E46]/20 rounded-md bg-white">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-3 text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-3 text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 text-left md:text-right font-bold text-lg">
                      {(item.price * item.quantity).toLocaleString('no-NO')} NOK
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#5D4E46]/10 sticky top-32">
                <h2 className="text-xl font-black mb-6 border-b border-[#5D4E46]/10 pb-4">Order Summary</h2>
                
                {amountToFreeShipping > 0 ? (
                  <div className="mb-6 bg-[#FDFBF7] p-4 rounded-xl border border-[#5D4E46]/10 text-sm font-medium text-center">
                    Spend <span className="font-bold text-[#AAB084]">{amountToFreeShipping.toLocaleString('no-NO')} NOK</span> more for <span className="font-bold">FREE SHIPPING</span>
                  </div>
                ) : (
                  <div className="mb-6 bg-[#AAB084]/20 text-[#AAB084] p-4 rounded-xl border border-[#AAB084]/30 text-sm font-bold text-center uppercase tracking-widest">
                    You qualify for free shipping!
                  </div>
                )}

                <div className="space-y-4 mb-8 text-sm font-medium">
                  <div className="flex justify-between">
                    <span className="text-[#5D4E46]/60">Subtotal</span>
                    <span>{total.toLocaleString('no-NO')} NOK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5D4E46]/60">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[#5D4E46]/10 text-xl font-black">
                    <span>Total</span>
                    <span>{total.toLocaleString('no-NO')} NOK</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout" className="block w-full py-4 bg-[#5D4E46] text-white text-center rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3A3532] transition-colors shadow-md">
                    Proceed to Checkout
                  </Link>
                  <Link href="/shop" className="block w-full py-4 bg-transparent border-2 border-[#5D4E46]/20 text-[#5D4E46] text-center rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#5D4E46] transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
