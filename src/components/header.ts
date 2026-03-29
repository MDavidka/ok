import { ComponentProps, SiteConfig } from '../types';
import { classNames } from '../utils';

export interface HeaderProps extends ComponentProps {
  config: SiteConfig;
}

/**
 * Generates the HTML string for the Header component.
 */
export function Header({ className, config }: HeaderProps): string {
  const desktopNavLinks = config.navItems.map(item => `
    <a href="${item.href}" class="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-medium text-sm">
      ${item.label}
    </a>
  `).join('');

  const mobileNavLinks = config.navItems.map(item => `
    <a href="${item.href}" class="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-muted)]/10 transition-colors">
      ${item.label}
    </a>
  `).join('');

  return `
    <header class="${classNames('w-full bg-[var(--color-bg)] border-b border-[var(--color-muted)]/20 sticky top-0 z-50 transition-all duration-300', className)}">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div class="w-10 h-10 rounded-[var(--radius)] bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-[var(--color-secondary)] transition-colors group-hover:rotate-12 transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <span class="font-heading font-extrabold text-2xl text-[var(--color-text)] tracking-tight">
              ${config.title}
            </span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-8 items-center">
            ${desktopNavLinks}
          </nav>

          <!-- CTA Button (Desktop) -->
          <div class="hidden md:flex items-center">
            <button class="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-6 py-2.5 rounded-[var(--radius)] font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]">
              Randomize Now
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button id="mobile-menu-btn" class="text-[var(--color-text)] hover:text-[var(--color-primary)] focus:outline-none p-2 rounded-md hover:bg-[var(--color-muted)]/10 transition-colors" aria-label="Toggle menu">
              <svg id="menu-icon-open" class="h-6 w-6 block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg id="menu-icon-close" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu (Hidden by default) -->
      <div id="mobile-menu" class="hidden md:hidden bg-[var(--color-bg)] border-t border-[var(--color-muted)]/20 shadow-lg absolute w-full left-0">
        <div class="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          ${mobileNavLinks}
          <div class="pt-4">
            <button class="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-3 rounded-[var(--radius)] font-medium transition-all shadow-sm">
              Randomize Now
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

/**
 * Initializes the interactive elements of the Header component.
 * Must be called after the Header HTML is injected into the DOM.
 */
export function initHeader(): void {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!btn || !menu || !iconOpen || !iconClose) return;

  btn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
      menu.classList.remove('hidden');
      iconOpen.classList.add('hidden');
      iconOpen.classList.remove('block');
      iconClose.classList.remove('hidden');
      iconClose.classList.add('block');
    } else {
      menu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconOpen.classList.add('block');
      iconClose.classList.add('hidden');
      iconClose.classList.remove('block');
    }
  });
}