'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { Tag, Plus, Trash2, Power, Percent, DollarSign } from 'lucide-react';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New coupon state
  const [isAdding, setIsAdding] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'percentage'|'flat'>('percentage');
  const [newAmount, setNewAmount] = useState(10);
  
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setCoupons(data);
    }
    setLoading(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await supabase.from('coupons').update({ is_active: !currentStatus }).eq('id', id);
    fetchCoupons();
  };

  const handleDelete = async (id: string) => {
    if(confirm("Are you sure you want to delete this coupon?")) {
      await supabase.from('coupons').delete().eq('id', id);
      fetchCoupons();
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const payload = {
      code: newCode.toUpperCase(),
      discount_type: newType,
      discount_percentage: newType === 'percentage' ? newAmount : 0,
      discount_amount: newType === 'flat' ? newAmount : 0,
      is_active: true
    };

    const { error } = await supabase.from('coupons').insert([payload]);
    if (error) {
      alert("Error creating coupon: " + error.message);
    } else {
      setIsAdding(false);
      setNewCode('');
      setNewAmount(10);
      fetchCoupons();
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Coupons & Promos</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#5D4E46] text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-[#987C6F] transition-colors"
        >
          <Plus size={16} /> New Coupon
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 mb-8 animate-fade-in-up">
          <h3 className="font-bold text-[#5D4E46] mb-4">Create New Coupon</h3>
          <form onSubmit={handleCreateCoupon} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-xs font-bold text-[#5D4E46]/60 uppercase tracking-wider mb-2">Coupon Code</label>
              <input 
                type="text" 
                required
                placeholder="e.g. SUMMER24"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#5D4E46]/10 focus:outline-none focus:border-[#987C6F] uppercase"
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-[#5D4E46]/60 uppercase tracking-wider mb-2">Discount Type</label>
              <div className="flex bg-[#FDFBF7] p-1 rounded-xl border border-[#5D4E46]/10">
                <button 
                  type="button"
                  onClick={() => setNewType('percentage')}
                  className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg text-sm font-bold transition-colors ${newType === 'percentage' ? 'bg-white shadow-sm text-[#5D4E46]' : 'text-[#5D4E46]/50 hover:text-[#5D4E46]'}`}
                >
                  <Percent size={14} /> % Off
                </button>
                <button 
                  type="button"
                  onClick={() => setNewType('flat')}
                  className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg text-sm font-bold transition-colors ${newType === 'flat' ? 'bg-white shadow-sm text-[#5D4E46]' : 'text-[#5D4E46]/50 hover:text-[#5D4E46]'}`}
                >
                  <DollarSign size={14} /> Flat NOK
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/4">
              <label className="block text-xs font-bold text-[#5D4E46]/60 uppercase tracking-wider mb-2">
                Amount ({newType === 'percentage' ? '%' : 'NOK'})
              </label>
              <input 
                type="number" 
                required
                min="1"
                max={newType === 'percentage' ? "100" : "10000"}
                value={newAmount}
                onChange={(e) => setNewAmount(parseInt(e.target.value) || 0)}
                className="w-full p-3 rounded-xl border border-[#5D4E46]/10 focus:outline-none focus:border-[#987C6F]"
              />
            </div>

            <button type="submit" className="w-full md:w-auto bg-[#AAB084] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#98a168] transition-colors">
              Save
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#FDFBF7] border-b border-[#5D4E46]/5 text-[#5D4E46]/60">
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Code</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Discount</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Status</th>
              <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5D4E46]/5">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-[#987C6F]" />
                    <span className="font-black text-[#5D4E46] text-lg tracking-widest">{coupon.code}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-[#5D4E46]">
                  {coupon.discount_type === 'flat' 
                    ? `${coupon.discount_amount} NOK OFF` 
                    : `${coupon.discount_percentage}% OFF`}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase ${coupon.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {coupon.is_active ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleToggleActive(coupon.id, coupon.is_active)}
                      className={`p-2 rounded-lg transition-colors ${coupon.is_active ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                      title={coupon.is_active ? 'Disable Coupon' : 'Enable Coupon'}
                    >
                      <Power size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(coupon.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[#5D4E46]/50">
                  <Tag size={32} className="mx-auto mb-3 opacity-20" />
                  <p>No coupons created yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
