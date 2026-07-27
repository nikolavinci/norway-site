import Header from "../../components/Header";
import CartDrawer from "../../components/CartDrawer";
import Footer from "../../components/Footer";

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
