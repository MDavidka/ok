import './style.css';
import { Header, initHeader } from './components/header';
import { renderHero } from './components/hero';
import { Features } from './components/features';
import { Footer } from './components/footer';
import { SiteConfig } from './types';

/**
 * Global site configuration used across components.
 */
const siteConfig: SiteConfig = {
  title: 'QuantumMug',
  description: 'Experience your coffee in multiple states simultaneously.',
  navItems: [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Pre-order', href: '#pre-order' }
  ]
};

/**
 * Main application initialization function.
 * Orchestrates the rendering of all components and attaches necessary event listeners.
 */
export function renderApp(): void {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('Critical Error: Root element #app not found in the DOM.');
    return;
  }

  // 1. Inject the static HTML structure for components that return strings
  // We create a specific container for the Hero component since it manages its own DOM injection and events.
  app.innerHTML = `
    <div class="min-h-screen flex flex-col">
      ${Header({ config: siteConfig })}
      
      <main class="flex-grow flex flex-col">
        <!-- Hero Section Container -->
        <div id="hero-container"></div>
        
        <!-- Features Section -->
        ${Features()}
      </main>
      
      ${Footer()}
    </div>
  `;

  // 2. Initialize interactive elements for string-based components
  initHeader();

  // 3. Render complex components that require DOM element mounting
  const heroContainer = document.getElementById('hero-container');
  if (heroContainer) {
    renderHero(heroContainer, {
      title: 'The <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">QuantumMug</span>',
      description: "Experience your coffee in multiple states simultaneously. It's hot, it's cold, and it's perfectly brewed until you observe it."
    });
  } else {
    console.warn('Warning: #hero-container not found, skipping Hero render.');
  }
}

// Bootstrap the application once the DOM is fully parsed and ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}