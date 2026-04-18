import React from 'react';
import { Link, Divider } from '@heroui/react';
import { Heart, Cookie } from 'lucide-react';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto bg-background/50 backdrop-blur-sm">
      <Divider className="mb-6" />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-default-500 font-medium">
          <Cookie size={16} className="text-primary" />
          <span>© {currentYear} Cookie Clicker. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-default-500 font-medium">
          <span>Built with</span>
          <Heart size={14} className="text-danger animate-pulse" fill="currentColor" />
          <span>using</span>
          <Link
            href="https://heroui.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Hero UI
          </Link>
          <span>&</span>
          <Link
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-secondary hover:opacity-80 transition-opacity"
          >
            React
          </Link>
        </div>
      </div>
    </footer>
  );
}