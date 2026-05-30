import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop flagship phones | ok",
  description: "Browse the latest iPhone, Pixel, and Galaxy models. All devices include 30-day returns and same-day setup in San Francisco.",
}

export default function ShopPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">All devices</h1>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="#">Get started</Link></Button>
          
        </div>
        
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Current stock</h2>
            
          </div>
          
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">iPhone 16 Pro</p>
                <p className="font-semibold">$999</p>
              </div>
              <p className="text-sm text-muted-foreground">128 GB • Natural Titanium</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">iPhone 16 Pro Max</p>
                <p className="font-semibold">$1,099</p>
              </div>
              <p className="text-sm text-muted-foreground">256 GB • Black Titanium</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Pixel 9 Pro</p>
                <p className="font-semibold">$899</p>
              </div>
              <p className="text-sm text-muted-foreground">128 GB • Obsidian</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Pixel 9 Pro XL</p>
                <p className="font-semibold">$999</p>
              </div>
              <p className="text-sm text-muted-foreground">256 GB • Porcelain</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Galaxy S25 Ultra</p>
                <p className="font-semibold">$1,199</p>
              </div>
              <p className="text-sm text-muted-foreground">256 GB • Titanium Black</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Galaxy S25+</p>
                <p className="font-semibold">$999</p>
              </div>
              <p className="text-sm text-muted-foreground">256 GB • Navy</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    </>
  )
}
