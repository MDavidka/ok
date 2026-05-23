import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  shop: [
    { label: "All Phones", href: "/phones" },
    { label: "Featured", href: "/#featured" },
    { label: "New Arrivals", href: "/phones?filter=new" },
    { label: "Deals", href: "/phones?filter=deals" },
  ],
  support: [
    { label: "Help Center", href: "/support" },
    { label: "Shipping Info", href: "/support/shipping" },
    { label: "Returns", href: "/support/returns" },
    { label: "Warranty", href: "/support/warranty" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">N</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">Nexlify</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Premium smartphones with exceptional quality and customer support.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-4 text-sm tracking-wide">Connect</h3>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:support@nexlify.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                support@nexlify.com
              </a>
              <a
                href="tel:+15551234567"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexlify. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
[/code]
[file]components/site-footer.tsx[/file]
[usedfor]footer[/usedfor]