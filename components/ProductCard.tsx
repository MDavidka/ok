"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, ShoppingCart, Check, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page when clicking the button
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const hasDiscount = !!product.discountPrice;
  const currentPrice = product.discountPrice || product.price;

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full bg-card hover:shadow-xl transition-all duration-300 border border-border/60">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isSale && (
          <Badge className="bg-destructive hover:bg-destructive text-destructive-foreground font-semibold px-2.5 py-0.5 text-xs">
            SALE
          </Badge>
        )}
        {product.isNew && (
          <Badge className="bg-primary hover:bg-primary text-primary-foreground font-semibold px-2.5 py-0.5 text-xs">
            NEW
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative pt-[80%] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay Hover Effect */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="shadow-md">
            <Eye className="h-4 w-4 mr-1.5" /> View Specs
          </Button>
        </div>
      </Link>

      {/* Card Content */}
      <CardHeader className="p-4 pb-1 flex-1">
        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          {product.brand}
        </div>
        <Link href={`/products/${product.id}`} className="hover:underline block">
          <h3 className="font-bold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-current"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {product.rating} ({product.reviewsCount})
          </span>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Price Display */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-extrabold text-foreground">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleQuickAdd}
          variant={isAdded ? "secondary" : "default"}
          className={`w-full transition-all duration-300 ${
            isAdded ? "bg-emerald-600 hover:bg-emerald-600 text-white" : ""
          }`}
          disabled={isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
