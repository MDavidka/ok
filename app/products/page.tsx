import React, { useState, useEffect, useMemo } from "react";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Empty } from "@/components/ui/empty";
import { Search } from "lucide-react";

// Mock Data - In a real application, this would be fetched from a database or API
const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "The latest flagship from Apple with A17 Bionic chip and Pro camera system.",
    price: 1199.99,
    imageUrl: "https://placehold.co/600x600.png?text=iPhone+15+Pro+Max",
    category: "Smartphones",
    brand: "Apple",
    stock: 15,
    features: ["6.7-inch Super Retina XDR display", "Dynamic Island", "Pro camera system"],
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "Samsung's top-tier Android phone with S Pen integration and powerful camera.",
    price: 1299.99,
    imageUrl: "https://placehold.co/600x600.png?text=Galaxy+S24+Ultra",
    category: "Smartphones",
    brand: "Samsung",
    stock: 10,
    features: ["6.8-inch Dynamic AMOLED 2X", "Snapdragon 8 Gen 3", "Titanium frame"],
    status: "sale",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod3",
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    description: "Google's AI-powered smartphone with an exceptional camera and Tensor G3 chip.",
    price: 999.00,
    imageUrl: "https://placehold.co/600x600.png?text=Pixel+8+Pro",
    category: "Smartphones",
    brand: "Google",
    stock: 20,
    features: ["6.7-inch Super Actua display", "Tensor G3 chip", "Advanced AI features"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod4",
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "Fast and fluid experience with powerful performance and Hasselblad Camera.",
    price: 799.00,
    imageUrl: "https://placehold.co/600x600.png?text=OnePlus+12",
    category: "Smartphones",
    brand: "OnePlus",
    stock: 8,
    features: ["6.82-inch Fluid AMOLED", "Snapdragon 8 Gen 3", "Hasselblad Camera for Mobile"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod5",
    name: "Xiaomi 14 Ultra",
    slug: "xiaomi-14-ultra",
    description: "Cutting-edge camera technology and premium design from Xiaomi.",
    price: 949.00,
    imageUrl: "https://placehold.co/600x600.png?text=Xiaomi+14+Ultra",
    category: "Smartphones",
    brand: "Xiaomi",
    stock: 12,
    features: ["6.73-inch AMOLED display", "Leica optical lens", "Snapdragon 8 Gen 3"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod6",
    name: "iPad Pro M4",
    slug: "ipad-pro-m4",
    description: "The thinnest Apple product ever, with the revolutionary M4 chip.",
    price: 999.00,
    imageUrl: "https://placehold.co/600x600.png?text=iPad+Pro+M4",
    category: "Tablets",
    brand: "Apple",
    stock: 7,
    features: ["Ultra Retina XDR display", "M4 chip", "ProMotion technology"],
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod7",
    name: "Samsung Galaxy Tab S9 Ultra",
    slug: "samsung-galaxy-tab-s9-ultra",
    description: "A massive display and powerful performance for productivity and entertainment.",
    price: 1099.00,
    imageUrl: "https://placehold.co/600x600.png?text=Galaxy+Tab+S9+Ultra",
    category: "Tablets",
    brand: "Samsung",
    stock: 5,
    features: ["14.6-inch Dynamic AMOLED 2X", "Snapdragon 8 Gen 2", "S Pen included"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod8",
    name: "Apple Watch Ultra 2",
    slug: "apple-watch-ultra-2",
    description: "The most rugged and capable Apple Watch, designed for adventurers.",
    price: 799.00,
    imageUrl: "https://placehold.co/600x600.png?text=Apple+Watch+Ultra+2",
    category: "Smartwatches",
    brand: "Apple",
    stock: 25,
    features: ["Always-On Retina display", "S9 SiP", "Water resistant 100m"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod9",
    name: "Samsung Galaxy Watch 6 Classic",
    slug: "samsung-galaxy-watch-6-classic",
    description: "Classic design meets modern smart features with a rotating bezel.",
    price: 399.00,
    imageUrl: "https://placehold.co/600x600.png?text=Galaxy+Watch+6+Classic",
    category: "Smartwatches",
    brand: "Samsung",
    stock: 30,
    features: ["Super AMOLED display", "Exynos W930", "Rotating bezel"],
    status: "sale",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod10",
    name: "Google Pixel Watch 2",
    slug: "google-pixel-watch-2",
    description: "Google's smart and stylish smartwatch with advanced health tracking.",
    price: 349.00,
    imageUrl: "https://placehold.co/600x600.png?text=Pixel+Watch+2",
    category: "Smartwatches",
    brand: "Google",
    stock: 18,
    features: ["Always-on display", "Wear OS by Google", "ECG app"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod11",
    name: "iPhone 14",
    slug: "iphone-14",
    description: "A powerful and feature-rich smartphone with a great camera.",
    price: 699.00,
    imageUrl: "https://placehold.co/600x600.png?text=iPhone+14",
    category: "Smartphones",
    brand: "Apple",
    stock: 22,
    features: ["6.1-inch Super Retina XDR display", "A15 Bionic chip", "Advanced dual-camera system"],
    status: "sale",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod12",
    name: "Samsung Galaxy A54",
    slug: "samsung-galaxy-a54",
    description: "A great mid-range smartphone with a vibrant display and long-lasting battery.",
    price: 449.00,
    imageUrl: "https://placehold.co/600x600.png?text=Galaxy+A54",
    category: "Smartphones",
    brand: "Samsung",
    stock: 35,
    features: ["6.4-inch Super AMOLED display", "Exynos 1380", "50MP OIS Camera"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod13",
    name: "OnePlus Nord 3",
    slug: "oneplus-nord-3",
    description: "Fast charging and smooth performance in a sleek design.",
    price: 499.00,
    imageUrl: "https://placehold.co/600x600.png?text=OnePlus+Nord+3",
    category: "Smartphones",
    brand: "OnePlus",
    stock: 10,
    features: ["6.74-inch Fluid AMOLED", "MediaTek Dimensity 9000", "80W SUPERVOOC Charge"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod14",
    name: "Google Pixel 7a",
    slug: "google-pixel-7a",
    description: "Affordable Pixel experience with great camera and Tensor G2 chip.",
    price: 499.00,
    imageUrl: "https://placehold.co/600x600.png?text=Pixel+7a",
    category: "Smartphones",
    brand: "Google",
    stock: 10,
    features: ["6.1-inch OLED display", "Tensor G2 chip", "64MP main camera"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod15",
    name: "Xiaomi Redmi Note 13 Pro+",
    slug: "xiaomi-redmi-note-13-pro-plus",
    description: "High-resolution camera and ultra-fast charging for the budget-conscious.",
    price: 399.00,
    imageUrl: "https://placehold.co/600x600.png?text=Redmi+Note+13+Pro+",
    category: "Smartphones",
    brand: "Xiaomi",
    stock: 25,
    features: ["6.67-inch AMOLED display", "200MP OIS camera", "120W HyperCharge"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod16",
    name: "Apple Watch SE (2nd Gen)",
    slug: "apple-watch-se-2nd-gen",
    description: "All the essentials to help you stay connected, active, and healthy.",
    price: 249.00,
    imageUrl: "https://placehold.co/600x600.png?text=Apple+Watch+SE",
    category: "Smartwatches",
    brand: "Apple",
    stock: 40,
    features: ["Retina display", "S8 SiP", "Water resistant 50m"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod17",
    name: "Samsung Galaxy Watch 5",
    slug: "samsung-galaxy-watch-5",
    description: "Advanced health tracking and a durable design for everyday wear.",
    price: 279.00,
    imageUrl: "https://placehold.co/600x600.png?text=Galaxy+Watch+5",
    category: "Smartwatches",
    brand: "Samsung",
    stock: 20,
    features: ["Sapphire Crystal display", "BioActive Sensor", "GPS tracking"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod18",
    name: "Google Pixel Tablet",
    slug: "google-pixel-tablet",
    description: "A tablet that's also a smart display, powered by the Tensor G2 chip.",
    price: 499.00,
    imageUrl: "https://placehold.co/600x600.png?text=Pixel+Tablet",
    category: "Tablets",
    brand: "Google",
    stock: 10,
    features: ["10.95-inch LCD display", "Tensor G2 chip", "Charging Speaker Dock"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod19",
    name: "OnePlus Pad",
    slug: "oneplus-pad",
    description: "Smooth performance and a large display for work and play.",
    price: 479.00,
    imageUrl: "https://placehold.co/600x600.png?text=OnePlus+Pad",
    category: "Tablets",
    brand: "OnePlus",
    stock: 8,
    features: ["11.61-inch LCD display", "MediaTek Dimensity 9000", "Dolby Vision"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod20",
    name: "Xiaomi Pad 6",
    slug: "xiaomi-pad-6",
    description: "A versatile tablet for entertainment and productivity at an attractive price.",
    price: 329.00,
    imageUrl: "https://placehold.co/600x600.png?text=Xiaomi+Pad+6",
    category: "Tablets",
    brand: "Xiaomi",
    stock: 15,
    features: ["11-inch LCD display", "Snapdragon 870", "Quad speakers"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Extract unique categories and brands from mock data
const allCategories = Array.from(new Set(mockProducts.map((p) => p.category)));
const allBrands = Array.from(new Set(mockProducts.map((p) => p.brand)));

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default"); // default, price-asc, price-desc, name-asc, name-desc

  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = [...mockProducts];

    // 1. Apply Search Filter
    if (searchQuery) {
      currentProducts = currentProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Apply Category Filter
    if (selectedCategory !== "all") {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 3. Apply Brand Filter
    if (selectedBrand !== "all") {
      currentProducts = currentProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    // 4. Apply Sorting
    switch (sortBy) {
      case "price-asc":
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        currentProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // No specific sort, maybe sort by creation date or just keep original order
        break;
    }

    return currentProducts;
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold md:text-4xl">All Products</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Browse our extensive collection of smartphones, tablets, and smartwatches.
      </p>

      {/* Filter and Sort Controls */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {/* Search Input */}
        <div className="relative col-span-full md:col-span-2 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="category-filter">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category-filter" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="brand-filter">Brand</Label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger id="brand-filter" className="w-full">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {allBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="sort-by">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by" className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Empty className="py-16">
          <div className="flex flex-col items-center justify-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query.
            </p>
          </div>
        </Empty>
      )}
    </div>
  );
}
[/code]
[file]app/products/page.tsx[/file][usedfor]product listing page[/usedfor]