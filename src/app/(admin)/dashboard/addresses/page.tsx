'use client';

import { useEffect, useState } from 'react';
import { getUserAddresses, deleteUserAddress, UserAddress } from '@/shared/utils/addresses';
import { Loader2, MapPin, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await getUserAddresses();
      setAddresses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      await deleteUserAddress(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error("Failed to delete address", err);
      alert("Failed to delete address");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-[#5D4E46]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#5D4E46] mb-2">Address Book</h1>
          <p className="text-[#5D4E46]/60">Manage your saved shipping addresses for faster checkout.</p>
        </div>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#5D4E46]/10 shadow-sm flex flex-col items-center">
          <MapPin size={48} className="text-[#5D4E46]/20 mb-4" />
          <h2 className="text-xl font-bold text-[#5D4E46] mb-2">No addresses saved</h2>
          <p className="text-[#5D4E46]/60 mb-6 max-w-sm">You haven't saved any addresses yet. Add one during your next checkout.</p>
          <Link href="/shop" className="bg-[#5D4E46] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#3A3532] transition-colors shadow-md">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white rounded-2xl p-6 border border-[#5D4E46]/10 shadow-sm relative group">
              {addr.is_default && (
                <span className="absolute -top-3 -right-3 bg-[#987C6F] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  Default
                </span>
              )}
              <h3 className="font-bold text-[#5D4E46] text-lg mb-1">{addr.first_name} {addr.last_name}</h3>
              <p className="text-[#5D4E46]/70 text-sm mb-1">{addr.address}</p>
              <p className="text-[#5D4E46]/70 text-sm mb-4">{addr.postal_code} {addr.city}</p>
              
              <div className="flex gap-3 pt-4 border-t border-[#5D4E46]/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleDelete(addr.id)}
                  className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
