import { SiteConfig } from '../types';

export function renderCallToAction(container: HTMLElement, config: SiteConfig): void {
  const ctaSection = document.createElement('section');
  ctaSection.className = 'bg-gradient-to-r from-primary to-secondary text-white py-12 px-4 md:px-8 lg:px-12 xl:px-16';

  const ctaContainer = document.createElement('div');
  ctaContainer.className = 'max-w-6xl mx-auto text-center';

  const ctaHeading = document.createElement('h2');
  ctaHeading.className = 'text-3xl font-bold mb-4';
  ctaHeading.textContent = config.callToAction.heading;

  const ctaDescription = document.createElement('p');
  ctaDescription.className = 'text-lg mb-8';
  ctaDescription.textContent = config.callToAction.description;

  const ctaButton = document.createElement('a');
  ctaButton.className = 'bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-md inline-block';
  ctaButton.href = config.callToAction.buttonLink;
  ctaButton.textContent = config.callToAction.buttonText;

  ctaContainer.appendChild(ctaHeading);
  ctaContainer.appendChild(ctaDescription);
  ctaContainer.appendChild(ctaButton);
  ctaSection.appendChild(ctaContainer);
  container.appendChild(ctaSection);
}