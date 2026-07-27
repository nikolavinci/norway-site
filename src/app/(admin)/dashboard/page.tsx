'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // These are mock queries to demonstrate native tracking.
      // In a real app, you would sum order totals and count rows accurately.
      const [{ count: userCount }, { count: orderCount }] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }) // Using products as a proxy for orders since orders table might be empty
      ]);

      setStats({
        users: userCount || 0,
        orders: orderCount || 0,
        revenue: (orderCount || 0) * 1250 // Mock calculation
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

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
            <p className="font-black text-3xl text-[#5D4E46]">{loading ? '-' : stats.users}</p>
          </div>
        </div>
        
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4">
          <div className="p-4 bg-[#FDFBF7] rounded-xl text-[#987C6F]">
            <ShoppingBag size={32} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Orders</p>
            <p className="font-black text-3xl text-[#5D4E46]">{loading ? '-' : stats.orders}</p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 flex items-center gap-4">
          <div className="p-4 bg-[#FDFBF7] rounded-xl text-[#987C6F]">
            <DollarSign size={32} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Total Revenue</p>
            <p className="font-black text-3xl text-[#5D4E46]">{loading ? '-' : `${stats.revenue} NOK`}</p>
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
