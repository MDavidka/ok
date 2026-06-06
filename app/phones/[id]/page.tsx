"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PHONES, PhoneReview } from "@/lib/data";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  GitCompare, 
  ShieldCheck, 
  Truck, 
  Calendar, 
  MessageSquare,
  PlusCircle
} from "lucide-react";
import { toast } from "sonner";

export default function PhoneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, toggleCompare, compareList } = useStore();

  const phoneId = params.id as string;
  const phone = PHONES.find((p) => p.id === phoneId);

  // Fallback if phone not found
  if (!phone) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Smartphone Not Found</h2>
        <p className="text-muted-foreground">The smartphone you are looking for does not exist or has been discontinued.</p>
        <Button onClick={() => router.push("/phones")}>Back to Catalog</Button>
      </div>
    );
  }

  // Interactive selectors
  const [selectedColor, setSelectedColor] = useState(phone.colors[0]?.name || "");
  const [selectedStorage, setSelectedStorage] = useState(phone.storageOptions[0]?.size || "");
  const [reviews, setReviews] = useState<PhoneReview[]>(phone.reviews);

  // New review form state
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState("");

  // Calculate price modifier
  const selectedStorageObj = phone.storageOptions.find((s) => s.size === selectedStorage);
  const priceModifier = selectedStorageObj ? selectedStorageObj.priceModifier : 0;
  const finalPrice = phone.price + priceModifier;

  const isComparing = compareList.includes(phone.id);

  const handleAddToCart = () => {
    addToCart(phone, selectedColor, selectedStorage, finalPrice);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      toast.error("Please fill in all fields before submitting a review.");
      return;
    }

    const newReview: PhoneReview = {
      id: `rev-${Date.now()}`,
      author: reviewerName,
      rating: reviewerRating,
      date: new Date().toISOString().split("T")[0],
      comment: reviewerComment,
    };

    setReviews([newReview, ...reviews]);
    toast.success("Thank you! Your review has been published.");
    setReviewerName("");
    setReviewerRating(5);
    setReviewerComment("");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Back to Catalog */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.push("/phones")} 
        className="mb-6 gap-1 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Catalog</span>
      </Button>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden border bg-muted/20 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={phone.image} 
              alt={phone.name} 
              className="object-cover h-full w-full max-h-[450px] rounded-2xl"
            />
            <div className="absolute top-4 left-4">
              {phone.isDeal && (
                <Badge variant="destructive" className="font-bold text-xs">
                  SPECIAL OFFER
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between p-4 bg-muted/40 rounded-2xl border">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold">Phonix Certified Protection</p>
                <p className="text-muted-foreground text-[10px]">2-Year Warranty Included</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold">Express Delivery</p>
                <p className="text-muted-foreground text-[10px]">Ships within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-semibold">
                {phone.brand}
              </Badge>
              <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                <Star className="h-4 w-4 fill-current" />
                <span>{phone.rating}</span>
                <span className="text-muted-foreground font-normal">({reviews.length} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-foreground">
              {phone.name}
            </h1>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base leading-relaxed">
              {phone.description}
            </p>
          </div>

          <div className="border-t border-b py-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-primary">${finalPrice}</span>
            {phone.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${phone.originalPrice + priceModifier}
              </span>
            )}
            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 border-emerald-500/20 text-xs font-semibold ml-auto">
              In Stock & Ready
            </Badge>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Select Color: <span className="text-foreground font-semibold">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {phone.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative p-1 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? "border-primary scale-110" : "border-transparent hover:border-muted-foreground"
                  }`}
                  title={color.name}
                >
                  <span 
                    className="block h-7 w-7 rounded-full shadow-inner border border-black/10" 
                    style={{ backgroundColor: color.hex }} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Storage Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
              Select Storage: <span className="text-foreground font-semibold">{selectedStorage}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {phone.storageOptions.map((storage) => {
                const isSelected = selectedStorage === storage.size;
                return (
                  <button
                    key={storage.size}
                    onClick={() => setSelectedStorage(storage.size)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center min-w-[80px] ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-muted hover:border-muted-foreground text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{storage.size}</span>
                    {storage.priceModifier > 0 && (
                      <span className="text-[10px] opacity-80 mt-0.5">
                        (+${storage.priceModifier})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart & Compare Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              size="lg" 
              onClick={handleAddToCart} 
              className="flex-1 h-12 text-sm font-semibold gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart - ${finalPrice}</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleCompare(phone.id)}
              className="h-12 text-sm font-semibold gap-2 border-primary/20 hover:bg-muted"
            >
              <GitCompare className="h-4 w-4" />
              <span>{isComparing ? "Remove Comparison" : "Compare Device"}</span>
            </Button>
          </div>

          {/* Technical Specifications Accordion */}
          <div className="pt-6 border-t">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Technical Specifications
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="display-processor">
                <AccordionTrigger className="text-xs font-semibold">Display & Processing Power</AccordionTrigger>
                <AccordionContent className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">Screen Display: </span>
                    {phone.specs.screen}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Processor / CPU: </span>
                    {phone.specs.processor}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cameras-battery">
                <AccordionTrigger className="text-xs font-semibold">Camera & Battery Capacity</AccordionTrigger>
                <AccordionContent className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">Camera Array: </span>
                    {phone.specs.camera}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Battery Specs: </span>
                    {phone.specs.battery}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="design-os">
                <AccordionTrigger className="text-xs font-semibold">Design Weight & OS Ecosystem</AccordionTrigger>
                <AccordionContent className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">Product Weight: </span>
                    {phone.specs.weight}
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Operating System: </span>
                    {phone.specs.os}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-16 border-t pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Add a Review */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 border p-6 rounded-2xl bg-card space-y-4">
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              <span>Write a Review</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Have you purchased the {phone.name}? Share your experience with future buyers.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Your Name</label>
                <Input
                  placeholder="e.g. David Beckham"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block">Rating (1 to 5 Stars)</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`h-6 w-6 ${
                          reviewerRating >= star ? "fill-current" : "text-muted border-muted"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground">Your Comments</label>
                <Textarea
                  placeholder="Tell us about the camera, battery, display, and why you love it..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="text-xs min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" size="sm" className="w-full text-xs font-semibold">
                Submit Review
              </Button>
            </form>
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Customer Reviews</span>
            </h3>
            <Badge variant="secondary" className="text-xs font-semibold">
              {reviews.length} total reviews
            </Badge>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-6 rounded-2xl border bg-muted/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{rev.author}</h4>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span>{rev.date}</span>
                      </p>
                    </div>
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-muted/10 text-muted-foreground text-sm">
              No reviews yet. Be the first to review this phone!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
