import { HeroData } from '../types';

export function renderHero(container: HTMLElement, data: HeroData): void {
  container.innerHTML = `
    <section class="bg-gray-900 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${data.title}</h1>
            <p class="text-lg mb-8">${data.subtitle}</p>
            <a href="${data.ctaLink}" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">${data.ctaText}</a>
          </div>
          <div>
            <img src="${data.image}" alt="${data.altText}" class="rounded-lg shadow-md">
          </div>
        </div>
      </div>
    </section>
  `;
}