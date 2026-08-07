'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, AlertCircle, Send, Check } from 'lucide-react';
import { supabase } from '@/shared/utils/supabase';

export default function OrdersPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [recovered, setRecovered] = useState<string[]>([]);
  
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  
  // Recovery Modal State
  const [activeCoupons, setActiveCoupons] = useState<any[]>([]);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [selectedOrderToRecover, setSelectedOrderToRecover] = useState<{id: string, email: string} | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<string>('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function fetchProfileAndOrders() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const role = profileData?.role || 'customer';
        setProfile({ role });

        if (role === 'customer') {
          const { data: ordersData } = await supabase.from('orders').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
          if (ordersData) {
            setCustomerOrders(ordersData);
          }
        } else if (role === 'admin') {
          const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
          if (ordersData) {
            setAdminOrders(ordersData);
          }
        }
      }
      setLoading(false);
    }
      setLoading(false);
    }
    fetchProfileAndOrders();
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const { data } = await supabase.from('coupons').select('*').eq('is_active', true);
    if (data) {
      setActiveCoupons(data);
    }
  };

  const filteredOrders = adminOrders.filter(o => filter === 'all' || o.status === filter);

  const completedCount = adminOrders.filter(o => o.status === 'completed').length;
  const pendingCount = adminOrders.filter(o => o.status === 'pending').length;

  const handleRecover = (id: string, email: string) => {
    if (!email) {
      alert("No email attached to this cart.");
      return;
    }
    setSelectedOrderToRecover({ id, email });
    setSelectedCoupon('');
    setShowRecoveryModal(true);
  };

  const confirmRecovery = async () => {
    if (!selectedOrderToRecover) return;
    setIsSending(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/recover-abandoned-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          orderId: selectedOrderToRecover.id,
          couponCode: selectedCoupon || null
        })
      });

      if (!res.ok) {
        throw new Error('Failed to send recovery email');
      }

      alert(`Recovery email sent to ${selectedOrderToRecover.email}!`);
      setRecovered([...recovered, selectedOrderToRecover.id]);
      setShowRecoveryModal(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return null;

  if (profile?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-[#5D4E46]">Orders & Carts Funnel</h2>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4 cursor-pointer hover:border-[#987C6F] transition-colors" onClick={() => setFilter('completed')}>
          <div className="w-12 h-12 rounded-full bg-[#AAB084]/20 flex items-center justify-center text-[#6B724D]">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Completed Sales</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">{completedCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4 cursor-pointer hover:border-[#987C6F] transition-colors" onClick={() => setFilter('pending')}>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Abandoned / Pending Carts</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">{pendingCount}</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'completed', 'pending'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-colors ${
              filter === f ? 'bg-[#5D4E46] text-white' : 'bg-white text-[#5D4E46] hover:bg-[#FDFBF7] border border-[#5D4E46]/10'
            }`}
          >
            {f === 'pending' ? 'Abandoned Carts' : f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FDFBF7] border-b border-[#5D4E46]/10 text-[#5D4E46]/60">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Order / Session</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Customer Email</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Total</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D4E46]/5">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#5D4E46]">{order.id.substring(0, 8).toUpperCase()}</div>
                    <div className="text-xs text-[#5D4E46]/60">{new Date(order.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-[#5D4E46]">
                    {order.email || 'Guest'}
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'completed' && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Completed</span>}
                    {order.status === 'pending' && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Abandoned</span>}
                  </td>
                  <td className="px-6 py-4 text-[#5D4E46] font-bold">
                    {order.total} NOK
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleRecover(order.id, order.email)}
                        disabled={recovered.includes(order.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          recovered.includes(order.id)
                          ? 'bg-green-50 text-green-600 cursor-not-allowed'
                          : 'bg-[#987C6F] text-white hover:bg-[#5D4E46]'
                        }`}
                      >
                        {recovered.includes(order.id) ? (
                          <><Check size={14} /> Sent</>
                        ) : (
                          <><Send size={14} /> Send Promo</>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#5D4E46]/60">
                    No orders found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recovery Modal */}
      {showRecoveryModal && (
        <div className="fixed inset-0 bg-[#5D4E46]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl animate-fade-in-up relative">
            <h3 className="text-2xl font-black text-[#5D4E46] mb-2">Send Recovery Email</h3>
            <p className="text-[#5D4E46]/70 mb-6 text-sm">
              Send a reminder email to <strong>{selectedOrderToRecover?.email}</strong> with an optional discount code.
            </p>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#5D4E46]/60 uppercase tracking-wider mb-2">Attach Coupon (Optional)</label>
              <select 
                value={selectedCoupon} 
                onChange={(e) => setSelectedCoupon(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#5D4E46]/10 focus:outline-none focus:border-[#987C6F] appearance-none bg-[#FDFBF7]"
              >
                <option value="">No Coupon</option>
                {activeCoupons.map(c => (
                  <option key={c.id} value={c.code}>
                    {c.code} ({c.discount_type === 'flat' ? `${c.discount_amount} NOK` : `${c.discount_percentage}%`} OFF)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowRecoveryModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-[#5D4E46] hover:bg-[#FDFBF7] transition-colors"
                disabled={isSending}
              >
                Cancel
              </button>
              <button 
                onClick={confirmRecovery}
                disabled={isSending}
                className="bg-[#987C6F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5D4E46] transition-colors flex items-center gap-2"
              >
                {isSending ? 'Sending...' : <><Send size={18} /> Send Now</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  }

  // CUSTOMER VIEW
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#5D4E46]">My Orders</h2>
      
      {customerOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#5D4E46]/10">
          <ShoppingBag className="w-12 h-12 mx-auto text-[#5D4E46]/20 mb-4" />
          <h3 className="text-lg font-bold text-[#5D4E46]">No orders yet</h3>
          <p className="text-[#5D4E46]/60 mt-2">When you purchase items, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {customerOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-[#5D4E46]">Order #{order.id.substring(0,8).toUpperCase()}</h3>
                  <p className="text-sm text-[#5D4E46]/60">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                  order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="pt-4 border-t border-[#5D4E46]/10 flex justify-between items-center">
                <span className="font-bold text-[#5D4E46]">Total</span>
                <span className="font-bold text-[#987C6F]">{order.total} NOK</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
