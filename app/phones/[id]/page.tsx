"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { getPhoneById, phonesData, Review } from '@/lib/data';
import { useCart } from '@/components/cart-context';
import { 
  Star, 
  ShoppingCart, 
  GitCompare, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Cpu, 
  Camera, 
  Battery, 
  Maximize2, 
  Layers, 
  FileText,
  MessageSquare,
  ThumbsUp,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function PhoneDetailsPage() {
  const params = useParams();
  const phoneId = params.id as string;
  const phone = getPhoneById(phoneId);

  if (!phone) {
    notFound();
  }

  const { addToCart, toggleCompare, compareList } = useCart();

  // Active configurations
  const [selectedColor, setSelectedColor] = useState(phone.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(phone.storage[0]);
  const [activeImage, setActiveImage] = useState(phone.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'warranty'>('specs');

  // Local reviews list (allows adding new review live)
  const [reviewsList, setReviewsList] = useState<Review[]>(phone.reviews);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync active image if phone changes
  useEffect(() => {
    setActiveImage(phone.image);
    setSelectedColor(phone.colors[0]);
    setSelectedStorage(phone.storage[0]);
    setReviewsList(phone.reviews);
  }, [phone]);

  // Storage pricing premium calculation
  // E.g. base storage is 128GB or 256GB. Each step up adds $100
  const getStoragePremium = (storageStr: string) => {
    const baseIndex = phone.storage.indexOf(phone.storage[0]);
    const currentIndex = phone.storage.indexOf(storageStr);
    return (currentIndex - baseIndex) * 100;
  };

  const currentPrice = phone.price + getStoragePremium(selectedStorage);
  const isComparing = compareList.includes(phone.id);

  // Handle submit review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newReview: Review = {
      id: `new-review-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment
    };

    setReviewsList(prev => [newReview, ...prev]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  // Related phones
  const relatedPhones = phonesData
    .filter(p => p.brand === phone.brand && p.id !== phone.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/phones" className="hover:text-primary">Phones</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{phone.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border rounded-2xl bg-slate-50/50 p-8 flex items-center justify-center relative aspect-square overflow-hidden">
            <img 
              src={activeImage} 
              alt={phone.name} 
              className="object-contain max-h-[380px] w-auto transition-transform duration-300 hover:scale-105"
            />
            {phone.tag && (
              <Badge className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 font-semibold">
                {phone.tag}
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {phone.images && phone.images.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {phone.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-xl p-2 bg-slate-50 flex items-center justify-center h-20 transition-all ${
                    activeImage === img ? 'ring-2 ring-primary border-transparent' : 'hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="object-contain h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Customizer & Purchase */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Title & Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-bold text-primary uppercase tracking-wide border-primary/20">
                {phone.brand} Authorized Dealer
              </Badge>
              <div className="flex items-center gap-1 text-yellow-500 text-xs">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="font-bold text-slate-800">{phone.rating}</span>
                <span className="text-muted-foreground">({reviewsList.length} user reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {phone.name}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">{phone.description}</p>
          </div>

          <Separator />

          {/* Price Section */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-950">${currentPrice}</span>
            {phone.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                ${phone.originalPrice + getStoragePremium(selectedStorage)}
              </span>
            )}
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-semibold text-xs ml-2">
              In Stock & Ready to Ship
            </Badge>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Color: <span className="text-slate-900 font-extrabold">{selectedColor.name}</span>
            </span>
            <div className="flex gap-3">
              {phone.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedColor.name === color.name ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-slate-300 hover:border-slate-400'
                  }`}
                  title={color.name}
                >
                  <span 
                    className="w-7 h-7 rounded-full block border shadow-inner" 
                    style={{ backgroundColor: color.hex }} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Storage Capacity Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>Select Storage Capacity:</span>
              <span className="text-slate-500 font-normal">Prices vary based on capacity</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {phone.storage.map((storage) => {
                const premium = getStoragePremium(storage);
                const isSelected = selectedStorage === storage;
                return (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary' 
                        : 'border-slate-200 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <div>{storage}</div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      {premium === 0 ? 'Base Price' : `+$${premium}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Row: Quantity and Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-lg overflow-hidden shrink-0 bg-slate-50 h-11 self-start sm:self-auto">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 hover:bg-slate-100 font-bold text-slate-600 border-r text-sm h-full"
              >
                -
              </button>
              <span className="px-5 font-bold text-slate-800 text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 hover:bg-slate-100 font-bold text-slate-600 border-l text-sm h-full"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={() => addToCart({
                phoneId: phone.id,
                name: phone.name,
                brand: phone.brand,
                price: currentPrice,
                image: phone.image,
                color: selectedColor.name,
                storage: selectedStorage
              }, quantity)}
              className="flex-1 h-11 gap-2 text-sm font-semibold bg-primary hover:bg-primary/95 text-white shadow-md"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Shopping Cart
            </Button>

            {/* Compare Toggle */}
            <Button
              variant="outline"
              onClick={() => toggleCompare(phone.id)}
              className={`h-11 px-4 gap-2 border-slate-200 ${isComparing ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
            >
              <GitCompare className="h-4 w-4" /> {isComparing ? 'Remove Compare' : 'Compare Specification'}
            </Button>
          </div>

          <Separator />

          {/* Specs Highlights */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border">
              <Cpu className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Processor</p>
              <p className="text-xs font-bold text-slate-800 truncate">{phone.specs.processor.split('with')[0]}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <Camera className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Camera</p>
              <p className="text-xs font-bold text-slate-800 truncate">{phone.specs.camera.split('+')[0]}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border">
              <Battery className="h-5 w-5 text-amber-500 mx-auto mb-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Battery</p>
              <p className="text-xs font-bold text-slate-800 truncate">{phone.specs.battery.split('(')[0]}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Section: Detailed Specs, Reviews, and Warranty */}
      <div className="mt-16 bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex border-b mb-6 gap-6">
          {[
            { id: 'specs', label: 'Technical Specifications', icon: FileText },
            { id: 'reviews', label: `Customer Reviews (${reviewsList.length})`, icon: MessageSquare },
            { id: 'warranty', label: 'Warranty & Delivery', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-sm font-bold flex items-center gap-2 relative transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content: Specs */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            {[
              { label: 'Display Screen', value: phone.specs.screen },
              { label: 'Chipset Processor', value: phone.specs.processor },
              { label: 'Camera System', value: phone.specs.camera },
              { label: 'Battery & Power', value: phone.specs.battery },
              { label: 'Operating System', value: phone.specs.os },
              { label: 'Physical Weight', value: phone.specs.weight },
              { label: 'Water Protection', value: phone.specs.waterResistance },
              { label: 'Charging Power', value: phone.specs.charging }
            ].map((spec, idx) => (
              <div key={idx} className="flex justify-between py-3 border-b border-slate-100 gap-4">
                <span className="font-semibold text-slate-500 shrink-0">{spec.label}</span>
                <span className="text-slate-800 text-right font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tab content: Reviews */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-bold text-lg text-slate-900">User Opinions</h3>
              {reviewsList.length === 0 ? (
                <p className="text-slate-500 text-sm italic">No reviews yet. Be the first to review this device!</p>
              ) : (
                <div className="space-y-4">
                  {reviewsList.map((review) => (
                    <div key={review.id} className="border-b pb-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-slate-800">{review.author}</span>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < review.rating ? 'fill-current text-yellow-500' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Review Form */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-xl border">
              <h3 className="font-bold text-base text-slate-900 mb-4">Write a Review</h3>
              
              {reviewSuccess && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs font-semibold">
                  Thank you! Your review has been published below in real-time.
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Your Name</label>
                  <Input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={newAuthor} 
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                    className="bg-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Rating</label>
                  <select 
                    value={newRating} 
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-white border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5 Outstanding)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5 Great)</option>
                    <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                    <option value={2}>⭐⭐ (2/5 Poor)</option>
                    <option value={1}>⭐ (1/5 Terribles)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Your Review</label>
                  <Textarea 
                    placeholder="Share your experience with this smartphone..." 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    rows={4}
                    className="bg-white text-sm"
                  />
                </div>

                <Button type="submit" className="w-full bg-slate-900 hover:bg-primary text-white">
                  Submit Review
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Tab content: Warranty */}
        {activeTab === 'warranty' && (
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Original Manufacturer Warranty</h4>
              <p>
                Every smartphone sold on Phonex comes with a complete 2-Year limited manufacturer warranty. This covers all hardware malfunctions, screen issues not caused by accidental damage, battery degradation exceeding 20% in the first 24 months, and internal components defects.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Express Insured Shipping</h4>
              <p>
                All devices are dispatched from our secure CA facility in shock-resistant protective casing. Orders placed before 3:00 PM EST are shipped same-day with tracking details emailed immediately. Signature is required upon delivery for premium security.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 border rounded-xl flex items-center gap-3 bg-slate-50">
                <Truck className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Free 2-Day Delivery</h5>
                  <p className="text-[11px] text-slate-500">For orders over $499</p>
                </div>
              </div>
              <div className="p-4 border rounded-xl flex items-center gap-3 bg-slate-50">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Fully Insured</h5>
                  <p className="text-[11px] text-slate-500">100% loss/damage cover</p>
                </div>
              </div>
              <div className="p-4 border rounded-xl flex items-center gap-3 bg-slate-50">
                <RotateCcw className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">30-Day Easy Returns</h5>
                  <p className="text-[11px] text-slate-500">Prepaid shipping labels</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedPhones.length > 0 && (
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related {phone.brand} Devices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPhones.map((p) => (
              <div key={p.id} className="border rounded-xl p-4 bg-white hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="h-32 bg-slate-50 rounded-lg p-2 flex items-center justify-center mb-4">
                    <img src={p.image} alt={p.name} className="object-contain h-full max-h-28" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 truncate">{p.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs my-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span>{p.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-extrabold text-slate-900">${p.price}</span>
                  <Link href={`/phones/${p.id}`}>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
