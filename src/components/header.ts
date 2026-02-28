import { NavItem, SiteConfig } from '../types';
import { getConfig } from '../utils';

interface HeaderProps {
  config: SiteConfig;
}

export function Header(props: HeaderProps): string {
  const { config } = props;

  return `
    <header class="header">
      <div class="container">
        <div class="flex items-center justify-between">
          <a href="/" class="text-xl font-bold">${config.name}</a>
          <nav>
            <ul class="flex space-x-4">
              ${config.navItems
                .map(
                  (item) => `
                <li>
                  <a href="${item.href}" class="hover:text-[var(--color-accent)]">${item.label}</a>
                </li>
              `
                )
                .join('')}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  `;
}

export function renderHeader(container: HTMLElement, props: HeaderProps): void {
  if (!container) {
    console.error('Header container not found');
    return;
  }

  container.innerHTML = Header(props);
}