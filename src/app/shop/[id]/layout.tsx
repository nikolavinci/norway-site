import { getProducts } from '../../../shared/utils/products';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
