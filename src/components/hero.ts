import { SiteConfig, ComponentProps } from '../types';

interface HeroProps extends ComponentProps {
  config: SiteConfig;
}

export function renderHero(props: HeroProps, container: HTMLElement): void {
  const { config, className } = props;

  const heroSection = document.createElement('section');
  heroSection.className = `py-20 ${className || ''}`;

  heroSection.innerHTML = `
    <div class="container mx-auto text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style="font-family: var(--font-heading); color: var(--color-primary);">${config.name}</h1>
      <p class="text-lg md:text-xl mb-8 text-color-muted">${config.description}</p>
      <button class="button">Learn More</button>
    </div>
  `;

  container.appendChild(heroSection);
}