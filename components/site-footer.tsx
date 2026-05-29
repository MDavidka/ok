import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-8">
      <Separator className="mb-6" />
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Phone Shop. All rights reserved.
          </p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-end">
          <li>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
[/code]
[file]components/site-footer.tsx[/file][usedfor]shared footer[/usedfor]