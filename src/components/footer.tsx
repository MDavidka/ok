import React from 'react';
import { Link, Divider } from '@heroui/react';
import { Heart, Github } from 'lucide-react';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto bg-background/50 backdrop-blur-sm">
      <Divider className="bg-divider" />
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm text-default-500 flex items-center gap-1.5 font-medium">
            Baked with <Heart className="w-4 h-4 text-danger animate-pulse" fill="currentColor" /> by AI
          </p>
          <p className="text-xs text-default-400">
            &copy; {currentYear} Cookie Clicker. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm font-mono text-default-400 bg-default-100 px-2 py-1 rounded-md">
            v1.0.0
          </span>
          
          <div className="flex items-center gap-4">
            <Link 
              href="#" 
              size="sm" 
              color="foreground" 
              className="text-default-500 hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              size="sm" 
              color="foreground" 
              className="text-default-500 hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="https://github.com" 
              isExternal
              aria-label="GitHub Repository"
              className="text-default-500 hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}