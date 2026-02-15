import { NavItem } from './types';

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
}

export function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleTimeString(undefined, options);
}

export function generateNavigation(config: { baseUrl: string }): NavItem[] {
  return [
    { label: 'Home', href: config.baseUrl + '/' },
    { label: 'Menu', href: config.baseUrl + '/menu' },
    { label: 'Reservations', href: config.baseUrl + '/reservations' },
    { label: 'Contact', href: config.baseUrl + '/contact' },
  ];
}