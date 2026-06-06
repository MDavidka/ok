"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PHONES } from "@/lib/data";
import { PhoneCard } from "@/components/phone-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, RefreshCcw, ArrowUpDown, Star } from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial brand from URL if any
  const urlBrand = searchParams.get("brand");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>(urlBrand || "All");
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "default">("default");

  // Keep state synced with URL brand if it changes
  useEffect(() => {
    if (urlBrand) {
      setSelectedBrand(urlBrand);
    }
  }, [urlBrand]);

  const brands = ["All", "Apple", "Samsung", "Google", "OnePlus", "Nothing"];

  // Filter logic
  const filteredPhones = PHONES.filter((phone) => {
    const matchesSearch =
      phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === "All" || phone.brand === selectedBrand;
    const matchesDeals = !onlyDeals || phone.isDeal;
    const matchesFeatured = !onlyFeatured || phone.isFeatured;

    return matchesSearch && matchesBrand && matchesDeals && matchesFeatured;
  });

  // Sort logic
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default order
  });

  const handleReset = () => {
    setSearchQuery("");
    setSelectedBrand("All");
    setOnlyDeals(false);
    setOnlyFeatured(false);
    setSortBy("default");
    router.replace("/phones");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Smartphone Catalog</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore {PHONES.length} next-generation devices with certified warranty and global shipping.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs flex items-center gap-1.5"
            onClick={handleReset}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </Button>
        </div>
      </div>

      {/* Main Filter Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Filters */}
        <div className="space-y-6 lg:col-span-1 border p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>Filters</span>
            </h3>
            <Badge variant="secondary" className="text-xs font-semibold">
              {filteredPhones.length} items
            </Badge>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Search Model
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="iPhone, S24, Pixel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Brand
            </label>
            <div className="flex flex-col gap-1.5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setSelectedBrand(brand);
                    if (brand === "All") {
                      router.replace("/phones");
                    } else {
                      router.replace(`/phones?brand=${brand}`);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    selectedBrand === brand
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{brand}</span>
                  {selectedBrand !== brand && (
                    <span className="text-[10px] opacity-75">
                      ({brand === "All" ? PHONES.length : PHONES.filter((p) => p.brand === brand).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Offer Filters */}
          <div className="space-y-3 pt-4 border-t">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Promotions
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                />
                <span>Show Hot Deals Only</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFeatured}
                  onChange={(e) => setOnlyFeatured(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                />
                <span>Show Featured Flagships</span>
              </label>
            </div>
          </div>

          {/* Sorting */}
          <div className="space-y-2 pt-4 border-t">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span>Sort By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs p-2 rounded-lg border bg-background text-foreground"
            >
              <option value="default">Default Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Right Sidebar: Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {sortedPhones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPhones.map((phone) => (
                <div key={phone.id} className="h-full">
                  <PhoneCard phone={phone} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-card space-y-4">
              <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">No Smartphones Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We couldn&apos;t find any devices matching your filters. Try adjusting your search query or selecting another brand.
              </p>
              <Button onClick={handleReset} variant="outline" size="sm">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 text-center text-sm text-muted-foreground">
        Loading catalog...
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
