import { ComponentProps } from '../types';
import { classNames } from '../utils';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const featuresData: Feature[] = [
  {
    title: 'Pure Spontaneity',
    description: 'Break free from the mundane routine. Our algorithm guarantees a 100% unpredictable experience every single time you click.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`
  },
  {
    title: 'Endless Discovery',
    description: 'Find your new favorite hobby, a bizarre fact, or a weirdly specific task. The possibilities are literally infinite.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>`
  },
  {
    title: 'Controlled Chaos',
    description: 'Embrace the unknown without the actual danger. It is all the thrill of chaos, safely contained within your web browser.',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
  }
];

export function Features({ className }: ComponentProps = {}): string {
  const cardsHtml = featuresData.map(feature => `
    <div class="p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start" style="border-radius: var(--radius);">
      <div class="w-12 h-12 mb-6 flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-primary)]" style="border-radius: var(--radius);">
        ${feature.icon}
      </div>
      <h3 class="text-xl font-bold mb-3 text-[var(--color-text)] font-[var(--font-heading)]">
        ${feature.title}
      </h3>
      <p class="text-[var(--color-muted)] leading-relaxed font-[var(--font-body)]">
        ${feature.description}
      </p>
    </div>
  `).join('');

  return `
    <section id="features" class="${classNames('py-24 bg-[var(--color-bg)]', className)}">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text)] font-[var(--font-heading)]">
            Why Embrace the Random?
          </h2>
          <p class="text-lg text-[var(--color-muted)] font-[var(--font-body)]">
            Life is too short for predictable patterns. Inject a little randomness into your day and see where the universe takes you.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}