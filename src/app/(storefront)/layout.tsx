import Header from '@/components/Header';
import dynamic from 'next/dynamic';
const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false });
import Footer from '@/components/Footer';

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
