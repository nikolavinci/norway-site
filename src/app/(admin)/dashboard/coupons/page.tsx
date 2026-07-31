'use client';

import { useState, useEffect } from 'react';
import { Coupon, getCoupons, createCoupon, deleteCoupon, toggleCouponActive } from '@/shared/utils/coupons';
import { Loader2, Plus, Tag, Trash2, Power } from 'lucide-react';

export default function CouponsDashboard() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    discount_percentage: '',
    free_shipping_threshold: ''
  });

  async function loadCoupons() {
    setLoading(true);
    const data = await getCoupons();
    setCoupons(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.discount_percentage) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      await createCoupon({
        code: formData.code.toUpperCase(),
        discount_percentage: parseInt(formData.discount_percentage, 10),
        free_shipping_threshold: formData.free_shipping_threshold ? parseInt(formData.free_shipping_threshold, 10) : null,
        is_active: true
      });
      setFormData({ code: '', discount_percentage: '', free_shipping_threshold: '' });
      await loadCoupons();
    } catch (err: any) {
      setError(err.message || 'Failed to create coupon');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coupon?')) return;
    try {
      await deleteCoupon(id);
      await loadCoupons();
    } catch (err) {
      alert('Failed to delete coupon');
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await toggleCouponActive(id, !currentStatus);
      await loadCoupons();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-[#5D4E46] mb-2">Coupons & Promos</h2>
          <p className="text-[#5D4E46]/60 font-medium">Manage cart-wide discounts and free shipping offers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5 space-y-6">
            <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 flex items-center gap-2">
              <Tag size={20} className="text-[#987C6F]" /> New Coupon
            </h3>
            
            {error && <div className="text-xs text-red-500 font-bold bg-red-50 p-3 rounded-lg">{error}</div>}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Coupon Code</label>
              <input required type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER24" className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-mono font-bold uppercase" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Discount %</label>
              <input required type="number" min="1" max="100" value={formData.discount_percentage} onChange={(e) => setFormData({...formData, discount_percentage: e.target.value})} placeholder="20" className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Free Shipping Min (NOK)</label>
              <input type="number" value={formData.free_shipping_threshold} onChange={(e) => setFormData({...formData, free_shipping_threshold: e.target.value})} placeholder="Leave blank for none" className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#5D4E46] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#3A3532] transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              Create Promo
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FDFBF7] border-b border-[#5D4E46]/5 text-xs font-bold uppercase tracking-wider text-[#5D4E46]/50">
                    <th className="p-4 pl-6">Code</th>
                    <th className="p-4">Offer</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5D4E46]/5 text-sm">
                  {coupons.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4 pl-6 font-mono font-bold text-[#5D4E46]">
                        {c.code}
                      </td>
                      <td className="p-4 text-[#5D4E46]/80 font-medium">
                        {c.discount_percentage}% off
                        {c.free_shipping_threshold && ` + Free shipping over ${c.free_shipping_threshold} NOK`}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${c.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {c.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleToggle(c.id, c.is_active)} className="p-2 text-[#5D4E46]/50 hover:bg-[#F7F0E3] rounded-lg transition-colors" title={c.is_active ? "Disable" : "Enable"}>
                            <Power size={16} className={c.is_active ? "text-green-600" : ""} />
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="p-2 text-[#5D4E46]/50 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-[#5D4E46]/50 font-medium">
                        No coupons created yet. Use the form to generate one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
