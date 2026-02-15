import { HeroProps } from '../types';

export function renderHero(container: HTMLElement, props: HeroProps): void {
  container.innerHTML = `
    <section class="bg-cover bg-center py-24" style="background-image: url('${props.image}')">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">${props.title}</h1>
        <p class="text-lg md:text-xl text-white mb-8">${props.subtitle}</p>
        <a href="${props.buttonLink}" class="inline-block bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded">${props.buttonText}</a>
      </div>
    </section>
  `;
}