import { SiteConfig } from '../types';
import { formatCurrency } from '../utils';

export function renderFooter(container: HTMLElement, config: SiteConfig): void {
  const footerHTML = `
    <footer class="bg-color-bg dark:bg-color-bg-dark py-6 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto text-center text-color-text-light dark:text-color-text-light">
        <p class="text-sm">
          &copy; ${new Date().getFullYear()} ${config.title}. All rights reserved.
        </p>
        <p class="text-xs mt-2">
          Built by <a href="${config.url}" class="text-color-primary hover:underline">${config.author}</a>
        </p>
      </div>
    </footer>
  `;

  container.innerHTML = footerHTML;
}