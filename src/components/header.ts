import { NavItem } from '../types';
import { debounce } from '../utils';

export function renderHeader(container: HTMLElement, navItems: NavItem[]): void {
  container.innerHTML = `
    <header class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-color-primary dark:text-white">SaaS Landing</a>
        <nav class="hidden md:flex space-x-4">
          ${navItems.map(item => `
            <a href="${item.href}" class="text-gray-700 dark:text-gray-300 hover:text-color-primary dark:hover:text-color-primary transition-colors duration-200">${item.label}</a>
          `).join('')}
        </nav>
        <button id="mobile-menu-button" class="md:hidden text-gray-500 dark:text-gray-300 focus:outline-none focus:text-color-primary">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div id="mobile-menu" class="hidden bg-white dark:bg-gray-800 py-2 px-4">
        ${navItems.map(item => `
          <a href="${item.href}" class="block py-2 text-gray-700 dark:text-gray-300 hover:text-color-primary dark:hover:text-color-primary transition-colors duration-200">${item.label}</a>
        `).join('')}
      </div>
    </header>
  `;

  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Debounce the resize event for better performance
  const handleResize = debounce(() => {
    if (window.innerWidth >= 768) {
      mobileMenu?.classList.add('hidden');
    }
  }, 100);

  window.addEventListener('resize', handleResize);
}