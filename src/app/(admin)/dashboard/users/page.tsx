'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/utils/supabase';

export default function AdminUsersPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { data: profileData } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      if (profileData?.role !== 'admin') {
        setLoading(false);
        return;
      }

      setProfile(profileData);

      // Fetch users and their orders
      const { data: usersData, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          avatar_url,
          created_at,
          role,
          orders (
            id,
            total,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && usersData) {
        setUsers(usersData);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) return null;
  if (profile?.role !== 'admin') return <div className="p-12 text-center">Access Denied</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customer Management</h1>
          <p className="text-gray-500 mt-1">View and manage registered users and their lifetime value.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Orders</th>
                <th className="px-6 py-4 font-medium text-right">Lifetime Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user: any) => {
                const completedOrders = user.orders?.filter((o: any) => o.status === 'completed') || [];
                const ltv = completedOrders.reduce((sum: number, order: any) => sum + (Number(order.total) || 0), 0);
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#5D4E46]/10 flex items-center justify-center text-[#5D4E46] font-bold text-xs uppercase">
                          {user.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="font-medium text-gray-900">{user.full_name || 'Anonymous User'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900 font-medium">
                      {completedOrders.length}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900 font-medium">
                      {ltv.toLocaleString()} NOK
                    </td>
                  </tr>
                );
              })}
              
              {users?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No customers found.
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
