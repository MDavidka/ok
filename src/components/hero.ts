import { ComponentProps, HeroProps } from '../types';

export function renderHero(props: HeroProps, container: HTMLElement): void {
  const hero = document.createElement('section');
  hero.className = `py-20 bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-border)] text-center ${props.className || ''}`;

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto';

  if (props.image) {
    const image = document.createElement('img');
    image.src = props.image;
    image.alt = props.title;
    image.className = 'mx-auto rounded-lg shadow-md mb-8 max-w-lg';
    containerDiv.appendChild(image);
  }

  const title = document.createElement('h1');
  title.className = 'text-4xl md:text-5xl font-bold mb-4 text-[var(--color-primary)]';
  title.textContent = props.title;
  containerDiv.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'text-lg md:text-xl text-[var(--color-muted)] mb-8';
  subtitle.textContent = props.subtitle;
  containerDiv.appendChild(subtitle);

  if (props.ctaText && props.ctaLink) {
    const link = document.createElement('a');
    link.href = props.ctaLink;
    link.textContent = props.ctaText;
    link.className = 'btn';
    containerDiv.appendChild(link);
  }

  hero.appendChild(containerDiv);
  container.appendChild(hero);
}