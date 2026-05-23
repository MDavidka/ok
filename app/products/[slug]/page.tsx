import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import { Phone } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for all available phones
// In a real application, this would be fetched from an API or database.
const allPhones: Phone[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999.99,
    description: "The latest iPhone with a titanium design and A17 Pro chip. Stunning camera, incredible performance, and a customizable Action Button.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=iPhone+15+Pro+Front",
      "https://placehold.co/800x600.png?text=iPhone+15+Pro+Back",
      "https://placehold.co/800x600.png?text=iPhone+15+Pro+Side",
    ],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colorOptions: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199.99,
    description: "Experience the power of AI with the new Galaxy S24 Ultra. Revolutionary camera, S Pen integration, and a vibrant Dynamic AMOLED 2X display.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=Galaxy+S24+Ultra+Front",
      "https://placehold.co/800x600.png?text=Galaxy+S24+Ultra+Back",
      "https://placehold.co/800x600.png?text=Galaxy+S24+Ultra+S+Pen",
    ],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 899.99,
    description: "The smartest Pixel yet, with advanced camera and AI features. Unmatched photo and video capabilities, powered by Google Tensor G3.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=Pixel+8+Pro+Front",
      "https://placehold.co/800x600.png?text=Pixel+8+Pro+Back",
      "https://placehold.co/800x600.png?text=Pixel+8+Pro+Camera",
    ],
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["Obsidian", "Porcelain", "Bay"],
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 799.00,
    description: "Fast and fluid experience with a stunning display and powerful performance. Hasselblad camera system for professional-grade photos.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=OnePlus+12+Front",
      "https://placehold.co/800x600.png?text=OnePlus+12+Back",
      "https://placehold.co/800x600.png?text=OnePlus+12+Display",
    ],
    storageOptions: ["256GB", "512GB"],
    colorOptions: ["Flowy Emerald", "Silky Black"],
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 999.00,
    description: "Professional-grade camera system and cutting-edge technology. Designed for photography enthusiasts with a Leica co-engineered camera.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=Xiaomi+14+Ultra+Front",
      "https://placehold.co/800x600.png?text=Xiaomi+14+Ultra+Back",
      "https://placehold.co/800x600.png?text=Xiaomi+14+Ultra+Camera",
    ],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Black", "White", "Titanium Blue"],
  },
  {
    id: "sony-xperia-1-v",
    name: "Sony Xperia 1 V",
    brand: "Sony",
    price: 1399.99,
    description: "Cinematic experience with a 4K OLED display and advanced camera features. For creators and cinephiles, with real-time Eye AF.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=Sony+Xperia+1+V+Front",
      "https://placehold.co/800x600.png?text=Sony+Xperia+1+V+Back",
      "https://placehold.co/800x600.png?text=Sony+Xperia+1+V+Display",
    ],
    storageOptions: ["256GB", "512GB"],
    colorOptions: ["Black", "Khaki Green"],
  },
  {
    id: "asus-rog-phone-8-pro",
    name: "ASUS ROG Phone 8 Pro",
    brand: "ASUS",
    price: 1199.00,
    description: "Ultimate gaming phone with top-tier performance and cooling. Dominate your mobile gaming sessions with AirTrigger controls.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=ROG+Phone+8+Pro+Front",
      "https://placehold.co/800x600.png?text=ROG+Phone+8+Pro+Back",
      "https://placehold.co/800x600.png?text=ROG+Phone+8+Pro+Gaming",
    ],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Phantom Black"],
  },
  {
    id: "nothing-phone-2",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    price: 699.00,
    description: "Unique transparent design with Glyph Interface and smooth performance. Stand out from the crowd with a distinctive aesthetic.",
    imageUrls: [
      "https://placehold.co/800x600.png?text=Nothing+Phone+(2)+Front",
      "https://placehold.co/800x600.png?text=Nothing+Phone+(2)+Back",
      "https://placehold.co/800x600.png?text=Nothing+Phone+(2)+Glyph",
    ],
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["White", "Dark Grey"],
  },
];

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const phone = allPhones.find((p) => p.id === params.slug);

  if (!phone) {
    notFound(); // Next.js built-in notFound function to render 404 page
  }

  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Carousel */}
        <div className="relative">
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {phone.imageUrls.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={imageUrl}
                          alt={`${phone.name} - Image ${index + 1}`}
                          width={800}
                          height={600}
                          className="rounded-md object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl font-bold">{phone.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {phone.brand}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-4xl font-extrabold text-primary mb-4">
                ${phone.price.toFixed(2)}
              </p>
              <p className="text-base text-foreground mb-6">
                {phone.description}
              </p>

              <Separator className="my-6" />

              {/* Storage Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Storage Options:</h3>
                <div className="flex flex-wrap gap-2">
                  {phone.storageOptions.map((option) => (
                    <Badge key={option} variant="secondary" className="px-4 py-2 text-base">
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Color Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Color Options:</h3>
                <div className="flex flex-wrap gap-2">
                  {phone.colorOptions.map((option) => (
                    <Badge key={option} variant="secondary" className="px-4 py-2 text-base">
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="flex-1">
                  Add to Cart
                </Button>
                <Link href="/products" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    Back to Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
[/code]
[file]app/products/[slug]/page.tsx[file][usedfor]A dynamic route for displaying detailed information about a specific phone. It fetches data for a single product based on its slug and presents details, images (using `Carousel`), and 'Add to Cart' options.[usedfor]