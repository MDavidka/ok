"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, CartItem, Order } from '@/components/cart-context';
import { 
  ShoppingCart, 
  Trash2, 
  ChevronRight, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart, addOrder } = useCart();

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Checkout form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });
  const [isSubmitting, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const subtotal = getCartTotal();
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 15;
  const tax = parseFloat(((subtotal - discountAmount) * 0.0825).toFixed(2));
  const total = parseFloat((subtotal + shipping + tax - discountAmount).toFixed(2));

  // Apply promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'PHONEX50') {
      if (subtotal < 300) {
        setPromoError('Promo code PHONEX50 requires a minimum order of $300.');
        return;
      }
      setDiscountAmount(50);
      setAppliedPromo('PHONEX50 ($50 Off)');
      setPromoCode('');
    } else if (code === 'WELCOME10') {
      const discount = parseFloat((subtotal * 0.10).toFixed(2));
      setDiscountAmount(discount);
      setAppliedPromo('WELCOME10 (10% Off)');
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "PHONEX50" or "WELCOME10".');
    }
  };

  const handleRemovePromo = () => {
    setDiscountAmount(0);
    setAppliedPromo(null);
  };

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Checkout submission
  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (cart.length === 0) {
      setFormError('Your shopping cart is empty.');
      return;
    }

    setIsLoading(true);

    try {
      // Send order to Route Handler for validation and simulation
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customer: formData,
          pricing: {
            subtotal,
            shipping,
            tax,
            discount: discountAmount,
            total
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong processing your order.');
      }

      // Add to local state order history
      const confirmedOrder: Order = {
        id: data.orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: [...cart],
        subtotal,
        tax,
        shipping,
        discount: discountAmount,
        total,
        customer: formData,
        status: 'processing'
      };

      addOrder(confirmedOrder);
      
      // Clear cart
      clearCart();

      // Redirect to Order Success Page
      router.push(`/order-success?orderId=${data.orderId}`);
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Shopping Cart</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white border rounded-2xl space-y-6 max-w-2xl mx-auto">
          <div className="h-16 w-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-xl text-slate-900">Your cart is empty</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Looks like you haven't added any premium smartphones to your cart yet. Let's start shopping!
            </p>
          </div>
          <Link href="/phones">
            <Button className="gap-2 px-6">
              <ArrowLeft className="h-4 w-4" /> Browse Catalog
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items list */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6 border-b bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Cart Items ({cart.length})</h3>
                <Link href="/phones" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                  Continue Shopping <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="divide-y">
                {cart.map((item, index) => (
                  <div key={`${item.phoneId}-${item.color}-${item.storage}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center">
                    {/* Phone Mini Image */}
                    <div className="h-24 w-24 bg-slate-50 rounded-lg p-2 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="object-contain h-full" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                      <h4 className="font-bold text-slate-900 truncate text-base">{item.name}</h4>
                      <p className="text-xs text-slate-500">
                        Color: <span className="font-semibold text-slate-800">{item.color}</span> | Storage: <span className="font-semibold text-slate-800">{item.storage}</span>
                      </p>
                      <p className="text-sm font-extrabold text-slate-900">${item.price}</p>
                    </div>

                    {/* Quantity & Delete Actions */}
                    <div className="flex items-center gap-4 shrink-0">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded bg-slate-50">
                        <button 
                          onClick={() => updateQuantity(item.phoneId, item.color, item.storage, item.quantity - 1)}
                          className="px-2 py-1 font-bold hover:bg-slate-100 text-slate-600 border-r text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold text-xs text-slate-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.phoneId, item.color, item.storage, item.quantity + 1)}
                          className="px-2 py-1 font-bold hover:bg-slate-100 text-slate-600 border-l text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-extrabold text-sm text-slate-900 w-16 text-right">
                        ${(item.price * item.quantity)}
                      </span>

                      {/* Delete */}
                      <button 
                        onClick={() => removeFromCart(item.phoneId, item.color, item.storage)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Checkout Form */}
            <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" /> Delivery & Payment Details
                </h3>
                <p className="text-xs text-slate-500 mt-1">Provide your details to complete the simulated checkout.</p>
              </div>

              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitCheckout} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Shipping Street Address</label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="e.g. 123 Tech Boulevard Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">City & State</label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="e.g. Los Angeles, CA"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Zip/Postal Code</label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="e.g. 90001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Select Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full bg-white border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary font-medium text-slate-800"
                  >
                    <option value="credit-card">💳 Credit Card (Simulated Direct Checkout)</option>
                    <option value="apple-pay"> Apple Pay / Google Pay</option>
                    <option value="crypto">🪙 Bitcoin / USDC</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border space-y-1 text-xs text-slate-500">
                  <p className="font-bold text-slate-700">🔒 Secure Sandboxed Gateway</p>
                  <p>This is a simulated checkout. No real money or credit card information is required or processed.</p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 text-sm font-bold bg-primary hover:bg-primary/95 text-white"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Validating Order...
                    </span>
                  ) : (
                    `Place Secure Order ($${total})`
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <Card className="border-slate-200">
              <CardHeader className="bg-slate-50/50 border-b p-4 sm:p-6">
                <CardTitle className="text-base font-bold text-slate-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                
                {/* Promo Code Input */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Promo Code</span>
                  
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-emerald-800 text-xs font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5" /> Code Applied: {appliedPromo}
                      </span>
                      <button 
                        onClick={handleRemovePromo}
                        className="text-emerald-900 hover:underline font-bold text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="e.g. PHONEX50"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="text-xs uppercase"
                      />
                      <Button type="submit" size="sm" variant="outline" className="text-xs font-semibold">
                        Apply
                      </Button>
                    </form>
                  )}
                  
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                  )}
                  <p className="text-[10px] text-slate-400 italic">Try "PHONEX50" for $50 off or "WELCOME10" for 10% off!</p>
                </div>

                <Separator />

                {/* Subtotal, Shipping, Tax, Total */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Cart Subtotal</span>
                    <span className="font-semibold text-slate-900">${subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount Coupon</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Express Shipping</span>
                    <span className="font-semibold text-slate-900">
                      {shipping === 0 ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-bold text-[10px]">
                          FREE
                        </Badge>
                      ) : (
                        `$${shipping}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Simulated Tax (8.25%)</span>
                    <span className="font-semibold text-slate-900">${tax}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between text-base font-extrabold text-slate-900">
                    <span>Total Amount</span>
                    <span>${total}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 bg-slate-50/50 border-t flex flex-col gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>256-bit SSL encrypted sandboxed checkout.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Eligible for Free 2-Day Express Delivery.</span>
                </div>
              </CardFooter>
            </Card>
          </div>

        </div>
      )}

    </div>
  );
}
