import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact OK. Support",
  description: "Need help with an order, trade-in, or warranty claim? Contact the OK. support team today.",
}

export default function ContactPage() {
  return (
    <>
<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        <div className="space-y-5">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Tell us about your project</h2>
          <p className="text-pretty text-muted-foreground">Have a question about a specific device, need help with an existing order, or want to check on a trade-in status? Drop us a line.</p>
          
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
        <Button type="submit" size="lg" className="w-full sm:w-auto">Send Message</Button>
      </form>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
          <p className="text-pretty text-muted-foreground">Save time by checking our most common support requests.</p>
        </div>
        <dl className="lg:col-span-2 divide-y rounded-2xl border bg-card">
          <div className="px-6 py-5">
            <dt className="font-semibold">How do I track my order?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Once your order ships, you will receive an email with a tracking link. You can also view your order status by logging into your OK. account.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">What is the return policy?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">We offer a 14-day return window for all devices. The device must be in its original condition with all accessories included.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">My trade-in quote expired. What now?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Trade-in quotes are valid for 14 days. If yours has expired, simply go through the trade-in flow again to get a new, updated quote based on current market values.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">Do you ship internationally?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Currently, OK. only ships within the United States and Canada. We are working on expanding our shipping options in the future.</dd>
          </div>
        </dl>
      </div>
    </section>
    </>
  )
}
