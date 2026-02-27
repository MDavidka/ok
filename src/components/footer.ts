import { ComponentProps } from '../types';

export function Footer(container: HTMLElement, props?: ComponentProps): void {
  if (!container) {
    console.error("Footer container not found");
    return;
  }

  const footer = document.createElement('footer');
  footer.className = `bg-color-secondary text-color-muted py-4 ${props?.className || ''}`;

  const innerContainer = document.createElement('div');
  innerContainer.className = 'container mx-auto text-center';

  const copyright = document.createElement('p');
  copyright.textContent = `© ${new Date().getFullYear()} High-End Reservation System. All rights reserved.`;

  innerContainer.appendChild(copyright);
  footer.appendChild(innerContainer);
  container.appendChild(footer);
}