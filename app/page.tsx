import Image from "next/image";
import Link from "next/link";

import { cn, formatCurrency } from "@/lib/utils";
import { PhoneProduct } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for demonstration. In a real app, this would come from a database.
const mockProducts: PhoneProduct[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    description:
      "The latest iPhone with A17 Bionic chip, Pro camera system, and Dynamic Island. Experience unparalleled performance and photography.",
    price: 1199.99,
    image: "https://placehold.co/800x600.png",
    category: "Smartphone",
    brand: "Apple",
    storage: "256GB",
    color: "Titanium Black",
    inStock: true,
    rating: 4.8,
    reviewsCount: 1250,
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Unleash the power of AI with the Galaxy S24 Ultra. Featuring a stunning display, S Pen integration, and advanced camera capabilities.",
    price: 1299.99,
    image: "https://placehold.co/800x600.png",
    category: "Smartphone",
    brand: "Samsung",
    storage: "512GB",
    color: "Phantom Gray",
    inStock: true,
    rating: 4.7,
    reviewsCount: 980,
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    description:
      "The smartest Pixel yet, powered by Google Tensor G3. Exceptional camera, long-lasting battery, and cutting-edge AI features.",
    price: 999.99,
    image: "https://placehold.co/800x600.png",
    category: "Smartphone",
    brand: "Google",
    storage: "128GB",
    color: "Obsidian Black",
    inStock: false,
    rating: 4.5,
    reviewsCount: 720,
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    description:
      "Smooth performance, stunning display, and fast charging. The OnePlus 12 delivers a flagship experience.",
    price: 799.99,
    image: "https://placehold.co/800x600.png",
    category: "Smartphone",
    brand: "OnePlus",
    storage: "256GB",
    color: "Flowy Emerald",
    inStock: true,
    rating: 4.6,
    reviewsCount: 500,
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    description:
      "Professional-grade camera system co-engineered with Leica. Experience mobile photography at its finest.",
    price: 1099.99,
    image: "https://placehold.co/800x600.png",
    category: "Smartphone",
    brand: "Xiaomi",
    storage: "512GB",
    color: "Black",
    inStock: true,
    rating: 4.7,
    reviewsCount: 650,
  },
];

export default async function HomePage() {
  // In a real application, you would fetch data here.
  // const featuredProducts = await fetchFeaturedProducts();
  const featuredProducts = mockProducts.filter((_, i) => i < 3); // Show first 3 as featured
  const newArrivals = mockProducts.filter((_, i) => i >= 3); // Show remaining as new arrivals

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="hidden md:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-70"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover Your Next Smartphone
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore the latest in mobile technology, from flagship devices to
            budget-friendly options.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/products/iphone-15-pro-max">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Smartphones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">
                  <Link href={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {product.description}
                </CardDescription>
                <p className="text-2xl font-bold mt-3">
                  {formatCurrency(product.price)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" disabled={!product.inStock}>
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container mx-auto py-12 px-4 md:px-6 lg:px-8 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">
                  <Link href={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {product.description}
                </CardDescription>
                <p className="text-2xl font-bold mt-3">
                  {formatCurrency(product.price)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" disabled={!product.inStock}>
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action / Category Browse */}
      <section className="container mx-auto py-12 px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Explore All Categories</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Find the perfect device for your needs.
        </p>