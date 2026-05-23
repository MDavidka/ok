import { notFound } from "next/navigation";
import Image from "next/image";

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

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

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
];

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = params;

  // Simulate API call to fetch product details
  const product = mockProducts.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <Card className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8">
        <div className="lg:w-1/2 flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            className="rounded-lg object-contain max-h-[500px] w-full"
            priority
          />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {product.brand}
            </CardDescription>
            <p className="text-2xl font-semibold mt-2">
              {formatCurrency(product.price)}
            </p>
          </CardHeader>
          <CardContent className="p-0 space-y-4 flex-grow">
            <p className="text-base text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </div>
              <div>
                <span className="font-medium">Storage:</span> {product.storage}
              </div>
              <div>
                <span className="font-medium">Color:</span> {product.color}
              </div>
              <div>
                <span className="font-medium">Availability:</span>{" "}
                <span
                  className={cn(
                    product.inStock ? "text-green-600" : "text-red-600"
                  )}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {product.rating && (
                <div>
                  <span className="font-medium">Rating:</span> {product.rating}{" "}
                  ({product.reviewsCount} reviews)
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-0 pt-6">
            <Button
              size="lg"
              className="w-full"
              disabled={!product.inStock}
              onClick={() => {
                // Simulate add to cart action
                console.log(`Added ${product.name} to cart!`);
                // toast.success(`${product.name} added to cart!`); // If sonner was integrated
              }}
            >
              {product.inStock ? "Add to Cart" : "Notify Me When Available"}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </main>
  );
}
app/products/[slug]/page.tsx[usedfor]A dynamic route for displaying comprehensive details of a specific phone product, including specifications, images, and purchase options.[usedfor]