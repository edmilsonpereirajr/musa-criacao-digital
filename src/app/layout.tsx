import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: {
    default: "Musa Criação Digital",
    template: "%s | Musa Criação Digital",
  },
  description:
    "Produtos digitais para facilitar sua criação, inspiração e resultados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#f0ebe1] text-[#151515]">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}