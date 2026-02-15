import { SiteConfig } from '../types';

interface WelcomeMessageProps {
  config: SiteConfig;
}

export function renderWelcomeMessage(container: HTMLElement, props: WelcomeMessageProps): void {
  const { config } = props;

  const welcomeElement = document.createElement('div');
  welcomeElement.className = 'text-center py-12 md:py-24';
  welcomeElement.innerHTML = `
    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">${config.title}</h1>
    <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300">${config.description}</p>
  `;

  container.appendChild(welcomeElement);
}