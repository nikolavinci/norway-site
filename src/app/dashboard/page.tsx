'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../shared/utils/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, Package, Heart, LogOut, Settings, Users, ShoppingBag } from 'lucide-react';
import InventoryManager from '../../components/admin/InventoryManager';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      setProfile(profileData || { role: 'customer', full_name: session.user.user_metadata?.full_name });
      setLoading(false);
    }
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center pt-20">
        <Loader2 size={40} className="animate-spin text-[#987C6F]" />
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDFBF7] text-[#5D4E46] font-sans pt-20">
      
      {/* WordPress-style Sticky Sidebar */}
      <div className="w-full md:w-64 bg-[#3A3532] text-white md:min-h-[calc(100vh-80px)] md:sticky md:top-20 flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-serif font-bold mb-1">
            {isAdmin ? 'Pust Atelier CMS' : 'My Account'}
          </h1>
          <p className="text-white/60 text-xs">
            Welcome, {profile?.full_name || 'User'}
          </p>
        </div>

        <div className="flex-1 py-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto hide-scrollbar px-3">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'bg-[#987C6F] text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
          >
            <Settings size={18} /> Overview
          </button>
          
          {isAdmin ? (
            <>
              <button 
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'products' ? 'bg-[#987C6F] text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                <Package size={18} /> Inventory
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'users' ? 'bg-[#987C6F] text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                <Users size={18} /> Customers
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'orders' ? 'bg-[#987C6F] text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                <ShoppingBag size={18} /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'favorites' ? 'bg-[#987C6F] text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
              >
                <Heart size={18} /> Saved Items
              </button>
            </>
          )}
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              supabase.auth.signOut();
              router.push('/');
            }}
            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-red-300 hover:text-red-200 hover:bg-white/5 transition-colors py-3 rounded-lg"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up max-w-4xl">
            <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
                <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-2">Profile Name</p>
                <p className="font-black text-2xl text-[#5D4E46]">{profile?.full_name || 'N/A'}</p>
              </div>
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
                <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-2">Access Level</p>
                <p className="font-black text-2xl capitalize text-[#987C6F]">{profile?.role}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && isAdmin && (
          <div className="animate-fade-in-up">
            <InventoryManager />
          </div>
        )}

        {activeTab === 'favorites' && !isAdmin && (
          <div className="animate-fade-in-up max-w-4xl">
            <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Your Favorites</h2>
            <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <Heart size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
              <p className="text-lg">You haven't saved any items yet.</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && !isAdmin && (
          <div className="animate-fade-in-up max-w-4xl">
            <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Order History</h2>
            <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <ShoppingBag size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
              <p className="text-lg">You haven't placed any orders yet.</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && isAdmin && (
          <div className="animate-fade-in-up max-w-4xl">
            <h2 className="text-3xl font-black text-[#5D4E46] mb-8">Customer Management</h2>
            <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <Users size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
              <p className="text-lg">Customer list functionality coming soon.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
