'use client';

import { useState, useEffect } from 'react';
import { getProductById, updateProduct, uploadProductImage } from '@/shared/utils/products';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, Image as ImageIcon, ArrowLeft, Settings2, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
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
    meta_description: '',
    materials: '',
    care_instructions: '',
    dimensions: '',
    gallery: [] as string[]
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const p = await getProductById(id as string);
        if (p) {
          setFormData({
            name: p.name,
            price: p.price.toString(),
            category: p.category,
            description: p.description,
            stock: p.stock.toString(),
            image: p.image,
            meta_title: p.meta_title || '',
            meta_description: p.meta_description || '',
            materials: p.materials || '',
            care_instructions: p.care_instructions || '',
            dimensions: p.dimensions || '',
            gallery: p.gallery || []
          });
        }
      } catch (err) {
        console.error("Failed to load product", err);
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

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
        meta_description: formData.meta_description,
        materials: formData.materials,
        care_instructions: formData.care_instructions,
        dimensions: formData.dimensions,
        gallery: formData.gallery
      };

      await updateProduct(id as string, productPayload);
      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the product.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link href="/dashboard/products" className="inline-flex items-center gap-2 text-[#987C6F] font-bold text-sm mb-6 hover:text-[#5D4E46] transition-colors">
        <ArrowLeft size={16} /> Back to Products
      </Link>
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#5D4E46]">Edit Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
            <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Basic Information</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Product Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Description</label>
              <textarea required rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Price (NOK)</label>
                <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Stock Quantity</label>
                <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Organization</h3>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Category</label>
                <div className="flex gap-2">
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors">
                    <option value="">Select a category</option>
                    <option value="Bags">Bags</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Decor">Decor</option>
                    {formData.category && !['Bags', 'Accessories', 'Decor', ''].includes(formData.category) && (
                      <option value={formData.category}>{formData.category}</option>
                    )}
                  </select>
                  <button type="button" onClick={() => {
                    const newCat = prompt("Enter new category name:");
                    if (newCat) setFormData({...formData, category: newCat});
                  }} className="px-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl hover:bg-gray-50 font-bold" title="Add New Category">+</button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4E46]/5">
              <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Product Image</h3>
              <div className="flex flex-col gap-4">
                {formData.image || file ? (
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border border-[#5D4E46]/20">
                    <img src={file ? URL.createObjectURL(file) : formData.image} alt="Product" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setFile(null); setFormData({...formData, image: ''}) }} className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50">
                      <span className="text-xs font-bold px-2">Remove</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-[#5D4E46]/30 rounded-xl bg-[#FDFBF7] hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                    <ImageIcon className="text-[#987C6F] mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-sm font-bold text-[#5D4E46] text-center">Upload Image</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
          <h3 className="text-lg font-bold text-[#5D4E46] border-b border-[#5D4E46]/10 pb-4 mb-6">Product Details & Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Materials</label>
                <textarea rows={2} value={formData.materials} onChange={(e) => setFormData({...formData, materials: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Care Instructions</label>
                <textarea rows={2} value={formData.care_instructions} onChange={(e) => setFormData({...formData, care_instructions: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Dimensions / Size</label>
                <input type="text" value={formData.dimensions} onChange={(e) => setFormData({...formData, dimensions: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Image Gallery</label>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.gallery.map((url, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-[#5D4E46]/20">
                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setFormData({...formData, gallery: formData.gallery.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow-md hover:bg-red-50">
                      <span className="text-xs font-bold px-1">X</span>
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-[#5D4E46]/30 rounded-xl bg-[#FDFBF7] hover:bg-gray-50 cursor-pointer transition-colors">
                  <input type="file" multiple className="hidden" accept="image/*" onChange={async (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const files = Array.from(e.target.files);
                      try {
                        const { supabase } = await import('@/shared/utils/supabase');
                        const newUrls = await Promise.all(files.map(async (f) => {
                          const fileExt = f.name.split('.').pop();
                          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                          await supabase.storage.from('products').upload(fileName, f);
                          const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
                          return publicUrl;
                        }));
                        setFormData(prev => ({...prev, gallery: [...prev.gallery, ...newUrls]}));
                      } catch(err) {
                        alert('Failed to upload images');
                      }
                    }
                  }} />
                  <span className="text-2xl font-bold text-[#5D4E46]/60">+</span>
                </label>
              </div>
              <p className="text-xs text-gray-400">Upload multiple images to display in the product page gallery.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#5D4E46]/5">
          <div className="flex items-center gap-2 mb-6 border-b border-[#5D4E46]/10 pb-4">
            <Settings2 className="text-[#987C6F]" size={20} />
            <h3 className="text-lg font-bold text-[#5D4E46]">Search Engine Optimization</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Meta Title</label>
              <input type="text" value={formData.meta_title} onChange={(e) => setFormData({...formData, meta_title: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Meta Description</label>
              <textarea rows={3} value={formData.meta_description} onChange={(e) => setFormData({...formData, meta_description: e.target.value})} className="w-full p-4 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] transition-colors"></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-[#5D4E46] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#3A3532] transition-colors disabled:opacity-70 flex items-center gap-3 shadow-lg shadow-[#5D4E46]/20">
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
