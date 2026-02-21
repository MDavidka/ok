import { NavItem } from '../types';

export function renderHeader(container: HTMLElement, navItems: NavItem[]): void {
  if (!container) {
    console.error('Header container not found');
    return;
  }

  container.innerHTML = `
    <header class="bg-gray-900 text-white py-4">
      <div class="container mx-auto flex items-center justify-between">
        <a href="#" class="text-2xl font-bold">Portfolio</a>
        <nav>
          <ul class="flex space-x-6">
            ${navItems.map(item => `
              <li><a href="${item.href}" class="hover:text-gray-300">${item.label}</a></li>
            `).join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;
}