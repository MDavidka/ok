import { SiteConfig } from './types';

export function getSiteConfig(): SiteConfig {
  return {
    title: 'Welcome!',
    description: 'A simple welcome website built with Vite and TypeScript.',
  };
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}