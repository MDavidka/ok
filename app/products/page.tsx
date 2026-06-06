"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, Product } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  Smartphone,
  Tag,
  Star,
  RefreshCw,
} from "lucide-react";

// Wrap search params logic in a Suspense-friendly child component
function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initial values from search params
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSale = searchParams.get("sale") === "true";
  const initialNew = searchParams.get("new") === "true";

  // State variables for filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [onlySale, setOnlySale] = useState(initialSale);
  const [onlyNew, setOnlyNew] = useState(initialNew);
  const [sortBy, setSortBy] = useState<string>("featured");
  
  // Mobile filter sidebar toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if search params change (e.g. clicking category in header/footer)
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("search") || "");
    setOnlySale(searchParams.get("sale") === "true");
    setOnlyNew(searchParams.get("new") === "true");
  }, [searchParams]);

  // Extract unique brands for filter options
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));

  // Handle brand selection toggle
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrands([]);
    setMaxPrice(1500);
    setOnlySale(false);
    setOnlyNew(false);
    setSortBy("featured");
    router.replace("/products");
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Search text match (name, brand, or description)
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category match
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // Brand match
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      // Price match (checks discount price if available)
      const currentPrice = product.discountPrice || product.price;
      const matchesPrice = currentPrice <= maxPrice;

      // Sale match
      const matchesSale = !onlySale || product.isSale === true;

      // New match
      const matchesNew = !onlyNew || product.isNew === true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesSale &&
        matchesNew
      );
    })
    .sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === "price-asc") {
        return priceA - priceB;
      }
      if (sortBy === "price-desc") {
        return priceB - priceA;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      // "featured" default sorting: new and high rated first
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.rating - a.rating;
    });

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Explore All Smartphones
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredProducts.length} of {products.length} models
          </p>
        </div>

        {/* Sorting & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden flex items-center gap-2 flex-1"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(selectedBrands.length > 0 ||
              selectedCategory !== "all" ||
              onlySale ||
              onlyNew ||
              maxPrice < 1500) && (
              <Badge className="ml-1 h-2 w-2 rounded-full p-0 bg-primary" />
            )}
          </Button>

          <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
            <span className="text-xs font-semibold text-muted-foreground hidden sm:inline flex-shrink-0">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm rounded-md border border-input bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary font-medium"
            >
              <option value="featured">Featured & New</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <SlidersHorizontal className="h-4.5 w-4.5 text-primary" />
              Filter Products
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs text-muted-foreground hover:text-primary h-8 px-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>

          <Separator />

          {/* Search Input inside sidebar */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Search keyword</Label>
            <div className="relative">
              <Input
                placeholder="iPhone, S24, ASUS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <Separator />

          {/* Category Filter */}
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold">Lifestyle Category</Label>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "All Phones", value: "all" },
                { label: "Premium Flagship", value: "flagship" },
                { label: "Pro Gaming", value: "gaming" },
                { label: "Camera Powerhouse", value: "camera" },
                { label: "Budget Friendly", value: "budget" },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-left text-sm py-1.5 px-2.5 rounded-md transition-colors flex justify-between items-center ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.value && (
                    <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-none">✓</Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brand Filter */}
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold">Brand / Manufacturer</Label>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
              {allBrands.map((brand) => {
                const isChecked = selectedBrands.includes(brand);
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                    />
                    <span>{brand}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold">Maximum Budget</Label>
              <span className="text-sm font-bold text-primary">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary bg-muted rounded-lg appearance-none h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Min: $300</span>
              <span>Max: $1500</span>
            </div>
          </div>

          <Separator />

          {/* Quick Badges Toggles */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Special Offers</Label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => setOnlySale(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                />
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-destructive" /> On Sale / Discounted
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyNew}
                  onChange={(e) => setOnlyNew(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                />
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> New Arrivals
                </span>
              </label>
            </div>
          </div>
        </aside>

        {/* Catalog Grid */}
        <div className="lg:col-span-3">
          {/* Active Filter Tags */}
          {(selectedBrands.length > 0 ||
            selectedCategory !== "all" ||
            onlySale ||
            onlyNew ||
            maxPrice < 1500 ||
            searchQuery !== "") && (
            <div className="flex flex-wrap gap-2 items-center mb-6 bg-muted/40 p-3 rounded-lg border border-border/40">
              <span className="text-xs font-semibold text-muted-foreground">Active filters:</span>
              
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  Query: {searchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}

              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1 px-2 py-1 capitalize">
                  {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}

              {selectedBrands.map((b) => (
                <Badge key={b} variant="secondary" className="gap-1 px-2 py-1">
                  {b}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleBrandToggle(b)} />
                </Badge>
              ))}

              {maxPrice < 1500 && (
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  Under ${maxPrice}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setMaxPrice(1500)} />
                </Badge>
              )}

              {onlySale && (
                <Badge variant="secondary" className="gap-1 px-2 py-1 text-destructive">
                  On Sale
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setOnlySale(false)} />
                </Badge>
              )}

              {onlyNew && (
                <Badge variant="secondary" className="gap-1 px-2 py-1 text-primary">
                  New Arrival
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setOnlyNew(false)} />
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs text-primary font-bold h-6 px-2 ml-auto"
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Grid Layout */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 border border-dashed rounded-2xl bg-card space-y-4">
              <Smartphone className="h-16 w-16 text-muted-foreground/40" />
              <h3 className="text-xl font-bold text-foreground">No smartphones match your search</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Try adjusting your brand selections, increasing your maximum budget, or looking for other categories.
              </p>
              <Button onClick={handleResetFilters} className="mt-2">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-background h-full p-6 overflow-y-auto flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                Filters
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
                className="h-8 w-8"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 py-4 space-y-6">
              {/* Search Inside Mobile */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Search keyword</Label>
                <div className="relative">
                  <Input
                    placeholder="Search model name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 text-sm"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Category Inside Mobile */}
              <div className="space-y-2.5">
                <Label className="text-sm font-semibold">Lifestyle Category</Label>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "All Phones", value: "all" },
                    { label: "Premium Flagship", value: "flagship" },
                    { label: "Pro Gaming", value: "gaming" },
                    { label: "Camera Powerhouse", value: "camera" },
                    { label: "Budget Friendly", value: "budget" },
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`text-left text-sm py-2 px-3 rounded-md flex justify-between items-center ${
                        selectedCategory === cat.value
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Inside Mobile */}
              <div className="space-y-2.5">
                <Label className="text-sm font-semibold">Brand / Manufacturer</Label>
                <div className="flex flex-col gap-2.5 max-h-40 overflow-y-auto pr-1">
                  {allBrands.map((brand) => {
                    const isChecked = selectedBrands.includes(brand);
                    return (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded border-gray-300 text-primary h-4 w-4"
                        />
                        <span>{brand}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Inside Mobile */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">Maximum Budget</Label>
                  <span className="text-sm font-bold text-primary">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-muted rounded-lg appearance-none h-2 cursor-pointer"
                />
              </div>

              {/* Badges Inside Mobile */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Special Offers</Label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlySale}
                      onChange={(e) => setOnlySale(e.target.checked)}
                      className="rounded border-gray-300 text-primary h-4 w-4"
                    />
                    <span className="flex items-center gap-1.5">On Sale</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyNew}
                      onChange={(e) => setOnlyNew(e.target.checked)}
                      className="rounded border-gray-300 text-primary h-4 w-4"
                    />
                    <span className="flex items-center gap-1.5">New Arrivals</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button className="w-full" onClick={() => setShowMobileFilters(false)}>
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  handleResetFilters();
                  setShowMobileFilters(false);
                }}
              >
                Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsCatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4 text-sm font-medium">Loading catalog...</p>
            </div>
          }
        >
          <ProductsCatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
