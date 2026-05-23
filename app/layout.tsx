import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

import '../app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Phone Shop',
    template: '%s | Phone Shop',
  },
  description: 'Your one-stop shop for the latest smartphones and accessories.',
  keywords: [
    'smartphones',
    'mobile phones',
    'electronics',
    'tech',
    'phone shop',
    'buy phone',
  ],
  authors: [
    {
      name: 'shadcn', // Placeholder, replace with actual author
      url: 'https://ui.shadcn.com',
    },
  ],
  creator: 'shadcn', // Placeholder
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-phone-shop.com', // Replace with actual URL
    title: 'Phone Shop',
    description: 'Your one-stop shop for the latest smartphones and accessories.',
    siteName: 'Phone Shop',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Placeholder image for Open Graph
        width: 1200,
        height: 630,
        alt: 'Phone Shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phone Shop',
    description: 'Your one-stop shop for the latest smartphones and accessories.',
    images: ['https://placehold.co/1200x675.png'], // Placeholder image for Twitter Card
    creator: '@shadcn', // Placeholder
  },
  icons: {
    icon: '/favicon.ico', // Ensure you have a favicon.ico in your public directory
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest', // Ensure you have a webmanifest in your public directory
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
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
[/code]
[file]app/layout.tsx[/file][usedfor]root layout[/usedfor]