import Link from "next/link"
import { Quote, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Unlocked Phones & Certified Refurbished | Lumina Mobile",
  description: "Shop the latest unlocked flagship phones and certified refurbished devices. Get instant trade-in value and free next-day shipping.",
}

export default function HomePage() {
  return (
    <>
<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
          <p className="max-w-xl text-pretty text-lg text-muted-foreground">Discover the latest unlocked flagships and certified refurbished classics. Zero carrier bloatware, 100% freedom. Ships free in 24 hours.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg"><Link href="/shop">Shop New Arrivals</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/trade-in">Check Trade-In Value</Link></Button>
      </div>
          
        </div>
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-accent/40 via-primary/10 to-background p-6">
          <div className="flex h-full flex-col justify-end gap-2 rounded-2xl bg-background/40 p-6 backdrop-blur">
            <span className="text-sm font-medium uppercase tracking-wider text-primary">Featured</span>
            <p className="text-2xl font-semibold tracking-tight">Best seller</p>
            <p className="text-sm text-muted-foreground">Customer favorite this season.</p>
            <p className="mt-2 text-3xl font-semibold"></p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">Trusted by teams everywhere</p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Apple</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Samsung</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Google</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">OnePlus</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Motorola</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Sony</div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Built for teams who care about the details</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Why thousands of customers choose us for their next device upgrade.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Certified Refurbished</CardTitle>
              <CardDescription className="text-base">Every pre-owned device undergoes a rigorous 90-point diagnostic test and battery health check.</CardDescription>
            </CardHeader>
            
          </Card>
          <Card className="lg:col-span-1 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Unlocked Freedom</CardTitle>
              <CardDescription className="text-base">No carrier lock-in. Pop in your SIM and connect to the network of your choice immediately.</CardDescription>
            </CardHeader>
            
          </Card>
          <Card className="lg:col-span-1 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Lightning Fast Shipping</CardTitle>
              <CardDescription className="text-base">Order by 2 PM EST and your new phone ships the exact same day, fully insured.</CardDescription>
            </CardHeader>
            
          </Card>
          <Card className="lg:col-span-2 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Ironclad Warranty</CardTitle>
              <CardDescription className="text-base">Sleep easy with a 12-month comprehensive warranty on all devices, new and refurbished.</CardDescription>
            </CardHeader>
            
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Shop the collection</h2>
            <p className="mt-2 max-w-xl text-pretty text-muted-foreground">Our most popular unlocked smartphones this week.</p>
          </div>
          
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">iPhone 15 Pro Max</p>
                <p className="font-semibold">$949</p>
              </div>
              <p className="text-sm text-muted-foreground">256GB, Natural Titanium. Pristine condition.</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Samsung Galaxy S24 Ultra</p>
                <p className="font-semibold">$1,299</p>
              </div>
              <p className="text-sm text-muted-foreground">512GB, Titanium Black. Brand new, factory sealed.</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Google Pixel 8 Pro</p>
                <p className="font-semibold">$649</p>
              </div>
              <p className="text-sm text-muted-foreground">128GB, Obsidian. Excellent condition.</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">OnePlus 12</p>
                <p className="font-semibold">$799</p>
              </div>
              <p className="text-sm text-muted-foreground">256GB, Silky Black. Brand new.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Don't let your old phone gather dust. Turn it into instant credit toward your upgrade.</p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">1</div>
            <h3 className="text-lg font-semibold">Get an Instant Quote</h3>
            <p className="text-sm text-muted-foreground">Answer three quick questions about your current device's condition to see its exact trade-in value.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">2</div>
            <h3 className="text-lg font-semibold">Ship It Free</h3>
            <p className="text-sm text-muted-foreground">We'll email you a prepaid shipping label. Just pack up your phone and drop it off at any local carrier.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">3</div>
            <h3 className="text-lg font-semibold">Get Paid Fast</h3>
            <p className="text-sm text-muted-foreground">Once we inspect the device, you'll receive store credit instantly, or a cash deposit within 48 hours.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        
        <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl">Loved by people who care about quality</h2>
        <figure className="mt-12 rounded-3xl border bg-card p-8 sm:p-12">
          <Quote className="h-10 w-10 text-primary/40" />
          <blockquote className="mt-6 text-pretty text-2xl font-medium leading-relaxed sm:text-3xl">"I was skeptical about buying refurbished, but my Pixel 8 Pro arrived looking literally brand new. Battery health is at 100%. Highly recommend."</blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Avatar><AvatarFallback>SJ</AvatarFallback></Avatar>
            <div>
              <p className="font-semibold">Sarah Jenkins</p>
              <p className="text-sm text-muted-foreground">Verified Buyer</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready when you are</h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">Join our newsletter and get $20 off your first smartphone purchase.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="/shop">Claim $20 Off</Link></Button>
          
        </div>
      </div>
    </section>
    </>
  )
}
