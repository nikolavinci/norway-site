'use client';

import { useState } from 'react';
import { createProduct, uploadProductImage } from '@/shared/utils/products';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, ArrowLeft, Settings2, Plus, X } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_CATEGORIES = [
  'Cushion covers',
  'Blankets',
  'Shawls',
  'Quilt bags',
  'Others'
];

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    image: '',
    meta_title: '',
    meta_description: '',
    materials: '',
    care_instructions: '',
    dimensions: '',
    specification: '',
    gallery: [] as string[]
  });
  const [file, setFile] = useState<File | null>(null);

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setIsCustomCategory(true);
      setFormData(prev => ({ ...prev, category: customCategoryInput }));
    } else {
      setIsCustomCategory(false);
      setFormData(prev => ({ ...prev, category: val }));
    }
  };

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomCategoryInput(val);
    setFormData(prev => ({ ...prev, category: val }));
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingGallery(true);
    const files = Array.from(e.target.files);
    try {
      const { supabase } = await import('@/shared/utils/supabase');
      const newUrls = await Promise.all(
        files.map(async (f) => {
          const fileExt = f.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          const { error: uploadErr } = await supabase.storage.from('products').upload(fileName, f);
          if (uploadErr) {
            console.warn('Storage upload error, using object URL fallback', uploadErr);
            return URL.createObjectURL(f);
          }
          const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
          return publicUrl;
        })
      );
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...newUrls] }));
    } catch (err) {
      console.error('Failed to upload gallery images', err);
      alert('Failed to upload some gallery images');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleAddGalleryUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim()) {
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, url.trim()] }));
    }
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
  };

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
        price: parseFloat(formData.price) || 0,
        category: formData.category,
        description: formData.description,
        stock: parseInt(formData.stock, 10) || 0,
        image: imageUrl || '/images/bags/bag1.png',
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        materials: formData.materials,
        care_instructions: formData.care_instructions,
        dimensions: formData.dimensions,
        specification: formData.specification,
        gallery: formData.gallery
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
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" placeholder="e.g., Handwoven Cushion Cover" />
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
                <div className="space-y-2">
                  <select 
                    value={isCustomCategory ? '__custom__' : formData.category} 
                    onChange={handleCategorySelect} 
                    required={!isCustomCategory}
                    className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"
                  >
                    <option value="">Select a category</option>
                    {DEFAULT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="__custom__">+ Add Custom Category...</option>
                  </select>

                  {isCustomCategory && (
                    <div className="pt-2">
                      <label className="block text-[11px] font-bold text-[#5D4E46]/60 mb-1">Custom Category Name</label>
                      <input 
                        required
                        type="text" 
                        value={customCategoryInput} 
                        onChange={handleCustomCategoryChange} 
                        placeholder="Type new category..." 
                        className="w-full p-3 bg-[#FDFBF7] border border-[#987C6F] rounded-xl outline-none text-sm font-medium"
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Cover Image</h3>
              <div className="flex flex-col gap-4">
                {file || formData.image ? (
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border border-[#5D4E46]/20">
                    <img src={file ? URL.createObjectURL(file) : formData.image} alt="Product" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setFile(null); setFormData({...formData, image: ''}); }} className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50">
                      <span className="text-xs font-bold px-2">Remove</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#5D4E46]/30 rounded-xl bg-[#FDFBF7] hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                    <ImageIcon className="text-[#987C6F] mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-sm font-bold text-[#5D4E46] text-center">Upload File</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  </label>
                )}
                
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

        {/* Product Details & Gallery */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
          <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Product Details & Image Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Specifications</label>
                <textarea rows={2} value={formData.specification} onChange={(e) => setFormData({...formData, specification: e.target.value})} placeholder="Key specs, lining, pockets..." className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Materials</label>
                <textarea rows={2} value={formData.materials} onChange={(e) => setFormData({...formData, materials: e.target.value})} placeholder="e.g., 100% Himalayan Wool & Natural Linen..." className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Care Instructions</label>
                <textarea rows={2} value={formData.care_instructions} onChange={(e) => setFormData({...formData, care_instructions: e.target.value})} placeholder="e.g., Gentle spot clean, dry flat..." className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Dimensions / Size</label>
                <input type="text" value={formData.dimensions} onChange={(e) => setFormData({...formData, dimensions: e.target.value})} placeholder="e.g., 40 cm x 40 cm" className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70">
                  Multiple Image Gallery ({formData.gallery.length})
                </label>
                <button 
                  type="button" 
                  onClick={handleAddGalleryUrl}
                  className="text-xs text-[#987C6F] hover:text-[#5D4E46] font-bold underline"
                >
                  + Add by URL
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {formData.gallery.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-[#5D4E46]/20 group">
                    <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveGalleryImage(idx)} 
                      className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 p-1.5 rounded-full shadow-md transition-colors"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-[#5D4E46]/30 rounded-xl bg-[#FDFBF7] hover:bg-gray-50 cursor-pointer transition-colors group">
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    accept="image/*" 
                    disabled={uploadingGallery}
                    onChange={handleGalleryUpload} 
                  />
                  {uploadingGallery ? (
                    <Loader2 size={22} className="animate-spin text-[#987C6F]" />
                  ) : (
                    <>
                      <Plus className="text-[#987C6F] group-hover:scale-110 transition-transform mb-1" size={24} />
                      <span className="text-[11px] font-bold text-[#5D4E46]/70">Upload More</span>
                    </>
                  )}
                </label>
              </div>
              <p className="text-xs text-[#5D4E46]/60">
                Upload multiple images or paste URLs to display an interactive image gallery slider on the product page.
              </p>
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
