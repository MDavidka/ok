"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/lib/data";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setTimeout(() => setIsAdding(false), 500); // Simulate a brief loading state
  };

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className="w-full sm:w-auto">
      <ShoppingCart className="mr-2 h-4 w-4" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  );
}
