import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"

export const metadata: Metadata = {
  title: "Home | A phone selling",
  description: "Introduce the brand and primary value proposition.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl space-y-4">
          <Badge>A phone selling</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">Home</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">Introduce the brand and primary value proposition.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild><Link href="#">Get Started</Link></Button>
            <Button asChild variant="outline"><Link href="/">Back home</Link></Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">Hero</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Hero</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Get Started</Link></Button>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">Highlights</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Highlights</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Get Started</Link></Button>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">Proof</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Proof</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Get Started</Link></Button>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">CTA</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">CTA</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Get Started</Link></Button>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
