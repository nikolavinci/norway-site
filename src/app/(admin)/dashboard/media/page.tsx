'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/shared/utils/supabase';
import { uploadProductImage } from '@/shared/utils/products';
import { Loader2, Trash2, UploadCloud, ImageIcon, Copy } from 'lucide-react';
import Image from 'next/image';
import localMedia from '@/shared/utils/localMedia.json';

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    
    // Fetch from both 'products' and 'media' buckets
    const [productsRes, mediaRes] = await Promise.all([
      supabase.storage.from('products').list(''),
      supabase.storage.from('media').list('')
    ]);
    
    let allFiles: any[] = [];

    if (productsRes.data && !productsRes.error) {
      const valid = productsRes.data.filter(f => f.name !== '.emptyFolderPlaceholder' && f.metadata);
      allFiles = [...allFiles, ...valid.map(f => {
        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(f.name);
        return { ...f, url: publicUrl, bucket: 'products' };
      })];
    }

    if (mediaRes.data && !mediaRes.error) {
      const valid = mediaRes.data.filter(f => f.name !== '.emptyFolderPlaceholder' && f.metadata);
      allFiles = [...allFiles, ...valid.map(f => {
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(f.name);
        return { ...f, url: publicUrl, bucket: 'media' };
      })];
    }
    
    // Add local media
    allFiles = [...allFiles, ...localMedia];
    
    allFiles.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    setFiles(allFiles);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error } = await supabase.storage.from('media').upload(fileName, file);
      if (error) throw error;
      
      await loadFiles();
    } catch (err) {
      console.error(err);
      alert('Failed to upload image.');
    }
    setUploading(false);
  };

  const handleDelete = async (fileName: string, bucket: string = 'media') => {
    if (bucket === 'local') {
      alert('Local website media cannot be deleted from the dashboard.');
      return;
    }
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await supabase.storage.from(bucket).remove([fileName]);
      await loadFiles();
    } catch (err) {
      console.error(err);
      alert('Failed to delete image.');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Media Library</h2>
        
        <label className="flex items-center gap-2 bg-[#987C6F] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#7d665b] transition-colors cursor-pointer disabled:opacity-50">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5 p-8 min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-[#987C6F]" size={32} /></div>
        ) : files.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-[#5D4E46]/50">
            <ImageIcon size={48} className="mb-4 opacity-40 text-[#987C6F]" />
            <p className="text-lg">No media files found.</p>
            <p className="text-sm mt-1 opacity-70">Upload your first image to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {files.map((file) => (
              <div key={file.id} className="group relative rounded-xl border border-[#5D4E46]/10 overflow-hidden bg-[#FDFBF7] aspect-square flex flex-col hover:shadow-md transition-all">
                <div className="relative flex-1 bg-gray-100">
                  <Image src={file.url} alt={file.name} fill className="object-cover" />
                </div>
                <div className="p-2 text-xs truncate border-t border-[#5D4E46]/10 bg-white font-medium text-[#5D4E46]/80">
                  {file.name}
                </div>
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => handleCopyUrl(file.url)}
                    className="p-2 bg-white text-[#5D4E46] rounded-full hover:bg-gray-100 transition-colors"
                    title="Copy URL"
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(file.name, file.bucket)}
                    className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
