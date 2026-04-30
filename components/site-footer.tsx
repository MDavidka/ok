import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} A phone selling. All rights reserved.</p>
        <div className="flex flex-wrap gap-3"><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></div>
      </div>
    </footer>
  )
}
