import { SiteConfig } from '../types';

export function renderFooter(container: HTMLElement, config: SiteConfig): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-900 text-gray-400 py-6 text-center text-sm';

  const copyright = document.createElement('p');
  copyright.textContent = `© ${new Date().getFullYear()} ${config.author}. All rights reserved.`;

  footer.appendChild(copyright);
  container.appendChild(footer);
}