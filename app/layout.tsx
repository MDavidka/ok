import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Global styles are imported via app/globals.css, no explicit import here for Next.js App Router
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/lib/types"; // Assuming SiteConfig is defined in lib/types
import { ThemeProvider } from "@/components/theme-provider"; // Custom ThemeProvider for next-themes
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Placeholder for site configuration. In a real application, this would typically
// be in a separate file like `config/site.ts` and imported.
const siteConfig: SiteConfig = {
  name: "Phone Store",
  description: "Your one-stop shop for the latest smartphones.",
  url: "https://phonestore.com",
  ogImage: "https://placehold.co/1200x630.png?text=Phone+Store",
  links: {
    twitter: "https://twitter.com/phonestore",
    github: "https://github.com/phonestore",
  },
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.links.twitter,
  },
  icons: {
    icon: "/favicon.ico", // Assuming favicon.ico is in the public directory
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Placeholder for Header component */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">{siteConfig.name}</span>
              </Link>
              <nav className="flex items-center space-x-4 lg:space-x-6">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>

          {/* Placeholder for Footer component */}
          <footer className="py-6 md:px-8 md:py-0 border-t">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by{" "}
                <Link
                  href={siteConfig.links.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Your Company
                </Link>
                . The source code is available on{" "}
                <Link
                  href={siteConfig.links.github || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </Link>
                .
              </p>
              <nav className="flex items-center space-x-4 lg:space-x-6">
                {siteConfig.footerNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {item.title}