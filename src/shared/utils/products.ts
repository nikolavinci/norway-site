import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products from Supabase:', error);
    return [];
  }
  
  const basePath = process.env.NODE_ENV === 'production' ? '/norway-site' : '';
  
  return data.map((p: any) => ({
    ...p,
    image: p.image.startsWith('/') ? `${basePath}${p.image}` : p.image
  })) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  
  const basePath = process.env.NODE_ENV === 'production' ? '/norway-site' : '';
  const p = data as any;
  
  return {
    ...p,
    image: p.image.startsWith('/') ? `${basePath}${p.image}` : p.image
  } as Product;
}
