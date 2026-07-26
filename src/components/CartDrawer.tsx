'use client';

import { useCartStore } from '../shared/utils/store';
import { getProducts, Product } from '../shared/utils/products';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ChevronDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getCartTotal, addItem } = useCartStore();
  const [upsellItems, setUpsellItems] = useState<Product[]>([]);
  
  const [noteOpen, setNoteOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);

  useEffect(() => {
    async function loadUpsell() {
      const all = await getProducts();
      const cartItemIds = items.map((item) => item.id);
      setUpsellItems(all.filter((p) => !cartItemIds.includes(p.id)).slice(0, 3));
    }
    if (isOpen) {
      loadUpsell();
    }
  }, [isOpen, items]);

  if (!isOpen) return null;

  const total = getCartTotal();
  const freeShippingThreshold = 1000; // Mock threshold in NOK
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - total);
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-[60] transition-opacity backdrop-blur-sm" 
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-lg w-full bg-white shadow-2xl z-[70] flex flex-col font-sans text-[#5D4E46]">
        {/* Top promo bar */}
        <div className="bg-[#E2DEBB]/40 text-center py-2 text-xs font-medium text-[#5D4E46]/80">
          Save 15% on your first purchase with code <span className="font-bold">WELCOME</span>
        </div>
        
        <div className="px-6 py-4 border-b border-[#5D4E46]/10 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={toggleCart} className="text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors p-1">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {/* Free shipping progress */}
          {items.length > 0 && (
            <div className="px-6 py-4 border-b border-[#5D4E46]/10 text-xs font-medium">
              {amountToFreeShipping > 0 ? (
                <p>Spend <span className="font-bold">{amountToFreeShipping.toLocaleString('no-NO')} NOK</span> more for FREE SHIPPING</p>
              ) : (
                <p>You qualify for FREE shipping</p>
              )}
            </div>
          )}

          {/* Cart Items */}
          <div className="p-6 space-y-6 flex-1">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center text-[#5D4E46]/60">
                <p className="font-medium text-lg mb-8">Your cart is currently empty.</p>
                <button onClick={toggleCart} className="px-8 py-3 bg-[#7A75A5] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#635f8d] transition-colors">Continue Shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-24 h-24 bg-[#F9F6F0] rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div className="pr-4">
                        <h3 className="font-bold text-sm leading-tight mb-1">{item.name}</h3>
                        <p className="text-[10px] text-[#5D4E46]/60 mb-2">Size: Standard</p>
                      </div>
                      <p className="text-sm font-bold whitespace-nowrap">{item.price} NOK</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#5D4E46]/10 rounded-md bg-white">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="p-2 text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-[#5D4E46]/60 hover:text-[#5D4E46] transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[#5D4E46]/40 hover:text-red-500 transition-colors p-2">
                        {/* Trash Icon mock using X for simplicity or text */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Upsell Section */}
          {items.length > 0 && upsellItems.length > 0 && (
            <div className="bg-[#E2DEBB]/60 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold">You might also like:</h3>
                <div className="flex gap-2">
                  <button className="text-[#5D4E46]/50 hover:text-[#5D4E46]"><ChevronLeft size={16}/></button>
                  <button className="text-[#5D4E46]/50 hover:text-[#5D4E46]"><ChevronRight size={16}/></button>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
                {upsellItems.map(p => (
                  <div key={p.id} className="relative min-w-[120px] max-w-[120px] snap-start flex flex-col group">
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-white">
                      <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                      <span className="absolute top-1 right-1 bg-[#7A75A5] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">-15%</span>
                      {/* Hover action buttons */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/shop/${p.id}`} onClick={toggleCart} className="p-2 border-r border-[#5D4E46]/10 hover:bg-[#f5f5f5] rounded-l-full">
                          <Eye size={12} />
                        </Link>
                        <button onClick={() => addItem(p)} className="p-2 hover:bg-[#f5f5f5] rounded-r-full">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-[10px] line-clamp-2 leading-tight">{p.name}</h4>
                      <p className="text-[10px] font-medium text-[#5D4E46]/70 mt-1">{p.price} NOK <span className="line-through opacity-50 block">{(p.price * 1.15).toFixed(0)} NOK</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accordions */}
          {items.length > 0 && (
            <div className="px-6 border-b border-[#5D4E46]/10">
              <div 
                className="py-4 border-b border-[#5D4E46]/5 flex justify-between items-center cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                onClick={() => setNoteOpen(!noteOpen)}
              >
                <span className="text-sm font-medium text-[#5D4E46]/80">Cart note</span>
                <ChevronDown size={14} className={`transform transition-transform ${noteOpen ? 'rotate-180' : ''}`} />
              </div>
              {noteOpen && (
                <div className="py-4">
                  <textarea className="w-full border border-[#5D4E46]/20 rounded-md p-3 text-xs outline-none" rows={3} placeholder="Special instructions for seller..."></textarea>
                </div>
              )}
              
              <div 
                className="py-4 flex justify-between items-center cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                onClick={() => setDiscountOpen(!discountOpen)}
              >
                <span className="text-sm font-medium text-[#5D4E46]/80">Have a discount code?</span>
                <ChevronDown size={14} className={`transform transition-transform ${discountOpen ? 'rotate-180' : ''}`} />
              </div>
              {discountOpen && (
                <div className="pb-4">
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 border border-[#5D4E46]/20 rounded-md p-2 text-xs outline-none" placeholder="Discount code" />
                    <button className="bg-[#5D4E46]/10 px-4 rounded-md text-xs font-bold hover:bg-[#5D4E46]/20">Apply</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#5D4E46]/10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold uppercase tracking-wider text-[#5D4E46]/80">Subtotal</span>
              <span className="text-xl font-black">{total.toLocaleString('no-NO')} NOK</span>
            </div>
            <p className="text-[10px] font-medium text-[#5D4E46]/60 mb-6">Tax included and shipping calculated at checkout</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/cart"
                onClick={toggleCart}
                className="py-3 border-2 border-[#5D4E46] text-[#5D4E46] text-center rounded-md text-sm font-bold hover:bg-[#FDFBF7] transition-colors"
              >
                View Cart
              </Link>
              <Link 
                href="/checkout"
                onClick={toggleCart}
                className="py-3 bg-[#7A75A5] text-white text-center rounded-md text-sm font-bold hover:bg-[#635f8d] transition-colors shadow-sm"
              >
                Check out
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
