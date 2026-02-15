import { WelcomeMessageProps } from '../types';
import { classNames } from '../utils';
import gsap from 'gsap';

export function renderHero(container: HTMLElement, props: WelcomeMessageProps): void {
  container.innerHTML = `
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="lg:flex lg:items-center">
          <div class="lg:w-1/2">
            <h1 class="text-4xl md:text-5xl font-bold text-color-text dark:text-gray-100 mb-4">${props.name}</h1>
            <p class="text-lg text-color-text-light dark:text-gray-400 mb-6">${props.title}</p>
            <p class="text-color-text-light dark:text-gray-300">${props.description}</p>
          </div>
          <div class="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
            <div class="relative">
              <div class="absolute inset-0 bg-color-primary opacity-20 rounded-full blur-2xl"></div>
              <img
                src="https://source.unsplash.com/random/400x400/?portrait"
                alt="Profile picture"
                class="rounded-full shadow-lg relative z-10 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // GSAP Animation - Example (can be expanded)
  gsap.fromTo(
    container.querySelector('h1'),
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  );
}