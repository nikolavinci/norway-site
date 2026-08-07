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
    fetchProfileAndOrders();
  }, []);

  const filteredOrders = adminOrders.filter(o => filter === 'all' || o.status === filter);

  const completedCount = adminOrders.filter(o => o.status === 'completed').length;
  const pendingCount = adminOrders.filter(o => o.status === 'pending').length;

  const handleRecover = (id: string, email: string) => {
    if (!email) {
      alert("No email attached to this cart.");
      return;
    }
    // Call the edge function or API to send a promo email
    // For now we simulate it:
    alert(`Recovery email with a 10% discount coupon has been sent to ${email} for order ${id}!`);
    setRecovered([...recovered, id]);
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
                  <td className="px-6 py-4">
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleRecover(order.id, order.email)}
                        disabled={recovered.includes(order.id) || !order.email}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#987C6F] hover:bg-[#987C6F]/90 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
