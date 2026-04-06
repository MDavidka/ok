import { NavItem, RoutePath } from '../types';
import { navigateTo } from '../utils';

/**
 * Verdant Aura - Footer Component
 * 
 * A comprehensive footer featuring brand information, categorized navigation,
 * and a newsletter subscription form. Designed with a deep forest green
 * aesthetic to anchor the page.
 */

const QUICK_LINKS: NavItem[] = [
  { label: 'Shop All', path: '/shop' },
  { label: 'Care Guides', path: '/care' },
  { label: 'Our Story', path: '/' },
  { label: 'Shipping Policy', path: '/' },
];

const CATEGORIES: NavItem[] = [
  { label: 'Indoor Plants', path: '/shop' },
  { label: 'Rare Finds', path: '/shop' },
  { label: 'Succulents', path: '/shop' },
  { label: 'Plant Care Tools', path: '/shop' },
];

export function renderFooter(container: HTMLElement): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-emerald-950 text-emerald-50 pt-16 pb-8 mt-auto';
  footer.id = 'main-footer';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <!-- Brand Column -->
        <div class="space-y-6">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span class="text-xl font-bold tracking-tight font-heading">Verdant Aura</span>
          </div>
          <p class="text-emerald-200/70 text-sm leading-relaxed max-w-xs">
            Bringing the tranquility of nature into your living space. We curate premium, healthy plants and provide the knowledge to help them thrive.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-emerald-200 hover:text-white transition-colors" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" class="text-emerald-200 hover:text-white transition-colors" aria-label="Twitter">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Explore</h3>
          <ul class="space-y-4">
            ${QUICK_LINKS.map(link => `
              <li>
                <a href="${link.path}" data-footer-path="${link.path}" class="text-emerald-200/70 hover:text-white transition-colors text-sm">
                  ${link.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Categories</h3>
          <ul class="space-y-4">
            ${CATEGORIES.map(link => `
              <li>
                <a href="${link.path}" data-footer-path="${link.path}" class="text-emerald-200/70 hover:text-white transition-colors text-sm">
                  ${link.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Stay Rooted</h3>
          <p class="text-emerald-200/70 text-sm mb-6">
            Join our newsletter for plant care tips and exclusive early access to new arrivals.
          </p>
          <form id="newsletter-form" class="space-y-3">
            <div class="relative">
              <input 
                type="email" 
                id="newsletter-email"
                placeholder="email@example.com" 
                required
                class="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-4 py-3 text-sm text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <button 
              type="submit" 
              class="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-3 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-900/20"
            >
              Subscribe
            </button>
          </form>
          <p id="newsletter-status" class="mt-3 text-xs text-emerald-400 hidden animate-fade-in">
            Thanks for joining our community!
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-emerald-500/50 text-xs">
          &copy; ${new Date().getFullYear()} Verdant Aura Botanical Co. All rights reserved.
        </p>
        <div class="flex space-x-8 text-xs text-emerald-500/50">
          <a href="#" class="hover:text-emerald-300 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-emerald-300 transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-emerald-300 transition-colors">Accessibility</a>
        </div>
      </div>
    </div>
  `;

  container.appendChild(footer);

  // --- Event Listeners ---

  // Handle Navigation Links
  const footerLinks = footer.querySelectorAll('[data-footer-path]');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = (link as HTMLElement).dataset.footerPath as RoutePath;
      if (path) {
        navigateTo(path);
      }
    });
  });

  // Handle Newsletter Submission
  const newsletterForm = footer.querySelector('#newsletter-form') as HTMLFormElement;
  const newsletterStatus = footer.querySelector('#newsletter-status') as HTMLElement;
  const newsletterInput = footer.querySelector('#newsletter-email') as HTMLInputElement;

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Mock submission logic
    const email = newsletterInput.value;
    console.log(`Verdant Aura: Newsletter subscription for ${email}`);
    
    // UI Feedback
    newsletterForm.classList.add('opacity-50', 'pointer-events-none');
    newsletterStatus.classList.remove('hidden');
    newsletterInput.value = '';

    // Reset after 5 seconds
    setTimeout(() => {
      newsletterForm.classList.remove('opacity-50', 'pointer-events-none');
      newsletterStatus.classList.add('hidden');
    }, 5000);
  });
}