import { NavItem } from '../types';
import { createElement } from '../utils';

/**
 * Renders the main header/navigation bar for the cookie clicker game.
 * @param container The parent element to append the header to
 */
export function renderHeader(container: HTMLElement): void {
  // Clear any existing content
  container.innerHTML = '';
  
  // Define navigation items
  const navItems: NavItem[] = [
    { label: 'Game', href: '#game', icon: '🍪' },
    { label: 'Shop', href: '#shop', icon: '🛒' },
    { label: 'Stats', href: '#stats', icon: '📊' },
    { label: 'Achievements', href: '#achievements', icon: '🏆' },
    { label: 'Prestige', href: '#prestige', icon: '✨' }
  ];
  
  // Create header element
  const header = createElement('header', {
    classes: ['bg-amber-800', 'text-amber-50', 'shadow-lg']
  });
  
  // Create navigation container
  const nav = createElement('nav', {
    classes: ['container', 'mx-auto', 'px-4', 'py-3']
  });
  
  // Create logo/title
  const title = createElement('h1', {
    classes: ['text-2xl', 'font-bold', 'mb-4', 'flex', 'items-center'],
    html: '<span class="mr-2">🍪</span> Cookie Clicker'
  });
  
  // Create navigation list
  const navList = createElement('ul', {
    classes: ['flex', 'space-x-1', 'md:space-x-4', 'overflow-x-auto', 'pb-2']
  });
  
  // Add navigation items
  navItems.forEach(item => {
    const navItem = createElement('li');
    const link = createElement('a', {
      classes: [
        'flex', 
        'items-center', 
        'px-3', 
        'py-2', 
        'rounded-lg',
        'bg-amber-700',
        'hover:bg-amber-600',
        'transition-colors',
        'whitespace-nowrap',
        'text-sm',
        'md:text-base'
      ],
      text: `${item.icon} ${item.label}`,
      attributes: { href: item.href }
    });
    
    navItem.appendChild(link);
    navList.appendChild(navItem);
  });
  
  // Assemble the header
  nav.appendChild(title);
  nav.appendChild(navList);
  header.appendChild(nav);
  container.appendChild(header);
  
  // Add active state handling
  const updateActiveLink = () => {
    const hash = window.location.hash || '#game';
    const links = navList.querySelectorAll('a');
    
    links.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('bg-amber-500', 'text-amber-900');
        link.classList.remove('bg-amber-700');
      } else {
        link.classList.remove('bg-amber-500', 'text-amber-900');
        link.classList.add('bg-amber-700');
      }
    });
  };
  
  // Set initial active state
  updateActiveLink();
  
  // Update active state on hash change
  window.addEventListener('hashchange', updateActiveLink);
}