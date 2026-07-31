import { supabase } from './supabase';

export interface Coupon {
  id: string;
  code: string;
  discount_percentage: number;
  free_shipping_threshold: number | null;
  is_active: boolean;
  created_at: string;
}

export async function getCoupons(): Promise<Coupon[]> {
  const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching coupons:', error);
    return [];
  }
  return data || [];
}

export async function createCoupon(coupon: Partial<Coupon>): Promise<Coupon | null> {
  const { data, error } = await supabase.from('coupons').insert([coupon]).select().single();
  if (error) {
    throw error;
  }
  return data;
}

export async function deleteCoupon(id: string): Promise<void> {
  const { error } = await supabase.from('coupons').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function toggleCouponActive(id: string, is_active: boolean): Promise<void> {
  const { error } = await supabase.from('coupons').update({ is_active }).eq('id', id);
  if (error) {
    throw error;
  }
}
