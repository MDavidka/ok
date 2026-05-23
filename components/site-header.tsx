import Link from "next/link";
import { Phone as PhoneIcon } from "lucide-react"; // Renamed to avoid conflict with Phone interface
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteConfig, NavItem } from "@/lib/types";

// Site configuration for navigation and metadata
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
          <nav className="flex items-center space-x-1">
            {/* Placeholder for future utility buttons like search or cart */}
            {/* <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
[/code]
[file]components/site-header.tsx[file][usedfor]The main header component for the phone store, typically containing the logo, navigation links (e.g., to products), and potentially a search bar or cart icon. It utilizes the `Button` component.[usedfor]