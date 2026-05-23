import Link from "next/link";
import { Phone as PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteConfig, NavItem } from "@/lib/types";

const siteConfig: SiteConfig = {
  name: "Phone Store",
  description: "Your one-stop shop for the latest smartphones.",
  mainNav: [
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    linkedin: "https://linkedin.com/company/shadcn",
  },
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <PhoneIcon className="h-6 w-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          {siteConfig.mainNav?.length ? (
            <nav className="hidden gap-6 md:flex">
              {siteConfig.mainNav.map(
                (item: NavItem) =>
                  item.href && (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary sm:text-sm",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1"></nav>
        </div>
      </div>
    </header>
  );
}