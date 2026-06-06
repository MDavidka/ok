"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PHONES } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Smartphone, 
  Zap, 
  ShieldAlert, 
  Star, 
  ArrowUpRight, 
  RefreshCcw, 
  HeartHandshake 
} from "lucide-react";

export default function HomePage() {
  const featuredPhones = PHONES.filter((p) => p.isFeatured).slice(0, 3);
  const hotDeals = PHONES.filter((p) => p.isDeal).slice(0, 3);

  const [activeTab, setActiveTab] = useState<"featured" | "deals">("featured");

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 via-background to-background pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                <Zap className="h-3.5 w-3.5 fill-current text-amber-500" />
                <span>Special Launch Offer: Up to $650 Trade-In Discount</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                The Smartest Way to <br />
                <span className="bg-gradient-to-r from-primary via-slate-700 to-indigo-600 bg-clip-text text-transparent">
                  Upgrade Your Phone
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover the latest flagship devices from Apple, Samsung, Google, and OnePlus. Benefit from zero-interest financing, instant trade-in credits, and 2-year warrantied support.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/phones">
                  <Button size="lg" className="h-12 px-6 text-sm font-semibold gap-2 shadow-lg hover:shadow-primary/20">
                    <span>Shop Flagships</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/trade-in">
                  <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-semibold gap-2 border-primary/20 hover:bg-muted/50">
                    <RefreshCw className="h-4 w-4 text-primary" />
                    <span>Instant Trade-In Value</span>
                  </Button>
                </Link>
              </div>

              {/* Stats badges */}
              <div className="pt-8 border-t border-muted/60 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">15k+</p>
                  <p className="text-xs text-muted-foreground mt-1">Phones Sold</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">4.9★</p>
                  <p className="text-xs text-muted-foreground mt-1">Customer Rating</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">15 Min</p>
                  <p className="text-xs text-muted-foreground mt-1">Express Repairs</p>
                </div>
              </div>
            </div>

            {/* Hero Image / Visual Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
              <div className="relative mx-auto max-w-[320px] lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden border border-muted/80 shadow-2xl bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
                    alt="Premium phones mockup"
                    className="w-full object-cover aspect-[4/5] object-center"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-xl border shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Featured Device</p>
                      <p className="text-sm font-bold">iPhone 15 Pro Max</p>
                    </div>
                    <Link href="/phones/iphone-15-pro-max">
                      <Button size="sm" className="h-8 w-8 p-0 rounded-full">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Brands Grid */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Shop by Brand</h2>
          <p className="text-sm text-muted-foreground">Get specialized specs, curated accessories, and certified warranty protection.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Apple", logo: "🍎", desc: "iOS Powerhouses", color: "hover:border-slate-900 hover:bg-slate-50/50" },
            { name: "Samsung", logo: "🌌", desc: "Galaxy Flagships", color: "hover:border-blue-500 hover:bg-blue-50/10" },
            { name: "Google", logo: "🤖", desc: "Pixel AI Masterpieces", color: "hover:border-emerald-500 hover:bg-emerald-50/10" },
            { name: "OnePlus", logo: "⚡", desc: "SUPERVOOC Speed", color: "hover:border-red-500 hover:bg-red-50/10" },
          ].map((brand) => (
            <Link key={brand.name} href={`/phones?brand=${brand.name}`}>
              <div className={`p-6 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${brand.color} group`}>
                <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-200">{brand.logo}</span>
                <h3 className="font-bold text-base">{brand.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{brand.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Hot Deals & Featured Products */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Smartphones</h2>
            <p className="text-sm text-muted-foreground">Selected premium options with top ratings.</p>
          </div>
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            <Button
              size="sm"
              variant={activeTab === "featured" ? "default" : "ghost"}
              onClick={() => setActiveTab("featured")}
              className="text-xs font-semibold"
            >
              Popular Flagships
            </Button>
            <Button
              size="sm"
              variant={activeTab === "deals" ? "default" : "ghost"}
              onClick={() => setActiveTab("deals")}
              className="text-xs font-semibold"
            >
              Limited Deals
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "featured"
            ? featuredPhones.map((phone) => (
                <div key={phone.id}>
                  <PhoneCard phone={phone} />
                </div>
              ))
            : hotDeals.map((phone) => (
                <div key={phone.id}>
                  <PhoneCard phone={phone} />
                </div>
              ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/phones">
            <Button variant="outline" className="gap-2">
              <span>View Entire Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. Interactive Trade-In Promo Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 lg:p-16 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative max-w-3xl space-y-6">
            <Badge className="bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold px-3 py-1 text-xs">
              EASY RECYCLING PROGRAM
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Trade in your old phone for instant credit.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Don&apos;t let your old device collect dust. Enter your phone brand, model, and current condition to get an instant digital estimate. Apply it directly as a discount code at checkout!
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/trade-in">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 font-semibold gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-slate-950" />
                  <span>Get Your Estimate Now</span>
                </Button>
              </Link>
              <Link href="/support">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-semibold">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews / Testimonials Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Loved by Thousands</h2>
          <p className="text-sm text-muted-foreground">Read real reviews from certified Phonix buyers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Marcus Aurelius",
              role: "Tech Enthusiast",
              rating: 5,
              text: "Unbelievable service. I traded in my old iPhone 13 Pro Max and got a brand new S24 Ultra. The checkout was seamless and the phone arrived in 24 hours. Phenomenal stuff!",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            },
            {
              name: "Amara Okoye",
              role: "Freelance Designer",
              rating: 5,
              text: "Phonix's repair booking system saved my life! My screen shattered on Tuesday, I booked an appointment online, and they fixed it at their hub in under 20 minutes. Highly recommended.",
              avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
            },
            {
              name: "Jonathan Vance",
              role: "Software Developer",
              rating: 5,
              text: "The comparison tool is brilliant. I was split between the OnePlus 12 and the Pixel 8 Pro. Being able to compare the camera array and battery side-by-side helped me choose the OnePlus. 10/10.",
              avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
            }
          ].map((testimonial) => (
            <div key={testimonial.name} className="p-6 rounded-2xl border bg-card hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-muted/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-sm text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
