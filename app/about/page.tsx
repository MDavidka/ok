import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Story & Mission | Lumina Mobile",
  description: "Learn how Lumina Mobile is changing the way people buy and sell smartphones by prioritizing transparency, quality, and sustainability.",
}

export default function AboutPage() {
  return (
    <>
<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7 space-y-5">
            
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">Ship something people remember.</h1>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <p className="text-pretty text-lg text-muted-foreground">We started Lumina Mobile because we were tired of carrier lock-ins, hidden fees, and the massive e-waste problem. We believe everyone deserves premium tech without the premium hassle.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg"><Link href="/shop">Shop Our Collection</Link></Button>
        
      </div>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          
          
          <p className="text-pretty text-muted-foreground">By extending the lifecycle of smartphones, we're building a more sustainable future for consumer electronics.</p>
        </div>
        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <dt className="text-sm text-muted-foreground">Tons of e-waste prevented</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">45t</dd>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <dt className="text-sm text-muted-foreground">Happy Customers</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">120k+</dd>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <dt className="text-sm text-muted-foreground">Years in Business</dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">5</dd>
          </div>
        </dl>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Meet the team</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Meet the tech enthusiasts dedicated to bringing you the best mobile experience.</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <Avatar className="mx-auto h-20 w-20"><AvatarFallback className="text-base">DC</AvatarFallback></Avatar>
            <p className="mt-4 font-semibold">David Chen</p>
            <p className="text-sm text-primary"></p>
            <p className="mt-1 text-sm text-muted-foreground">Co-Founder &amp; CEO. Former supply chain lead at a major tech brand.</p>
          </div>
          <div className="text-center">
            <Avatar className="mx-auto h-20 w-20"><AvatarFallback className="text-base">AP</AvatarFallback></Avatar>
            <p className="mt-4 font-semibold">Aisha Patel</p>
            <p className="text-sm text-primary"></p>
            <p className="mt-1 text-sm text-muted-foreground">Head of Quality Assurance. Oversees our 90-point diagnostic facility.</p>
          </div>
          <div className="text-center">
            <Avatar className="mx-auto h-20 w-20"><AvatarFallback className="text-base">MR</AvatarFallback></Avatar>
            <p className="mt-4 font-semibold">Michael Ross</p>
            <p className="text-sm text-primary"></p>
            <p className="mt-1 text-sm text-muted-foreground">VP of Customer Success. Ensuring every trade-in and purchase is flawless.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Tell us about your project</h2>
          <p className="text-pretty text-muted-foreground">Have questions about a bulk corporate order, a recent purchase, or a trade-in? Our US-based support team is ready to help.</p>
          
        </div>
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <form className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your full name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="What can we help with?" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Tell us more..." rows={6} required />
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto">Send message</Button>
      </form>
        </div>
      </div>
    </section>
    </>
  )
}
