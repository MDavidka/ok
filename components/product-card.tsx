import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // Placeholder for add to cart functionality
  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart!`);
    // In a real application, this would dispatch an action to a cart context/store
    // or call an API to add the item to the user's cart.
  };

  return (
    <Card className={cn("h-full overflow-hidden flex flex-col", className)}>
      <Link href={`/products/${product.slug}`} className="block flex-grow">
        <CardHeader className="p-0">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              priority // Prioritize loading for initial product cards
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg font-semibold line-clamp-1 pr-2">
              {product.name}
            </CardTitle>
            {product.status && product.status !== 'default' && (
              <Badge
                variant={
                  product.status === "sale"
                    ? "destructive"
                    : product.status === "new"
                    ? "default"
                    : "secondary"
                }
                className="flex-shrink-0"
              >
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </Badge>
            )}
          </div>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
            {product.description}
          </CardDescription>
          <p className="text-xl font-bold mt-3">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
[/code]
[file]components/product-card.tsx[/file][usedfor]product display card[/usedfor]