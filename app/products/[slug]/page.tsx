"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, Product, Review } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  ShoppingCart,
  Check,
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  GitCompare,
  Plus,
  Minus,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const slug = params.slug;

  // Find product in database
  const product = products.find((p) => p.id === slug);

  // States for interactive gallery
  const images = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : [];
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  // States for quantity selector
  const [quantity, setQuantity] = useState(1);

  // States for add-to-cart feedback
  const [isAdded, setIsAdded] = useState(false);

  // States for custom reviews (appended in local component state for demo)
  const [localReviews, setLocalReviews] = useState<Review[]>(product?.reviewsList || []);
  const [newReviewUser, setNewReviewUser] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-grow container max-w-lg mx-auto py-20 px-4 text-center space-y-6">
          <div className="text-destructive font-bold text-5xl">404</div>
          <h1 className="text-2xl font-bold">Smartphone Not Found</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t find the specific smartphone you were looking for. It may have been discontinued or out of stock.
          </p>
          <Button asChild>
            <Link href="/products">Back to Catalog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;

  // Handle quantity change
  const handleQtyChange = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  // Add to cart with selected quantity
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      quantity: quantity,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Submit custom review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewUser || !newReviewComment) return;

    const addedReview: Review = {
      id: "custom-" + Date.now(),
      user: newReviewUser,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split("T")[0],
    };

    setLocalReviews((prev) => [addedReview, ...prev]);
    setReviewSubmitted(true);
    setNewReviewUser("");
    setNewReviewComment("");
    setNewReviewRating(5);

    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  // Filter related products (same category or brand, excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-grow">
        <div className="container max-w-7xl mx-auto px-4 py-6 md:py-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 md:mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link href="/products" className="hover:text-primary transition-colors">
              Phones
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-primary transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-foreground font-semibold truncate">{product.name}</span>
          </nav>

          {/* Product Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/60">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isSale && <Badge className="bg-destructive hover:bg-destructive text-white font-bold">SALE</Badge>}
                  {product.isNew && <Badge className="bg-primary hover:bg-primary text-white font-bold">NEW</Badge>}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden bg-muted border-2 transition-all shrink-0 ${
                        selectedImage === img ? "border-primary shadow-sm" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div className="p-3 bg-muted/40 rounded-xl border border-border/40 space-y-1">
                  <Shield className="h-5 w-5 text-primary mx-auto" />
                  <span className="block text-xs font-bold text-foreground">2-Yr Warranty</span>
                  <span className="block text-[10px] text-muted-foreground">Manufacturer direct</span>
                </div>
                <div className="p-3 bg-muted/40 rounded-xl border border-border/40 space-y-1">
                  <Truck className="h-5 w-5 text-primary mx-auto" />
                  <span className="block text-xs font-bold text-foreground">Free Express</span>
                  <span className="block text-[10px] text-muted-foreground">1-3 business days</span>
                </div>
                <div className="p-3 bg-muted/40 rounded-xl border border-border/40 space-y-1">
                  <RefreshCw className="h-5 w-5 text-primary mx-auto" />
                  <span className="block text-xs font-bold text-foreground">Easy Returns</span>
                  <span className="block text-[10px] text-muted-foreground">30-day trial period</span>
                </div>
              </div>
            </div>

            {/* Right Column: Spec Info & Cart Action */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-primary uppercase tracking-widest">{product.brand}</span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  {product.name}
                </h1>
                
                {/* Rating & Reviews overview */}
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-current" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({localReviews.length} customer reviews)
                  </span>
                </div>
              </div>

              <Separator />

              {/* Price Display */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-foreground">
                    ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <Badge variant="outline" className="text-xs font-bold text-destructive border-destructive">
                    Save ${(product.price - product.discountPrice!).toFixed(2)} instantly
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specs highlights */}
              <div className="bg-muted/40 p-4 rounded-xl border border-border/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Key Specifications</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div>
                    <span className="text-muted-foreground">Processor:</span>{" "}
                    <span className="font-semibold text-foreground line-clamp-1">{product.specs.processor}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Display:</span>{" "}
                    <span className="font-semibold text-foreground line-clamp-1">{product.specs.display}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RAM:</span>{" "}
                    <span className="font-semibold text-foreground">{product.specs.ram}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Battery:</span>{" "}
                    <span className="font-semibold text-foreground line-clamp-1">{product.specs.battery}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Quantity adjustments */}
                <div className="flex items-center justify-between border rounded-lg p-1 shrink-0 bg-card h-12 w-full sm:w-32">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQtyChange("dec")}
                    className="h-10 w-10 text-muted-foreground"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-bold text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQtyChange("inc")}
                    className="h-10 w-10 text-muted-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add Button */}
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={`flex-1 h-12 text-sm font-bold transition-all duration-300 ${
                    isAdded ? "bg-emerald-600 hover:bg-emerald-600 text-white" : ""
                  }`}
                  disabled={isAdded}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Added {quantity} to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                {/* Compare Specs Shortcut */}
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-4"
                  title="Compare with other phones"
                  asChild
                >
                  <Link href={`/compare?p1=${product.id}`}>
                    <GitCompare className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Details Specifications & Reviews Tabs */}
          <section className="mb-16">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
                <TabsTrigger value="specs" className="font-bold text-xs sm:text-sm">
                  Full Technical Specs
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-bold text-xs sm:text-sm">
                  Reviews ({localReviews.length})
                </TabsTrigger>
              </TabsList>

              {/* Technical Specs Tab */}
              <TabsContent value="specs" className="bg-card border rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Complete Spec sheet</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Brand</span>
                      <span className="font-semibold text-foreground text-right">{product.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Model Name</span>
                      <span className="font-semibold text-foreground text-right">{product.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Operating System</span>
                      <span className="font-semibold text-foreground text-right">{product.specs.os || "Android 14"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Processor (CPU)</span>
                      <span className="font-semibold text-foreground text-right max-w-[240px] truncate">{product.specs.processor}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Display Specs</span>
                      <span className="font-semibold text-foreground text-right max-w-[240px] truncate">{product.specs.display}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">System RAM</span>
                      <span className="font-semibold text-foreground text-right">{product.specs.ram}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Storage Capacities</span>
                      <span className="font-semibold text-foreground text-right">{product.specs.storage}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Camera Optics</span>
                      <span className="font-semibold text-foreground text-right max-w-[240px] truncate">{product.specs.camera}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Battery & Charge</span>
                      <span className="font-semibold text-foreground text-right max-w-[240px] truncate">{product.specs.battery}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b text-sm">
                      <span className="text-muted-foreground font-medium">Device Weight</span>
                      <span className="font-semibold text-foreground text-right">{product.specs.weight || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Reviews List */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-lg font-bold text-foreground">Verified Buyer Feedback</h3>
                  {localReviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-card border rounded-2xl">
                      No reviews yet. Be the first to write a review!
                    </div>
                  ) : (
                    localReviews.map((rev) => (
                      <div key={rev.id} className="bg-card border rounded-2xl p-5 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-foreground">{rev.user}</span>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < rev.rating ? "fill-current" : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Write a Review Form */}
                <div className="lg:col-span-5 bg-card border rounded-2xl p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base flex items-center gap-1.5 text-foreground">
                      <Sparkles className="h-4.5 w-4.5 text-primary" /> Share Your Experience
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Let other tech shoppers know how this smartphone performs in real-life settings.
                    </p>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="review-user" className="text-xs font-semibold">Your Name</Label>
                      <Input
                        id="review-user"
                        required
                        placeholder="e.g. Alex Johnson"
                        value={newReviewUser}
                        onChange={(e) => setNewReviewUser(e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold block">Star Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="text-amber-400 focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReviewRating ? "fill-current" : "text-muted"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="review-comment" className="text-xs font-semibold">Your Review</Label>
                      <Textarea
                        id="review-comment"
                        required
                        rows={4}
                        placeholder="How is the screen? Does the battery last? Is the camera zoom as crisp as advertised?"
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="text-xs resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full text-xs font-bold">
                      Submit Verified Review
                    </Button>

                    {reviewSubmitted && (
                      <p className="text-xs text-emerald-600 font-bold text-center animate-pulse">
                        ✓ Thank you! Your review was successfully added below.
                      </p>
                    )}
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <section className="border-t pt-12">
              <h2 className="text-2xl font-extrabold text-foreground mb-8">
                Customers Also Viewed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
