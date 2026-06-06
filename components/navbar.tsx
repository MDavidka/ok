"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Code2, Menu, Terminal, Calculator, MessageSquare, Sparkles, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Code Snippets', href: '/snippets', icon: Code2 },
    { name: 'API Tester', href: '/api-tester', icon: Terminal },
    { name: 'Cost Estimator', href: '/estimator', icon: Calculator },
    { name: 'Contact Us', href: '/contact', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <div className="rounded-lg bg-primary text-primary-foreground p-1.5 flex items-center justify-center">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            DevSuite Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary py-1.5 px-3 rounded-md",
                  isActive 
                    ? "bg-secondary text-primary font-semibold" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/estimator">
              <Calculator className="mr-2 h-4 w-4" />
              Quick Estimate
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/api-tester">
              Test Live APIs
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <span>DevSuite Hub Menu</span>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 text-base font-medium p-3 rounded-lg transition-colors hover:bg-secondary",
                        isActive 
                          ? "bg-secondary text-primary font-bold" 
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-col gap-3 mt-4 border-t pt-6">
                <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/estimator">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculator
                  </Link>
                </Button>
                <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                  <Link href="/api-tester">
                    Launch API Tester
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
