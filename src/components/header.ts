import { ComponentProps, NavItem } from '../types';
import { classNames } from '../utils';

interface HeaderProps extends ComponentProps {
  navItems: NavItem[];
}

export function Header({ className, navItems }: HeaderProps) {
  return `
    <header class="${classNames('bg-white shadow-md p-4', className)}">
      <nav class="container mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-bold text-color-primary">GitHub Intro</a>
        <ul class="flex space-x-4">
          ${navItems.map(item => `<li><a href="${item.href}" class="hover:text-color-secondary">${item.label}</a></li>`).join('')}
        </ul>
      </nav>
    </header>
  `;
}