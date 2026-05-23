import { useState } from "react"
import { CartItem, Phone } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Minus, Plus, Trash2, CreditCard, Truck, Shield } from "lucide-react"
import { formatPrice, calculateCartTotal } from "@/lib/utils"
import { toast } from "sonner"

// Mock cart data - in production this would come from state management or API
const initialCartItems: CartItem[] = [
  {
    phone: {
      id: "1",
      slug: "iphone-15-pro",
      name: "iPhone 15 Pro",
      brand: "Apple",
      price: 999,
      originalPrice: 1099,
      image: "https://placehold.co/800x600.png",
      images: ["https://placehold.co/800x600.png", "https://placehold.co/800x600.png", "https://placehold.co/800x600.png"],
      description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and revolutionary camera system.",
      specs: {
        display: "6.1-inch Super Retina XDR OLED",
        processor: "A17 Pro",
        ram: "8GB",
        storage: "128GB",
        camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
        battery: "Up to 29 hours video playback",
        os: "iOS 17",
      },
      inStock: true,
      rating: 4.8,
      reviewCount: 1247,
      category: "flagship",
    },
    quantity: 1,
  },
  {
    phone: {
      id: "2",
      slug: "samsung-galaxy-s24-ultra",
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1299,
      image: "https://placehold.co/800x600.png",
      images: ["https://placehold.co/800x600.png", "https://placehold.co/800x600.png", "https://placehold.co/800x600.png"],
      description: "Premium Android flagship with S Pen, 200MP camera, and the brightest display on any smartphone.",
      specs: {
        display: "6.8-inch Dynamic AMOLED 2X",
        processor: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB",
        camera: "200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto",
        battery: "5000mAh with 45W fast charging",
        os: "Android 14",
      },
      inStock: true,
      rating: 4.7,
      reviewCount: 892,
      category: "flagship",
    },
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const updateQuantity = (phoneId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) =>
      prev.map((item) =>
        item.phone.id === phoneId ? { ...item, quantity: newQuantity } : item
      )
    )
    toast.success("Cart updated")
  }

  const removeItem = (phoneId: string) => {
    setCartItems((prev) => prev.filter((item) => item.phone.id !== phoneId))
    toast.success("Item removed from cart")
  }

  const clearCart = () => {
    setCartItems([])
    toast.success("Cart cleared")
  }

  const subtotal = calculateCartTotal(cartItems)
  const shipping = subtotal > 500 ? 0 : 15
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsCheckingOut(false)
    setCheckoutOpen(false)

    // Clear cart after successful checkout
    setCartItems([])

    toast.success("Order placed successfully!", {
      description: `Order #${Math.random().toString(36).substr(2, 9).toUpperCase()} has been confirmed.`,
    })

    // Redirect to success page or home
    setTimeout(() => {
      window.location.href = "/"
    }, 2000)
  }

  const updateCheckoutForm = (field: string, value: string) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }))
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any phones to your cart yet.
          </p>
          <Button className="mt-8" size="lg" asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span>/</span>
        <span className="text-foreground">Shopping Cart</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.phone.id}>
                      <TableCell>
                        <div className="aspect-square w-16 overflow-hidden rounded-md border bg-muted">
                          <img
                            src={item.phone.image}
                            alt={item.phone.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.phone.name}</div>
                          <div className="text-sm text-muted-foreground">{item.phone.brand}</div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.phone.storage}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatPrice(item.phone.price)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.phone.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.phone.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums">
                        {formatPrice(item.phone.price * item.quantity)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.phone.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <div className="mt-6">
            <Button variant="outline" asChild>
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </a>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estimated Tax</span>
                <span className="font-medium tabular-nums">{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>

              <div className="pt-4 space-y-3">
                <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg" disabled={cartItems.length === 0}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Complete Your Purchase</DialogTitle>
                      <DialogDescription>
                        Enter your shipping and payment details to complete your order.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input
                            id="firstName"
                            value={checkoutForm.firstName}
                            onChange={(e) => updateCheckoutForm("firstName", e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input
                            id="lastName"
                            value={checkoutForm.lastName}
                            onChange={(e) => updateCheckoutForm("lastName", e.target.value)}
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={checkoutForm.email}
                          onChange={(e) => updateCheckoutForm("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={checkoutForm.address}
                          onChange={(e) => updateCheckoutForm("address", e.target.value)}
                          placeholder="123 Main St"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={checkoutForm.city}
                            onChange={(e) => updateCheckoutForm("city", e.target.value)}
                            placeholder="New York"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={checkoutForm.state}
                            onChange={(e) => updateCheckoutForm("state", e.target.value)}
                            placeholder="NY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP</Label>
                          <Input
                            id="zip"
                            value={checkoutForm.zip}
                            onChange={(e) => updateCheckoutForm("zip", e.target.value)}
                            placeholder="10001"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <Input
                          id="cardNumber"
                          value={checkoutForm.cardNumber}
                          onChange={(e) => updateCheckoutForm("cardNumber", e.target.value)}
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input
                            id="expiry"
                            value={checkoutForm.expiry}
                            onChange={(e) => updateCheckoutForm("expiry", e.target.value)}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={checkoutForm.cvv}
                            onChange={(e) => updateCheckoutForm("cvv", e.target.value)}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full"
                      >
                        {isCheckingOut ? "Processing..." : `Pay ${formatPrice(total)}`}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="text-center text-xs text-muted-foreground">
                  Secure checkout powered by Stripe
                </div>
              </div>

              {/* Trust Signals */}
              <div className="pt-4 space-y-3 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
[/code]
[file]app/cart/page.tsx[/file][usedfor]Shopping cart page displaying items, quantities, totals, and checkout button using Table and Button[/usedfor]