"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock Product and CartItem interfaces (should ideally come from a shared type definition)
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

// Mock Product Data (simplified for cart display, same as cart page)
const mockProducts: Product[] = [
  { id: "1", name: "SyraPhone X Pro", brand: "Syra", price: 999.99, image: "/images/syraphone-x-pro.webp" },
  { id: "2", name: "SyraPhone 8 Lite", brand: "Syra", price: 349.99, image: "/images/syraphone-8-lite.webp" },
  { id: "3", name: "GamerPhone Elite", brand: "GamerTech", price: 1199.99, image: "/images/gamerphone-elite.webp" },
  { id: "4", name: "PhotoMaster 5G", brand: "LensPro", price: 899.99, image: "/images/photomaster-5g.webp" },
];

// Mock Cart Data (for initial state, same as cart page)
const initialCartItems: CartItem[] = [
  { product: mockProducts[0], quantity: 1 },
  { product: mockProducts[1], quantity: 2 },
  { product: mockProducts[3], quantity: 1 },
];

// State types for checkout forms
interface ShippingDetails {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentDetails {
  method: "credit_card" | "paypal" | "";
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardholderName: string;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("shipping"); // "shipping", "payment", "confirmation"
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA", // Default country
    phone: "",
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
  });
  const [cartItems] = useState<CartItem[]>(initialCartItems); // Using mock cart items

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = 15.00; // Example fixed shipping cost
  const total = subtotal + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!shippingDetails.fullName || !shippingDetails.address1 || !shippingDetails.city || !shippingDetails.state || !shippingDetails.postalCode || !shippingDetails.country || !shippingDetails.phone) {
      alert("Please fill in all required shipping details.");
      return;
    }
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (paymentDetails.method === "credit_card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc || !paymentDetails.cardholderName) {
        alert("Please fill in all credit card details.");
        return;
      }
    } else if (paymentDetails.method === "") {
      alert("Please select a payment method.");
      return;
    }
    setCurrentStep("confirmation");
  };

  const handlePlaceOrder = () => {
    // In a real app, this would send data to a backend, clear cart, redirect to order success page
    alert("Order Placed Successfully!");
    // For now, just redirect to home
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <Tabs value={currentStep} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping" disabled={currentStep !== "shipping"}>Shipping</TabsTrigger>
                <TabsTrigger value="payment" disabled={currentStep === "shipping"}>Payment</TabsTrigger>
                <TabsTrigger value="confirmation" disabled={currentStep !== "confirmation" && currentStep !== "payment"}>Confirmation</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {currentStep === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input
                    id="address1"
                    value={shippingDetails.address1}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address1: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                  <Input
                    id="address2"
                    value={shippingDetails.address2}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={shippingDetails.state}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={shippingDetails.country}
                    onValueChange={(value) => setShippingDetails({ ...shippingDetails, country: value })}
                    required
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="CAN">Canada</SelectItem>
                      <SelectItem value="GBR">United Kingdom</SelectItem>
                      <SelectItem value="AUS">Australia</SelectItem>
                      <SelectItem value="DEU">Germany</SelectItem>
                      <SelectItem value="FRA">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Next: Payment</Button>
                </div>
              </form>
            )}

            {currentStep === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>

                <RadioGroup
                  value={paymentDetails.method}
                  onValueChange={(value: "credit_card" | "paypal") => setPaymentDetails({ ...paymentDetails, method: value })}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="credit_card"
                    className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      paymentDetails.method === "credit_card" && "border-primary ring-2 ring-primary"
                    )}
                  >
                    <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mb-3 h-6 w-6"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                    Credit Card
                  </Label>
                  <Label
                    htmlFor="paypal"
                    className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      paymentDetails.method === "paypal" && "border-primary ring-2 ring-primary"
                    )}
                  >
                    <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mb-3 h-6 w-6"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                      <path d="M7.5 8.5h9" />
                      <path d="M7.5 12h9" />
                      <path d="M7.5 15.5h9" />
                    </svg>
                    PayPal
                  </Label>
                </RadioGroup>

                {paymentDetails.method === "credit_card" && (
                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength={19} // 16 digits + 3 spaces
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          value={paymentDetails.cvc}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                          placeholder="XXX"
                          maxLength={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          value={paymentDetails.cardholderName}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentDetails.method === "paypal" && (
                  <div className="mt-6 text-center text-muted-foreground">
                    You will be redirected to PayPal to complete your purchase.
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep("shipping")}>Back to Shipping</Button>
                  <Button type="submit">Review Order</Button>
                </div>
              </form>
            )}

            {currentStep === "confirmation" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>

                {/* Shipping Details Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>{shippingDetails.fullName}</p>
                    <p>{shippingDetails.address1}</p>
                    {shippingDetails.address2 && <p>{shippingDetails.address2}</p>}
                    <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}</p>
                    <p>{shippingDetails.country}</p>
                    <p>Phone: {shippingDetails.phone}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" onClick={() => setCurrentStep("shipping")} className="p-0 h-auto">Edit Shipping</Button>
                  </CardFooter>
                </Card>

                {/* Payment Details Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>Method: {paymentDetails.method === "credit_card" ? "Credit Card" : "PayPal"}</p>
                    {paymentDetails.method === "credit_card" && (
                      <>
                        <p>Card ending in: **** {paymentDetails.cardNumber.slice(-4)}</p>
                        <p>Cardholder: {paymentDetails.cardholderName}</p>
                      </>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" onClick={() => setCurrentStep("payment")} className="p-0 h-auto">Edit Payment</Button>
                  </CardFooter>
                </Card>

                {/* Order Items Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Totals */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Totals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep("payment")}>Back to Payment</Button>
                  <Button onClick={handlePlaceOrder}>Place Order</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}