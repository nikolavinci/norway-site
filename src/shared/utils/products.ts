import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  views?: number;
  is_popular?: boolean;
  meta_title?: string;
  meta_description?: string;
  gallery?: string[];
  materials?: string;
  care_instructions?: string;
  dimensions?: string;
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Printed Upholstery Shopper Bag',
    price: 1850,
    category: 'Bag',
    image: '/images/bags/bag1.png',
    description: 'Handmade printed upholstery shopper bag featuring warm boho patterns and durable straps.',
    stock: 200,
    views: 4520,
    is_popular: true
  },
  {
    id: 'prod-2',
    name: 'Handcrafted Vintage Upholstery Tote',
    price: 2100,
    category: 'Bag',
    image: '/images/bags/bag2.png',
    description: 'Beautiful tote bag made of vintage upholstery fabric in rich earthy tones.',
    stock: 150,
    views: 3840,
    is_popular: true
  },
  {
    id: 'prod-3',
    name: 'Damask Jacquard Fabric Bag',
    price: 2450,
    category: 'Bag',
    image: '/images/bags/bag3.png',
    description: 'Elegant damask jacquard fabric bag finished with premium leather handles.',
    stock: 75,
    views: 2980,
    is_popular: false
  },
  {
    id: 'prod-4',
    name: 'Moroccan Leather Kilim Bag',
    price: 3200,
    category: 'Bag',
    image: '/images/bags/bag4.png',
    description: 'Handcrafted Moroccan leather kilim bag with striking terracotta patterns.',
    stock: 45,
    views: 4120,
    is_popular: true
  },
  {
    id: 'prod-5',
    name: 'Green Bird Quilted Velvet Tote',
    price: 2750,
    category: 'Bag',
    image: '/images/bags/bag5.png',
    description: 'Opulent quilted velvet tote bag featuring a subtle green bird print.',
    stock: 60,
    views: 2430,
    is_popular: false
  },
  {
    id: 'prod-6',
    name: 'Artisan Textured Linen Cushion',
    price: 950,
    category: 'Cushion',
    image: '/images/products/green_tree_tablecover.webp',
    description: 'Textured artisan cushion cover woven from natural unbleached fibers to bring warmth to your living space.',
    stock: 80,
    views: 5210,
    is_popular: true
  },
  {
    id: 'prod-7',
    name: 'Yellow Lotus Handcrafted Cushion',
    price: 890,
    category: 'Cushion',
    image: '/images/products/yellow_lotus_bedding.webp',
    description: 'Vibrant yellow lotus pattern cushion cover made with 100% organic cotton and hand-embroidered seams.',
    stock: 100,
    views: 3450,
    is_popular: true
  },
  {
    id: 'prod-8',
    name: 'Blue Lily Cotton Artisan Shawl',
    price: 1450,
    category: 'Shawl',
    image: '/images/products/blue_lily_quilt.webp',
    description: 'Cozy, breathable artisan shawl featuring delicate botanical patterns and fringed hem.',
    stock: 40,
    views: 4790,
    is_popular: true
  },
  {
    id: 'prod-9',
    name: 'Bohemian Handwoven Wool Shawl',
    price: 1890,
    category: 'Shawl',
    image: '/images/boho_feature_showcase.jpg',
    description: 'Warm, lightweight draped bohemian shawl handcrafted with natural hand-spun yarns.',
    stock: 35,
    views: 3120,
    is_popular: false
  },
  {
    id: 'prod-10',
    name: 'Terracotta Kilim Cushion Cover',
    price: 990,
    category: 'Cushion',
    image: '/images/bags/bag4.png',
    description: 'Geometric kilim pattern cushion cover woven from sustainable wool and cotton yarn.',
    stock: 65,
    views: 4100,
    is_popular: true
  },
  {
    id: 'prod-11',
    name: 'Forest Green Quilted Velvet Cushion',
    price: 1150,
    category: 'Cushion',
    image: '/images/bags/bag5.png',
    description: 'Plush quilted velvet cushion cover in rich forest green, finished with neat piping.',
    stock: 50,
    views: 2890,
    is_popular: false
  }
];

export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error || !data || data.length === 0) {
      return FALLBACK_PRODUCTS;
    }
    
    return data.map((p: any) => ({
      ...p,
      image: p.image || '/images/boho_hero_banner.png'
    })) as Product[];
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getPopularProducts(limit: number = 4): Promise<Product[]> {
  const products = await getProducts();
  return [...products]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export async function getProductsByCategory(category: string, limit?: number): Promise<Product[]> {
  const products = await getProducts();
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error || !data) {
      return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
    }
    
    const p = data as any;
    return {
      ...p,
      image: p.image || '/images/boho_hero_banner.png'
    } as Product;
  } catch {
    return FALLBACK_PRODUCTS.find(p => p.id === id) || null;
  }
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
