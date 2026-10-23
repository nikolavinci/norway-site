'use client';

import { Suspense } from 'react';
import EditProductClient from './[id]/EditProductClient';
import { Loader2 } from 'lucide-react';

function EditProductFallback() {
  return (
    <div className="flex justify-center p-12">
      <Loader2 className="animate-spin text-[#987C6F]" size={32} />
    </div>
  );
}

export default function EditProductGeneralPage() {
  return (
    <Suspense fallback={<EditProductFallback />}>
      <EditProductClient />
    </Suspense>
  );
}
