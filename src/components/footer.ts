import { SiteConfig } from '../types';

export function renderFooter(container: HTMLElement, config: SiteConfig): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-800 text-white py-8 mt-12';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';
  footer.appendChild(containerDiv);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'flex flex-col md:flex-row justify-between items-center';
  containerDiv.appendChild(contentDiv);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'text-sm';
  copyrightDiv.textContent = `© ${new Date().getFullYear()} ${config.title}. All rights reserved.`;
  contentDiv.appendChild(copyrightDiv);

  const linksDiv = document.createElement('div');
  linksDiv.className = 'flex space-x-4 mt-4 md:mt-0';
  contentDiv.appendChild(linksDiv);

  const privacyLink = document.createElement('a');
  privacyLink.href = '/privacy'; // Replace with your actual privacy policy link
  privacyLink.className = 'hover:text-gray-300';
  privacyLink.textContent = 'Privacy Policy';
  linksDiv.appendChild(privacyLink);

  const termsLink = document.createElement('a');
  termsLink.href = '/terms'; // Replace with your actual terms of service link
  termsLink.className = 'hover:text-gray-300';
  termsLink.textContent = 'Terms of Service';
  linksDiv.appendChild(termsLink);

  container.appendChild(footer);
}