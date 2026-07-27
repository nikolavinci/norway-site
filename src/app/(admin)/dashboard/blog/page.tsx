'use client';

import { PenTool, Plus } from 'lucide-react';
import Link from 'next/link';

export default function BlogManagerPage() {
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

      <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
        <PenTool size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
        <p className="text-lg">No blog posts found. Start writing your first article!</p>
      </div>
    </div>
  );
}
