import { SiteConfig } from '../types';

export function renderFooter(config: SiteConfig, container: HTMLElement): void {
  if (!container) {
    console.error('Footer container not found');
    return;
  }

  container.innerHTML = `
    <footer class="bg-gray-900 text-gray-300 py-6">
      <div class="container mx-auto text-center">
        <p>&copy; ${new Date().getFullYear()} ${config.author}. All rights reserved.</p>
        <p class="mt-2">
          <a href="${config.social.linkedin}" target="_blank" rel="noopener noreferrer" class="hover:text-white">LinkedIn</a> | 
          <a href="${config.social.github}" target="_blank" rel="noopener noreferrer" class="hover:text-white">GitHub</a>
        </p>
      </div>
    </footer>
  `;
}