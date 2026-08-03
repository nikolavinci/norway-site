'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/shared/utils/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/shared/utils/supabase';
import { getUserAddresses, addUserAddress, UserAddress } from '@/shared/utils/addresses';
import { Loader2, Plus, MapPin } from 'lucide-react';
import { trackBeginCheckout } from '@/shared/utils/analytics';

export default function Checkout() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [paymentMethod, setPaymentMethod] = useState<'vipps' | 'card'>('vipps');
  const [isProcessingVipps, setIsProcessingVipps] = useState(false);
  
  // Addresses
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | 'new'>('new');
  
  // New Address Form
  const [newAddress, setNewAddress] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'Norway',
    is_default: false
  });
  const [saveAddress, setSaveAddress] = useState(true);

  const shippingCost = 150;
  const totalAmount = getCartTotal() > 0 ? getCartTotal() + shippingCost : 0;

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        // Force users to create an account or login
        router.push('/login?redirectTo=/checkout');
        return;
      }
      setUser(session.user);
      
      try {
        const userAddresses = await getUserAddresses();
        setAddresses(userAddresses);
        if (userAddresses.length > 0) {
          setSelectedAddressId(userAddresses[0].id);
        }
      } catch (err) {
        console.error("Failed to load addresses", err);
      }
      setLoadingUser(false);
      trackBeginCheckout(items, getCartTotal());
    }
    checkUser();
  }, [router, items, getCartTotal]);

  const saveOrderContextForSuccess = () => {
    sessionStorage.setItem('pendingPurchase', JSON.stringify({
      items,
      totalAmount,
      shippingCost,
      transactionId: `TXN-${Date.now()}` // Mock ID or could be updated on return
    }));
  };

  const handleVippsCheckout = () => {
    setIsProcessingVipps(true);
    saveOrderContextForSuccess();
    setTimeout(() => {
      clearCart();
      window.location.href = '/checkout/success';
    }, 2500); // 2.5 second mock transaction delay
  };

  const processAndGetAddress = async () => {
    if (selectedAddressId === 'new') {
      if (saveAddress) {
        try {
          const saved = await addUserAddress({
            first_name: newAddress.first_name,
            last_name: newAddress.last_name,
            address: newAddress.address,
            city: newAddress.city,
            postal_code: newAddress.postal_code,
            country: newAddress.country,
            is_default: newAddress.is_default
          });
          if (saved) return saved;
        } catch (err) {
          console.error("Failed to save address", err);
        }
      }
      return newAddress; // Return unsaved object
    }
    return addresses.find(a => a.id === selectedAddressId);
  };

  const handleStripeCheckout = async () => {
    if (totalAmount <= 0) return;
    if (!user) return;
    
    // Ensure an address is processed before moving to stripe
    await processAndGetAddress();

    const { data: settings } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          items, 
          email: user.email, 
          isLive: settings?.is_stripe_live,
          origin: window.location.origin
        },
      });

      if (error) throw error;
      if (data?.url) {
        saveOrderContextForSuccess();
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error('Failed to create checkout session:', err);
      let errorMessage = 'Stripe checkout failed.';
      if (err.message) errorMessage += `\nError: ${err.message}`;
      alert(errorMessage);
    }
  };

  const inputClasses = "w-full border border-[#3A3532]/20 rounded-md p-3 bg-white text-[#3A3532] font-medium placeholder:text-[#3A3532]/40 focus:outline-none focus:border-[#5D4E46] focus:ring-1 focus:ring-[#5D4E46] transition-all";

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5D4E46]" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3A3532] font-sans pt-32 px-6 pb-24">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-black mb-10 text-[#5D4E46]">Secure Checkout</h1>
          
          <div className="space-y-12">
            {/* Contact Info (Pre-filled) */}
            <section>
              <h2 className="text-xl font-bold text-[#5D4E46] mb-4">Contact Information</h2>
              <input type="email" value={user?.email || ''} disabled className={`${inputClasses} bg-gray-100 opacity-80 cursor-not-allowed`} />
              <p className="text-xs text-gray-500 mt-2 font-medium">Logged in securely via Supabase Auth</p>
            </section>
            
            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-bold text-[#5D4E46] mb-4">Shipping Address</h2>
              
              {addresses.length > 0 && (
                <div className="space-y-4 mb-6">
                  {addresses.map(addr => (
                    <label key={addr.id} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedAddressId === addr.id ? 'border-[#5D4E46] bg-[#5D4E46]/5 ring-1 ring-[#5D4E46]' : 'border-[#3A3532]/20 hover:border-[#3A3532]/40 bg-white'}`}>
                      <input type="radio" name="address" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} className="mt-1 w-4 h-4 accent-[#5D4E46]" />
                      <div>
                        <p className="font-bold">{addr.first_name} {addr.last_name}</p>
                        <p className="text-sm text-[#3A3532]/80">{addr.address}</p>
                        <p className="text-sm text-[#3A3532]/80">{addr.postal_code} {addr.city}</p>
                      </div>
                    </label>
                  ))}
                  
                  <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedAddressId === 'new' ? 'border-[#5D4E46] bg-[#5D4E46]/5 ring-1 ring-[#5D4E46]' : 'border-[#3A3532]/20 hover:border-[#3A3532]/40 bg-white'}`}>
                    <input type="radio" name="address" checked={selectedAddressId === 'new'} onChange={() => setSelectedAddressId('new')} className="w-4 h-4 accent-[#5D4E46]" />
                    <span className="font-bold flex items-center gap-2"><Plus size={16} /> Enter a new address</span>
                  </label>
                </div>
              )}

              {selectedAddressId === 'new' && (
                <div className="space-y-4 bg-white p-6 rounded-xl border border-[#3A3532]/10 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required value={newAddress.first_name} onChange={e => setNewAddress({...newAddress, first_name: e.target.value})} className={inputClasses} />
                    <input type="text" placeholder="Last Name" required value={newAddress.last_name} onChange={e => setNewAddress({...newAddress, last_name: e.target.value})} className={inputClasses} />
                  </div>
                  <input type="text" placeholder="Address" required value={newAddress.address} onChange={e => setNewAddress({...newAddress, address: e.target.value})} className={inputClasses} />
                  <input type="text" placeholder="City" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className={inputClasses} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Postal Code" required value={newAddress.postal_code} onChange={e => setNewAddress({...newAddress, postal_code: e.target.value})} className={inputClasses} />
                    <input type="text" placeholder="Norway" disabled className={`${inputClasses} bg-[#F9F6F0] opacity-70`} />
                  </div>
                  
                  <label className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 cursor-pointer">
                    <input type="checkbox" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} className="w-4 h-4 accent-[#5D4E46] rounded" />
                    <span className="text-sm font-bold text-[#5D4E46]">Save this address for next time</span>
                  </label>
                </div>
              )}
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
                    <button 
                      onClick={async () => {
                        await processAndGetAddress();
                        handleVippsCheckout();
                      }} 
                      disabled={isProcessingVipps || items.length === 0}
                      className="block w-full py-4 bg-[#FF5B24] text-white rounded-full text-sm font-bold shadow-md hover:bg-[#e04a1b] transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                      {isProcessingVipps ? 'Vent litt...' : 'Betal med Vipps'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-[#3A3532]/10 rounded-xl p-8 text-center shadow-sm">
                    <h3 className="font-bold text-[#5D4E46] mb-2 text-lg">Pay securely with Stripe</h3>
                    <p className="text-[#3A3532]/70 text-sm mb-6 max-w-sm mx-auto">You will be securely redirected to Stripe to pay via Credit Card, Apple Pay, or Klarna.</p>
                    <button 
                      onClick={handleStripeCheckout} 
                      disabled={items.length === 0}
                      className="block text-center w-full mt-6 py-4 bg-[#3A3532] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#C88267] transition-colors disabled:opacity-70"
                    >
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
              {items.length === 0 ? (
                <p className="py-4 text-center text-gray-500 font-medium">Your cart is empty.</p>
              ) : items.map((item) => (
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
