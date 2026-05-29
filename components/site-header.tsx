import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { NavItem, SiteConfig } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

// Placeholder for site configuration. In a real app, this might come from a global config file.
const siteConfig: SiteConfig = {
  name: "Phone Shop",
  description: "Your one-stop shop for the latest smartphones and accessories.",
  url: "https://your-phone-shop.com",
  ogImage: "https://placehold.co/1200x630.png",
  links: {
    twitter: "#",
    github: "#",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Categories",
      href: "/categories", // Placeholder for categories page
      items: [
        { title: "Smartphones", href: "/products?category=smartphones" },
        { title: "Accessories", href: "/products?category=accessories" },
        { title: "Wearables", href: "/products?category=wearables" },
      ],
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
  mobileNav: [], // Mobile nav can reuse mainNav or be distinct
};

export function SiteHeader() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  // Placeholder for cart item count
  const cartItemCount = 3; // This would come from a global state/context in a real app

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Using a placeholder image for the logo */}
            <Image
              src="https://placehold.co/32x32.png"
              alt="Phone Shop Logo"
              width={32}
              height={32}
              className="h-6 w-6"
            />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {siteConfig.mainNav.map((item) =>
              item.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                              {/* Optional: Add a description for sub-items */}
                              {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p> */}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right section: Search, Cart, Mobile Menu */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-9 w-full md:w-[100px] lg:w-[250px]"
            />
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                      <Image
                        src="https://placehold.co/32x32.png"
                        alt="Phone Shop Logo"
                        width={32}
                        height={32}
                        className="h-6 w-6"
                      />
                      <span className="font-bold">{siteConfig.name}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    {siteConfig.mainNav.map((item) => (
                      <React.Fragment key={item.title}>
                        <Link
                          href={item.href}
                          className="text-lg font-medium"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          {item.title}
                        </Link>
                        {item.items && (
                          <div className="ml-4 flex flex-col space-y-2">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="text-sm text-muted-foreground"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
[/code]
[file]components/site-header.tsx[/file][usedfor]shared header[/usedfor]