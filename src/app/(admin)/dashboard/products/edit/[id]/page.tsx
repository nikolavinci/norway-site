import { Suspense } from 'react';
import { getProducts } from '@/shared/utils/products';
import EditProductClient from './EditProductClient';
import { Loader2 } from 'lucide-react';

export async function generateStaticParams() {
  const products = await getProducts();
  return [
    { id: 'new' },
    ...products.map(p => ({ id: p.id }))
  ];
}

function EditFallback() {
  return (
    <div className="flex justify-center p-12">
      <Loader2 className="animate-spin text-[#987C6F]" size={32} />
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<EditFallback />}>
      <EditProductClient />
    </Suspense>
  );
}
