import { PRODUCTS } from '../../../shared/utils/products';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
