import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pust Atelier | Authentic Bohemian Handcrafts",
  description: "Discover our curated collection of handcrafted bohemian accessories, home textiles, and sustainably made goods.",
};

import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFCF8]">
        <Header />
        <CartDrawer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
