"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Smartphone, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("Welcome aboard! You have successfully subscribed to Phonix alerts.");
    setEmail("");
  };

  return (
    <footer className="border-t bg-muted/30">
      {/* Top Value Props Banner */}
      <div className="border-b bg-background py-8">
        <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-muted-foreground mt-1">On all orders over $150. Arrives in 1-3 business days.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">2-Year Full Warranty</h4>
              <p className="text-xs text-muted-foreground mt-1">Guaranteed protection against manufacturer faults.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">30-Day Money Back</h4>
              <p className="text-xs text-muted-foreground mt-1">No-hassle returns in original packaging. Risk free.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Smartphone className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Phonix</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Phonix is the ultimate hub for premium smartphones, express professional repair services, and the smartest trade-in deals on the market.
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>100 Innovation Way, Suite 400, NY</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>+1 (800) 555-PHONIX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>support@phonix-store.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground mb-4">Shop Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/phones?brand=Apple" className="text-muted-foreground hover:text-primary transition-colors">
                  Apple iPhones
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Samsung" className="text-muted-foreground hover:text-primary transition-colors">
                  Samsung Galaxy
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Google" className="text-muted-foreground hover:text-primary transition-colors">
                  Google Pixel Series
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=OnePlus" className="text-muted-foreground hover:text-primary transition-colors">
                  OnePlus Flagships
                </Link>
              </li>
              <li>
                <Link href="/phones" className="text-muted-foreground hover:text-primary transition-colors">
                  All Smartphones
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Resources */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground mb-4">Services & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/trade-in" className="text-muted-foreground hover:text-primary transition-colors">
                  Trade-In Estimator
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Book a Repair
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-primary transition-colors">
                  Device Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/support#faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                  Shopping Cart & Promo Codes
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to get exclusive early-access deals, trade-in bonus promotions, and technology news.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs">
                <Check className="h-4 w-4 shrink-0" />
                <span>You are on the list! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background text-xs"
                  required
                />
                <Button type="submit" size="sm" className="shrink-0 flex items-center gap-1">
                  <Send className="h-3 w-3" />
                  <span>Join</span>
                </Button>
              </form>
            )}
            <p className="text-[10px] text-muted-foreground">
              By subscribing, you agree to receive promotional emails. Opt-out at any time.
            </p>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Phonix Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
