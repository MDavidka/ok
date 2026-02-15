import '../style.css'; // Import global styles
import { SiteConfig } from '../types';

export function renderHero(container: HTMLElement, config: SiteConfig): void {
  const heroSection = document.createElement('section');
  heroSection.className = 'py-20 md:py-32 bg-color-bg';

  const heroContent = document.createElement('div');
  heroContent.className = 'container mx-auto px-4 text-center';

  const title = document.createElement('h1');
  title.className = 'text-4xl md:text-5xl lg:text-6xl font-bold text-color-text mb-4';
  title.textContent = `Hi, I'm ${config.author}.`;

  const subtitle = document.createElement('p');
  subtitle.className = 'text-color-secondary text-lg md:text-xl lg:text-2xl mb-8';
  subtitle.textContent = config.description;

  const button = document.createElement('a');
  button.href = '#projects';
  button.className = 'btn-primary';
  button.textContent = 'View my work';

  heroContent.appendChild(title);
  heroContent.appendChild(subtitle);
  heroContent.appendChild(button);

  heroSection.appendChild(heroContent);
  container.appendChild(heroSection);
}