import { NavItem } from '../types';

export function renderHeader(container: HTMLElement, navItems: NavItem[]): void {
  const header = document.createElement('header');
  header.className = 'bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50';

  const nav = document.createElement('nav');
  nav.className = 'container mx-auto px-4 py-3 flex items-center justify-between';

  const logo = document.createElement('a');
  logo.href = '#';
  logo.textContent = 'Restaurant Name';
  logo.className = 'text-xl font-bold text-gray-800 dark:text-white';
  nav.appendChild(logo);

  const navList = document.createElement('ul');
  navList.className = 'flex space-x-6';

  navItems.forEach(item => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.className = 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white';
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  nav.appendChild(navList);
  header.appendChild(nav);
  container.appendChild(header);
}