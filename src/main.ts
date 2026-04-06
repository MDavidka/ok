import './style.css';
import { RoutePath } from './types';
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderCartOverlay } from './components/cart-overlay';
import { renderHome } from './components/home';
import { renderShop } from './components/shop';

/**
 * Verdant Aura - Main Entry Point
 * 
 * This file initializes the application, sets up the mesh router,
 * and manages the lifecycle of global components (Header, Footer, Cart).
 */

class App {
  private appRoot: HTMLElement;
  private mainContent: HTMLElement;

  constructor() {
    const root = document.getElementById('app');
    if (!root) {
      throw new Error('Verdant Aura: Root element #app not found in index.html');
    }
    this.appRoot = root;
    
    // Create main content container
    this.mainContent = document.createElement('main');
    this.mainContent.id = 'main-content';
    this.mainContent.className = 'flex-grow';
  }

  /**
   * Initialize the application
   */
  public init(): void {
    // 1. Render Persistent Layout Components
    renderHeader(this.appRoot);
    this.appRoot.appendChild(this.mainContent);
    renderFooter(this.appRoot);
    
    // 2. Initialize Overlays (Cart, Search, etc.)
    renderCartOverlay(this.appRoot);

    // 3. Setup Routing
    this.setupRouter();

    // 4. Initial Route Handling
    this.handleRoute(window.location.pathname as RoutePath);

    console.log('Verdant Aura: Application initialized successfully.');
  }

  /**
   * Sets up listeners for URL changes
   */
  private setupRouter(): void {
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.pathname as RoutePath);
    });

    // Listen for custom navigation events dispatched by utils.navigateTo
    window.addEventListener('navigation-changed', ((e: CustomEvent) => {
      const path = e.detail.path as RoutePath;
      this.handleRoute(path);
      
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }) as EventListener);
  }

  /**
   * Orchestrates component rendering based on the current path
   */
  private handleRoute(path: RoutePath | string): void {
    // Clear current content
    this.mainContent.innerHTML = '';

    // Route Mapping
    switch (path) {
      case '/':
        renderHome(this.mainContent);
        document.title = 'Verdant Aura | Premium Indoor Plants & Botanical Care';
        break;

      case '/shop':
        renderShop(this.mainContent);
        document.title = 'Shop All Plants | Verdant Aura';
        break;

      case '/care':
        this.renderPlaceholder('Care Guides', 'Our expert botanical care guides are being cultivated. Check back soon for tips on keeping your greenery thriving.');
        document.title = 'Plant Care Guides | Verdant Aura';
        break;

      case '/checkout':
        this.renderPlaceholder('Checkout', 'Secure checkout is currently being integrated. Please explore our shop in the meantime.');
        document.title = 'Checkout | Verdant Aura';
        break;

      default:
        // Fallback to Home for unknown routes
        renderHome(this.mainContent);
        document.title = 'Verdant Aura';
        break;
    }
  }

  /**
   * Renders a simple placeholder for routes not yet fully implemented
   */
  private renderPlaceholder(title: string, message: string): void {
    const section = document.createElement('section');
    section.className = 'section-container flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in';
    section.innerHTML = `
      <div class="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-emerald-950 font-heading mb-4">${title}</h1>
      <p class="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
        ${message}
      </p>
      <button id="back-to-shop" class="btn-primary">
        Return to Shop
      </button>
    `;

    this.mainContent.appendChild(section);

    section.querySelector('#back-to-shop')?.addEventListener('click', () => {
      // We use the custom event approach for navigation
      window.dispatchEvent(new CustomEvent('navigation-changed', { 
        detail: { path: '/shop' } 
      }));
      window.history.pushState({}, '', '/shop');
    });
  }
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});