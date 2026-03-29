import { ComponentProps } from '../types';
import { classNames } from '../utils';

export function Hero({ className }: ComponentProps = {}): string {
  return `
    <section class="${classNames('relative pt-24 pb-32 overflow-hidden', className)}">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--color-text)]">
          Embrace the <span class="text-[var(--color-primary)]">Unexpected</span>
        </h1>
        
        <p class="mt-4 max-w-2xl mx-auto text-xl text-[var(--color-muted)] mb-10 leading-relaxed">
          Break free from the mundane. Randomify injects a little bit of chaos, spontaneity, and fun into your everyday routine.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            id="hero-cta" 
            class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius)] hover:bg-[var(--color-secondary)] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Generate Random Activity
          </button>
          <a 
            href="#features" 
            class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary)] rounded-[var(--radius)] hover:bg-[var(--color-bg)] transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>

      <!-- Decorative background elements -->
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div class="absolute top-32 -right-24 w-96 h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
    </section>
  `;
}

export function initHero(): void {
  const cta = document.getElementById('hero-cta');
  
  if (!cta) return;

  cta.addEventListener('click', () => {
    const activities = [
      "Take a 15-minute walk in a random direction.",
      "Call a friend you haven't spoken to in a year.",
      "Try cooking a recipe with ingredients you already have.",
      "Listen to a genre of music you normally hate.",
      "Learn how to say 'Hello' in 5 new languages.",
      "Draw a picture of the object closest to your left hand.",
      "Do 20 jumping jacks right now."
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    // Simple alert for the "random" functionality
    alert(`🎲 Your random activity:\n\n${randomActivity}`);
  });
}