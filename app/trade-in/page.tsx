import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell Your Phone for Cash or Credit | Lumina Mobile",
  description: "Turn your old smartphone into instant cash or store credit. Get the highest payout rates in the industry with our easy mail-in process.",
}

export default function TradeInPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
          <p className="max-w-xl text-pretty text-lg text-muted-foreground">We pay up to 20% more than carrier trade-in programs. Get an instant quote, ship it for free, and get paid within 48 hours of inspection.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg"><Link href="#">Get an Instant Quote</Link></Button>
        
      </div>
          
          
        </div>
        <div className="relative rounded-3xl border bg-card p-6 shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/30 to-transparent blur-2xl" aria-hidden="true" />
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-card flex items-end p-6">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-foreground border">Live preview</span>
                <p className="text-sm text-muted-foreground">We pay up to 20% more than carrier trade-in programs. Get an instant quote, ship it for free, and get paid within 48 hours of inspection.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border bg-background/60 p-3">
                <p className="text-xl font-semibold tracking-tight">10x</p>
                <p className="text-xs text-muted-foreground">Faster</p>
              </div>
              <div className="rounded-xl border bg-background/60 p-3">
                <p className="text-xl font-semibold tracking-tight">99.9%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="rounded-xl border bg-background/60 p-3">
                <p className="text-xl font-semibold tracking-tight">4.9/5</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border bg-card p-6 text-center">
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">$12M+</dd>
            <dt className="mt-2 text-sm text-muted-foreground">Paid out to customers</dt>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center">
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">150k</dd>
            <dt className="mt-2 text-sm text-muted-foreground">Devices recycled or reused</dt>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center">
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">4.9/5</dd>
            <dt className="mt-2 text-sm text-muted-foreground">Trustpilot Rating</dt>
          </div>
        </dl>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">A transparent, hassle-free process from quote to cash.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-5xl font-semibold tracking-tight text-primary/60">01</p>
            <h3 className="mt-4 text-lg font-semibold">Tell us what you have</h3>
            <p className="mt-2 text-sm text-muted-foreground">Select your model, storage size, and condition. Our algorithm instantly calculates the highest market value.</p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-5xl font-semibold tracking-tight text-primary/60">02</p>
            <h3 className="mt-4 text-lg font-semibold">Pack and ship</h3>
            <p className="mt-2 text-sm text-muted-foreground">We provide a prepaid shipping label. Securely pack your wiped device and drop it at any authorized shipping center.</p>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-5xl font-semibold tracking-tight text-primary/60">03</p>
            <h3 className="mt-4 text-lg font-semibold">Inspection &amp; Payout</h3>
            <p className="mt-2 text-sm text-muted-foreground">Our technicians verify the device condition within 24 hours of receipt. Your payment is issued immediately via PayPal, ACH, or Store Credit.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-3">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready when you are</h2>
          <p className="text-pretty text-muted-foreground">Quotes are locked in for 14 days, giving you plenty of time to transfer your data to a new phone.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button asChild size="lg"><Link href="#">Start Evaluation</Link></Button>
          
        </div>
      </div>
    </section>
    </>
  )
}
