"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  RefreshCw, 
  CreditCard, 
  CheckCircle, 
  ArrowLeft, 
  Tag, 
  X,
  Truck,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    appliedPromo, 
    applyPromo, 
    removePromo, 
    clearCart 
  } = useStore();

  // Promo Code Form State
  const [promoInput, setPromoInput] = useState("");

  // Checkout Form State
  const [fullName, setFullName] = useState("");
  const [address, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Simulated Checkout result state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderConfirmation] = useState<{
    orderId: string;
    fullName: string;
    address: string;
    totalPaid: number;
    itemsCount: number;
  } | null>(null);

  // Math Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const promoDiscount = appliedPromo ? appliedPromo.discountAmount : 0;
  
  // Final total cannot be below $0
  const finalTotal = Math.max(0, subtotal + shippingFee - promoDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) {
      toast.error("Please enter a promo code.");
      return;
    }

    const code = promoInput.toUpperCase().trim();

    // Check if it's a generated trade-in code or a generic high-value code
    if (code.startsWith("TRADE-")) {
      // Re-apply or simulate valid code
      applyPromo(code, 150, "Traded Device");
    } else if (code === "WELCOME10") {
      applyPromo(code, 50, "Welcome Promo");
    } else if (code === "SUPERPHONIX") {
      applyPromo(code, 300, "Super Discount");
    } else {
      toast.error("Invalid promo code. Try calculating a trade-in value first!");
    }
    setPromoInput("");
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!fullName || !address || !city || !zip || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all shipping and payment fields.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway processing
    setTimeout(() => {
      const orderId = `PHX-ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
      
      setOrderConfirmation({
        orderId,
        fullName,
        address: `${address}, ${city}, ${zip}`,
        totalPaid: finalTotal,
        itemsCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      });

      toast.success("Order processed successfully! Thank you for choosing Phonix.");
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  // If order was successfully completed, show receipt screen
  if (orderReceipt) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-8">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20">
          <CheckCircle className="h-12 w-12" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Order Confirmed!</h1>
          <p className="text-sm text-muted-foreground">
            Thank you for your purchase. Your payment has been processed securely and your shipment is being prepared.
          </p>
        </div>

        <Card className="border-muted/60 text-left bg-card shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Receipt Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Order Number:</span>
              <span className="font-mono font-bold text-foreground">{orderReceipt.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Customer Name:</span>
              <span className="font-bold text-foreground">{orderReceipt.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Shipping Address:</span>
              <span className="font-bold text-foreground text-right max-w-xs">{orderReceipt.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Items Purchased:</span>
              <span className="font-bold text-foreground">{orderReceipt.itemsCount} smartphones</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-sm">
              <span className="font-extrabold text-foreground">Total Paid:</span>
              <span className="font-extrabold text-primary">${orderReceipt.totalPaid}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Link href="/phones">
            <Button size="sm" className="font-bold">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/support">
            <Button size="sm" variant="outline">
              Track Repair & Support
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <span>Shopping Cart</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your smartphones, apply trade-in credits, and complete your checkout securely.
        </p>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cart Items list */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item, index) => (
              <Card key={`${item.phone.id}-${item.selectedColor}-${item.selectedStorage}`} className="border-muted/60">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                  {/* Phone Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.phone.image} 
                    alt={item.phone.name} 
                    className="h-20 w-auto object-contain rounded"
                  />

                  {/* Phone Details */}
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <h3 className="font-extrabold text-sm text-foreground">
                      {item.phone.name}
                    </h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 text-[10px]">
                      <Badge variant="secondary" className="font-medium text-[9px]">
                        Color: {item.selectedColor}
                      </Badge>
                      <Badge variant="outline" className="font-medium text-[9px]">
                        Storage: {item.selectedStorage}
                      </Badge>
                    </div>
                    <p className="text-xs font-bold text-primary pt-1">
                      ${item.price} <span className="text-[10px] text-muted-foreground font-normal">each</span>
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 border rounded-lg p-1 bg-muted/20">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-7 w-7 rounded-md"
                      onClick={() => updateCartQuantity(item.phone.id, item.selectedColor, item.selectedStorage, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-xs font-bold w-6 text-center">
                      {item.quantity}
                    </span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-7 w-7 rounded-md"
                      onClick={() => updateCartQuantity(item.phone.id, item.selectedColor, item.selectedStorage, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Trash/Remove Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                    onClick={() => removeFromCart(item.phone.id, item.selectedColor, item.selectedStorage)}
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            <div className="pt-2">
              <Link href="/phones">
                <Button variant="ghost" size="sm" className="gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Add more phones to cart</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary & Checkout */}
          <div className="lg:col-span-5 space-y-6">
            {/* Promo Code Application */}
            <Card className="border-muted/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-4 w-4" />
                  <span>Apply Trade-In / Promo Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <Input
                    placeholder="e.g. TRADE-APP-XXXX, WELCOME10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="text-xs font-mono uppercase"
                  />
                  <Button type="submit" size="sm" className="text-xs font-semibold shrink-0">
                    Apply
                  </Button>
                </form>

                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-bold">{appliedPromo.code} (-${appliedPromo.discountAmount})</span>
                    </div>
                    <button onClick={removePromo} className="text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-muted/40 rounded-lg text-[10px] text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">💡 Tip for big discounts:</p>
                    <p>
                      Use our <Link href="/trade-in" className="underline text-primary font-semibold">Trade-In tool</Link> to estimate your old phone and get an instant promo code worth up to $650 off!
                    </p>
                    <p className="pt-1 text-primary">Or try test code: <code className="font-mono font-bold bg-muted px-1">WELCOME10</code> for $50 off!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price Calculations Summary */}
            <Card className="border-muted/60">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-bold text-foreground">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Express Shipping</span>
                  <span className="font-bold text-foreground">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">FREE</span>
                    ) : (
                      `$${shippingFee}`
                    )}
                  </span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Trade-In Discount ({appliedPromo?.code})</span>
                    <span className="font-bold">-${promoDiscount}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-base">
                  <span className="font-extrabold text-foreground">Estimated Total</span>
                  <span className="font-extrabold text-primary">${finalTotal}</span>
                </div>
              </CardContent>
            </Card>

            {/* Secure Checkout Form */}
            <Card className="border-muted/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span>Secure Checkout</span>
                </CardTitle>
                <CardDescription className="text-[10px]">
                  SSL encrypted transaction. Your details are fully protected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                    <Input
                      placeholder="e.g. Johnathan Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Shipping Address</label>
                    <Input
                      placeholder="e.g. 100 Innovation Way, Suite 400"
                      value={address}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">City</label>
                      <Input
                        placeholder="e.g. New York"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">ZIP Code</label>
                      <Input
                        placeholder="e.g. 10001"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="text-xs"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Credit Card Number</label>
                    <Input
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="text-xs"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expiry Date</label>
                      <Input
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="text-xs"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CVV Code</label>
                      <Input
                        placeholder="123"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="text-xs"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 text-sm font-semibold gap-2 mt-2"
                    disabled={isProcessing}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>{isProcessing ? "Processing Security Payment..." : `Pay Securely - $${finalTotal}`}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-card space-y-6">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg">Your Cart is Empty</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
              You haven&apos;t added any smartphones to your cart yet. Browse our flagships and deals to find the perfect device.
            </p>
          </div>
          <Link href="/phones">
            <Button size="sm" className="font-bold">
              Browse Smartphones
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
