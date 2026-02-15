import '../style.css'; // Import global styles
import { NavItem } from '../types';

export function renderHeader(container: HTMLElement, navItems: NavItem[]): void {
  const header = document.createElement('header');
  header.className = 'bg-color-bg py-4 shadow-md';

  const nav = document.createElement('nav');
  nav.className = 'container mx-auto px-4 flex items-center justify-between';

  const logo = document.createElement('a');
  logo.href = '/';
  logo.className = 'text-color-primary text-lg font-bold';
  logo.textContent = 'My Simple Site';

  const navList = document.createElement('ul');
  navList.className = 'flex space-x-6';

  navItems.forEach(item => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'text-color-text hover:text-color-primary';
    link.textContent = item.label;
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  nav.appendChild(logo);
  nav.appendChild(navList);
  header.appendChild(nav);
  container.appendChild(header);
}