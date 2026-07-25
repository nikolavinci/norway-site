export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  // Existing Bedding & Living
  {
    id: 'prod_1',
    name: 'Set Of 4 Yellow Lotus Cotton Bedsheet And Quilt Cover',
    price: 7720,
    category: 'Bedding',
    image: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_4361-8664.webp',
    description: 'Vibrant yellow lotus pattern bedding set.'
  },
  {
    id: 'prod_2',
    name: 'Green Tree Textured Cotton Table Cover',
    price: 2250,
    category: 'Living',
    image: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_1325-9484.webp',
    description: 'Textured cotton table cover with geometric green patterns.'
  },
  {
    id: 'prod_3',
    name: 'Blue Lily Cotton Filled Quilt',
    price: 9450,
    category: 'Bedding',
    image: 'https://cdn2.blanxer.com/uploads/69917932e3880672e54e49e5/product_image-img_0979-5376.webp',
    description: 'Cozy and lightweight blue lily pattern quilt.'
  },
  // New Etsy Bags
  {
    id: 'prod_bag_1',
    name: 'Printed Upholstery Shopper Bag',
    price: 1850,
    category: 'Accessories',
    image: '/images/bags/bag1.png',
    description: 'Handmade printed upholstery shopper bag featuring warm boho patterns.'
  },
  {
    id: 'prod_bag_2',
    name: 'Handcrafted Vintage Upholstery Tote',
    price: 2100,
    category: 'Accessories',
    image: '/images/bags/bag2.png',
    description: 'Beautiful tote bag made of vintage upholstery fabric in earthy tones.'
  },
  {
    id: 'prod_bag_3',
    name: 'Damask Jacquard Fabric Bag',
    price: 2450,
    category: 'Accessories',
    image: '/images/bags/bag3.png',
    description: 'Elegant damask jacquard fabric bag finished with premium leather handles.'
  },
  {
    id: 'prod_bag_4',
    name: 'Moroccan Leather Kilim Bag',
    price: 3200,
    category: 'Accessories',
    image: '/images/bags/bag4.png',
    description: 'Handcrafted Moroccan leather kilim bag with striking terracotta patterns.'
  },
  {
    id: 'prod_bag_5',
    name: 'Green Bird Quilted Velvet Tote',
    price: 2750,
    category: 'Accessories',
    image: '/images/bags/bag5.png',
    description: 'Opulent quilted velvet tote bag featuring a subtle green bird print.'
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}
