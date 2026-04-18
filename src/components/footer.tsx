import React from 'react';
import { Link, Divider, Chip } from '@heroui/react';
import { Cloud, CloudOff, Github, Heart, Cookie } from 'lucide-react';

export interface AppFooterProps {
  /** Indicates if the game state is currently synced to the cloud database */
  isSynced?: boolean;
  /** Optional timestamp of the last successful save */
  lastSavedAt?: number;
}

export default function AppFooter({ isSynced = false, lastSavedAt }: AppFooterProps): JSX.Element {
  // Format the last saved time if provided
  const formattedLastSaved = React.useMemo(() => {
    if (!lastSavedAt) return null;
    const date = new Date(lastSavedAt);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [lastSavedAt]);

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-default-100 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Version */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
              <Cookie className="w-5 h-5" />
            </div>
            <span className="text-lg font-heading font-bold text-[var(--color-text)]">
              Cookie Clicker
            </span>
            <Chip size="sm" color="primary" variant="flat" className="ml-2">
              v1.0.0
            </Chip>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              color="foreground" 
              size="sm"
              className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <Github className="w-4 h-4 mr-1.5" /> Source Code
            </Link>
            <Link 
              href="#" 
              color="foreground" 
              size="sm"
              className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              color="foreground" 
              size="sm"
              className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        <Divider className="my-6 bg-default-100" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-muted)]">
          {/* Credits */}
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-[var(--color-secondary)] fill-[var(--color-secondary)] animate-pulse" />
            <span>using React & Hero UI</span>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center gap-3">
            {formattedLastSaved && (
              <span className="text-xs opacity-70">
                Last saved: {formattedLastSaved}
              </span>
            )}
            
            {isSynced ? (
              <Chip 
                startContent={<Cloud className="w-3.5 h-3.5" />} 
                color="success" 
                variant="dot" 
                size="sm"
                className="border-none"
              >
                Cloud Sync Active
              </Chip>
            ) : (
              <Chip 
                startContent={<CloudOff className="w-3.5 h-3.5" />} 
                color="warning" 
                variant="dot" 
                size="sm"
                className="border-none"
              >
                Local Save Only
              </Chip>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}