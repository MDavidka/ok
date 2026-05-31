import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t bg-background py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Copyright Information */}
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Syra Phones. All rights reserved.
        </p>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6">
          {navLinks.map((link) => (
            <Button key={link.name} variant="link" size="sm" asChild className="text-muted-foreground">
              <Link href={link.href}>{link.name}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </footer>
  );
}