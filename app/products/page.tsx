import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "@/lib/types";

// Mock data for all available phones
// In a real application, this would be fetched from an API or database.
const allPhones: Phone[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999.99,
    description: "The latest iPhone with a titanium design and A17 Pro chip. Stunning camera, incredible performance.",
    imageUrls: ["https://placehold.co/600x400.png?text=iPhone+15+Pro"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colorOptions: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199.99,
    description: "Experience the power of AI with the new Galaxy S24 Ultra. Revolutionary camera and S Pen integration.",
    imageUrls: ["https://placehold.co/600x400.png?text=Galaxy+S24+Ultra"],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 899.99,
    description: "The smartest Pixel yet, with advanced camera and AI features. Unmatched photo and video capabilities.",
    imageUrls: ["https://placehold.co/600x400.png?text=Pixel+8+Pro"],
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["Obsidian", "Porcelain", "Bay"],
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 799.00,
    description: "Fast and fluid experience with a stunning display and powerful performance. Hasselblad camera system.",
    imageUrls: ["https://placehold.co/600x400.png?text=OnePlus+12"],
    storageOptions: ["256GB", "512GB"],
    colorOptions: ["Flowy Emerald", "Silky Black"],
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 999.00,
    description: "Professional-grade camera system and cutting-edge technology. Designed for photography enthusiasts.",
    imageUrls: ["https://placehold.co/600x400.png?text=Xiaomi+14+Ultra"],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Black", "White", "Titanium Blue"],
  },
  {
    id: "sony-xperia-1-v",
    name: "Sony Xperia 1 V",
    brand: "Sony",
    price: 1399.99,
    description: "Cinematic experience with a 4K OLED display and advanced camera features. For creators and cinephiles.",
    imageUrls: ["https://placehold.co/600x400.png?text=Sony+Xperia+1+V"],
    storageOptions: ["256GB", "512GB"],
    colorOptions: ["Black", "Khaki Green"],
  },
  {
    id: "asus-rog-phone-8-pro",
    name: "ASUS ROG Phone 8 Pro",
    brand: "ASUS",
    price: 1199.00,
    description: "Ultimate gaming phone with top-tier performance and cooling. Dominate your mobile gaming sessions.",
    imageUrls: ["https://placehold.co/600x400.png?text=ROG+Phone+8+Pro"],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Phantom Black"],
  },
  {
    id: "nothing-phone-2",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    price: 699.00,
    description: "Unique transparent design with Glyph Interface and smooth performance. Stand out from the crowd.",
    imageUrls: ["https://placehold.co/600x400.png?text=Nothing+Phone+(2)"],
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["White", "Dark Grey"],
  },
];

export default async function ProductsPage() {
  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
        Our Products
      </h1>
      <p className="mb-12 text-center text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
        Explore our extensive collection of the latest smartphones from leading brands. Find your perfect device today.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allPhones.map((phone) => (
          <Card key={phone.id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                <Image
                  src={phone.imageUrls[0]}
                  alt={phone.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-xl font-semibold mb-1">{phone.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-2">{phone.brand}</CardDescription>
              <p className="text-lg font-bold text-primary mb-3">${phone.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground line-clamp-3">{phone.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/products/${phone.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
[/code]
[file]app/products/page.tsx[file][usedfor]Displays a list of all available phones in the store. It fetches product data and renders each phone using the `Card` component, allowing users to browse the inventory.[usedfor]