"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard"; // Assuming this component will be created next

// Mock Product Data (will be replaced by lib/data.ts later)
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "SyraPhone X Pro",
    brand: "Syra",
    category: "Flagship",
    price: 999.99,
    image: "/images/syraphone-x-pro.webp",
    description: "The ultimate smartphone experience with a stunning display and powerful camera.",
  },
  {
    id: "2",
    name: "SyraPhone 8 Lite",
    brand: "Syra",
    category: "Budget",
    price: 349.99,
    image: "/images/syraphone-8-lite.webp",
    description: "Affordable and reliable, perfect for everyday use.",
  },
  {
    id: "3",
    name: "GamerPhone Elite",
    brand: "GamerTech",
    category: "Gaming",
    price: 1199.99,
    image: "/images/gamerphone-elite.webp",
    description: "Unleash your gaming potential with a high refresh rate screen and advanced cooling.",
  },
  {
    id: "4",
    name: "PhotoMaster 5G",
    brand: "LensPro",
    category: "Camera",
    price: 899.99,
    image: "/images/photomaster-5g.webp",
    description: "Capture professional-grade photos and videos with its revolutionary camera system.",
  },
  {
    id: "5",
    name: "SyraPhone Z Fold",
    brand: "Syra",
    category: "Flagship",
    price: 1499.99,
    image: "/images/syraphone-z-fold.webp",
    description: "Experience the future with a foldable display and multitasking capabilities.",
  },
  {
    id: "6",
    name: "EcoPhone Green",
    brand: "EcoTech",
    category: "Budget",
    price: 299.99,
    image: "/images/ecophone-green.webp",
    description: "Environmentally friendly and budget-conscious, without compromising on features.",
  },
  {
    id: "7",
    name: "SyraPhone Mini",
    brand: "Syra",
    category: "Flagship",
    price: 799.99,
    image: "/images/syraphone-mini.webp",
    description: "Compact power, delivering flagship performance in a pocket-friendly design.",
  },
  {
    id: "8",
    name: "GamerPhone Pro",
    brand: "GamerTech",
    category: "Gaming",
    price: 999.99,
    image: "/images/gamerphone-pro.webp",
    description: "Dominate the competition with a powerful processor and immersive audio.",
  },
  {
    id: "9",
    name: "PhotoMaster Lite",
    brand: "LensPro",
    category: "Camera",
    price: 699.99,
    image: "/images/photomaster-lite.webp",
    description: "Stunning photography made accessible with advanced camera features.",
  },
  {
    id: "10",
    name: "SyraPhone 10 Ultra",
    brand: "Syra",
    category: "Flagship",
    price: 1099.99,
    image: "/images/syraphone-10-ultra.webp",
    description: "The pinnacle of smartphone technology, designed for discerning users.",
  },
];

const allCategories = Array.from(new Set(mockProducts.map((p) => p.category)));
const allBrands = Array.from(new Set(mockProducts.map((p) => p.brand)));

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default"); // default, price-asc, price-desc, name-asc, name-desc

  // Sync state with URL params on initial load
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategories(searchParams.get("category")?.split(",") || []);
    setSelectedBrands(searchParams.get("brand")?.split(",") || []);
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSortBy(searchParams.get("sortBy") || "default");
  }, [searchParams]);

  // Update URL params whenever filters/sort change
  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    if (selectedBrands.length > 0) params.set("brand", selectedBrands.join(","));
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sortBy !== "default") params.set("sortBy", sortBy);

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy, router]);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateSearchParams();
    }, 300); // Debounce updates to avoid too many router pushes
    return () => clearTimeout(handler);
  }, [searchTerm, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy, updateSearchParams]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    router.push("/products", { scroll: false });
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesMinPrice = minPrice === "" || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);

    return matchesSearch && matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const FilterSection = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn("space-y-6", { "p-4": isMobile })}>
      <h3 className="text-lg font-semibold">Filters</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>

        <Separator />

        <div>
          <h4 className="mb-2 text-sm font-medium">Category</h4>
          <div className="space-y-2">
            {allCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="mb-2 text-sm font-medium">Brand</h4>
          <div className="space-y-2">
            {allBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <Label htmlFor={`brand-${brand}`}>{brand}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="mb-2 text-sm font-medium">Price Range</h4>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2"
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2"
            />
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">All Products</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filters */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)] pb-4">
                  <FilterSection isMobile />
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <Label htmlFor="sort-by" className="sr-only">Sort by</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by" className="w-[180px]">
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

          {/* Desktop Filters */}
          <aside className="hidden md:block w-full md:w-64 lg:w-72 flex-shrink-0">
            <FilterSection />
          </aside>

          {/* Product Listing */}
          <section className="flex-grow">
            <div className="hidden md:flex justify-end items-center mb-4">
              <Label htmlFor="sort-by-desktop" className="mr-2">Sort by:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort-by-desktop" className="w-[180px]">
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

            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                <Button variant="link" onClick={handleClearFilters} className="mt-4">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Placeholder for ScrollArea, as it's not in the provided list but useful for Sheet content
// In a real project, you'd import it from shadcn/ui
const ScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("overflow-y-auto", className)}>
    {children}
  </div>
);