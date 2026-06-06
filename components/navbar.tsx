"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './cart-context';
import { 
  Smartphone, 
  ShoppingCart, 
  GitCompare, 
  Menu, 
  X, 
  Search, 
  PhoneCall, 
  Sparkles,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { getCartCount, compareList } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/phones', label: 'Phones' },
    { href: '/compare', label: 'Compare' },
    { href: '/contact', label: 'Support & FAQ' },
  ];

  const cartCount = getCartCount();
  const compareCount = compareList.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center">
              <Smartphone className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              PHONEX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1",
                    isActive 
                      ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full" 
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Compare Shortcut */}
            <Link href="/compare">
              <Button variant="ghost" size="icon" className="relative" title="Compare Phones">
                <GitCompare className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                {compareCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-blue-600 animate-pulse">
                    {compareCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative gap-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                <ShoppingCart className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline font-medium text-xs">Cart</span>
                {cartCount > 0 ? (
                  <Badge className="h-5 min-w-5 px-1 flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                    {cartCount}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-xs font-semibold">0</span>
                )}
              </Button>
            </Link>

            {/* Support Hotline / Contact Link */}
            <div className="hidden lg:flex items-center space-x-1 text-xs text-muted-foreground border-l pl-4">
              <PhoneCall className="h-3.5 w-3.5 text-green-600 animate-bounce" />
              <div>
                <p className="font-semibold text-foreground">1-800-PHONEX</p>
                <p className="text-[10px]">24/7 Expert Help</p>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" /> PHONEX Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "text-lg font-medium p-2 rounded-md hover:bg-accent transition-colors",
                          isActive ? "text-primary bg-primary/5 font-semibold" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="pt-4 border-t mt-4 flex flex-col space-y-3">
                    <div className="flex justify-between items-center px-2 py-1 text-sm">
                      <span className="text-muted-foreground">Compare list:</span>
                      <Badge variant="secondary">{compareCount} phones</Badge>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1 text-sm">
                      <span className="text-muted-foreground">Cart items:</span>
                      <Badge variant="secondary">{cartCount} items</Badge>
                    </div>
                    <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="w-full">
                      <Button className="w-full gap-2">
                        <ShoppingCart className="h-4 w-4" /> Go to Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
