import { SiteConfig } from '../types';

export function renderFooter(config: SiteConfig, container: HTMLElement): void {
  if (!container) {
    console.error('Footer container not found');
    return;
  }

  const footerContent = `
    <footer class="bg-gray-800 text-gray-300 py-6">
      <div class="container mx-auto text-center">
        <p>&copy; ${new Date().getFullYear()} ${config.author}. All rights reserved.</p>
        <p class="mt-2">
          <a href="${config.social.linkedin}" target="_blank" class="hover:text-white mr-4">LinkedIn</a>
          <a href="${config.social.github}" target="_blank" class="hover:text-white">GitHub</a>
        </p>
      </div>
    </footer>
  `;

  container.innerHTML = footerContent;
}