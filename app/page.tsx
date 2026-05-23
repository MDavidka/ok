import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

// Mock Data - In a real application, this would be fetched from a database or API
const mockFeaturedProducts: Product[] = [
  {
    id: "prod1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "The latest flagship from Apple with A17 Bionic chip.",
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
    description: "Samsung's top-tier Android phone with S Pen integration.",
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
    description: "Google's AI-powered smartphone with an exceptional camera.",
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
    description: "Fast and fluid experience with powerful performance.",
    price: 799.00,
    imageUrl: "https://placehold.co/600x600.png?text=OnePlus+12",
    category: "Smartphones",
    brand: "OnePlus",
    stock: 8,
    features: ["6.82-inch Fluid AMOLED", "Snapdragon 8 Gen 3", "Hasselblad Camera for Mobile"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "Smartphones",
    slug: "smartphones",
    description: "Discover the latest and greatest smartphones.",
    imageUrl: "https://placehold.co/400x250.png?text=Smartphones",
  },
  {
    id: "cat2",
    name: "Accessories",
    slug: "accessories",
    description: "Enhance your mobile experience with essential accessories.",
    imageUrl: "https://placehold.co/400x250.png?text=Accessories",
  },
  {
    id: "cat3",
    name: "Wearables",
    slug: "wearables",
    description: "Stay connected and track your fitness with smart wearables.",
    imageUrl: "https://placehold.co/400x250.png?text=Wearables",
  },
];

export default async function HomePage() {
  // In a real application, you would fetch data here:
  // const featuredProducts = await getFeaturedProducts();
  // const categories = await getCategories();
  const featuredProducts = mockFeaturedProducts;
  const categories = mockCategories;

  return (
    <div className="container py-8 md:py-12">
      {/* Hero Section / Promotions */}
      <section className="relative mb-12 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground shadow-lg md:p-16">
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl">
            Discover Your Next Phone
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Explore the latest smartphones, accessories, and deals from top brands.
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
        {/* Decorative background elements */}
        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl md:-bottom-20 md:-right-20 md:h-64 md:w-64"></div>
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-primary-foreground/10 blur-3xl md:-top-20 md:-left-20 md:h-48 md:w-48"></div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link href={`/products?category=${category.slug}`} key={category.id}>
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                <Image
                  src={category.imageUrl || "https://placehold.co/400x250.png?text=Category"}
                  alt={category.name}
                  width={400}
                  height={250}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <CardHeader className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <CardTitle className="text-2xl font-bold">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <CardTitle className="text-lg font-semibold group-hover:hidden">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground group-hover:hidden">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action / Newsletter (Example) */}
      <section className="rounded-lg bg-muted p-8 text-center shadow-inner md:p-12">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">Stay Updated!</h2>
        <p className="mb-6 text-lg text-muted-foreground">
          Sign up for our newsletter to get the latest deals and product announcements.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-sm sm:w-auto"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
}
[/code]
[file]app/page.tsx[/file][usedfor]homepage[/usedfor]