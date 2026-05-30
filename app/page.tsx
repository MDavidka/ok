import Link from "next/link"
import { Check, Quote, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "ok — Modern phone service for teams",
  description: "Reliable calls, SMS, and analytics. Start a free trial today.",
}

export default function HomePage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Phone numbers that scale with you</h1>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="#">Get started</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/features">Watch 60-second demo</Link></Button>
        </div>
        
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">Trusted by teams everywhere</p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Stripe</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Notion</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Vercel</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Linear</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Figma</div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need, nothing you don't</h2>
          
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Instant numbers</h3>
            <p className="text-sm text-muted-foreground">Claim local, toll-free, or international numbers in 30 seconds.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Unified inbox</h3>
            <p className="text-sm text-muted-foreground">Calls, texts, and voicemails in one searchable feed.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Smart routing</h3>
            <p className="text-sm text-muted-foreground">Route calls by time, team, or custom rules—no IVR hell.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Analytics that matter</h3>
            <p className="text-sm text-muted-foreground">Track answer rates, call duration, and SMS delivery in real time.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Team permissions</h3>
            <p className="text-sm text-muted-foreground">Granular roles so support, sales, and ops only see what they need.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">API-first</h3>
            <p className="text-sm text-muted-foreground">Build automations with webhooks, SDKs, and full REST access.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Get set up in three steps</h2>
          
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">1</div>
            <h3 className="text-lg font-semibold">Pick numbers</h3>
            <p className="text-sm text-muted-foreground">Search and claim numbers by city, area code, or keyword.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">2</div>
            <h3 className="text-lg font-semibold">Connect your team</h3>
            <p className="text-sm text-muted-foreground">Invite teammates and set routing rules in the dashboard.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">3</div>
            <h3 className="text-lg font-semibold">Go live</h3>
            <p className="text-sm text-muted-foreground">Start taking calls and sending SMS immediately.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Loved by people who care about quality</h2>
          
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed">"We ported 40 numbers in one afternoon. The team hasn't looked back."</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback>PP</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Priya Patel</p>
                  <p className="text-xs text-muted-foreground">Head of Ops, Linear</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed">"Call quality is noticeably better than our old carrier, and the analytics are actually useful."</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback>MC</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Marcus Chen</p>
                  <p className="text-xs text-muted-foreground">Founder, Runway</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed">"We cut our monthly phone bill by 62% and haven't dropped a single call."</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback>SK</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Sara Kline</p>
                  <p className="text-xs text-muted-foreground">Support Lead, Vercel</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Simple, usage-based pricing</h2>
          
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="relative ">
            
            <CardHeader>
              <CardTitle className="text-xl"></CardTitle>
              <CardDescription></CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">20</span>
                <span className="text-sm text-muted-foreground">mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />1 local number</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />500 minutes</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />1,000 SMS</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Basic analytics</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Email support</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 w-full"><Link href="#">Choose plan</Link></Button>
            </CardContent>
          </Card>
          <Card className="relative ring-2 ring-primary shadow-xl shadow-primary/10 scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge>Most popular</Badge></div>
            <CardHeader>
              <CardTitle className="text-xl"></CardTitle>
              <CardDescription></CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">60</span>
                <span className="text-sm text-muted-foreground">mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />5 local + 1 toll-free</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />2,500 minutes</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />5,000 SMS</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Advanced analytics</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Priority support</li>
              </ul>
              <Button asChild variant="default" className="mt-6 w-full"><Link href="#">Choose plan</Link></Button>
            </CardContent>
          </Card>
          <Card className="relative ">
            
            <CardHeader>
              <CardTitle className="text-xl"></CardTitle>
              <CardDescription></CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">150</span>
                <span className="text-sm text-muted-foreground">mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Unlimited numbers</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />10,000 minutes</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />20,000 SMS</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Custom routing</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Dedicated success manager</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 w-full"><Link href="#">Choose plan</Link></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Questions, answered</h2>
          
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-left text-base">Can I keep my existing numbers?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Yes. We support full number porting in under 48 hours.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-base">Do you offer international numbers?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">We currently support 40+ countries with local rates.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-base">What happens if I go over my minutes?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Overage is billed at $0.02 per minute. No surprise fees.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left text-base">Is there a long-term contract?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No contracts. Month-to-month only.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left text-base">How fast can I get started?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Most teams are live within 10 minutes of signing up.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready to modernize your phone system?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">Start now and feel the difference within minutes.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="#">Get started</Link></Button>
          
        </div>
      </div>
    </section>
    </>
  )
}
