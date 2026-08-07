'use client';

import { useState, useEffect } from 'react';
import { Heart, Package, TrendingUp, Eye, MousePointerClick } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/shared/utils/supabase';

export default function FavoritesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<'most_favorited' | 'least_stock' | 'most_viewed'>('most_favorited');

  const [customerFavorites, setCustomerFavorites] = useState<any[]>([]);
  const [adminAnalytics, setAdminAnalytics] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProfileAndData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const role = profileData?.role || 'customer';
        setProfile({ role });
        
        if (role === 'customer') {
          const { data: favs } = await supabase.from('favorites').select('product_id, products(*)').eq('user_id', session.user.id);
          if (favs) {
            setCustomerFavorites(favs.map(f => f.products));
          }
        } else if (role === 'admin') {
          // Fetch real analytics data using native tables
          const { data: products } = await supabase.from('products').select(`
            id, name, images, category, stock,
            favorites (count),
            product_views (count),
            order_items (count)
          `);
          
          if (products) {
            const analytics = products.map((p: any) => {
              const views = p.product_views?.[0]?.count || 0;
              const favoritesCount = p.favorites?.[0]?.count || 0;
              const ordersCount = p.order_items?.[0]?.count || 0;
              const ctr = views > 0 ? ((ordersCount / views) * 100).toFixed(1) : '0.0';
              
              return {
                id: p.id,
                name: p.name,
                image: p.images?.[0] || '/placeholder.png',
                category: p.category,
                stock: p.stock,
                favorited_by: favoritesCount,
                views: views,
                ctr: ctr,
                sales: ordersCount,
              };
            });
            setAdminAnalytics(analytics);
          }
        }
      }
      setLoading(false);
    }
    fetchProfileAndData();
  }, []);

  const sortedAnalytics = [...adminAnalytics].sort((a, b) => {
    if (sort === 'most_favorited') return b.favorited_by - a.favorited_by;
    if (sort === 'least_stock') return a.stock - b.stock;
    if (sort === 'most_viewed') return b.views - a.views;
    return 0;
  });

  if (loading) return null;

  if (profile?.role === 'admin') {
    const totalFavorites = adminAnalytics.reduce((sum, item) => sum + item.favorited_by, 0);
    const mostLoved = [...adminAnalytics].sort((a, b) => b.favorited_by - a.favorited_by)[0];
    const outOfStockLoved = adminAnalytics.filter(a => a.stock <= 0 && a.favorited_by > 0).length;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-[#5D4E46]">Wishlist Analytics</h2>
            <p className="text-[#5D4E46]/60 text-sm mt-1">Native tracking for product views and wishlist intent.</p>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFD6A5]/40 flex items-center justify-center text-[#D97D27]">
            <Heart size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Total Favorites</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">{totalFavorites}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#AAB084]/20 flex items-center justify-center text-[#6B724D]">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">Most Loved</p>
            <h3 className="text-xl font-black text-[#5D4E46] truncate w-40" title={mostLoved?.name}>{mostLoved?.name || 'N/A'}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E4D1FF]/30 flex items-center justify-center text-[#6A3F9C]">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#5D4E46]/60 uppercase tracking-wider">OOS & Loved</p>
            <h3 className="text-2xl font-black text-[#5D4E46]">{outOfStockLoved}</h3>
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
          onClick={() => setSort('most_viewed')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
            sort === 'most_viewed' ? 'bg-[#5D4E46] text-white' : 'bg-white text-[#5D4E46] hover:bg-[#FDFBF7] border border-[#5D4E46]/10'
          }`}
        >
          Most Viewed
        </button>
        <button 
          onClick={() => setSort('least_stock')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
            sort === 'least_stock' ? 'bg-[#5D4E46] text-white' : 'bg-white text-[#5D4E46] hover:bg-[#FDFBF7] border border-[#5D4E46]/10'
          }`}
        >
          Least Stock
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FDFBF7] border-b border-[#5D4E46]/10 text-[#5D4E46]/60">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Product</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Stock</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs"><div className="flex items-center gap-1"><Eye size={14}/> Views</div></th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs"><div className="flex items-center gap-1"><Heart size={14}/> Saves</div></th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs"><div className="flex items-center gap-1"><MousePointerClick size={14}/> CTR</div></th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D4E46]/5">
              {sortedAnalytics.map((item) => (
                <tr key={item.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#FDFBF7] relative overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[#5D4E46]">{item.name}</div>
                        <div className="text-xs text-[#5D4E46]/60">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.stock > 10 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        {item.stock} in stock
                      </span>
                    ) : item.stock > 0 ? (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${item.favorited_by > 5 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.stock} low stock
                      </span>
                    ) : (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${item.favorited_by > 5 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-700'}`}>
                        Out of stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#5D4E46] font-bold">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 text-[#5D4E46] font-bold">
                    {item.favorited_by}
                  </td>
                  <td className="px-6 py-4 text-[#5D4E46] font-bold">
                    {item.ctr}%
                  </td>
                  <td className="px-6 py-4 text-[#5D4E46] font-bold">
                    {item.sales}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }

  // CUSTOMER VIEW
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#5D4E46]">Saved Items</h2>
      {customerFavorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#5D4E46]/10">
          <Heart className="w-12 h-12 mx-auto text-[#5D4E46]/20 mb-4" />
          <h3 className="text-lg font-bold text-[#5D4E46]">Your wishlist is empty</h3>
          <p className="text-[#5D4E46]/60 mt-2">Save items you love to keep track of them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerFavorites.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#5D4E46]/10 group">
              <div className="relative aspect-[4/5] bg-[#FDFBF7]">
                <Image
                  src={product.images?.[0] || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#5D4E46] truncate">{product.name}</h3>
                <p className="text-[#987C6F] font-bold mt-1">{product.price} NOK</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
