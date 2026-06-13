"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Flame, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "/menu" },
  { label: "Book a Table", href: "/reservations" },
  { label: "Our Story", href: "/about" },
  { label: "Contact & Events", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-[#0a0a0c]/85 backdrop-blur-md border-amber-500/10 py-3 shadow-lg shadow-black/40"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[1px]">
              <div className="flex items-center justify-center w-full h-full bg-[#0a0a0c] rounded-full transition-colors group-hover:bg-[#121215]">
                <Flame className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-widest uppercase font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                AETHER
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500/80 font-semibold -mt-1">
                BISTRO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-amber-400",
                    isActive ? "text-amber-400" : "text-stone-300"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Booking CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/reservations">
              <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold tracking-wide shadow-md shadow-amber-500/10 transition-all duration-300 scale-100 hover:scale-[1.03]">
                <Calendar className="mr-2 h-4 w-4 text-stone-950" />
                Reserve Table
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-stone-200 hover:text-amber-400 hover:bg-stone-900/50"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0e0e11] border-l border-stone-800 text-stone-100 p-6 flex flex-col justify-between w-80"
              >
                <div className="space-y-6 mt-8">
                  <div className="flex items-center space-x-2 border-b border-stone-800 pb-4">
                    <Flame className="h-5 w-5 text-amber-500" />
                    <span className="font-serif text-lg tracking-widest uppercase font-bold">
                      AETHER
                    </span>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-base font-medium tracking-wide py-2 border-b border-stone-900 transition-colors",
                            isActive
                              ? "text-amber-400 border-amber-500/20"
                              : "text-stone-300 hover:text-amber-400"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-4 border-t border-stone-800 pt-6">
                  <div className="flex items-center gap-2 text-stone-400 text-xs">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>Michelin Recommended 2024</span>
                  </div>
                  <Link href="/reservations" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-semibold py-5">
                      <Calendar className="mr-2 h-4.5 w-4.5" />
                      Reserve A Table
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
