"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPhones, phonesData } from '@/lib/data';
import { useCart } from '@/components/cart-context';
import { 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  GitCompare, 
  ShoppingCart, 
  Flame, 
  Sparkles,
  ChevronRight,
  Cpu,
  Camera,
  BatteryCharging
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const featuredPhones = getFeaturedPhones();
  const { toggleCompare, compareList, addToCart } = useCart();

  // Brands with logos or custom styled boxes
  const brands = [
    { name: 'Apple', logo: '', bg: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-200' },
    { name: 'Samsung', logo: 'SAMSUNG', bg: 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200 font-bold' },
    { name: 'Google', logo: 'Google', bg: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200' },
    { name: 'OnePlus', logo: 'ONEPLUS', bg: 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200 font-semibold' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Premium Hero Banner */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-background text-white overflow-hidden py-20 lg:py-32">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-blue-400 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> Introducing Titanium Generation
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                The Future of Mobile <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Is Here.
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">
                Experience cutting-edge AI features, revolutionary camera sensors, and blazing-fast charging speeds. Find your next premium smartphone with certified authentic manufacturer warranties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link href="/phones">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base font-semibold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20">
                    Explore Catalog <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/compare">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base font-semibold border-slate-700 hover:bg-slate-800 text-slate-200">
                    <GitCompare className="h-5 w-5" /> Compare Devices
                  </Button>
                </Link>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">4.9/5</p>
                  <p className="text-xs text-slate-400">Customer Rating</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">100%</p>
                  <p className="text-xs text-slate-400">Authentic Guarantee</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">24h</p>
                  <p className="text-xs text-slate-400">Express Shipping</p>
                </div>
              </div>
            </div>

            {/* Hero Image Collage / Showcase */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-[450px] sm:w-80 sm:h-[500px] bg-slate-800/40 rounded-[40px] p-4 border border-slate-700/60 shadow-2xl backdrop-blur-md">
                {/* Simulated Notch / Dynamic Island */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-blue-900 rounded-full absolute right-4" />
                </div>
                
                {/* Screen Content */}
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-950 flex flex-col justify-between p-6">
                  <div className="pt-8 space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">PHONEX SPECIALS</span>
                    <h3 className="text-xl font-bold text-white">iPhone 15 Pro Max</h3>
                    <p className="text-xs text-slate-400">Now starting from $1199</p>
                  </div>

                  <div className="relative w-full h-48 my-2">
                    <img 
                      src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400" 
                      alt="iPhone 15 Pro Max Hero" 
                      className="object-contain w-full h-full transform hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-blue-400" />
                        <span className="text-[11px] text-slate-300">A17 Pro Titanium</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] border-blue-500/30 text-blue-400 bg-blue-500/5">3nm Tech</Badge>
                    </div>
                    <Link href="/phones/iphone-15-pro" className="block">
                      <Button className="w-full text-xs h-9 bg-primary hover:bg-primary/95 text-white">
                        Buy Now
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Decorative glow effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[50px] -z-10 blur-xl opacity-20 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Categories Section */}
      <section className="py-12 bg-slate-50 border-y">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Shop by Brand</h2>
            <p className="text-sm text-slate-600 mt-1">Select your preferred ecosystem to view matched devices and accessories.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {brands.map((brand) => (
              <Link key={brand.name} href={`/phones?brand=${brand.name}`}>
                <div className={`p-6 rounded-xl border text-center transition-all transform hover:-translate-y-1 hover:shadow-md cursor-pointer ${brand.bg}`}>
                  <span className="block text-2xl font-bold tracking-tight mb-2">{brand.logo}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore {brand.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals & Trending Phones */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest mb-2 bg-red-50 px-2 py-0.5 rounded-full">
                <Flame className="h-3 w-3 fill-current" /> Hot Offers
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Trending Smartphones</h2>
              <p className="text-muted-foreground mt-1">Our top-rated products with verified reviews and outstanding specs.</p>
            </div>
            <Link href="/phones">
              <Button variant="outline" className="gap-1 border-primary/20 text-primary hover:bg-primary/5">
                View All Phones <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPhones.slice(0, 4).map((phone) => {
              const isComparing = compareList.includes(phone.id);
              return (
                <Card key={phone.id} className="group relative flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200">
                  {/* Tag badge (e.g. Best Seller, AI Powered) */}
                  {phone.tag && (
                    <Badge className="absolute top-3 left-3 z-10 bg-slate-900 text-white font-medium text-[10px] px-2.5 py-0.5">
                      {phone.tag}
                    </Badge>
                  )}

                  {/* Compare toggle button absolute */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCompare(phone.id);
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full border transition-all ${
                      isComparing 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
                    }`}
                    title={isComparing ? "Remove from comparison" : "Add to comparison"}
                  >
                    <GitCompare className="h-4 w-4" />
                  </button>

                  {/* Image Container */}
                  <Link href={`/phones/${phone.id}`} className="block pt-8 px-4 pb-4 bg-slate-50/50 group-hover:bg-slate-50 transition-colors">
                    <div className="relative h-48 w-full flex items-center justify-center">
                      <img 
                        src={phone.image} 
                        alt={phone.name} 
                        className="object-contain h-full max-h-44 transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <CardHeader className="p-4 pt-3 pb-2 space-y-1">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{phone.brand}</span>
                    <Link href={`/phones/${phone.id}`} className="hover:text-primary transition-colors">
                      <CardTitle className="text-base font-bold text-slate-900 truncate">
                        {phone.name}
                      </CardTitle>
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-semibold text-slate-800">{phone.rating}</span>
                      <span className="text-muted-foreground text-[11px]">({phone.reviewCount} reviews)</span>
                    </div>
                  </CardHeader>

                  {/* Specs Quick Pill */}
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded">{phone.storage[0]}</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded truncate max-w-[130px]">{phone.specs.processor.split('with')[0]}</span>
                    </div>
                  </div>

                  {/* Price and Add to Cart */}
                  <CardFooter className="p-4 pt-2 border-t flex items-center justify-between bg-slate-50/30">
                    <div className="flex flex-col">
                      {phone.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">${phone.originalPrice}</span>
                      )}
                      <span className="text-lg font-extrabold text-slate-900">${phone.price}</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart({
                        phoneId: phone.id,
                        name: phone.name,
                        brand: phone.brand,
                        price: phone.price,
                        image: phone.image,
                        color: phone.colors[0].name,
                        storage: phone.storage[0]
                      })}
                      className="gap-1.5 text-xs bg-slate-900 hover:bg-primary text-white transition-all"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Add
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step-by-Step Interactive Feature Promo: "Why Choose Phonex?" */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground mt-2">Get your hands on your dream smartphone in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border relative shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-4 left-6 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">1</span>
              <div className="mt-2 space-y-3">
                <div className="p-2 bg-blue-50 text-primary w-fit rounded-lg">
                  <GitCompare className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">Compare Specifications</h3>
                <p className="text-sm text-slate-600">
                  Select up to 3 flagship phones and see their processors, battery specs, cameras, and dimensions side-by-side using our advanced comparison matrix.
                </p>
                <Link href="/compare" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  Try Compare Tool <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border relative shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-4 left-6 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">2</span>
              <div className="mt-2 space-y-3">
                <div className="p-2 bg-blue-50 text-primary w-fit rounded-lg">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">Customize Your Device</h3>
                <p className="text-sm text-slate-600">
                  Choose your favorite color, select the required storage capacity (up to 1TB), and add custom protection plans with zero interest payment plans.
                </p>
                <Link href="/phones" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  Browse Catalog <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border relative shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-4 left-6 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">3</span>
              <div className="mt-2 space-y-3">
                <div className="p-2 bg-blue-50 text-primary w-fit rounded-lg">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">Get 2-Day Express Delivery</h3>
                <p className="text-sm text-slate-600">
                  Check out securely using card or mobile wallets. Track your order on our interactive, live timeline from packaging to your doorstep.
                </p>
                <Link href="/contact" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  View Shipping Policy <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Spec Compare Widget */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-blue-500/20">
                <Cpu className="h-3.5 w-3.5" /> Smart Comparison
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Can't Decide? <br />Compare side-by-side.</h2>
              <p className="text-slate-400 text-sm">
                Choosing a phone is a long-term commitment. Our tool compares exact details like camera megapixels, battery capacities, and physical weights to help you buy with total confidence.
              </p>
              <div className="pt-2">
                <Link href="/compare">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                    <GitCompare className="h-4 w-4" /> Open Comparison Matrix
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-base font-semibold text-slate-200 border-b border-slate-800 pb-3">Quick Specs Matchup</h3>
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div className="col-span-1" />
                <div className="font-bold text-slate-300">iPhone 15 Pro Max</div>
                <div className="font-bold text-slate-300">Galaxy S24 Ultra</div>

                <div className="text-slate-400 text-left font-medium">Main Camera</div>
                <div className="bg-slate-900 p-2 rounded text-slate-200">48 Megapixels</div>
                <div className="bg-slate-900 p-2 rounded text-blue-400 font-semibold">200 Megapixels</div>

                <div className="text-slate-400 text-left font-medium">Screen Zoom</div>
                <div className="bg-slate-900 p-2 rounded text-slate-200">5x Optical</div>
                <div className="bg-slate-900 p-2 rounded text-blue-400 font-semibold">5x & 10x Optical</div>

                <div className="text-slate-400 text-left font-medium">Processor</div>
                <div className="bg-slate-900 p-2 rounded text-blue-400 font-semibold">A17 Pro (3nm)</div>
                <div className="bg-slate-900 p-2 rounded text-slate-200">Snapdragon 8 Gen 3</div>

                <div className="text-slate-400 text-left font-medium">Battery</div>
                <div className="bg-slate-900 p-2 rounded text-slate-200">4,441 mAh</div>
                <div className="bg-slate-900 p-2 rounded text-blue-400 font-semibold">5,000 mAh</div>
              </div>
              <p className="text-[11px] text-center text-slate-500 italic">Specs verified directly from Apple and Samsung official datasheets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">What Our Customers Say</h2>
            <p className="text-muted-foreground mt-2">Read genuine reviews from verified purchases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-sm text-slate-700 italic mb-4">
                "I was skeptical about buying a high-end phone online, but Phonex exceeded my expectations. The phone arrived in 24 hours, perfectly sealed, and with a free screen protector. The comparison tool was incredibly useful!"
              </p>
              <div>
                <p className="font-bold text-sm text-slate-900">Michael S.</p>
                <p className="text-xs text-muted-foreground">Verified Purchase (iPhone 15 Pro Max)</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-sm text-slate-700 italic mb-4">
                "The 100W charging on the OnePlus 12 is a literal life saver. Phonex had the best pricing on the web and checkout took less than 2 minutes. Outstanding service!"
              </p>
              <div>
                <p className="font-bold text-sm text-slate-900">Jessica K.</p>
                <p className="text-xs text-muted-foreground">Verified Purchase (OnePlus 12)</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4.5 w-4.5 text-slate-300" />
              </div>
              <p className="text-sm text-slate-700 italic mb-4">
                "Phenomenal camera quality on the Pixel 8 Pro. Phonex's interactive checklist made it easy to choose my preferred storage. Will definitely buy my next device here."
              </p>
              <div>
                <p className="font-bold text-sm text-slate-900">Ryan L.</p>
                <p className="text-xs text-muted-foreground">Verified Purchase (Pixel 8 Pro)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Ready to Upgrade Your Phone?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get an instant $50 coupon code on any premium smartphone purchase today. Enter email below or explore our full catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/phones">
              <Button size="lg" className="bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 shadow-lg">
                View All Phones
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-8">
                Contact Sales Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
