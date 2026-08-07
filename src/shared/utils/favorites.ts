import { create } from 'zustand';
import { supabase } from './supabase';

interface FavoritesState {
  favorites: string[];
  initialized: boolean;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  initialized: false,
  fetchFavorites: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      set({ initialized: true });
      return;
    }
    
    const { data } = await supabase.from('favorites').select('product_id').eq('user_id', session.user.id);
    if (data) {
      set({ favorites: data.map(f => f.product_id), initialized: true });
    }
  },
  toggleFavorite: async (productId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Please log in to save items to your wishlist.");
      return;
    }
    
    const isFavorited = get().favorites.includes(productId);
    
    if (isFavorited) {
      // Remove
      set({ favorites: get().favorites.filter(id => id !== productId) });
      await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('product_id', productId);
    } else {
      // Add
      set({ favorites: [...get().favorites, productId] });
      await supabase.from('favorites').insert({ user_id: session.user.id, product_id: productId });
    }
  }
}));
