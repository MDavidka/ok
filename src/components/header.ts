import { NavItem } from '../types';

export function renderHeader(container: HTMLElement, navItems: NavItem[]): void {
  const header = document.createElement('header');
  header.className = 'bg-var(--color-bg) text-var(--color-text) py-4 shadow-md sticky top-0 z-50';

  const nav = document.createElement('nav');
  nav.className = 'container mx-auto flex items-center justify-between';

  const logo = document.createElement('a');
  logo.href = '#';
  logo.textContent = 'My Site';
  logo.className = 'text-xl font-bold';
  nav.appendChild(logo);

  const navList = document.createElement('ul');
  navList.className = 'flex space-x-6';

  navItems.forEach(item => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.className = 'hover:text-var(--color-accent) transition-colors duration-200';
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  nav.appendChild(navList);
  header.appendChild(nav);
  container.appendChild(header);
}