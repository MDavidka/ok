import { SiteConfig } from '../types';
import { clsx } from 'clsx';

interface HeroProps {
  title: string;
  subtitle: string;
  image?: string; // URL or path to an image
  ctaText?: string;
  ctaLink?: string;
}

export function renderHero(container: HTMLElement, props: HeroProps): void {
  const heroSection = document.createElement('section');
  heroSection.className = 'relative py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden';

  heroSection.innerHTML = `
    <div class="relative container m-auto px-6 md:px-12 lg:px-20">
      <div class="md:flex md:items-center">
        <div class="md:w-1/2">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">${props.title}</h1>
          <p class="mt-4 text-gray-600 dark:text-gray-300">${props.subtitle}</p>
          ${props.ctaText && props.ctaLink ? `
            <a href="${props.ctaLink}" class="inline-block mt-8 py-3 px-6 bg-color-primary hover:bg-indigo-600 text-white font-semibold rounded-md transition-colors duration-200">
              ${props.ctaText}
            </a>
          ` : ''}
        </div>
        <div class="md:w-1/2 mt-10 md:mt-0">
          ${props.image ? `<img src="${props.image}" alt="Hero Image" class="rounded-lg shadow-lg">` : ''}
        </div>
      </div>
    </div>
  `;

  container.appendChild(heroSection);
}