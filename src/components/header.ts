import { NavItem } from '../types';
import { createElement } from '../utils';

const NAV_ITEMS: NavItem[] = [
  { label: 'Game', href: '#game', icon: '🍪' },
  { label: 'Shop', href: '#shop', icon: '🛒' },
  { label: 'Leaderboard', href: '#leaderboard', icon: '🏆' }
];

/**
 * Renders the main application header with navigation tabs.
 * Handles active state styling based on the current URL hash.
 * 
 * @param container The DOM element to append the header to.
 */
export function renderHeader(container: HTMLElement): void {
  // Create the main header wrapper
  const header = createElement('header', {
    classes: [
      'bg-[var(--color-surface)]', 
      'border-b', 
      'border-[var(--color-border)]', 
      'sticky', 
      'top-0', 
      'z-50', 
      'shadow-sm'
    ]
  });

  // Create the inner container for layout
  const navContainer = createElement('div', {
    classes: [
      'max-w-6xl', 
      'mx-auto', 
      'px-4', 
      'h-16', 
      'flex', 
      'items-center', 
      'justify-between'
    ]
  });

  // Create the Logo / Title area
  const logo = createElement('div', {
    classes: [
      'text-xl', 
      'sm:text-2xl', 
      'font-bold', 
      'text-[var(--color-primary)]', 
      'flex', 
      'items-center', 
      'gap-2', 
      'cursor-pointer',
      'select-none'
    ],
    html: `<span>🍪</span><span>Cookie Clicker</span>`
  });

  // Clicking the logo returns to the game
  logo.addEventListener('click', () => {
    window.location.hash = '#game';
  });

  // Create the navigation menu
  const nav = createElement('nav', {
    classes: ['flex', 'gap-1', 'sm:gap-2']
  });

  // Store references to the link elements to update their active states later
  const navLinks: Record<string, HTMLAnchorElement> = {};

  NAV_ITEMS.forEach(item => {
    const link = createElement('a', {
      classes: [
        'px-3', 
        'py-2', 
        'rounded-md', 
        'text-sm', 
        'font-medium', 
        'transition-colors',
        'flex', 
        'items-center', 
        'gap-1', 
        'sm:gap-2', 
        'select-none',
        'cursor-pointer'
      ],
      attributes: { href: item.href },
      html: `<span class="text-lg">${item.icon}</span><span class="hidden sm:inline">${item.label}</span>`
    });

    nav.appendChild(link);
    navLinks[item.href] = link as HTMLAnchorElement;
  });

  // Assemble the DOM structure
  navContainer.appendChild(logo);
  navContainer.appendChild(nav);
  header.appendChild(navContainer);
  container.appendChild(header);

  /**
   * Updates the visual state of the navigation tabs based on the current URL hash.
   */
  const updateActiveTab = () => {
    // Default to #game if no hash is present
    const currentHash = window.location.hash || '#game';
    
    Object.entries(navLinks).forEach(([href, linkEl]) => {
      if (href === currentHash) {
        // Active state styles
        linkEl.classList.add('bg-[var(--color-primary)]', 'text-[var(--color-surface)]');
        linkEl.classList.remove('text-[var(--color-text-muted)]', 'hover:bg-[var(--color-surface-hover)]', 'hover:text-[var(--color-primary)]');
      } else {
        // Inactive state styles
        linkEl.classList.remove('bg-[var(--color-primary)]', 'text-[var(--color-surface)]');
        linkEl.classList.add('text-[var(--color-text-muted)]', 'hover:bg-[var(--color-surface-hover)]', 'hover:text-[var(--color-primary)]');
      }
    });
  };

  // Listen for navigation changes to update the active tab
  window.addEventListener('hashchange', updateActiveTab);
  
  // Set the initial active tab on render
  updateActiveTab();
}