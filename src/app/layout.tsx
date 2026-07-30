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

import Analytics from "../components/Analytics";

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
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://cdn2.blanxer.com" />
        <Analytics />
      </head>
      <body className="min-h-full flex flex-col bg-[#FDFCF8]">
        {children}
      </body>
    </html>
  );
}
