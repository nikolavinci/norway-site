'use client';

import { useState } from 'react';
import { Heart, Package, TrendingUp } from 'lucide-react';
import Image from 'next/image';

// Mock data for Favorites
const MOCK_FAVORITES = [
  { id: '1', name: 'Handcrafted Upholstery Bag', image: '/images/bags/bag1.png', category: 'Bags', favorited_by: 142, stock: 12 },
  { id: '2', name: 'Moroccan Kilim Bag', image: '/images/bags/bag2.png', category: 'Bags', favorited_by: 98, stock: 5 },
  { id: '3', name: 'Quilted Velvet Tote', image: '/images/bags/bag3.png', category: 'Bags', favorited_by: 76, stock: 0 },
  { id: '4', name: 'Printed Upholstery Bag', image: '/images/bags/bag4.png', category: 'Bags', favorited_by: 45, stock: 24 },
  { id: '5', name: 'Damask Jacquard Bag', image: '/images/bags/bag5.png', category: 'Bags', favorited_by: 12, stock: 8 },
];

export default function FavoritesPage() {
  const [sort, setSort] = useState<'most_favorited' | 'least_stock'>('most_favorited');

  const sortedFavorites = [...MOCK_FAVORITES].sort((a, b) => {
    if (sort === 'most_favorited') return b.favorited_by - a.favorited_by;
    if (sort === 'least_stock') return a.stock - b.stock;
    return 0;
  });

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
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-[#FF5A5F] fill-[#FF5A5F]" />
                    <span className="font-bold text-lg">{item.favorited_by}</span> users
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.stock > 10 ? 'bg-[#AAB084]/20 text-[#6B724D]' : 
                    item.stock > 0 ? 'bg-[#FFD6A5]/40 text-[#D97D27]' : 
                    'bg-red-50 text-red-600'
                  }`}>
                    {item.stock > 10 ? 'In Stock' : item.stock > 0 ? `Low Stock (${item.stock} left)` : 'Out of stock'}
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
