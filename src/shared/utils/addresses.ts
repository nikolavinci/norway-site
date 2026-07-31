import { supabase } from './supabase';

export interface UserAddress {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return [];

  const { data, error } = await supabase
    .from('user_addresses')
    .select('*')
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
  return data || [];
}

export async function addUserAddress(address: Omit<UserAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<UserAddress | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('User not authenticated');

  // If this is set as default, we might need to unset others later (or handle via DB trigger)
  // For simplicity, we just insert it.
  const { data, error } = await supabase
    .from('user_addresses')
    .insert([{ ...address, user_id: session.user.id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserAddress(id: string, updates: Partial<UserAddress>): Promise<UserAddress | null> {
  const { data, error } = await supabase
    .from('user_addresses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteUserAddress(id: string): Promise<void> {
  const { error } = await supabase
    .from('user_addresses')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
