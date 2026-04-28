"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold">a phone selling</Link>
        <nav className="hidden items-center gap-4 md:flex">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="md:hidden">Menu</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-none sm:w-80 sm:max-w-sm">
            <nav className="mt-8 space-y-1">
            <Link href="/" className="block py-2 text-base">Home</Link>
            <Link href="/features" className="block py-2 text-base">Features</Link>
            <Link href="/contact" className="block py-2 text-base">Contact</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
