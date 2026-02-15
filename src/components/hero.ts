import { HeroProps } from '../types';

export function renderHero(container: HTMLElement, props: HeroProps): void {
  container.innerHTML = `
    <section class="bg-gray-100 dark:bg-gray-900 py-20">
      <div class="container mx-auto px-4">
        <div class="lg:flex items-center">
          <div class="lg:w-1/2">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">${props.title}</h1>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-8">${props.subtitle}</p>
            <div class="flex space-x-4">
              <a href="${props.primaryButtonLink}" class="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200">${props.primaryButtonText}</a>
              <a href="${props.secondaryButtonLink}" class="inline-block py-3 px-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-md transition duration-200">${props.secondaryButtonText}</a>
            </div>
          </div>
          <div class="lg:w-1/2 mt-8 lg:mt-0">
            <img src="${props.image}" alt="${props.imageAlt}" class="rounded-lg shadow-md">
          </div>
        </div>
      </div>
    </section>
  `;
}