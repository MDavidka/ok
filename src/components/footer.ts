import { SiteConfig } from '../types';

export function renderFooter(container: HTMLElement, config: SiteConfig): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-800 text-white py-4 mt-8';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto text-center';

  const copyright = document.createElement('p');
  copyright.textContent = `© ${new Date().getFullYear()} ${config.title}. All rights reserved.`;

  containerDiv.appendChild(copyright);
  footer.appendChild(containerDiv);
  container.appendChild(footer);
}