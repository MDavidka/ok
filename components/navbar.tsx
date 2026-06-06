"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  ShoppingCart, 
  GitCompare, 
  Menu, 
  User, 
  Wrench, 
  RefreshCw, 
  HelpCircle 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const { cart, compareList } = useStore();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: "Phones", href: "/phones", icon: Smartphone },
    { label: "Compare", href: "/compare", icon: GitCompare, badge: compareList.length },
    { label: "Trade-In", href: "/trade-in", icon: RefreshCw },
    { label: "Support & Repair", href: "/support", icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Smartphone className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            Phonix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Compare Shortcut (Desktop only) */}
          <Link href="/compare" className="hidden sm:inline-block">
            <Button variant="ghost" size="icon" className="relative" title="Compare Phones">
              <GitCompare className="h-5 w-5" />
              {compareList.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                  {compareList.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Cart button */}
          <Link href="/cart">
            <Button variant="outline" className="relative flex items-center gap-2 border-primary/20 hover:border-primary">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline font-semibold text-xs">Cart</span>
              {totalCartItems > 0 && (
                <Badge className="h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" /> Phonix Menu
                </SheetTitle>
                <SheetDescription>
                  Premium smartphones & express support
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3 text-base font-medium py-6"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span>{link.label}</span>
                        {link.badge !== undefined && link.badge > 0 && (
                          <Badge className="ml-auto bg-primary text-primary-foreground">
                            {link.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
              <div className="absolute bottom-6 left-6 right-6 border-t pt-4">
                <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Welcome to Phonix</p>
                    <p className="text-[10px] text-muted-foreground">Premium Member Account</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
