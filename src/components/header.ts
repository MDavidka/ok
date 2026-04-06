import { NavItem, RoutePath } from '../types';
import { navigateTo, getCartCount } from '../utils';

/**
 * Verdant Aura - Header Component
 * 
 * A responsive navigation bar that handles client-side routing
 * and displays the real-time cart item count.
 */

const NAV_ITEMS: NavItem[] = [
  { label: 'Shop All', path: '/shop' },
  { label: 'Care Guides', path: '/care' },
];

export function renderHeader(container: HTMLElement): void {
  const header = document.createElement('header');
  header.className = 'sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300';
  header.id = 'main-header';

  const cartCount = getCartCount();

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a href="/" id="logo-link" class="flex items-center space-x-2 group">
            <div class="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span class="text-2xl font-bold tracking-tight text-emerald-950 font-heading">Verdant Aura</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-10">
          ${NAV_ITEMS.map(item => `
            <a 
              href="${item.path}" 
              data-path="${item.path}"
              class="nav-link text-sm font-medium text-gray-600 hover:text-emerald-900 transition-colors relative py-2"
            >
              ${item.label}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-800 transition-all duration-300 nav-underline"></span>
            </a>
          `).join('')}
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-5">
          <button id="search-trigger" class="p-2 text-gray-500 hover:text-emerald-900 transition-colors" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button id="cart-trigger" class="p-2 text-gray-500 hover:text-emerald-900 transition-colors relative" aria-label="Shopping Cart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id="cart-badge" class="${cartCount > 0 ? 'flex' : 'hidden'} absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 items-center justify-center rounded-full border-2 border-white animate-fade-in">
              ${cartCount}
            </span>
          </button>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-button" class="md:hidden p-2 text-gray-500 hover:text-emerald-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (Hidden by default) -->
    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-xl">
      ${NAV_ITEMS.map(item => `
        <a 
          href="${item.path}" 
          data-path="${item.path}"
          class="block text-lg font-medium text-gray-800 hover:text-emerald-900"
        >
          ${item.label}
        </a>
      `).join('')}
    </div>
  `;

  container.prepend(header);

  // --- Event Listeners ---

  // Handle Logo Click
  const logoLink = header.querySelector('#logo-link');
  logoLink?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/');
  });

  // Handle Navigation Links
  const navLinks = header.querySelectorAll('[data-path]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = (link as HTMLElement).dataset.path as RoutePath;
      if (path) {
        navigateTo(path);
        // Close mobile menu if open
        header.querySelector('#mobile-menu')?.classList.add('hidden');
      }
    });
  });

  // Handle Cart Trigger
  const cartTrigger = header.querySelector('#cart-trigger');
  cartTrigger?.addEventListener('click', () => {
    // Dispatch a custom event that the cart-overlay component will listen for
    window.dispatchEvent(new CustomEvent('toggle-cart'));
  });

  // Handle Mobile Menu Toggle
  const mobileBtn = header.querySelector('#mobile-menu-button');
  const mobileMenu = header.querySelector('#mobile-menu');
  mobileBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });

  // --- Reactive Updates ---

  // Listen for cart updates to refresh badge
  window.addEventListener('cart-updated', ((e: CustomEvent) => {
    const badge = header.querySelector('#cart-badge') as HTMLElement;
    if (badge) {
      const count = e.detail.itemCount;
      badge.textContent = count.toString();
      if (count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('flex');
      } else {
        badge.classList.add('hidden');
        badge.classList.remove('flex');
      }
    }
  }) as EventListener);

  // Listen for navigation changes to update active state
  window.addEventListener('navigation-changed', ((e: CustomEvent) => {
    const currentPath = e.detail.path;
    
    // Update active link styles
    navLinks.forEach(link => {
      const linkPath = (link as HTMLElement).dataset.path;
      const underline = link.querySelector('.nav-underline');
      
      if (linkPath === currentPath) {
        link.classList.add('text-emerald-900');
        link.classList.remove('text-gray-600');
        underline?.classList.remove('w-0');
        underline?.classList.add('w-full');
      } else {
        link.classList.remove('text-emerald-900');
        link.classList.add('text-gray-600');
        underline?.classList.add('w-0');
        underline?.classList.remove('w-full');
      }
    });

    // Handle header transparency on scroll (optional logic can be added here)
    if (currentPath === '/') {
      // Home page might want a transparent header initially
      // header.classList.add('bg-transparent');
    }
  }) as EventListener);
}