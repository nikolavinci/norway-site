'use client';

import { PenTool, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Blog, getBlogs, deleteBlog } from '@/shared/utils/blogs';

export default function BlogManagerPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const data = await getBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id);
      loadBlogs();
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Blog Management</h2>
        <Link 
          href="/dashboard/blog/add"
          className="flex items-center gap-2 bg-[#987C6F] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#7d665b] transition-colors"
        >
          <Plus size={16} /> Write New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
          <PenTool size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
          <p className="text-lg">No blog posts found. Start writing your first article!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
          <table className="w-full text-left text-sm text-[#5D4E46]">
            <thead className="bg-[#FDFBF7] text-xs uppercase font-bold text-[#5D4E46]/60 tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D4E46]/5">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{blog.title}</td>
                  <td className="px-6 py-4">{new Date(blog.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/blog/edit/${blog.id}`} className="text-[#987C6F] hover:text-[#5D4E46] p-2 transition-colors">
                      <Edit2 size={16} className="inline" />
                    </Link>
                    <button onClick={() => handleDelete(blog.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors ml-2">
                      <Trash2 size={16} className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
