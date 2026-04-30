import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/motion/fade-in"

export const metadata: Metadata = {
  title: "Features | a phone selling",
  description: "Show product capabilities and benefits.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl space-y-4">
          <Badge>a phone selling</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">Features</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">Show product capabilities and benefits.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild><Link href="#">Try Features</Link></Button>
            <Button asChild variant="outline"><Link href="/">Back home</Link></Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">Feature Grid</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Feature Grid</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Try Features</Link></Button>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">Use Cases</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Use Cases</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Try Features</Link></Button>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">Comparison</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Comparison</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Try Features</Link></Button>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-4">
          <FadeIn>
            <Badge variant="secondary" className="w-fit">CTA</Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">CTA</h2>
            <p className="text-muted-foreground">Built mobile-first with production-ready responsive behavior.</p>
            <Button asChild><Link href="#">Try Features</Link></Button>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
