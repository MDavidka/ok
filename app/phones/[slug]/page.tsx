import { notFound } from "next/navigation"
import { Phone } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Truck, Shield, Award, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface PhoneDetailPageProps {
  params: {
    slug: string
  }
}

const phones: Phone[] = [
  {
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
  {
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
  {
    id: "3",
    slug: "google-pixel-8-pro",
    name: "Pixel 8 Pro",
    brand: "Google",
    price: 999,
    originalPrice: 1099,
    image: "https://placehold.co/800x600.png",
    images: ["https://placehold.co/800x600.png", "https://placehold.co/800x600.png", "https://placehold.co/800x600.png"],
    description: "The smartest phone with the best camera and AI features powered by Google Tensor G3.",
    specs: {
      display: "6.7-inch LTPO OLED",
      processor: "Google Tensor G3",
      ram: "12GB",
      storage: "128GB",
      camera: "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      battery: "5050mAh with 30W fast charging",
      os: "Android 14",
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 634,
    category: "flagship",
  },
]

export default function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const phone = phones.find((p) => p.slug === params.slug)

  if (!phone) {
    notFound()
  }

  const discount = phone.originalPrice 
    ? Math.round(((phone.originalPrice - phone.price) / phone.originalPrice) * 100) 
    : 0

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground transition-colors">Home</a>
        <span>/</span>
        <a href="/phones" className="hover:text-foreground transition-colors">Phones</a>
        <span>/</span>
        <span className="text-foreground">{phone.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
            <img 
              src={phone.image} 
              alt={phone.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {phone.images.slice(0, 3).map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg border bg-muted">
                <img 
                  src={image} 
                  alt={`${phone.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline">{phone.brand}</Badge>
              <Badge variant={phone.inStock ? "default" : "secondary"}>
                {phone.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              {discount > 0 && (
                <Badge variant="destructive">-{discount}% OFF</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{phone.name}</h1>
            
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(phone.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {phone.rating} ({phone.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold tabular-nums">{formatPrice(phone.price)}</span>
            {phone.originalPrice && (
              <span className="text-xl text-muted-foreground line-through tabular-nums">
                {formatPrice(phone.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {phone.description}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button 
              size="lg" 
              className="flex-1" 
              disabled={!phone.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Checkout</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex justify-between items-center">
                    <span>{phone.name}</span>
                    <span className="font-semibold">{formatPrice(phone.price)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(phone.price)}</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-sm">Free Shipping</div>
                <div className="text-xs text-muted-foreground">2-day delivery</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-sm">2-Year Warranty</div>
                <div className="text-xs text-muted-foreground">Full coverage</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-sm">Price Match</div>
                <div className="text-xs text-muted-foreground">Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Technical Specifications</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Display & Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Display</span>
                <span className="font-medium">{phone.specs.display}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processor</span>
                <span className="font-medium">{phone.specs.processor}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">RAM</span>
                <span className="font-medium">{phone.specs.ram}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium">{phone.specs.storage}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Camera & Battery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Camera</span>
                <span className="font-medium text-right">{phone.specs.camera}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Battery</span>
                <span className="font-medium">{phone.specs.battery}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Operating System</span>
                <span className="font-medium">{phone.specs.os}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
            <p className="text-muted-foreground">Based on {phone.reviewCount} reviews</p>
          </div>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((review) => (
            <Card key={review}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Verified Buyer</div>
                    <div className="text-sm text-muted-foreground">2 weeks ago</div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Excellent phone! The camera quality is outstanding and the performance is blazing fast. 
                  Highly recommend to anyone looking for a premium device.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {phones
            .filter((p) => p.id !== phone.id)
            .slice(0, 3)
            .map((relatedPhone) => (
              <Card key={relatedPhone.id} className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src={relatedPhone.image} 
                    alt={relatedPhone.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{relatedPhone.brand}</Badge>
                    <span className="font-semibold tabular-nums">{formatPrice(relatedPhone.price)}</span>
                  </div>
                  <h3 className="font-semibold mb-4">{relatedPhone.name}</h3>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`/phones/${relatedPhone.slug}`}>View Details</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
[/code]
[file]app/phones/[slug]/page.tsx[/file][usedfor]Dynamic product detail page showing phone specs, images, price, and add-to-cart functionality with Dialog[/usedfor]