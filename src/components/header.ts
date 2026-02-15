import { NavItem } from '../types';

export function renderHeader(container: HTMLElement, navItems: NavItem[]): void {
  const header = document.createElement('header');
  header.className = 'bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50';

  const nav = document.createElement('nav');
  nav.className = 'container mx-auto px-4 py-3 flex items-center justify-between';

  const logoLink = document.createElement('a');
  logoLink.href = '#';
  logoLink.className = 'text-2xl font-bold text-gray-800 dark:text-white';
  logoLink.textContent = 'SaaSify';

  const navList = document.createElement('ul');
  navList.className = 'flex space-x-6 items-center';

  navItems.forEach(item => {
    const listItem = document.createElement('li');

    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white';
    link.textContent = item.label;

    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  const button = document.createElement('button');
  button.className = 'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  button.textContent = 'Get Started';

  nav.appendChild(logoLink);
  nav.appendChild(navList);
  nav.appendChild(button);
  header.appendChild(nav);
  container.appendChild(header);
}