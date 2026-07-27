'use client';

import { CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-[#5D4E46]">Payments & Orders</h2>
      </div>

      <div className="p-12 text-center text-[#5D4E46]/50 bg-white rounded-2xl shadow-sm border border-[#5D4E46]/5">
        <CreditCard size={48} className="mx-auto mb-6 opacity-40 text-[#987C6F]" />
        <p className="text-lg">Payment integrations and order tracking coming soon.</p>
        <p className="text-sm mt-1 opacity-70">Connect with Stripe to manage payments here.</p>
      </div>
    </div>
  );
}
