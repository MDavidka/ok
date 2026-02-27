import { NavItem, ComponentProps } from '../types';

interface HeaderProps extends ComponentProps {
  navItems: NavItem[];
  siteName: string;
}

export function Header({ navItems, siteName, className }: HeaderProps): HTMLElement {
  const header = document.createElement('header');
  header.className = `bg-color-secondary text-color-text py-4 ${className || ''}`;

  const container = document.createElement('div');
  container.className = 'container mx-auto flex items-center justify-between';

  const title = document.createElement('a');
  title.href = '/';
  title.textContent = siteName;
  title.className = 'text-xl font-bold text-color-primary';

  const nav = document.createElement('nav');

  const ul = document.createElement('ul');
  ul.className = 'flex space-x-6';

  navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    a.className = 'hover:text-color-accent';
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);

  container.appendChild(title);
  container.appendChild(nav);
  header.appendChild(container);

  return header;
}

export function renderHeader(container: HTMLElement, props: HeaderProps): void {
  const headerElement = Header(props);
  container.appendChild(headerElement);
}