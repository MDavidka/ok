import { ComponentProps } from '../types';
import { classNames } from '../utils';

interface WelcomeProps extends ComponentProps {
  title: string;
  description: string;
}

export function Welcome({ className, title, description }: WelcomeProps) {
  return `
    <div class="${classNames('container mx-auto py-12 px-4', className)}">
      <h1 class="text-4xl font-bold mb-4 text-color-primary">${title}</h1>
      <p class="text-lg text-color-text">${description}</p>
    </div>
  `;
}