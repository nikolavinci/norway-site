'use client';

import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../shared/utils/supabase';
import { Package, Heart, LogOut, Settings, Users, ShoppingBag, PenTool, CreditCard, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      setProfile(data || { role: 'customer', full_name: session.user.user_metadata?.full_name });
    }
    fetchUser();
  }, [router]);

  const isAdmin = profile?.role === 'admin';

  const NavLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    return (
      <Link 
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${isActive ? 'bg-[#987C6F] text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
      >
        <Icon size={18} /> {label}
      </Link>
    );
  };

  return (
    <div className="w-full md:w-64 bg-[#3A3532] text-white md:min-h-screen md:sticky md:top-0 flex flex-col shadow-xl z-20">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-serif font-bold mb-1">
          {isAdmin ? 'Pust Atelier CMS' : 'My Account'}
        </h1>
        <p className="text-white/60 text-xs">
          Welcome, {profile?.full_name || 'User'}
        </p>
      </div>

      <div className="flex-1 py-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto hide-scrollbar px-3">
        {isAdmin ? (
          <>
            <NavLink href="/dashboard" icon={BarChart2} label="Analytics" />
            <NavLink href="/dashboard/products" icon={Package} label="Products" />
            <NavLink href="/dashboard/blog" icon={PenTool} label="Blog" />
            <NavLink href="/dashboard/users" icon={Users} label="Customers" />
            <NavLink href="/dashboard/payments" icon={CreditCard} label="Payments" />
            <NavLink href="/dashboard/settings" icon={Settings} label="Settings" />
          </>
        ) : (
          <>
            <NavLink href="/dashboard" icon={Settings} label="Overview" />
            <NavLink href="/dashboard/orders" icon={ShoppingBag} label="My Orders" />
            <NavLink href="/dashboard/favorites" icon={Heart} label="Saved Items" />
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
  );
}
