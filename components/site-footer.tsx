import Link from "next/link";
import { Flame, Mail, Phone, MapPin, Clock, Instagram, Facebook, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SiteFooter() {
  return (
    <footer className="bg-[#070709] border-t border-stone-900 text-stone-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30">
                <Flame className="h-4 w-4 text-amber-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-widest uppercase font-bold text-stone-100">
                  AETHER
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-amber-500/80 font-semibold -mt-1">
                  BISTRO
                </span>
              </div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed">
              A sensory dining destination that blends ancient wood-fire culinary arts with modern seasonal refinement. Every dish tells a story of the soil, the sea, and the flame.
            </p>
            <div className="flex items-center space-x-2 bg-stone-900/40 border border-stone-800/80 rounded-lg p-2.5 w-fit">
              <Award className="h-5 w-5 text-amber-500 shrink-0" />
              <div className="text-[11px] text-stone-300 leading-snug">
                <p className="font-semibold text-amber-400">Michelin Guide 2024</p>
                <p className="text-stone-400">Exceptional Dining Recommendation</p>
              </div>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-stone-100 font-serif tracking-wider uppercase text-sm font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Hours of Culinary Art
            </h4>
            <div className="space-y-2.5 text-sm text-stone-400">
              <div className="flex justify-between border-b border-stone-900 pb-1">
                <span>Wednesday - Thursday</span>
                <span className="text-stone-200">5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-stone-900 pb-1">
                <span>Friday - Saturday</span>
                <span className="text-amber-400 font-medium">5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-stone-900 pb-1">
                <span>Sunday Brunch</span>
                <span className="text-stone-200">11:00 AM - 3:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-stone-900 pb-1">
                <span>Sunday Dinner</span>
                <span className="text-stone-200">5:00 PM - 9:30 PM</span>
              </div>
              <div className="flex justify-between text-xs text-amber-500/60 pt-1">
                <span>* Closed Mondays & Tuesdays</span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-stone-100 font-serif tracking-wider uppercase text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" />
              Find Our Hearth
            </h4>
            <ul className="space-y-3.5 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500/70 shrink-0 mt-0.5" />
                <span>
                  482 Amber Hearth Way,<br />
                  SOMA District, San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-500/70 shrink-0" />
                <span className="text-stone-200 hover:text-amber-400 transition-colors">
                  +1 (415) 555-0198
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-500/70 shrink-0" />
                <span className="text-stone-200 hover:text-amber-400 transition-colors">
                  reservations@aetherbistro.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-stone-100 font-serif tracking-wider uppercase text-sm font-semibold">
              The Epicurean Club
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              Subscribe to receive exclusive invitations to our seasonal tasting menus, winemaker dinners, and culinary masterclasses.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for joining the Epicurean Club!");
              }}
              className="space-y-2"
            >
              <div className="flex gap-1.5">
                <Input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  className="bg-stone-900/80 border-stone-800 focus-visible:ring-amber-500/50 text-stone-200 text-sm placeholder:text-stone-500"
                />
                <Button type="submit" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-4">
                  Join
                </Button>
              </div>
              <p className="text-[10px] text-stone-500">
                We value your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>

        {/* Fine borders & Bottom Bar */}
        <div className="border-t border-stone-900 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Aether Bistro. All culinary rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              Philosophy
            </Link>
            <Link href="/menu" className="hover:text-amber-400 transition-colors">
              Menu Sourcing
            </Link>
            <Link href="/reservations" className="hover:text-amber-400 transition-colors">
              Cancellation Policy
            </Link>
          </div>
          <div className="flex space-x-3.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-stone-900/60 flex items-center justify-center hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition-all"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-stone-900/60 flex items-center justify-center hover:bg-stone-800 text-stone-400 hover:text-amber-400 transition-all"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
