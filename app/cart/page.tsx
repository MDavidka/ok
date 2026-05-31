"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";

// Mock Product and CartItem interfaces
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Mock Product Data (simplified for cart display)
const mockProducts: Product[] = [
  {
    id: "1",
    name: "SyraPhone X Pro",
    brand: "Syra",
    price: 999.99,
    image: "/images/syraphone-x-pro.webp",
  },
  {
    id: "2",
    name: "SyraPhone 8 Lite",
    brand: "Syra",
    price: 349.99,
    image: "/images/syraphone-8-lite.webp",
  },
  {
    id: "3",
    name: "GamerPhone Elite",
    brand: "GamerTech",
    price: 1199.99,
    image: "/images/gamerphone-elite.webp",
  },
  {
    id: "4",
    name: "PhotoMaster 5G",
    brand: "LensPro",
    price: 899.99,
    image: "/images/photomaster-5g.webp",
  },
];

// Mock Cart Data (for initial state)
const initialCartItems: CartItem[] = [
  { product: mockProducts[0], quantity: 1 },
  { product: mockProducts[1], quantity: 2 },
  { product: mockProducts[3], quantity: 1 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // In a real application, you would fetch cart data from an API or global state
    setCartItems(initialCartItems);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, newQuantity) } // Ensure quantity is at least 1
            : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity becomes 0 (though buttons prevent this)
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card className="p-8 text-center">
            <CardTitle className="mb-4">Your cart is empty</CardTitle>
            <CardDescription className="mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </CardDescription>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.product.id} className="flex flex-col sm:flex-row items-center p-4">
                  <div className="relative w-24 h-24 flex-shrink-0 mr-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left mt-4 sm:mt-0">
                    <Link href={`/products/${item.product.id}`} className="hover:underline">
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    </Link>
                    <p className="text-muted-foreground text-sm">{item.product.brand}</p>
                    <p className="text-lg font-bold mt-1">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.product.id)}
                      className="ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="lg:col-span-1 h-fit sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}