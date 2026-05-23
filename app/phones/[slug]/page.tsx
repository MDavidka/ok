import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Phone, PhoneVariant, CartItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock phone data (in production this would come from API or database)
const phonesData: Phone[] = [
  {
    id: "p1",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    slug: "galaxy-s25-ultra",
    description: "The ultimate flagship with cutting-edge AI features and the brightest display ever. Experience revolutionary performance with the new Snapdragon 8 Gen 4 processor and an industry-leading 200MP camera system.",
    basePrice: 1299,
    category: "Flagship",
    specs: {
      display: "6.8\" Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 4",
      camera: "200MP Quad Camera",
      battery: "5000mAh",
      ram: "12GB",
    },
    variants: [
      { id: "v1", color: "Titanium Black", storage: "256GB", price: 1299, stock: 45, image: "https://placehold.co/800x600.png" },
      { id: "v2", color: "Titanium Gray", storage: "512GB", price: 1399, stock: 32, image: "https://placehold.co/800x600.png" },
      { id: "v9", color: "Titanium Violet", storage: "256GB", price: 1299, stock: 18, image: "https://placehold.co/800x600.png" },
    ],
    rating: 4.8,
    reviewCount: 1243,
  },
  {
    id: "p2",
    name: "iPhone 17 Pro",
    brand: "Apple",
    slug: "iphone-17-pro",
    description: "Pro-level performance with the most advanced camera system and A19 Pro chip. Capture stunning photos and videos with the new 48MP Fusion Camera and enjoy all-day battery life.",
    basePrice: 1199,
    category: "Flagship",
    specs: {
      display: "6.3\" Super Retina XDR",
      processor: "A19 Pro",
      camera: "48MP Fusion Camera",
      battery: "3274mAh",
      ram: "8GB",
    },
    variants: [
      { id: "v3", color: "Natural Titanium", storage: "128GB", price: 1199, stock: 28, image: "https://placehold.co/800x600.png" },
      { id: "v4", color: "Black Titanium", storage: "256GB", price: 1299, stock: 51, image: "https://placehold.co/800x600.png" },
      { id: "v10", color: "Desert Titanium", storage: "512GB", price: 1499, stock: 14, image: "https://placehold.co/800x600.png" },
    ],
    rating: 4.9,
    reviewCount: 987,
  },
  {
    id: "p3",
    name: "Pixel 10 Pro",
    brand: "Google",
    slug: "pixel-10-pro",
    description: "The smartest Android phone with revolutionary AI photography and pure Android experience. Powered by the new Tensor G5 chip with advanced machine learning capabilities.",
    basePrice: 999,
    category: "Flagship",
    specs: {
      display: "6.8\" LTPO OLED",
      processor: "Tensor G5",
      camera: "50MP Triple Camera",
      battery: "5060mAh",
      ram: "16GB",
    },
    variants: [
      { id: "v5", color: "Obsidian", storage: "128GB", price: 999, stock: 67, image: "https://placehold.co/800x600.png" },
      { id: "v6", color: "Porcelain", storage: "256GB", price: 1099, stock: 39, image: "https://placehold.co/800x600.png" },
      { id: "v11", color: "Hazel", storage: "512GB", price: 1199, stock: 22, image: "https://placehold.co/800x600.png" },
    ],
    rating: 4.7,
    reviewCount: 654,
  },
  {
    id: "p4",
    name: "Xperia 1 VII",
    brand: "Sony",
    slug: "xperia-1-vii",
    description: "Professional-grade smartphone with 4K OLED display and unmatched camera controls. Designed for photographers and videographers who demand the highest quality.",
    basePrice: 1399,
    category: "Premium",
    specs: {
      display: "6.5\" 4K OLED",
      processor: "Snapdragon 8 Gen 4",
      camera: "48MP Triple Camera",
      battery: "5000mAh",
      ram: "12GB",
    },
    variants: [
      { id: "v7", color: "Black", storage: "256GB", price: 1399, stock: 19, image: "https://placehold.co/800x600.png" },
      { id: "v8", color: "Silver", storage: "512GB", price: 1499, stock: 12, image: "https://placehold.co/800x600.png" },
    ],
    rating: 4.5,
    reviewCount: 312,
  },
]

interface SelectedVariant {
  variant: PhoneVariant
  quantity: number
}

export default function PhoneDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const phone = phonesData.find((p) => p.slug === slug)

  const [selectedVariant, setSelectedVariant] = useState<PhoneVariant | null>(
    phone ? phone.variants[0] : null
  )
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  if (!phone || !selectedVariant) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Phone not found</h1>
        <p className="text-muted-foreground mb-8">
          The phone you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/phones">Browse All Phones</Link>
        </Button>
      </div>
    )
  }

  const handleVariantSelect = (variant: PhoneVariant) => {
    setSelectedVariant(variant)
    setQuantity(1)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > selectedVariant.stock) return
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return

    setIsAdding(true)

    const cartItem: CartItem = {
      phoneId: phone.id,
      variantId: selectedVariant.id,
      name: phone.name,
      color: selectedVariant.color,
      storage: selectedVariant.storage,
      price: selectedVariant.price,
      quantity: quantity,
      image: selectedVariant.image,
    }

    // Get existing cart from localStorage
    const existingCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    )

    // Check if item already exists
    const existingIndex = existingCart.findIndex(
      (item) =>
        item.phoneId === cartItem.phoneId && item.variantId === cartItem.variantId
    )

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity
    } else {
      existingCart.push(cartItem)
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart))

    // Show success toast
    const toast = document.createElement("div")
    toast.className =
      "fixed bottom-4 right-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg text-sm z-50 flex items-center gap-2"
    toast.innerHTML = `
      <span>${quantity} × ${phone.name} (${selectedVariant.color}) added to cart</span>
    `
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.transition = "all 200ms ease"
      toast.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(toast)
        setIsAdding(false)
      }, 200)
    }, 2200)
  }

  const totalPrice = selectedVariant.price * quantity
  const isInStock = selectedVariant.stock > 0

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/phones" className="hover:text-foreground transition-colors">
          Phones
        </Link>
        <span>/</span>
        <span className="text-foreground">{phone.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border bg-muted sticky top-8">
            <img
              src={selectedVariant.image}
              alt={`${phone.name} - ${selectedVariant.color}`}
              className="h-full w-full object-cover"
            />
            <Badge className="absolute top-4 left-4" variant="secondary">
              {phone.category}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
                {phone.brand}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(phone.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {phone.rating} ({phone.reviewCount} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight mb-4">
              {phone.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {phone.description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums">
                ${selectedVariant.price}
              </span>
              <span className="text-muted-foreground">USD</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              or 4 interest-free payments of ${(selectedVariant.price / 4).toFixed(2)} with Affirm
            </p>
          </div>

          {/* Variant Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Color &amp; Storage</span>
              <span className="text-xs text-muted-foreground">
                {selectedVariant.stock} in stock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phone.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantSelect(variant)}
                  className={cn(
                    "variant-button flex items-center justify-between rounded-lg border p-4 text-left transition-all",
                    selectedVariant.id === variant.id
                      ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                      : "hover:border-border"
                  )}
                >
                  <div>
                    <div className="font-medium">{variant.color}</div>
                    <div className="text-sm text-muted-foreground">
                      {variant.storage}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold tabular-nums">
                      ${variant.price}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <span className="text-sm font-medium mb-3 block">Quantity</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                −
              </Button>
              <div className="w-14 text-center font-medium tabular-nums text-lg border rounded-md py-2">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= selectedVariant.stock}
              >
                +
              </Button>
              <span className="text-sm text-muted-foreground ml-2">
                Max {selectedVariant.stock}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col gap-3 mb-8">
            <Button
              size="lg"
              className="h-12 text-base"
              onClick={handleAddToCart}
              disabled={!isInStock || isAdding}
            >
              {isAdding
                ? "Adding to Cart..."
                : isInStock
                ? `Add ${quantity} to Cart — $${totalPrice}`
                : "Out of Stock"}
            </Button>

            <Button variant="outline" size="lg" className="h-12 text-base" asChild>
              <Link href="/phones">Back to All Phones</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-5 w-5 mb-2 text-muted-foreground" />
              <span className="text-xs font-medium">Free Shipping</span>
              <span className="text-[10px] text-muted-foreground">2-3 business days</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-5 w-5 mb-2 text-muted-foreground" />
              <span className="text-xs font-medium">2-Year Warranty</span>
              <span className="text-[10px] text-muted-foreground">Full coverage</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="h-5 w-5 mb-2 text-muted-foreground" />
              <span className="text-xs font-medium">30-Day Returns</span>
              <span className="text-[10px] text-muted-foreground">No questions asked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mt-16 pt-12 border-t">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Specifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {Object.entries(phone.specs).map(([key, value]) => (
            <div key={key}>
              <div className="text-sm font-medium text-muted-foreground mb-1 capitalize">
                {key}
              </div>
              <div className="text-lg font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-16 pt-12 border-t">
        <Card>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-semibold mb-3">What&apos;s in the box</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {phone.name}</li>
                  <li>• USB-C to USB-C Cable</li>
                  <li>• SIM Ejector Tool</li>
                  <li>• Quick Start Guide</li>
                  <li>• Safety &amp; Warranty Information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Delivery &amp; Returns</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Free standard shipping on all orders</li>
                  <li>• Express delivery available at checkout</li>
                  <li>• 30-day hassle-free returns</li>
                  <li>• 2-year manufacturer warranty included</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
[/code]
[file]app/phones/[slug]/page.tsx[/file]
[usedfor]product detail[/usedfor]