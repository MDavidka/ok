"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Terminal, Github, Twitter, Youtube, Check, Heart, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Successfully subscribed to DevSuite insights!');
    setEmail('');
  };

  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="rounded-lg bg-primary text-primary-foreground p-1.5 flex items-center justify-center">
                <Terminal className="h-5 w-5" />
              </div>
              <span>DevSuite Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              A premium sandbox ecosystem built for software engineers, product managers, and modern teams. Accelerate your web development cycles with our lightweight, client-focused tool suite.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Interactive Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/snippets" className="text-muted-foreground hover:text-primary transition-colors">
                  Snippet Repository
                </Link>
              </li>
              <li>
                <Link href="/api-tester" className="text-muted-foreground hover:text-primary transition-colors">
                  Live API Client Tester
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-muted-foreground hover:text-primary transition-colors">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/api/mock-endpoint" target="_blank" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Mock JSON Endpoint <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company / Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/#faq-section" className="text-muted-foreground hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" onClick={() => toast.info("Privacy policy is standard MIT license.")}>
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" onClick={() => toast.info("Terms of service apply to free tool usage.")}>
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-foreground font-mono">Stay Updated</h4>
            <p className="text-xs text-muted-foreground leading-normal">
              Get raw code snippets, performance tips, and architectural insights delivered straight to your inbox weekly.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg">
                <Check className="h-4 w-4 shrink-0" />
                <span>Subscribed! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 text-xs h-9 bg-background"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Subscribe"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
                <Button type="submit" size="sm" className="w-full text-xs h-9">
                  Join Newsletter
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DevSuite Hub. Built for elite software engineers.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-destructive fill-destructive" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
