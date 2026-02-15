import { SiteConfig } from '../types';

export function renderLayout(config: SiteConfig, content: HTMLElement): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100';

  const header = document.createElement('header');
  header.className = 'bg-white dark:bg-gray-800 shadow';
  header.innerHTML = `
    <div class="container mx-auto py-4 px-5">
      <a href="/" class="text-xl font-bold">${config.title}</a>
    </div>
  `;
  container.appendChild(header);

  const main = document.createElement('main');
  main.className = 'container mx-auto flex-grow py-8 px-5';
  main.appendChild(content);
  container.appendChild(main);

  const footer = document.createElement('footer');
  footer.className = 'bg-gray-200 dark:bg-gray-700 py-4 text-center text-gray-700 dark:text-gray-300';
  footer.textContent = `© ${new Date().getFullYear()} ${config.author}`;
  container.appendChild(footer);

  return container;
}