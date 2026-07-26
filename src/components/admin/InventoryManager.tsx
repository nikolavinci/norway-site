'use client';

import { useState, useEffect } from 'react';
import { Product, getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } from '../../shared/utils/products';
import { Edit2, Trash2, Plus, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function InventoryManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: '',
    image: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        stock: product.stock.toString(),
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', category: '', description: '', stock: '', image: '' });
    }
    setFile(null);
    setError(null);
    setIsModalOpen(true);
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
        price: parseFloat(formData.price),
        category: formData.category,
        description: formData.description,
        stock: parseInt(formData.stock, 10),
        image: imageUrl
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productPayload);
      } else {
        await createProduct(productPayload);
      }

      setIsModalOpen(false);
      loadProducts();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Inventory Management</h2>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#987C6F] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#7d665b] transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#5D4E46]/10 overflow-hidden">
        <table className="w-full text-left text-sm text-[#5D4E46]">
          <thead className="bg-[#FDFBF7] text-xs uppercase font-bold text-[#5D4E46]/60 tracking-wider">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#5D4E46]/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-[#FDFBF7]/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={product.image || '/placeholder.png'} alt={product.name} fill className="object-cover" unoptimized />
                  </div>
                  <span className="font-bold">{product.name}</span>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4 font-medium">{product.price} NOK</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'bg-[#AAB084]/20 text-[#6B724D]' : 'bg-red-50 text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openModal(product)} className="text-[#987C6F] hover:text-[#5D4E46] p-2 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors ml-2">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#5D4E46]/10 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-[#5D4E46]">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Product Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F]" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Price (NOK)</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F]" />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Stock</label>
                  <input required type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F]" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Category</label>
                  <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F]" placeholder="e.g., Bags, Home Decor" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Description</label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F]"></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5D4E46]/70 mb-2">Product Image</label>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                      <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#5D4E46]/30 rounded-xl bg-[#FDFBF7] hover:bg-gray-50 cursor-pointer transition-colors">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                        <div className="text-center">
                          <ImageIcon className="mx-auto text-[#987C6F] mb-2" size={24} />
                          <span className="text-sm font-medium text-[#5D4E46]">{file ? file.name : 'Click to upload image'}</span>
                        </div>
                      </label>
                    </div>
                    <div className="text-center text-xs font-bold text-gray-400">OR</div>
                    <div className="flex-1 w-full">
                      <input type="text" placeholder="Paste image URL..." value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-[#FDFBF7] border border-[#5D4E46]/20 rounded-xl outline-none focus:border-[#987C6F] h-[76px]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#5D4E46]/10 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-[#5D4E46]/70 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-[#5D4E46] text-white font-bold rounded-xl hover:bg-[#3A3532] transition-colors disabled:opacity-70 flex items-center gap-2">
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
