'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, ArrowLeft, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { getBlogById, updateBlog } from '@/shared/utils/blogs';
import { use } from 'react';

export default function EditBlogClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id === 'new') return; // Should not happen in edit route normally
        const blog = await getBlogById(id);
        if (blog) {
          setFormData({
            title: blog.title || '',
            content: blog.content || '',
            image: blog.img || '',
            meta_title: blog.meta_title || '',
            meta_description: blog.meta_description || ''
          });
        } else {
          setError("Blog not found");
        }
      } catch (err: any) {
        setError("Error loading blog");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updateBlog(id, {
        title: formData.title,
        content: formData.content,
        img: formData.image,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description
      });
      router.push('/dashboard/blog');
    } catch (err: any) {
      setError(err.message || "Failed to update blog post");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link href="/dashboard/blog" className="inline-flex items-center gap-2 text-[#987C6F] font-bold text-sm mb-6 hover:text-[#5D4E46] transition-colors">
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#5D4E46]">Edit Post</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Post Title</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-serif text-xl" placeholder="The art of Bohemian living..." />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Content (Markdown supported)</label>
              <textarea required rows={12} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors font-mono text-sm" placeholder="Write your post content here..."></textarea>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Featured Image</h3>
              <div className="flex flex-col gap-4">
                {formData.image ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-[#5D4E46]/20">
                    <img src={formData.image} alt="Featured" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50">
                      <ImageIcon size={14} className="hidden" />
                      <span className="text-xs font-bold px-2">Remove</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = async (e: any) => {
                        if (e.target.files && e.target.files[0]) {
                          try {
                            const { supabase } = await import('@/shared/utils/supabase');
                            const file = e.target.files[0];
                            const fileExt = file.name.split('.').pop();
                            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                            const { error } = await supabase.storage.from('media').upload(fileName, file);
                            if (error) throw error;
                            const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
                            setFormData({...formData, image: publicUrl});
                          } catch(err) {
                            alert('Failed to upload image');
                          }
                        }
                      };
                      input.click();
                    }} className="w-full py-4 border-2 border-[#5D4E46]/20 border-dashed rounded-xl bg-[#FDFBF7] hover:bg-gray-50 flex items-center justify-center gap-2 text-[#5D4E46]/60 font-bold transition-colors">
                      <ImageIcon size={20} /> Upload from Device
                    </button>
                    
                    <Link href="/dashboard/media" target="_blank" className="text-center w-full py-3 bg-gray-100 rounded-xl text-xs font-bold text-[#5D4E46] hover:bg-gray-200 transition-colors">
                      Open Media Library (Copy URL)
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400 font-bold uppercase">OR PASTE URL:</span>
                </div>
                <input type="text" placeholder="https://..." value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl text-sm outline-none focus:border-[#987C6F]" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Status</h3>
              <p className="text-sm text-gray-500 mb-4">Drafts will not be visible to the public.</p>
              <button type="button" className="w-full py-3 bg-[#FDFBF7] text-[#5D4E46] font-bold rounded-xl border border-[#5D4E46]/20 hover:bg-gray-50 transition-colors">Save as Draft</button>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
          <div className="flex items-center gap-2 mb-6 border-b border-[#5D4E46]/10 pb-4">
            <Settings2 className="text-[#987C6F]" size={20} />
            <h3 className="text-lg font-bold text-[#5D4E46]">Search Engine Optimization</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Meta Title</label>
              <input type="text" value={formData.meta_title} onChange={(e) => setFormData({...formData, meta_title: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="SEO optimized title..." />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Meta Description</label>
              <textarea rows={3} value={formData.meta_description} onChange={(e) => setFormData({...formData, meta_description: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="Brief summary for search engines..."></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-[#5D4E46] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#3A3532] transition-colors disabled:opacity-70 flex items-center gap-3 shadow-lg shadow-[#5D4E46]/20">
            {isSubmitting && <Loader2 size={20} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
