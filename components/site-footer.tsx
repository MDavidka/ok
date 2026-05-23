import { cn } from "@/lib/utils";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <Link
              href="https://github.com/your-github-profile" // Replace with actual profile
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Your Name
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/shadcn/ui" // Placeholder, replace with actual repo
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
[/code]
[file]components/site-footer.tsx[file][usedfor]The main footer component for the phone store, providing copyright information, links to legal pages, social media, or other supplementary navigation.[usedfor]