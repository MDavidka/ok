import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "@/lib/types";

// Mock data for featured phones
const featuredPhones: Phone[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999.99,
    description: "The latest iPhone with a titanium design and A17 Pro chip.",
    imageUrls: ["https://placehold.co/600x400.png?text=iPhone+15+Pro"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colorOptions: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199.99,
    description: "Experience the power of AI with the new Galaxy S24 Ultra.",
    imageUrls: ["https://placehold.co/600x400.png?text=Galaxy+S24+Ultra"],
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 899.99,
    description: "The smartest Pixel yet, with advanced camera and AI features.",
    imageUrls: ["https://placehold.co/600x400.png?text=Pixel+8+Pro"],
    storageOptions: ["128GB", "256GB", "512GB"],
    colorOptions: ["Obsidian", "Porcelain", "Bay"],
  },
];

export default async function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12 lg:py-16">
      {/* Hero Section */}
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Discover Your Next Smartphone.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Explore the latest models from top brands. Unbeatable prices, cutting-edge technology.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <Image
            src="https://placehold.co/600x400.png?text=Hero+Image"
            alt="Hero Image"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container py-8 md:py-12 lg:py-16">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter md:text-4xl">
          Featured Products
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPhones.map((phone) => (
            <Card key={phone.id} className="flex flex-col">
              <CardHeader className="flex-grow">
                <Image
                  src={phone.imageUrls[0]}
                  alt={phone.name}
                  width={600}
                  height={400}
                  className="mb-4 h-48 w-full rounded-md object-cover"
                />
                <CardTitle>{phone.name}</CardTitle>
                <CardDescription>{phone.brand}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg font-semibold">${phone.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{phone.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/products/${phone.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container py-8 md:py-12 lg:py-16 text-center">
        <Card className="p-8 md:p-12">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Ready to Upgrade?
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-muted-foreground">
              Browse our full collection of smartphones and find the perfect device for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/products">
              <Button size="lg" className="mt-6">
                Explore All Phones
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
[/code]
[file]app/page.tsx[file][usedfor]The main landing page of the phone store. It serves as the entry point for users, featuring promotional content, featured products, and navigation to other parts of the site.[usedfor]