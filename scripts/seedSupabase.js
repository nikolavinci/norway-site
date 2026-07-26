require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PRODUCTS = [
  {
    name: 'Set Of 4 Yellow Lotus Cotton Bedsheet And Quilt Cover',
    price: 7720,
    category: 'Bedding',
    image: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_4361-8664.webp',
    description: 'Vibrant yellow lotus pattern bedding set.',
    stock: 100
  },
  {
    name: 'Green Tree Textured Cotton Table Cover',
    price: 2250,
    category: 'Living',
    image: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_1325-9484.webp',
    description: 'Textured cotton table cover with geometric green patterns.',
    stock: 50
  },
  {
    name: 'Blue Lily Cotton Filled Quilt',
    price: 9450,
    category: 'Bedding',
    image: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_0979-5376.webp',
    description: 'Cozy and lightweight blue lily pattern quilt.',
    stock: 20
  },
  {
    name: 'Printed Upholstery Shopper Bag',
    price: 1850,
    category: 'Accessories',
    image: '/images/bags/bag1.png',
    description: 'Handmade printed upholstery shopper bag featuring warm boho patterns.',
    stock: 200
  },
  {
    name: 'Handcrafted Vintage Upholstery Tote',
    price: 2100,
    category: 'Accessories',
    image: '/images/bags/bag2.png',
    description: 'Beautiful tote bag made of vintage upholstery fabric in earthy tones.',
    stock: 150
  },
  {
    name: 'Damask Jacquard Fabric Bag',
    price: 2450,
    category: 'Accessories',
    image: '/images/bags/bag3.png',
    description: 'Elegant damask jacquard fabric bag finished with premium leather handles.',
    stock: 75
  },
  {
    name: 'Moroccan Leather Kilim Bag',
    price: 3200,
    category: 'Accessories',
    image: '/images/bags/bag4.png',
    description: 'Handcrafted Moroccan leather kilim bag with striking terracotta patterns.',
    stock: 45
  },
  {
    name: 'Green Bird Quilted Velvet Tote',
    price: 2750,
    category: 'Accessories',
    image: '/images/bags/bag5.png',
    description: 'Opulent quilted velvet tote bag featuring a subtle green bird print.',
    stock: 60
  }
];

async function seed() {
  console.log('Seeding products...');
  for (const product of PRODUCTS) {
    const { data, error } = await supabase
      .from('products')
      .insert([product]);
    
    if (error) {
      console.error('Error inserting product:', error.message);
    } else {
      console.log(`Inserted: ${product.name}`);
    }
  }
  console.log('Done seeding products!');
}

seed();
