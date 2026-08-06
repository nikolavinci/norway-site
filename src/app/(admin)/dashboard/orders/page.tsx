'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, ShoppingCart, AlertCircle, Send, Check } from 'lucide-react';
import { supabase } from '@/shared/utils/supabase';

// Mock data for Orders and Carts
const MOCK_ORDERS = [
  { id: 'ORD-2910', user: 'Jane Doe', email: 'jane@example.com', status: 'completed', total: 1540, date: '2026-07-30' },
  { id: 'ORD-2909', user: 'Erik Larsen', email: 'erik@example.com', status: 'abandoned', total: 890, date: '2026-07-29' },
  { id: 'ORD-2908', user: 'Anonymous', email: 'guest@example.com', status: 'cart', total: 450, date: '2026-07-31' },
  { id: 'ORD-2907', user: 'Maria Nilsen', email: 'maria@example.com', status: 'completed', total: 3200, date: '2026-07-28' },
  { id: 'ORD-2906', user: 'Ole Hansen', email: 'ole@example.com', status: 'abandoned', total: 1120, date: '2026-07-25' },
];

export default function OrdersPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'abandoned' | 'cart'>('all');
  const [recovered, setRecovered] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setProfile(data || { role: 'customer' });
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const filteredOrders = MOCK_ORDERS.filter(o => filter === 'all' || o.status === filter);

  const handleRecover = (id: string) => {
    // In a real app, this would call a Supabase Edge Function to send an email via Resend or SendGrid
    alert(`Recovery email with a 10% discount coupon has been sent for order ${id}!`);
    setRecovered([...recovered, id]);
  };

  if (loading) return null;

  if (profile?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-[#5D4E46]">Orders & Carts</h2>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4 cursor-pointer hover:border-[#987C6F] transition-colors" onClick={() => setFilter('completed')}>
          <div className="w-12 h-12 rounded-full bg-[#AAB084]/20 flex items-center justify-center text-[#6B724D]">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Completed</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">245</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4 cursor-pointer hover:border-[#987C6F] transition-colors" onClick={() => setFilter('abandoned')}>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Abandoned Carts</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4 cursor-pointer hover:border-[#987C6F] transition-colors" onClick={() => setFilter('cart')}>
          <div className="w-12 h-12 rounded-full bg-[#E4D1FF]/30 flex items-center justify-center text-[#6A3F9C]">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Active Carts</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">8</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'completed', 'abandoned', 'cart'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-colors ${
              filter === f ? 'bg-[#5D4E46] text-white' : 'bg-white text-[#5D4E46] hover:bg-[#FDFBF7] border border-[#5D4E46]/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
        <table className="w-full text-left text-sm text-[#5D4E46]">
          <thead className="bg-[#FDFBF7] text-xs uppercase font-bold text-[#5D4E46]/60 tracking-wider">
            <tr>
              <th className="px-6 py-4">Order ID / Cart</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5D4E46]/5">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                <td className="px-6 py-4 font-bold">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold">{order.user}</div>
                  <div className="text-xs text-[#5D4E46]/60">{order.email}</div>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 font-medium">{order.total} NOK</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                    order.status === 'completed' ? 'bg-[#AAB084]/20 text-[#6B724D]' : 
                    order.status === 'abandoned' ? 'bg-red-50 text-red-600' : 
                    'bg-[#E4D1FF]/30 text-[#6A3F9C]'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {order.status === 'abandoned' && (
                    <button 
                      onClick={() => handleRecover(order.id)}
                      disabled={recovered.includes(order.id)}
                      className="flex items-center gap-2 justify-end w-full text-xs font-bold text-[#987C6F] hover:text-[#5D4E46] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {recovered.includes(order.id) ? (
                        <><Check size={14} /> Recovered</>
                      ) : (
                        <><Send size={14} /> Send Recovery Email</>
                      )}
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <span className="text-xs text-[#5D4E46]/40">No actions needed</span>
                  )}
                  {order.status === 'cart' && (
                    <span className="text-xs text-[#5D4E46]/40">Browsing...</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
  }

  // Customer Orders View
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Your Orders</h2>
      </div>
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-[#5D4E46]/10 text-center">
        <ShoppingBag size={48} className="mx-auto mb-4 text-[#987C6F] opacity-40" />
        <h3 className="text-xl font-bold text-[#5D4E46] mb-2">You have no orders yet</h3>
        <p className="text-[#5D4E46]/60 max-w-md mx-auto mb-6">
          When you place an order, it will appear here for you to track and manage.
        </p>
        <a href="/shop" className="inline-flex items-center px-6 py-3 bg-[#5D4E46] text-white rounded-full font-bold hover:bg-[#3A3532] transition-colors">
          Start Shopping
        </a>
      </div>
    </div>
  );
}
