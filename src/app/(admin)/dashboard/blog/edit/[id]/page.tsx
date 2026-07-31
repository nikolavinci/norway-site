import { getBlogs } from '@/shared/utils/blogs';
import EditBlogClient from './EditBlogClient';

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return [
    { id: 'new' }, // fallback if needed
    ...blogs.map(b => ({ id: b.id }))
  ];
}

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditBlogClient params={params} />;
}
