import EditProductClient from './EditProductClient';

export async function generateStaticParams() {
  return [{ id: 'new' }];
}

export default function EditProductPage() {
  return <EditProductClient />;
}
