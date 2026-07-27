'use client';

import { Users as UsersIcon } from 'lucide-react';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Customers</h2>
      </div>

      <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
        <UsersIcon size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
        <p className="text-lg">Customer management coming soon.</p>
        <p className="text-sm mt-1 opacity-70">You will be able to view and manage registered users here.</p>
      </div>
    </div>
  );
}
