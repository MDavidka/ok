import { Phone } from "@/lib/types"
import { PhoneCard } from "@/components/phone-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Star, Truck, Shield, Award } from "lucide-react"

const featuredPhones: Phone[] = [
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

const categories = [
  { id: "all", label: "All Phones", count: 24 },
  { id: "flagship", label: "Flagship", count: 8 },
  { id: "mid-range", label: "Mid-Range", count: 10 },
  { id: "budget", label: "Budget", count: 6 },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free 2-day shipping on all orders over $500",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Comprehensive protection for your new device",
  },
  {
    icon: Award,
    title: "Price Match",
    description: "We'll match any competitor's advertised price",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/90 py-20 text-primary-foreground md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
              New Arrivals 2024
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Premium Smartphones.<br />Expertly Curated.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-primary-foreground/80 md:text-xl">
              Discover the latest flagship devices from Apple, Samsung, Google and more. 
              Every phone is tested, certified, and backed by our expert support team.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <a href="#featured">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
                Watch Video
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current" />
                <span>4.8/5 from 12k+ reviews</span>
              </div>
              <div>30-day returns</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:4px_4px]" />
      </section>

      {/* Trust Bar */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Phones */}
      <section id="featured" className="container py-16 md:py-24">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">Featured Collection</Badge>
          <h2 className="section-title">Best-Selling Smartphones</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            Handpicked premium devices loved by thousands of customers worldwide
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPhones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flagship" className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPhones
                .filter((phone) => phone.category === "flagship")
                .map((phone) => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="mid-range" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mid-Range Collection Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                We're curating the best value smartphones in the mid-range segment. Check back soon!
              </p>
              <Button variant="outline" className="mt-6">Notify Me</Button>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Budget Picks Coming Soon</h3>
              <p className="text-muted-foreground max-w-md">
                Great smartphones at affordable prices. Our budget collection launches next month.
              </p>
              <Button variant="outline" className="mt-6">Get Notified</Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <a href="/phones">
              Browse All Phones <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Badge variant="outline" className="mb-4">Why PhoneStore</Badge>
            <h2 className="section-title">The PhoneStore Difference</h2>
            <p className="section-subtitle mt-4">
              We're not just another retailer. We're your trusted partner in finding the perfect smartphone.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Expert Curation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every phone in our catalog is personally tested and reviewed by our team of smartphone experts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Certified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All devices come with full manufacturer warranty and are backed by our 30-day satisfaction guarantee.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Premium Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get lifetime technical support from our team of certified smartphone specialists.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="px-8 py-16 text-center md:px-16">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Ready to find your perfect phone?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-primary-foreground/80">
              Join over 50,000 happy customers who trust PhoneStore for their smartphone needs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <a href="#featured">Start Shopping</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="/support">Talk to an Expert</a>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
[/code]
[file]app/page.tsx[/file][usedfor]Landing page featuring hero section, featured phones grid, and category filters using Card and Button components[/usedfor]