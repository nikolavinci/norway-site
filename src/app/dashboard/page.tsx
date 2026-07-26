'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../shared/utils/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, Package, Heart, LogOut, Settings, Users, ShoppingBag } from 'lucide-react';

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
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#987C6F]" />
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D4E46] font-sans pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#5D4E46]/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#5D4E46] mb-2">
              {isAdmin ? 'Admin Dashboard' : 'My Account'}
            </h1>
            <p className="text-[#5D4E46]/60 text-sm">
              Welcome back, {profile?.full_name || 'User'}!
            </p>
          </div>
          <button 
            onClick={() => {
              supabase.auth.signOut();
              router.push('/');
            }}
            className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors bg-red-50 px-4 py-2 rounded-lg"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 hide-scrollbar">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'bg-[#5D4E46] text-white' : 'hover:bg-white text-[#5D4E46]/70'}`}
              >
                <Settings size={18} /> Overview
              </button>
              
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'products' ? 'bg-[#5D4E46] text-white' : 'hover:bg-white text-[#5D4E46]/70'}`}
                  >
                    <Package size={18} /> Manage Inventory
                  </button>
                  <button 
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'users' ? 'bg-[#5D4E46] text-white' : 'hover:bg-white text-[#5D4E46]/70'}`}
                  >
                    <Users size={18} /> Customers
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'orders' ? 'bg-[#5D4E46] text-white' : 'hover:bg-white text-[#5D4E46]/70'}`}
                  >
                    <ShoppingBag size={18} /> My Orders
                  </button>
                  <button 
                    onClick={() => setActiveTab('favorites')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'favorites' ? 'bg-[#5D4E46] text-white' : 'hover:bg-white text-[#5D4E46]/70'}`}
                  >
                    <Heart size={18} /> Saved Items
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-[#5D4E46]/5 min-h-[500px]">
            {activeTab === 'overview' && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/10">
                    <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Full Name</p>
                    <p className="font-medium text-lg">{profile?.full_name || 'N/A'}</p>
                  </div>
                  <div className="p-6 bg-[#FDFBF7] rounded-xl border border-[#5D4E46]/10">
                    <p className="text-xs uppercase tracking-widest font-bold text-[#5D4E46]/50 mb-1">Account Role</p>
                    <p className="font-medium text-lg capitalize">{profile?.role}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && isAdmin && (
              <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Inventory Management</h2>
                  <button className="px-4 py-2 bg-[#987C6F] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#7d665b]">Add Product</button>
                </div>
                <div className="p-8 text-center text-[#5D4E46]/50 bg-[#FDFBF7] rounded-xl border border-dashed border-[#5D4E46]/20">
                  <Package size={40} className="mx-auto mb-4 opacity-50" />
                  <p>Product list will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && !isAdmin && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
                <div className="p-8 text-center text-[#5D4E46]/50 bg-[#FDFBF7] rounded-xl border border-dashed border-[#5D4E46]/20">
                  <Heart size={40} className="mx-auto mb-4 opacity-50" />
                  <p>You haven't saved any items yet.</p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && !isAdmin && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                <div className="p-8 text-center text-[#5D4E46]/50 bg-[#FDFBF7] rounded-xl border border-dashed border-[#5D4E46]/20">
                  <ShoppingBag size={40} className="mx-auto mb-4 opacity-50" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && isAdmin && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6">Customers</h2>
                <div className="p-8 text-center text-[#5D4E46]/50 bg-[#FDFBF7] rounded-xl border border-dashed border-[#5D4E46]/20">
                  <Users size={40} className="mx-auto mb-4 opacity-50" />
                  <p>Customer list will appear here.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
