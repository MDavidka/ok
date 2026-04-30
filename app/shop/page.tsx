import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "All Smartphones - Apple, Samsung, Google | Lumina Mobile",
  description: "Browse our full catalog of new and certified refurbished unlocked smartphones. Find the perfect device for your budget.",
}

export default function ShopPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">Browse our curated selection of top-tier smartphones. Filter by brand, condition, and price to find exactly what you need.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="#">Filter by Apple</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="#">Filter by Android</Link></Button>
        </div>
        
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Shop the collection</h2>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">Showing all available stock. Updated daily.</p>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">iPhone 15 Pro Max</p>
                <p className="text-xs text-muted-foreground">Refurbished</p>
              </div>
              <p className="font-semibold">$949</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">iPhone 15</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
              <p className="font-semibold">$799</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">iPhone 13 Mini</p>
                <p className="text-xs text-muted-foreground">Refurbished</p>
              </div>
              <p className="font-semibold">$399</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">Galaxy S24 Ultra</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
              <p className="font-semibold">$1,299</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">Galaxy Z Flip 5</p>
                <p className="text-xs text-muted-foreground">Refurbished</p>
              </div>
              <p className="font-semibold">$599</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">Pixel 8 Pro</p>
                <p className="text-xs text-muted-foreground">Refurbished</p>
              </div>
              <p className="font-semibold">$649</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">Pixel 7a</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
              <p className="font-semibold">$449</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">OnePlus 12</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
              <p className="font-semibold">$799</p>
            </div>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
          <p className="text-pretty text-muted-foreground">Everything you need to know about buying from Lumina Mobile.</p>
        </div>
        <dl className="lg:col-span-2 divide-y rounded-2xl border bg-card">
          <div className="px-6 py-5">
            <dt className="font-semibold">What does 'Unlocked' mean?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">An unlocked phone is not tied to a specific cellular carrier. You can use it with AT&amp;T, Verizon, T-Mobile, or any compatible international network simply by inserting a SIM card.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">What is the condition of refurbished phones?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">We grade our refurbished phones meticulously. 'Pristine' means no visible scratches at arm's length. 'Excellent' may have micro-scratches on the body, but the screen is flawless. All have 85%+ battery health.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">Do you offer financing?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Yes! We partner with Affirm to offer flexible payment plans over 6, 12, or 24 months, starting at 0% APR for qualifying customers.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">What is your return policy?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">We offer a 30-day money-back guarantee. If you don't love your new device, return it in the same condition for a full refund, minus return shipping costs.</dd>
          </div>
        </dl>
      </div>
    </section>
    </>
  )
}
