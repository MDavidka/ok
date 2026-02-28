import { ComponentProps } from '../types';

interface MainContentProps extends ComponentProps {
  content: string;
}

export function MainContent({ content, className }: MainContentProps) {
  return `
    <main class="${className || ''} container mx-auto py-8">
      ${content}
    </main>
  `;
}