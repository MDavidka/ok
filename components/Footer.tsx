"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="container px-4 py-12 md:py-16 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-white">
                Syra Mobile
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Experience the future in your hand. We offer the finest selection of premium flagships, budget-friendly performers, and professional gaming & camera phones.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>100 Innovation Way, Suite 400, Tech City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+1 (800) 555-TECH</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@syramobile.com</span>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Shop Categories</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/products?category=flagship" className="hover:text-primary transition-colors">
                  Flagship Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=gaming" className="hover:text-primary transition-colors">
                  Pro Gaming Phones
                </Link>
              </li>
              <li>
                <Link href="/products?category=camera" className="hover:text-primary transition-colors">
                  Camera-Focused Phones
                </Link>
              </li>
              <li>
                <Link href="/products?category=budget" className="hover:text-primary transition-colors">
                  Budget Friendly Deals
                </Link>
              </li>
              <li>
                <Link href="/products?sale=true" className="hover:text-primary transition-colors text-amber-400">
                  Special Promotions & Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Customer Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  Spec Comparison Tool
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition-colors">
                  Your Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-primary transition-colors">
                  Secure Checkout
                </Link>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-60">Track Order (Coming Soon)</span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-60">Return Policy</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white">Stay Updated</h3>
            <p className="text-sm text-slate-400">
              Subscribe to get notified about exclusive price drops, new arrivals, and technical reviews.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus-visible:ring-primary focus-visible:ring-offset-0"
                  required
                />
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "..." : <Send className="h-4 w-4" />}
                </Button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs mt-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-400 text-xs mt-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{message}</span>
                </div>
              )}
            </form>
            <p className="text-[11px] text-slate-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Syra Mobile Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
