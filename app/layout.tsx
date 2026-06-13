import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aether Bistro | Sophisticated Wood-Fired Dining & Culinary Artistry",
  description: "Experience the pinnacle of seasonal, farm-to-table culinary art. Indulge in wood-fired signature dishes, rare sommelier selections, and luxury ambiance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-[#0a0a0c] text-stone-100 min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-amber-200`}
      >
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
        <Toaster position="bottom-right" theme="dark" closeButton />
      </body>
    </html>
  );
}
