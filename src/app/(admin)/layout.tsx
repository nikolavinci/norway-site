import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FDFBF7] text-[#5D4E46] font-sans">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
