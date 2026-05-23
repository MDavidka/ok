import Image from "next/image";
import Link from "next/link";

import { cn, formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description: "The latest and greatest iPhone with A17 Bionic chip.",
    price: 1199.99,
    imageUrl: "https://placehold.co/400x300.png?text=iPhone+15+Pro+Max",
    category: "Smartphone",
    brand: "Apple",
    stock: 50,
    specs: {
      screenSize: "6.7 inches",
      processor: "A17 Bionic",
      ram: "8GB",
      storage: "256GB",
      camera: "48MP Main",
      battery: "4422 mAh",
    },
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    description: "Android flagship with S Pen and powerful camera.",
    price: 1299.99,
    imageUrl: "https://placehold.co/400x300.png?text=Galaxy+S24+Ultra",
    category: "Smartphone",
    brand: "Samsung",
    stock: 45,
    specs: {
      screenSize: "6.8 inches",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      camera: "200MP Main",
      battery: "5000 mAh",
    },
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    description: "Best of Google AI with an amazing camera.",
    price: 999.99,
    imageUrl: "https://placehold.co/400x300.png?text=Pixel+8+Pro",
    category: "Smartphone",
    brand: "Google",
    stock: 60,
    specs: {
      screenSize: "6.7 inches",
      processor: "Tensor G3",
      ram: "12GB",
      storage: "128GB",
      camera: "50MP Main",
      battery: "5050 mAh",
    },
    colors: ["Obsidian", "Porcelain", "Bay"],
  },
  {
    id: "4",
    name: "OnePlus 12",
    description: "Fast charging and smooth performance.",
    price: 799.99,
    imageUrl: "https://placehold.co/400x300.png?text=OnePlus+12",
    category: "Smartphone",
    brand: "OnePlus",
    stock: 70,
    specs: {
      screenSize: "6.82 inches",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      camera: "50MP Main",
      battery: "5400 mAh",
    },
    colors: ["Flowy Emerald", "Silky Black"],
  },
  {
    id: "5",
    name: "Xiaomi 14 Ultra",
    description: "Leica co-engineered camera system.",
    price: 1099.99,
    imageUrl: "https://placehold.co/400x300.png?text=Xiaomi+14+Ultra",
    category: "Smartphone",
    brand: "Xiaomi",
    stock: 30,
    specs: {
      screenSize: "6.73 inches",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      camera: "50MP Main (Quad)",
      battery: "5000 mAh",
    },
    colors: ["Black", "White", "Titanium Gray"],
  },
];

const mockBanners = [
  {
    id: "banner-1",
    imageUrl: "https://placehold.co/1200x400.png?text=New+Arrivals+Sale",
    altText: "New Arrivals Sale",
    link: "/products?category=new-arrivals",
  },
  {
    id: "banner-2",
    imageUrl: "https://placehold.co/1200x400.png?text=Featured+Phones",
    altText: "Featured Phones",
    link: "/products?featured=true",
  },
  {
    id: "banner-3",
    imageUrl: "https://placehold.co/1200x400.png?text=Limited+Time+Offer",
    altText: "Limited Time Offer",
    link: "/offers",
  },
];

export default async function HomePage() {
  const featuredProducts = mockProducts.slice(0, 3); // Example: first 3 products as featured
  const newArrivals = mockProducts.slice(3, 5); // Example: next 2 products as new arrivals

  return (
    <main className="flex-1">
      {/* Hero Carousel Section */}
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <Carousel className="w-full max-w-full mx-auto">
            <CarouselContent>
              {mockBanners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <Link href={banner.link}>
                    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
                      <Image
                        src={banner.imageUrl}
                        alt={banner.altText}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-lg"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end justify-start">
                        <h2 className="text-white text-2xl md:text-4xl font-bold">
                          {banner.altText}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-semibold mb-2">
                    <Link href={`/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                  <p className="text-xl font-bold mt-3">
                    {formatCurrency(product.price)}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {newArrivals.map((product) => (
              <Card key={product.id} className="flex flex-col sm:flex-row">
                <CardHeader className="p-0 flex-shrink-0 w-full sm:w-1/3">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative w-full h-48 sm:h-full overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                </CardHeader>
                <div className="flex flex-col flex-grow">
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-semibold mb-2">
                      <Link href={`/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {product.description}
                    </CardDescription>
                    <p className="text-xl font-bold mt-3">
                      {formatCurrency(product.price)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 sm:pt-4">
                    <Button className="w-full">View Details</Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Stay Updated
          </h2>
          <p className="max-w-[700px] mx-auto text-lg mb-8">
            Sign up for our newsletter to get the latest deals and new product announcements.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-primary-foreground text-primary placeholder:text-primary/70 border-none focus:ring-2 focus:ring-primary-foreground"
            />
            <Button type="submit" variant="secondary" size="lg">
              Subscribe
            </Button>