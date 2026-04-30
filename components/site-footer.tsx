import Link from "next/link"
import { Button } from "@/components/ui/button"

const navItems: { label: string; href: string }[] = [{ label: "Home", href: "/" }, { label: "Shop Phones", href: "/shop" }, { label: "Trade-In", href: "/trade-in" }, { label: "About Us", href: "/about" }]
const socialLinks: { label: string; href: string }[] = [{ label: "Instagram", href: "#" }, { label: "Twitter", href: "#" }, { label: "TikTok", href: "#" }]
const footerInfo = {
  email: "support@luminamobile.com",
  phone: "1-800-555-0199",
  address: "404 Innovation Drive, Tech District, CA 94103",
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-3 lg:col-span-2">
            <p className="text-lg font-semibold tracking-tight">Lumina Mobile</p>
            <p className="max-w-md text-sm text-muted-foreground">Premium unlocked smartphones, certified refurbished devices, and instant trade-in values. Experience transparent pricing and zero carrier bloatware.</p>
            <Button asChild size="sm" variant="outline" className="mt-2"><Link href={"#"}>Get 10% Off</Link></Button>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Explore</p>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground transition hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contact</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerInfo.email ? <li><a href={`mailto:${footerInfo.email}`} className="transition hover:text-foreground">{footerInfo.email}</a></li> : null}
              {footerInfo.phone ? <li><a href={`tel:${footerInfo.phone.replace(/\s/g, "")}`} className="transition hover:text-foreground">{footerInfo.phone}</a></li> : null}
              {footerInfo.address ? <li>{footerInfo.address}</li> : null}
            </ul>
            {socialLinks.length > 0 ? (
              <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm">
                {socialLinks.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className="text-muted-foreground transition hover:text-foreground">{s.label}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Lumina Mobile. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  )
}
