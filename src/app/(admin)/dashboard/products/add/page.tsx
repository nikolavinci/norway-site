'use client';

import { useState } from 'react';
import { createProduct, uploadProductImage } from '../../../../../shared/utils/products';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, ArrowLeft, Settings2 } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    image: '',
    meta_title: '',
    meta_description: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = formData.image;

      if (file) {
        imageUrl = await uploadProductImage(file);
      }

      const productPayload = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        stock: parseInt(formData.stock, 10) || 0,
        image: imageUrl,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description
      };

      await createProduct(productPayload);
      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the product.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link href="/dashboard/products" className="inline-flex items-center gap-2 text-[#987C6F] font-bold text-sm mb-6 hover:text-[#5D4E46] transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#5D4E46]">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
            <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Basic Information</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Product Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="e.g., Handwoven Kilim Bag" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Description</label>
              <textarea required rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="Describe the product details, materials, and origins..."></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Price (NOK)</label>
                <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Stock Quantity</label>
                <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="0" />
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Organization</h3>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Category</label>
                <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="e.g., Bags" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Product Image</h3>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#5D4E46]/30 rounded-xl bg-[#FDFBF7] hover:bg-gray-50 cursor-pointer transition-colors group">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                  <ImageIcon className="text-[#987C6F] mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <span className="text-sm font-bold text-[#5D4E46] text-center">{file ? file.name : 'Upload File'}</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                </label>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-[#5D4E46]/10"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-400 uppercase">Or link</span>
                  <div className="flex-grow border-t border-[#5D4E46]/10"></div>
                </div>

                <input type="text" placeholder="https://..." value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl text-sm outline-none focus:border-[#987C6F]" />
              </div>
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
              <p className="text-xs text-gray-400 mt-2">Leave blank to use the product name automatically.</p>
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
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}
