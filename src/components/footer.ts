import { ComponentProps } from '../types';
import { classNames } from '../utils';

export function Footer({ className }: ComponentProps) {
  return `
    <footer class="${classNames('bg-color-bg border-t border-color-muted py-6 text-center text-color-muted', className)}">
      <p>&copy; ${new Date().getFullYear()} GitHub Intro. All rights reserved.</p>
    </footer>
  `;
}