import { ComponentProps } from '../types';
import { classNames } from '../utils';

export interface HeroProps extends ComponentProps {
  title?: string;
  description?: string;
}

/**
 * Renders the Hero section into the provided container.
 * 
 * @param container - The DOM element to mount the hero section into.
 * @param props - Optional properties to customize the hero section.
 */
export function renderHero(container: HTMLElement, props?: HeroProps): void {
  // Default content for the "random thing" (QuantumMug)
  const title = props?.title || 'The <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">QuantumMug</span>';
  const description = props?.description || "Experience your coffee in multiple states simultaneously. It's hot, it's cold, and it's perfectly brewed until you observe it.";

  // Inject HTML structure
  container.innerHTML = `
    <section class="${classNames('relative flex flex-col items-center justify-center min-h-screen px-4 py-24 text-center overflow-hidden', props?.className)}">
      <!-- Decorative background element -->
      <div class="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-10">
        <div class="w-96 h-96 rounded-full blur-3xl bg-[var(--color-primary)]"></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto space-y-8">
        <div class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-[var(--color-secondary)]/20 text-[var(--color-text)] border border-[var(--color-secondary)]/30 mb-4 shadow-sm">
          ✨ Introducing the future of beverages
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-balance">
          ${title}
        </h1>
        
        <p class="text-lg md:text-xl max-w-2xl mx-auto text-balance leading-relaxed text-[var(--color-muted)]">
          ${description}
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button id="hero-cta" class="px-8 py-4 text-lg font-semibold text-white transition-all duration-200 rounded-full bg-[var(--color-primary)] hover:opacity-90 hover:scale-105 shadow-lg shadow-[var(--color-primary)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2">
            Pre-order Now
          </button>
          <a href="#" id="hero-secondary-cta" class="px-8 py-4 text-lg font-medium transition-colors duration-200 rounded-full hover:bg-gray-200/50 focus:outline-none focus:ring-2 focus:ring-gray-200">
            Learn More
          </a>
        </div>
      </div>
    </section>
  `;

  // Attach event listeners safely
  const ctaButton = container.querySelector('#hero-cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      alert('Quantum state collapsed! Your mug is now definitely hot. ☕');
    });
  }

  const secondaryCta = container.querySelector('#hero-secondary-cta');
  if (secondaryCta) {
    secondaryCta.addEventListener('click', (e) => {
      e.preventDefault();
      alert('The QuantumMug exists in a superposition of all possible mugs. That is all you need to know.');
    });
  }
}