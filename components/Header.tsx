"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
  Smartphone,
  GitCompare,
} from "lucide-react";

export function Header() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Smartphone className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Syra Mobile
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/products" className="transition-colors hover:text-foreground">
              Phones Catalog
            </Link>
            <Link href="/compare" className="flex items-center gap-1 transition-colors hover:text-foreground">
              <GitCompare className="h-4 w-4" />
              Compare Specs
            </Link>
          </nav>
        </div>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative max-w-sm w-full mx-4 items-center"
        >
          <Input
            type="search"
            placeholder="Search phones, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 w-full"
          />
          <button
            type="submit"
            className="absolute right-3 text-muted-foreground hover:text-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Compare Shortcut (Mobile/Desktop) */}
          <Button variant="ghost" size="icon" asChild className="relative" title="Compare phones">
            <Link href="/compare">
              <GitCompare className="h-5 w-5" />
            </Link>
          </Button>

          {/* Cart Drawer */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground font-bold">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
              <SheetHeader className="pb-4">
                <SheetTitle className="flex items-center gap-2 text-xl">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Your Shopping Cart
                </SheetTitle>
                <SheetDescription>
                  {itemCount === 0
                    ? "Your cart is empty."
                    : `You have ${itemCount} item(s) in your cart.`}
                </SheetDescription>
              </SheetHeader>

              <Separator />

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center space-y-3">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground font-medium">No phones added yet.</p>
                    <Button variant="outline" size="sm" onClick={() => setIsCartOpen(false)} asChild>
                      <Link href="/products">Browse Phones</Link>
                    </Button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0 border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1 text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-sm text-primary font-bold mt-0.5">
                          ${item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-6 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive h-8 w-8"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-base font-semibold">
                    <span>Subtotal:</span>
                    <span className="text-primary text-lg font-bold">
                      ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Taxes and shipping are calculated at checkout.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsCartOpen(false)}
                      asChild
                    >
                      <Link href="/cart">View Cart</Link>
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => setIsCartOpen(false)}
                      asChild
                    >
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search phones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 w-full"
            />
            <button
              type="submit"
              className="absolute right-3 text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <nav className="flex flex-col gap-3 font-medium text-sm text-muted-foreground">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-foreground"
            >
              Phones Catalog
            </Link>
            <Link
              href="/compare"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <GitCompare className="h-4 w-4" />
              Compare Specs
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
