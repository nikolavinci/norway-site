'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { Users, ShoppingBag, DollarSign, Activity, AlertCircle } from 'lucide-react';

export default function DashboardOverview() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    abandoned: 0,
    products: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatsAndProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data: userProfile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(userProfile || { role: 'customer' });
      
      if (userProfile?.role === 'admin') {
        const [{ count: userCount }, { count: orderCount }, { count: abandonedCount }, { count: productCount }, { data: recentOrdersData }] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
          supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5)
        ]);

        // Calculate Revenue from actual orders
        const { data: allOrders } = await supabase.from('orders').select('total').eq('status', 'completed');
        const totalRevenue = allOrders?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) || 0;

        setStats({
          users: userCount || 0,
          orders: orderCount || 0,
          revenue: totalRevenue,
          abandoned: abandonedCount || 0,
          products: productCount || 0
        });
        
        if (recentOrdersData) {
          setRecentOrders(recentOrdersData);
        }
      }
      setLoading(false);
    }
    fetchStatsAndProfile();
  }, []);

  if (loading) return null;

  if (profile?.role === 'admin') {
    return (
      <div className="animate-fade-in-up max-w-6xl">
        <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Analytics Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4 hover:border-[#987C6F] transition-colors cursor-pointer" onClick={() => window.location.href='/dashboard/users'}>
            <div className="p-3 bg-[#FDFBF7] rounded-xl text-[#987C6F]">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Users</p>
              <p className="font-black text-2xl text-[#5D4E46]">{stats.users}</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4 hover:border-[#987C6F] transition-colors cursor-pointer" onClick={() => window.location.href='/dashboard/orders'}>
            <div className="p-3 bg-[#AAB084]/20 rounded-xl text-[#6B724D]">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Completed Sales</p>
              <p className="font-black text-2xl text-[#5D4E46]">{stats.orders}</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4 hover:border-[#987C6F] transition-colors cursor-pointer" onClick={() => window.location.href='/dashboard/orders'}>
            <div className="p-3 bg-red-50 rounded-xl text-red-500">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Abandoned Carts</p>
              <p className="font-black text-2xl text-[#5D4E46]">{stats.abandoned}</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4">
            <div className="p-3 bg-[#E4D1FF]/30 rounded-xl text-[#6A3F9C]">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Revenue</p>
              <p className="font-black text-2xl text-[#5D4E46]">{stats.revenue} NOK</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 overflow-hidden">
            <div className="p-6 border-b border-[#5D4E46]/5 flex justify-between items-center">
              <h3 className="font-bold text-[#5D4E46] text-lg">Recent Orders</h3>
              <a href="/dashboard/orders" className="text-sm font-bold text-[#987C6F] hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#FDFBF7] border-b border-[#5D4E46]/5 text-[#5D4E46]/60">
                  <tr>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Order ID</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Customer</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5D4E46]/5">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#5D4E46]">{order.id.substring(0, 8).toUpperCase()}</td>
                      <td className="px-6 py-4 text-[#5D4E46]">{order.email || 'Guest'}</td>
                      <td className="px-6 py-4">
                        {order.status === 'completed' && <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">Completed</span>}
                        {order.status === 'pending' && <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 uppercase">Pending</span>}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#5D4E46]">{order.total} NOK</td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-[#5D4E46]/50">No recent orders</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="font-bold text-[#5D4E46] text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="/dashboard/products/add" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FDFBF7] transition-colors border border-transparent hover:border-[#5D4E46]/5">
                  <span className="font-bold text-[#5D4E46]">Add New Product</span>
                  <span className="text-[#987C6F]">→</span>
                </a>
                <a href="/dashboard/favorites" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FDFBF7] transition-colors border border-transparent hover:border-[#5D4E46]/5">
                  <span className="font-bold text-[#5D4E46]">Wishlist Analytics</span>
                  <span className="text-[#987C6F]">→</span>
                </a>
                <a href="/dashboard/blog/add" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FDFBF7] transition-colors border border-transparent hover:border-[#5D4E46]/5">
                  <span className="font-bold text-[#5D4E46]">Write Blog Post</span>
                  <span className="text-[#987C6F]">→</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#5D4E46] text-white rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="text-[#AAB084]" size={20} />
                <h3 className="font-bold text-lg">System Status</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">All native tracking events and edge functions are running normally.</p>
              <div className="flex justify-between items-center text-sm font-bold border-t border-white/10 pt-4">
                <span>Active Products</span>
                <span className="text-[#AAB084]">{stats.products}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Customer Dashboard
  return (
    <div className="animate-fade-in-up max-w-6xl">
      <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Your Account</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="/dashboard/orders" className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 hover:border-[#987C6F] transition-colors flex gap-4">
          <div className="p-3 bg-[#FDFBF7] rounded-xl text-[#987C6F] h-fit"><ShoppingBag size={24} /></div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#5D4E46]">Your Orders</h3>
            <p className="text-sm text-[#5D4E46]/60">Track, return, or buy things again</p>
          </div>
        </a>
        <a href="/dashboard/favorites" className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 hover:border-[#987C6F] transition-colors flex gap-4">
          <div className="p-3 bg-[#FDFBF7] rounded-xl text-[#987C6F] h-fit"><Activity size={24} /></div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#5D4E46]">Your Wishlist</h3>
            <p className="text-sm text-[#5D4E46]/60">View and manage your saved items</p>
          </div>
        </a>
        <a href="/dashboard/addresses" className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 hover:border-[#987C6F] transition-colors flex gap-4">
          <div className="p-3 bg-[#FDFBF7] rounded-xl text-[#987C6F] h-fit"><Activity size={24} /></div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#5D4E46]">Your Addresses</h3>
            <p className="text-sm text-[#5D4E46]/60">Edit shipping addresses and defaults</p>
          </div>
        </a>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex gap-4 opacity-50">
          <div className="p-3 bg-[#FDFBF7] rounded-xl text-[#987C6F] h-fit"><Users size={24} /></div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#5D4E46]">Login & Security</h3>
            <p className="text-sm text-[#5D4E46]/60">Edit name, email, and mobile number</p>
          </div>
        </div>
      </div>
    </div>
  );
}
