'use client';

import { useState, useEffect } from 'react';
import { Product, getProducts, deleteProduct } from '@/shared/utils/products';
import { Edit2, Trash2, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
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
        <Link 
          href="/dashboard/products/add"
          className="flex items-center gap-2 bg-[#987C6F] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#7d665b] transition-colors"
        >
          <Plus size={16} /> Add Product
        </Link>
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
                  <Link href={`/dashboard/products/edit/${product.id}`} className="text-[#987C6F] hover:text-[#5D4E46] p-2 transition-colors inline-block">
                    <Edit2 size={16} />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors ml-2">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  No products found. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
