import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  meta_title?: string;
  meta_description?: string;
  gallery?: string[];
  materials?: string;
  care_instructions?: string;
  dimensions?: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products from Supabase:', error);
    return [];
  }
  
  return data.map((p: any) => ({
    ...p,
    image: p.image
  })) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  
  const p = data as any;

  return {
    ...p,
    image: p.image
  } as Product;
}

export async function createProduct(product: Omit<Product, 'id'>) {
  const { data, error } = await supabase.from('products').insert(product).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${fileName}`;
  
  const { data, error } = await supabase.storage
    .from('products')
    .upload(filePath, file);
    
  if (error) {
    console.error('Upload Error:', error);
    throw error;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);
    
  return publicUrl;
}
