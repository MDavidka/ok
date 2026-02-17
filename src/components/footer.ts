import { SiteConfig } from '../types';

export function renderFooter(container: HTMLElement, config: SiteConfig): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-900 text-gray-300 py-6 mt-12';

  const innerContainer = document.createElement('div');
  innerContainer.className = 'container mx-auto px-4 flex justify-between items-center';

  const copyright = document.createElement('p');
  copyright.className = 'text-sm';
  copyright.textContent = `© ${new Date().getFullYear()} ${config.author}. All rights reserved.`;

  const socialLinks = document.createElement('div');
  socialLinks.className = 'flex space-x-4';

  config.socialLinks?.forEach(link => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'hover:text-white transition-colors duration-200';
    a.textContent = link.name;
    socialLinks.appendChild(a);
  });

  innerContainer.appendChild(copyright);
  innerContainer.appendChild(socialLinks);
  footer.appendChild(innerContainer);
  container.appendChild(footer);
}