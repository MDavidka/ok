import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop phones | ok",
  description: "Browse our full catalog of unlocked iPhone, Pixel, and Galaxy models. All prices final.",
}

export default function ShopPage() {
  return (
    <>
<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">All phones</h2>
            
          </div>
          
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">iPhone 16 Pro</p>
                <p className="font-semibold"></p>
              </div>
              <p className="text-sm text-muted-foreground">256 GB • Titanium</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">iPhone 16</p>
                <p className="font-semibold"></p>
              </div>
              <p className="text-sm text-muted-foreground">128 GB • Black</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Pixel 9 Pro</p>
                <p className="font-semibold"></p>
              </div>
              <p className="text-sm text-muted-foreground">128 GB • Obsidian</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Pixel 9</p>
                <p className="font-semibold"></p>
              </div>
              <p className="text-sm text-muted-foreground">128 GB • Porcelain</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Galaxy S25 Ultra</p>
                <p className="font-semibold"></p>
              </div>
              <p className="text-sm text-muted-foreground">256 GB • Titanium Gray</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <CardContent className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Galaxy S25</p>
                <p className="font-semibold"></p>
              </div>
              <p className="text-sm text-muted-foreground">128 GB • Navy</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    </>
  )
}
