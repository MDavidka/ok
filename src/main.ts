import './style.css';
import { Header } from './components/header';
import { Hero, initHero } from './components/hero';
import { Features } from './components/features';
import { Footer } from './components/footer';
import { NavItem } from './types';

// Define navigation items for the header
const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Get Started', href: '#hero-cta' }
];

/**
 * Main application rendering function.
 * Injects all component HTML into the root element and initializes interactivity.
 */
export function renderApp(): void {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Critical Error: Root element #app not found in the DOM.');
    return;
  }

  // Construct the page layout using imported components
  app.innerHTML = `
    <div class="min-h-screen flex flex-col bg-[var(--color-bg)] font-[var(--font-body)] text-[var(--color-text)]">
      ${Header({ navItems })}
      
      <main class="flex-grow flex flex-col">
        ${Hero()}
        ${Features()}
      </main>
      
      ${Footer({ className: 'mt-auto' })}
    </div>
  `;

  // Initialize interactive elements after they are mounted in the DOM
  initHero();
}

// Ensure the DOM is fully loaded before attempting to render the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}