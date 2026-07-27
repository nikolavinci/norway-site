import { getProducts } from '@/shared/utils/products';
import EditProductClient from './EditProductClient';

export async function generateStaticParams() {
  const products = await getProducts();
  return [
    { id: 'new' },
    ...products.map(p => ({ id: p.id }))
  ];
}

export default function EditProductPage() {
  return <EditProductClient />;
}
