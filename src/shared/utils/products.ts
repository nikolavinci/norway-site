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
  specification?: string;
  origin?: string;
  craftsmanship?: string;
}

export const CATEGORIES = [
  'Cushion covers',
  'Blankets/Shawls',
  'Quilt bags',
  'Others'
] as const;

export type CategoryType = typeof CATEGORIES[number];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Printed Upholstery Shopper Bag',
    price: 1850,
    category: 'Quilt bags',
    image: '/images/bags/bag1.png',
    description: 'Handmade printed upholstery shopper bag featuring warm boho patterns and durable straps. Crafted individually in Nepal with attention to every seam.',
    specification: 'Handmade artisan tote bag with reinforced handles, interior lining, and secure inner pocket.',
    materials: 'Vintage upholstery cotton & natural linen blend, reinforced dual handles',
    dimensions: '42 cm x 38 cm x 12 cm (Handle drop: 26 cm)',
    care_instructions: 'Spot clean with mild damp cloth. Gentle cool handwash if needed. Lay flat to dry.',
    origin: 'Kathmandu Valley, Nepal',
    craftsmanship: 'Hand-sewn and hand-assembled individually by Nepalese artisans',
    stock: 200,
    views: 4520,
    is_popular: true
  },
  {
    id: 'prod-2',
    name: 'Handcrafted Vintage Upholstery Tote',
    price: 2100,
    category: 'Quilt bags',
    image: '/images/bags/bag2.png',
    description: 'Beautiful tote bag made of vintage upholstery fabric in rich earthy tones. Brings a smile to your everyday routine.',
    specification: 'Spacious daily tote with structured bottom, magnetic snap closure, and internal slip pocket.',
    materials: 'Heavyweight woven upholstery fabric, natural unbleached cotton lining',
    dimensions: '40 cm x 36 cm x 14 cm (Handle drop: 25 cm)',
    care_instructions: 'Handwash in cool water or spot clean with mild detergent. Do not tumble dry.',
    origin: 'Nepal',
    craftsmanship: 'Traditional artisan stitching with reinforced stress points',
    stock: 150,
    views: 3840,
    is_popular: true
  },
  {
    id: 'prod-3',
    name: 'Damask Jacquard Fabric Bag',
    price: 2450,
    category: 'Quilt bags',
    image: '/images/bags/bag3.png',
    description: 'Elegant damask jacquard fabric bag finished with premium leather handles. Merges Himalayan craftsmanship with Nordic simplicity.',
    specification: 'Premium jacquard travel tote with genuine leather trims and zippered inner compartment.',
    materials: 'Jacquard woven fabric, genuine vegetable-tanned leather handles, cotton lining',
    dimensions: '44 cm x 35 cm x 15 cm',
    care_instructions: 'Specialist fabric clean or spot clean. Condition leather handles occasionally.',
    origin: 'Nepal',
    craftsmanship: 'Handwoven jacquard loomed by master craftspeople in Nepal',
    stock: 75,
    views: 2980,
    is_popular: false
  },
  {
    id: 'prod-4',
    name: 'Moroccan Kilim Pattern Quilt Bag',
    price: 3200,
    category: 'Quilt bags',
    image: '/images/bags/bag4.png',
    description: 'Handcrafted quilted bag with striking terracotta patterns and durable finishes. Each bag carries its own unique pattern rhythm.',
    specification: 'Quilted artisanal tote with reinforced stitching, roomy interior, and soft shoulder straps.',
    materials: '100% handspun wool and cotton yarn, soft quilted interior padding',
    dimensions: '45 cm x 40 cm x 14 cm',
    care_instructions: 'Dry clean or very gentle cold handwash. Dry flat in shade.',
    origin: 'Nepal',
    craftsmanship: 'Hand-quilted and hand-stitched by Nepalese craftspeople',
    stock: 45,
    views: 4120,
    is_popular: true
  },
  {
    id: 'prod-5',
    name: 'Green Bird Quilted Velvet Tote',
    price: 2750,
    category: 'Quilt bags',
    image: '/images/bags/bag5.png',
    description: 'Opulent quilted velvet tote bag featuring a subtle green bird print. Adds texture, warmth, and personality to any outfit.',
    specification: 'Quilted velvet tote bag with silky lining, reinforced base, and comfortable wide shoulder straps.',
    materials: 'Cotton velvet blend exterior, diamond quilted stitching, cotton lining',
    dimensions: '39 cm x 36 cm x 10 cm',
    care_instructions: 'Gentle handwash in cold water. Steam lightly if needed. Do not iron directly.',
    origin: 'Nepal',
    craftsmanship: 'Handcrafted and individually quilted in Nepal',
    stock: 60,
    views: 2430,
    is_popular: false
  },
  {
    id: 'prod-6',
    name: 'Artisan Textured Linen Cushion Cover',
    price: 950,
    category: 'Cushion covers',
    image: '/images/products/green_tree_tablecover.webp',
    description: 'Textured artisan cushion cover woven from natural unbleached fibers to bring warmth and Himalayan soul to your living space.',
    specification: 'Square cushion cover with hidden zipper closure and reinforced double-stitched piping.',
    materials: '100% natural unbleached linen and cotton fibers with eco-conscious botanical dyes',
    dimensions: '50 cm x 50 cm (Standard Nordic cushion insert size)',
    care_instructions: 'Gentle handwash in cool water recommended. Iron on low heat while slightly damp.',
    origin: 'Nepal',
    craftsmanship: 'Loomed and finished entirely by hand by master weavers',
    stock: 80,
    views: 5210,
    is_popular: true
  },
  {
    id: 'prod-7',
    name: 'Yellow Lotus Handcrafted Cushion Cover',
    price: 890,
    category: 'Cushion covers',
    image: '/images/products/yellow_lotus_bedding.webp',
    description: 'Vibrant yellow lotus pattern cushion cover made with organic cotton and hand-embroidered seams. Perfect for adding warmth to a calm grey sofa.',
    specification: 'Printed and hand-finished cushion cover with concealed YKK bottom zipper.',
    materials: '100% organic cotton, hand-embroidered detailing, non-toxic water-based pigment',
    dimensions: '50 cm x 50 cm',
    care_instructions: 'Handwash inside out in cold water. Wash with similar colours.',
    origin: 'Nepal',
    craftsmanship: 'Traditional woodblock print inspired design, hand-sewn in Kathmandu',
    stock: 100,
    views: 3450,
    is_popular: true
  },
  {
    id: 'prod-8',
    name: 'Blue Lily Cotton Artisan Blanket / Shawl',
    price: 1450,
    category: 'Blankets/Shawls',
    image: '/images/products/blue_lily_quilt.webp',
    description: 'Cozy, breathable artisan blanket / shawl featuring delicate botanical patterns and fringed hem. Warm for long Nordic winter evenings.',
    specification: 'Multi-use draped blanket & oversized shawl with delicate fringed border edges.',
    materials: '100% pure organic cotton, breathable hand-spun weave, natural dyes',
    dimensions: '180 cm x 130 cm',
    care_instructions: 'Gentle handwash in cool water with mild wool/cotton detergent. Dry flat.',
    origin: 'Nepal',
    craftsmanship: 'Hand-spun and hand-loomed on traditional wooden looms in Nepal',
    stock: 40,
    views: 4790,
    is_popular: true
  },
  {
    id: 'prod-9',
    name: 'Bohemian Handwoven Wool Blanket / Shawl',
    price: 1890,
    category: 'Blankets/Shawls',
    image: '/images/boho_feature_showcase.jpg',
    description: 'Warm, lightweight draped bohemian blanket and shawl handcrafted with natural hand-spun yarns. Drapes effortlessly over shoulders or sofas.',
    specification: 'Heirloom quality warm shawl/throw with twisted tassel fringe detailing.',
    materials: '70% Himalayan wool, 30% organic cotton blend for itch-free softness',
    dimensions: '200 cm x 140 cm',
    care_instructions: 'Handwash cold with wool detergent. Press water out gently in a towel. Dry flat.',
    origin: 'Himalayan region, Nepal',
    craftsmanship: 'Hand-spun and hand-woven by artisan collectives in Nepal',
    stock: 35,
    views: 3120,
    is_popular: false
  },
  {
    id: 'prod-10',
    name: 'Terracotta Kilim Cushion Cover',
    price: 990,
    category: 'Cushion covers',
    image: '/images/bags/bag4.png',
    description: 'Geometric kilim pattern cushion cover woven from sustainable wool and cotton yarn. Brings rich Himalayan colour into Nordic interiors.',
    specification: 'Heavyweight decorative cushion cover with sturdy concealed zipper closure.',
    materials: '60% wool, 40% organic cotton, backing in natural canvas cotton',
    dimensions: '45 cm x 45 cm',
    care_instructions: 'Dry clean or gentle spot wash with cold water. Do not bleach.',
    origin: 'Nepal',
    craftsmanship: 'Hand-loomed flatweave kilim technique crafted by generational artisans',
    stock: 65,
    views: 4100,
    is_popular: true
  },
  {
    id: 'prod-11',
    name: 'Forest Green Quilted Velvet Cushion Cover',
    price: 1150,
    category: 'Cushion covers',
    image: '/images/bags/bag5.png',
    description: 'Plush quilted velvet cushion cover in rich forest green, finished with neat piping. Soft, tactile, and made to last.',
    specification: 'Quilted geometric pattern cushion cover with premium tonal edge piping.',
    materials: 'Cotton-rich velvet with natural cotton backing and inner interlining',
    dimensions: '50 cm x 50 cm',
    care_instructions: 'Handwash cold inside out or spot clean. Do not tumble dry.',
    origin: 'Nepal',
    craftsmanship: 'Hand-stitched quilting and tailored in Nepal',
    stock: 50,
    views: 2890,
    is_popular: false
  },
  {
    id: 'prod-12',
    name: 'Himalayan Handwoven Table Runner & Textile',
    price: 850,
    category: 'Others',
    image: '/images/products/green_tree_tablecover.webp',
    description: 'Handcrafted decorative table textile and runner bringing warmth, texture, and organic style to your dining or living space.',
    specification: 'Woven decorative runner with fringed ends and natural selvedge borders.',
    materials: '100% natural unbleached cotton with hand-printed botanical motifs',
    dimensions: '160 cm x 40 cm',
    care_instructions: 'Gentle handwash in cool water. Warm iron on reverse side.',
    origin: 'Nepal',
    craftsmanship: 'Handwoven on pit looms by Nepalese home-craft collectives',
    stock: 40,
    views: 2100,
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

export async function getPopularProducts(limit: number = 8): Promise<Product[]> {
  const products = await getProducts();
  return [...products]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export async function getProductsByCategory(category: string, limit?: number): Promise<Product[]> {
  const products = await getProducts();
  const normalizedSearch = category.toLowerCase().trim();
  const filtered = products.filter(p => {
    const cat = p.category.toLowerCase().trim();
    if (cat === normalizedSearch) return true;
    if (normalizedSearch === 'cushion covers' && (cat.includes('cushion') || cat === 'cushion')) return true;
    if (normalizedSearch === 'blankets/shawls' && (cat.includes('blanket') || cat.includes('shawl') || cat === 'shawl')) return true;
    if (normalizedSearch === 'quilt bags' && (cat.includes('bag') || cat === 'bag')) return true;
    if (normalizedSearch === 'others' && cat === 'others') return true;
    return false;
  });
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

// Whitelist fields that exist in Supabase 'products' table to avoid schema cache PGRST204 errors
function sanitizeProductPayload(payload: Record<string, any>) {
  const allowed = new Set([
    'name',
    'price',
    'category',
    'description',
    'stock',
    'image',
    'meta_title',
    'meta_description',
    'materials',
    'care_instructions',
    'dimensions',
    'gallery',
    'name_en',
    'description_en'
  ]);
  const clean: Record<string, any> = {};
  for (const [k, v] of Object.entries(payload)) {
    if (allowed.has(k)) {
      clean[k] = v;
    }
  }
  return clean;
}

export async function createProduct(product: Omit<Product, 'id'>) {
  const cleanProduct = sanitizeProductPayload(product);
  const { data, error } = await supabase.from('products').insert(cleanProduct).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const cleanUpdates = sanitizeProductPayload(updates);
  try {
    const { data, error } = await supabase.from('products').update(cleanUpdates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  } catch {
    const idx = FALLBACK_PRODUCTS.findIndex(p => p.id === id);
    if (idx !== -1) {
      FALLBACK_PRODUCTS[idx] = { ...FALLBACK_PRODUCTS[idx], ...updates };
      return FALLBACK_PRODUCTS[idx];
    }
    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  } catch {
    const idx = FALLBACK_PRODUCTS.findIndex(p => p.id === id);
    if (idx !== -1) FALLBACK_PRODUCTS.splice(idx, 1);
  }
}

export async function uploadProductImage(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = Math.random().toString(36).substring(2, 15) + '.' + fileExt;
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, file);
      
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);
      
    return publicUrl;
  } catch {
    return '/images/boho_feature_showcase.jpg';
  }
}
