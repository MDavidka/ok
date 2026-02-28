import { ComponentProps } from '../types';

export interface FeatureProps extends ComponentProps {
  title: string;
  description: string;
  icon?: string; // URL or SVG string
}

export function Feature(props: FeatureProps): string {
  return `
    <div class="feature ${props.className || ''} p-6 rounded-[var(--radius-md)] shadow-md bg-[var(--color-border)]">
      ${props.icon ? `<div class="mb-4">${props.icon}</div>` : ''}
      <h3 class="text-xl font-bold mb-2 text-[var(--color-primary)]">${props.title}</h3>
      <p class="text-[var(--color-muted)]">${props.description}</p>
    </div>
  `;
}

export function renderFeature(props: FeatureProps, container: HTMLElement): void {
  const featureHTML = Feature(props);
  container.innerHTML += featureHTML;
}