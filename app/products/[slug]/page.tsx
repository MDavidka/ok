import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Empty } from "@/components/ui/empty";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Plus, Minus, ShoppingCart, Info } from "lucide-react";

// Mock Data - In a real application, this would be fetched from a database or API
// Extending the mock product data for detailed view
const mockProductsDetail: (Product & { longDescription: string; detailedFeatures: { name: string; description: string }[]; specifications: { label: string; value: string }[]; })[] = [
  {
    id: "prod1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    description: "The latest flagship from Apple with A17 Bionic chip.",
    longDescription: "Experience the pinnacle of smartphone technology with the iPhone 15 Pro Max. Featuring the groundbreaking A17 Bionic chip, a stunning Super Retina XDR display with ProMotion, and an advanced Pro camera system capable of capturing breathtaking photos and cinematic videos. Its durable design, all-day battery life, and innovative Dynamic Island make it the ultimate device for professionals and enthusiasts alike.",
    price: 1199.99,
    imageUrl: "https://placehold.co/800x800.png?text=iPhone+15+Pro+Max",
    category: "Smartphones",
    brand: "Apple",
    stock: 15,
    features: ["6.7-inch Super Retina XDR display", "Dynamic Island", "Pro camera system"],
    detailedFeatures: [
      { name: "A17 Bionic Chip", description: "The fastest chip ever in a smartphone, delivering unparalleled performance." },
      { name: "ProMotion Technology", description: "Adaptive refresh rates up to 120Hz for incredibly fluid scrolling and responsiveness." },
      { name: "Cinematic Mode", description: "Records videos with shallow depth of field and automatically shifts focus." },
      { name: "Ceramic Shield", description: "Tougher than any smartphone glass." },
    ],
    specifications: [
      { label: "Display", value: "6.7-inch Super Retina XDR OLED" },
      { label: "Processor", value: "A17 Bionic Chip" },
      { label: "Rear Camera", value: "48MP Main, 12MP Ultra Wide, 12MP Telephoto" },
      { label: "Front Camera", value: "12MP TrueDepth" },
      { label: "Storage Options", value: "128GB, 256GB, 512GB, 1TB" },
      { label: "Battery Life", value: "Up to 29 hours video playback" },
      { label: "Water Resistance", value: "IP68 (up to 6 meters for 30 minutes)" },
    ],
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "Samsung's top-tier Android phone with S Pen integration.",
    longDescription: "Unleash your creativity and productivity with the Samsung Galaxy S24 Ultra. Featuring an integrated S Pen, a stunning 6.8-inch Dynamic AMOLED 2X display, and the powerful Snapdragon 8 Gen 3 processor. Its revolutionary camera system, including a 200MP main sensor, captures incredible detail, while the durable titanium frame ensures longevity. Experience the future of mobile with Galaxy AI.",
    price: 1299.99,
    imageUrl: "https://placehold.co/800x800.png?text=Galaxy+S24+Ultra",
    category: "Smartphones",
    brand: "Samsung",
    stock: 10,
    features: ["6.8-inch Dynamic AMOLED 2X", "Snapdragon 8 Gen 3", "Titanium frame"],
    detailedFeatures: [
      { name: "Integrated S Pen", description: "Write, draw, and control your phone with precision." },
      { name: "Galaxy AI", description: "Advanced AI features for enhanced communication, productivity, and creativity." },
      { name: "200MP Camera", description: "Capture stunning photos with incredible detail and clarity." },
      { name: "Dynamic AMOLED 2X", description: "Vibrant and bright display for an immersive viewing experience." },
    ],
    specifications: [
      { label: "Display", value: "6.8-inch Dynamic AMOLED 2X" },
      { label: "Processor", value: "Snapdragon 8 Gen 3 for Galaxy" },
      { label: "Rear Camera", value: "200MP Main, 12MP Ultra-Wide, 10MP Telephoto (x3), 50MP Telephoto (x5)" },
      { label: "Front Camera", value: "12MP" },
      { label: "Storage Options", value: "256GB, 512GB, 1TB" },
      { label: "Battery Life", value: "5000 mAh" },
      { label: "Water Resistance", value: "IP68" },
    ],
    status: "sale",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod3",
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    description: "Google's AI-powered smartphone with an exceptional camera.",
    longDescription: "The Google Pixel 8 Pro is engineered with Google AI at its core, offering a smarter, more helpful phone experience. Its advanced camera system, powered by the Tensor G3 chip, delivers stunning photos and videos, while features like Magic Editor and Best Take redefine mobile photography. Enjoy a beautiful 6.7-inch Super Actua display and all-day battery life, all within a sleek, durable design.",
    price: 999.00,
    imageUrl: "https://placehold.co/800x800.png?text=Pixel+8+Pro",
    category: "Smartphones",
    brand: "Google",
    stock: 20,
    features: ["6.7-inch Super Actua display", "Tensor G3 chip", "Advanced AI features"],
    detailedFeatures: [
      { name: "Tensor G3 Chip", description: "Google's most powerful chip yet, custom-designed with Google AI for cutting-edge photo and video features." },
      { name: "Magic Editor", description: "Easily reposition and resize subjects or use presets to make your photos pop." },
      { name: "Best Take", description: "Combine similar photos into one fantastic picture where everyone looks their best." },
      { name: "Super Actua Display", description: "Google's brightest display ever, offering incredible clarity even in direct sunlight." },
    ],
    specifications: [
      { label: "Display", value: "6.7-inch Super Actua OLED" },
      { label: "Processor", value: "Google Tensor G3" },
      { label: "Rear Camera", value: "50MP Main, 48MP Ultra-Wide, 48MP Telephoto" },
      { label: "Front Camera", value: "10.5MP" },
      { label: "Storage Options", value: "128GB, 256GB, 512GB, 1TB" },
      { label: "Battery Life", value: "Over 24 hours" },
      { label: "Water Resistance", value: "IP68" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prod4",
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "Fast and fluid experience with powerful performance.",
    longDescription: "The OnePlus 12 delivers a fast and fluid experience with its powerful Snapdragon 8 Gen 3 processor and a stunning 6.82-inch Fluid AMOLED display. Co-developed with Hasselblad, its camera system captures professional-grade photos. With 100W SUPERVOOC charging, you'll be powered up in minutes, ensuring you never miss a beat. A true flagship experience without compromise.",
    price: 799.00,
    imageUrl: "https://placehold.co/800x800.png?text=OnePlus+12",
    category: "Smartphones",
    brand: "OnePlus",
    stock: 8,
    features: ["6.82-inch Fluid AMOLED", "Snapdragon 8 Gen 3", "Hasselblad Camera for Mobile"],
    detailedFeatures: [
      { name: "Snapdragon 8 Gen 3", description: "Next-gen performance for demanding tasks and gaming." },
      { name: "100W SUPERVOOC Charging", description: "Charge your phone from 1-100% in just 26 minutes." },
      { name: "Hasselblad Camera", description: "Professional-grade photography with natural color calibration." },
      { name: "Fluid AMOLED Display", description: "Smooth visuals with a 120Hz refresh rate and high brightness." },
    ],
    specifications: [
      { label: "Display", value: "6.82-inch Fluid AMOLED" },
      { label: "Processor", value: "Snapdragon 8 Gen 3" },
      { label: "Rear Camera", value: "50MP Main, 48MP Ultra-Wide, 64MP Periscope Telephoto" },
      { label: "Front Camera", value: "32MP" },
      { label: "Storage Options", value: "256GB, 512GB, 1TB" },
      { label: "Battery Life", value: "5400 mAh" },
      { label: "Water Resistance", value: "IP65" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// This function can be a server component or part of a server action for metadata
// For a client component, Next.js allows `generateMetadata` to be defined in the same file
// but it will run on the server.
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = mockProductsDetail.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Product Not Found | Phone Shop",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.name} | Phone Shop`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Phone Shop`,
      description: product.description,
      images: [product.imageUrl],
      url: `https://your-phone-shop.com/products/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Phone Shop`,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<(Product & { longDescription: string; detailedFeatures: { name: string; description: string }[]; specifications: { label: string; value: string }[]; }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const foundProduct = mockProductsDetail.find((p) => p.slug === params.slug);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null); // Product not found
    }
    setLoading(false);
  }, [params.slug]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + delta;
      if (product && newQuantity > product.stock) {
        return product.stock; // Cannot exceed stock
      }
      return Math.max(1, newQuantity); // Quantity cannot be less than 1
    });
  };

  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= product.stock) {
      console.log(`Added ${quantity} x ${product.name} to cart.`);
      // In a real application, this would dispatch an action to a cart context/store
      // or call an API to add the item to the user's cart.
      // For now, just a console log.
    } else if (product && product.stock === 0) {
      console.log(`${product.name} is out of stock.`);
    } else {
      console.log("Invalid quantity or product.");
    }
  };

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p>Loading product details...</p> {/* Could use a Skeleton component here */}
      </div>
    );
  }

  if (!product) {
    return (
      <Empty className="py-16">
        <div className="flex flex-col items-center justify-center">
          <Info className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-semibold">Product Not Found</h3>
          <p className="text-muted-foreground">
            The product you are looking for does not exist or has been removed.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </Empty>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {/* Product Image Section */}
        <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg border">
          {/* Using Carousel for potential multiple images, though mock only has one */}
          <Carousel className="w-full h-full">
            <CarouselContent>
              {/* Simulate multiple images by repeating the main one or using different placeholders */}
              {[product.imageUrl, "https://placehold.co/800x800.png?text=Product+View+2", "https://placehold.co/800x800.png?text=Product+View+3"].map((imgSrc, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-full w-full">
                    <Image
                      src={imgSrc}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                      priority={index === 0} // Prioritize the first image
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>
            {product.status && product.status !== 'default' && (
              <Badge
                variant={
                  product.status === "sale"
                    ? "destructive"
                    : product.status === "new"
                    ? "default"
                    : "secondary"
                }
                className="ml-4 flex-shrink-0"
              >
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </Badge>
            )}
          </div>
          <p className="mb-2 text-lg text-muted-foreground">{product.brand}</p>
          <p className="mb-6 text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</p>

          <p className="mb-6 text-base leading-relaxed text-foreground">
            {product.longDescription}
          </p>

          <Separator className="my-6" />

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center space-x-4">
            <Label htmlFor="quantity" className="text-lg font-medium">
              Quantity:
            </Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    setQuantity(Math.max(1, Math.min(val, product.stock)));
                  }
                }}
                className="mx-2 w-16 text-center"
                min={1}
                max={product.stock}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {product.stock > 0 && (
              <span className="text-sm text-muted-foreground">
                ({product.stock} in stock)
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="mb-8 w-full md:w-auto"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          <Separator className="my-6" />

          {/* Features and Specifications */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>Highlights of this product.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {product.detailedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center text-left">
                            <Info className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="font-medium text-foreground">{feature.name}:</span> {feature.description}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{feature.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>Detailed technical information.</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {product.specifications.map((spec, index) => (
                    <React.Fragment key={index}>
                      <dt className="font-medium text-foreground">{spec.label}</dt>
                      <dd className="text-muted-foreground">{spec.value}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
[/code]
[file]app/products/[slug]/page.tsx[/file][usedfor]product detail page[/usedfor]