'use client';

import { useState, useEffect } from 'react';
import { Heart, Package, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/shared/utils/supabase';

// Mock data for Favorites
const MOCK_FAVORITES = [
  { id: '1', name: 'Handcrafted Upholstery Bag', image: '/images/bags/bag1.png', category: 'Bags', favorited_by: 142, stock: 12 },
  { id: '2', name: 'Moroccan Kilim Bag', image: '/images/bags/bag2.png', category: 'Bags', favorited_by: 98, stock: 5 },
  { id: '3', name: 'Quilted Velvet Tote', image: '/images/bags/bag3.png', category: 'Bags', favorited_by: 76, stock: 0 },
  { id: '4', name: 'Printed Upholstery Bag', image: '/images/bags/bag4.png', category: 'Bags', favorited_by: 45, stock: 24 },
  { id: '5', name: 'Damask Jacquard Bag', image: '/images/bags/bag5.png', category: 'Bags', favorited_by: 12, stock: 8 },
];

export default function FavoritesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<'most_favorited' | 'least_stock'>('most_favorited');

  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProfileAndFavorites() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const role = profileData?.role || 'customer';
        setProfile({ role });
        
        if (role === 'customer') {
          const { data: favs } = await supabase.from('favorites').select('product_id, products(*)').eq('user_id', session.user.id);
          if (favs) {
            setFavorites(favs.map(f => f.products));
          }
        }
      }
      setLoading(false);
    }
    fetchProfileAndFavorites();
  }, []);

  const sortedFavorites = [...MOCK_FAVORITES].sort((a, b) => {
    if (sort === 'most_favorited') return b.favorited_by - a.favorited_by;
    if (sort === 'least_stock') return a.stock - b.stock;
    return 0;
  });

  if (loading) return null;

  if (profile?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-[#5D4E46]">Product Favorites</h2>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFD6A5]/40 flex items-center justify-center text-[#D97D27]">
            <Heart size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Total Favorites</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">373</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#AAB084]/20 flex items-center justify-center text-[#6B724D]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Most Loved</p>
            <h3 className="text-2xl font-black text-[#5D4E46] truncate w-32" title="Handcrafted Upholstery Bag">Handcrafted Upholstery Bag</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E4D1FF]/30 flex items-center justify-center text-[#6A3F9C]">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Out of Stock & Loved</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">1</h3>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setSort('most_favorited')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
            sort === 'most_favorited' ? 'bg-[#5D4E46] text-white' : 'bg-white text-[#5D4E46] hover:bg-[#FDFBF7] border border-[#5D4E46]/10'
          }`}
        >
          Most Favorited
        </button>
        <button 
          onClick={() => setSort('least_stock')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
            sort === 'least_stock' ? 'bg-[#5D4E46] text-white' : 'bg-white text-[#5D4E46] hover:bg-[#FDFBF7] border border-[#5D4E46]/10'
          }`}
        >
          Low Stock First
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
        <table className="w-full text-left text-sm text-[#5D4E46]">
          <thead className="bg-[#FDFBF7] text-xs uppercase font-bold text-[#5D4E46]/60 tracking-wider">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Favorited By</th>
              <th className="px-6 py-4">Inventory Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5D4E46]/5">
            {sortedFavorites.map((item) => (
              <tr key={item.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <span className="font-bold">{item.name}</span>
                </td>
                <td className="px-6 py-4 text-[#5D4E46]/80">{item.category}</td>
                <td className="px-6 py-4 font-bold">{item.favorited_by} users</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    item.stock > 10 ? 'bg-[#AAB084]/20 text-[#6B724D]' : 
                    item.stock > 0 ? 'bg-[#FFD6A5]/40 text-[#D97D27]' : 
                    'bg-red-50 text-red-600'
                  }`}>
                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Your Wishlist</h2>
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-[#5D4E46]/10 text-center">
          <Heart size={48} className="mx-auto mb-4 text-[#987C6F] opacity-40" />
          <h3 className="text-xl font-bold text-[#5D4E46] mb-2">No saved items yet</h3>
          <p className="text-[#5D4E46]/60 max-w-md mx-auto mb-6">
            When you find something you love, click the heart icon to save it here for later.
          </p>
          <a href="/shop" className="inline-flex items-center px-6 py-3 bg-[#5D4E46] text-white rounded-full font-bold hover:bg-[#3A3532] transition-colors">
            Explore Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            product && (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#5D4E46]/10 group">
                <a href={`/shop/${product.id}`} className="block relative aspect-square bg-[#FDFBF7]">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </a>
                <div className="p-4">
                  <h3 className="font-bold text-[#5D4E46] mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-[#5D4E46]/70 mb-3">{product.price} NOK</p>
                  <button 
                    onClick={async () => {
                      const { data: { session } } = await supabase.auth.getSession();
                      if (session) {
                        await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('product_id', product.id);
                        setFavorites(favorites.filter(p => p.id !== product.id));
                      }
                    }}
                    className="text-xs font-bold text-[#FF5A5F] hover:text-[#5D4E46] transition-colors flex items-center gap-1"
                  >
                    <Heart size={12} className="fill-[#FF5A5F]" /> Remove
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
