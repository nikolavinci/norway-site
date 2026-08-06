'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

export default function DashboardOverview() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatsAndProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data: userProfile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(userProfile || { role: 'customer' });
      
      if (userProfile?.role === 'admin') {
        const [{ count: userCount }, { count: orderCount }] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('products').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          users: userCount || 0,
          orders: orderCount || 0,
          revenue: (orderCount || 0) * 1250 
        });
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4">
            <div className="p-4 bg-[#FDFBF7] rounded-xl text-[#987C6F]">
              <Users size={32} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Users</p>
              <p className="font-black text-3xl text-[#5D4E46]">{stats.users}</p>
            </div>
          </div>
          
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4">
            <div className="p-4 bg-[#FDFBF7] rounded-xl text-[#987C6F]">
              <ShoppingBag size={32} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Orders</p>
              <p className="font-black text-3xl text-[#5D4E46]">{stats.orders}</p>
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4">
            <div className="p-4 bg-[#FDFBF7] rounded-xl text-[#987C6F]">
              <DollarSign size={32} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Revenue</p>
              <p className="font-black text-3xl text-[#5D4E46]">{stats.revenue} NOK</p>
            </div>
          </div>
        </div>

        <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
          <Activity size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
          <p className="text-lg">Real-time charts and detailed visitor analytics will appear here.</p>
          <p className="text-sm mt-2 opacity-70">Connect Google Analytics in the Settings tab for more detailed insights.</p>
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
