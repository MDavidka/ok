import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

const navItems = siteConfig.navLinks
const socialLinks = siteConfig.socialLinks
const footerInfo: { email?: string; phone?: string; address?: string } = siteConfig.contact ?? {}
const footerCta = siteConfig.footerCta

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center gap-2">
              {siteConfig.logoUrl ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name + " logo"}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md object-cover"
                />
              ) : (
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
                  {siteConfig.logoInitials}
                </span>
              )}
              <p className="text-lg font-semibold tracking-tight">{siteConfig.name}</p>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">{siteConfig.description}</p>
            {footerCta ? (
              <Button asChild size="sm" variant="outline" className="mt-2">
                <Link href={footerCta.href}>{footerCta.label}</Link>
              </Button>
            ) : null}
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
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  )
}
