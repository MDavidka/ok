"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Smartphone, 
  Mail, 
  Send, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubscribed(true);
    setLoading(false);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000); // reset status after 5s
  };

  return (
    <footer className="bg-slate-900 text-slate-100 border-t">
      {/* Trust Badges */}
      <div className="border-b border-slate-800 bg-slate-950/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Truck className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Free Express Shipping</h4>
                <p className="text-sm text-slate-400">On all orders over $499 with delivery within 2 days.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <ShieldCheck className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">2-Year Warranty</h4>
                <p className="text-sm text-slate-400">Full manufacturer warranty + optional protection plans.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <RotateCcw className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">30-Day Easy Returns</h4>
                <p className="text-sm text-slate-400">No questions asked return policy with prepaid shipping label.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand and Newsletter */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg tracking-wider text-white">PHONEX</span>
            </Link>
            <p className="text-sm text-slate-400">
              Your premium destination for the latest smartphones, verified original specs, and exceptional customer service.
            </p>
            <div className="space-y-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Subscribe for Deals</h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-primary focus-visible:ring-offset-0 h-9 text-xs"
                />
                <Button type="submit" disabled={loading} size="sm" className="h-9 px-3">
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : subscribed ? (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 animate-fadeIn">Subscribed! Check your inbox for 10% off your first order.</p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop Brands</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/phones?brand=Apple" className="hover:text-primary transition-colors">Apple iPhones</Link></li>
              <li><Link href="/phones?brand=Samsung" className="hover:text-primary transition-colors">Samsung Galaxy</Link></li>
              <li><Link href="/phones?brand=Google" className="hover:text-primary transition-colors">Google Pixel</Link></li>
              <li><Link href="/phones?brand=OnePlus" className="hover:text-primary transition-colors">OnePlus Flagships</Link></li>
              <li><Link href="/phones" className="hover:text-primary transition-colors font-medium text-slate-300">View All Catalog →</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Help Center & FAQs</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors">Compare Devices</Link></li>
              <li><Link href="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Store Locations</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Phonex flagship store</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <span>742 Evergreen Terrace, Tech District, CA 94016</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>1-800-PHONEX (746-639)</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 9:00 PM</p>
                  <p>Sat - Sun: 10:00 AM - 7:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Phonex Inc. All rights reserved. Made for premium gadget enthusiasts.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">We Accept:</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] text-slate-300 tracking-wider">VISA</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] text-slate-300 tracking-wider">MASTERCARD</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] text-slate-300 tracking-wider">APPLE PAY</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-[10px] text-slate-300 tracking-wider">GOOGLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
