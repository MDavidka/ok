import { ComponentProps } from '../types';
import { cn } from '../utils';

interface MainContentProps extends ComponentProps {}

export function MainContent({ className }: MainContentProps = {}) {
  return `
    <main class="${cn('container mx-auto py-8', className)}">
      <h1 class="text-3xl font-bold mb-4">Welcome to My Website</h1>
      <p class="mb-4">This is a basic website built with Vite and TypeScript, designed for deployment to Cloudflare Pages.</p>
      <a href="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More</a>
    </main>
  `;
}