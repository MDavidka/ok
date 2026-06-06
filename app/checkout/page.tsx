"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  // Step state: 1 = Shipping, 2 = Payment, 3 = Confirmation
  const [step, setStep] = useState(1);

  // Form states
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  // API response state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [receipt, setReceipt] = useState<{
    orderId: string;
    deliveryDate: string;
    totalPaid: number;
  } | null>(null);

  // Math totals (same as cart page)
  const shippingCost = cartTotal >= 150 || cartTotal === 0 ? 0 : 15;
  const taxCost = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + taxCost;

  // Handle shipping form inputs
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  // Handle payment form inputs
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  // Validate shipping step
  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingForm.fullName ||
      !shippingForm.email ||
      !shippingForm.phone ||
      !shippingForm.address ||
      !shippingForm.city ||
      !shippingForm.zipCode
    ) {
      setErrorMessage("Please fill out all shipping fields.");
      return;
    }
    setErrorMessage("");
    setStep(2);
  };

  // Submit order to API route handler
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !paymentForm.cardNumber ||
      !paymentForm.cardExpiry ||
      !paymentForm.cardCvv ||
      !paymentForm.cardName
    ) {
      setErrorMessage("Please fill out all payment details.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          shipping: shippingForm,
          payment: { cardName: paymentForm.cardName },
          total: grandTotal,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReceipt({
          orderId: data.orderId,
          deliveryDate: data.deliveryDate,
          totalPaid: data.totalPaid,
        });
        setStep(3);
        clearCart(); // Empty client cart state
      } else {
        setErrorMessage(data.error || "Order placement failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Connection error. Failed to reach order processing server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-grow container max-w-5xl mx-auto px-4 py-8">
        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center max-w-lg mx-auto mb-10">
          <div className="flex items-center w-full">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Empty Cart Fallback (only if not on success step) */}
        {cartItems.length === 0 && step !== 3 ? (
          <Card className="border-dashed border-2 py-12 text-center max-w-md mx-auto bg-card space-y-4">
            <Smartphone className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <h3 className="text-lg font-bold">Your checkout cart is empty</h3>
            <p className="text-xs text-muted-foreground px-4">
              Please add at least one smartphone to your cart before proceeding to the checkout counter.
            </p>
            <Button asChild size="sm">
              <Link href="/products">Shop Catalog</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-8">
              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <Card className="border border-border/60 bg-card">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Truck className="h-5.5 w-5.5 text-primary" /> Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <form onSubmit={handleNextToPayment} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="fullName" className="text-xs font-semibold">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            required
                            placeholder="e.g. John Doe"
                            value={shippingForm.fullName}
                            onChange={handleShippingChange}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="e.g. john@example.com"
                            value={shippingForm.email}
                            onChange={handleShippingChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-xs font-semibold">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="e.g. (555) 019-2834"
                            value={shippingForm.phone}
                            onChange={handleShippingChange}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="address" className="text-xs font-semibold">Street Address</Label>
                          <Input
                            id="address"
                            name="address"
                            required
                            placeholder="e.g. 123 Tech Boulevard"
                            value={shippingForm.address}
                            onChange={handleShippingChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="city" className="text-xs font-semibold">City</Label>
                          <Input
                            id="city"
                            name="city"
                            required
                            placeholder="e.g. San Francisco"
                            value={shippingForm.city}
                            onChange={handleShippingChange}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="zipCode" className="text-xs font-semibold">ZIP / Postal Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            required
                            placeholder="e.g. 94103"
                            value={shippingForm.zipCode}
                            onChange={handleShippingChange}
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="text-xs text-destructive font-semibold">{errorMessage}</p>
                      )}

                      <div className="pt-4 flex justify-between">
                        <Button variant="outline" asChild>
                          <Link href="/cart">Back to Cart</Link>
                        </Button>
                        <Button type="submit">
                          Continue to Payment <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Details */}
              {step === 2 && (
                <Card className="border border-border/60 bg-card">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <CreditCard className="h-5.5 w-5.5 text-primary" /> Simulated Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="bg-muted/40 p-4 rounded-xl border border-border/40 flex gap-3 text-xs text-muted-foreground">
                      <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground block">Simulated Secure Sandbox</span>
                        We do not collect or store actual credit card credentials. You can enter any mock numeric values below to test the transaction pipeline.
                      </div>
                    </div>

                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="cardName" className="text-xs font-semibold">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          required
                          placeholder="Johnathan Doe"
                          value={paymentForm.cardName}
                          onChange={handlePaymentChange}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="cardNumber" className="text-xs font-semibold">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          required
                          placeholder="4111 2222 3333 4444"
                          value={paymentForm.cardNumber}
                          onChange={handlePaymentChange}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="cardExpiry" className="text-xs font-semibold">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            required
                            placeholder="MM/YY"
                            value={paymentForm.cardExpiry}
                            onChange={handlePaymentChange}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="cardCvv" className="text-xs font-semibold">CVV</Label>
                          <Input
                            id="cardCvv"
                            name="cardCvv"
                            required
                            type="password"
                            maxLength={4}
                            placeholder="123"
                            value={paymentForm.cardCvv}
                            onChange={handlePaymentChange}
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="text-xs text-destructive font-semibold">{errorMessage}</p>
                      )}

                      <div className="pt-4 flex justify-between">
                        <Button variant="outline" onClick={() => setStep(1)}>
                          <ArrowLeft className="h-4 w-4 mr-2" /> Shipping Info
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
                          {isLoading ? "Processing Order..." : `Authorize Payment $${grandTotal.toFixed(2)}`}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Confirmation Receipt */}
              {step === 3 && receipt && (
                <Card className="border-2 border-emerald-500/30 bg-card shadow-lg">
                  <CardHeader className="p-8 text-center space-y-3">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
                    <div>
                      <Badge className="bg-emerald-600 text-white font-bold px-3 py-1 mb-1">ORDER CONFIRMED</Badge>
                      <h2 className="text-2xl font-black text-foreground">Thank You For Your Purchase!</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your transaction was successfully processed and validated by our billing system.
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    <Separator />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-muted/40 p-4 rounded-xl border border-border/40">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block">Order Reference</span>
                        <span className="font-extrabold text-foreground text-base tracking-mono">{receipt.orderId}</span>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block">Estimated Delivery</span>
                        <span className="font-bold text-foreground text-base">{receipt.deliveryDate}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Ship To</h3>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p className="font-semibold text-foreground">{shippingForm.fullName}</p>
                        <p>{shippingForm.address}</p>
                        <p>{shippingForm.city}, {shippingForm.zipCode}</p>
                        <p>Phone: {shippingForm.phone}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Security & Guarantee</h3>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                        <span>
                          Your smartphone package is fully insured. If any issues occur during transit, please contact support@syramobile.com with your Order Reference.
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-center">
                      <Button size="lg" asChild>
                        <Link href="/products">Continue Shopping</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            {step !== 3 && (
              <div className="lg:col-span-4">
                <Card className="border border-border/60 bg-card sticky top-24 shadow-sm">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-base font-bold">Checkout Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-4">
                    {/* Item list */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center justify-between text-xs">
                          <div className="flex gap-2 items-center min-w-0 flex-1">
                            <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-md bg-muted shrink-0 border" />
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-foreground truncate">{item.name}</p>
                              <p className="text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-foreground text-right shrink-0">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Cost Calculations */}
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-semibold text-foreground">${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Cost</span>
                        {shippingCost === 0 ? (
                          <span className="text-emerald-600 font-bold">FREE</span>
                        ) : (
                          <span className="font-semibold text-foreground">${shippingCost.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Sales Tax (8%)</span>
                        <span className="font-semibold text-foreground">${taxCost.toLocaleString()}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center font-bold text-sm text-foreground">
                      <span>Total Amount</span>
                      <span className="text-primary text-base font-black">
                        ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
