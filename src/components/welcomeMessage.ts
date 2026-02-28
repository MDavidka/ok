import { ComponentProps } from '../types';
import { getSiteConfig } from '../utils';

interface WelcomeMessageProps extends ComponentProps {}

export function WelcomeMessage(props: WelcomeMessageProps) {
  const { className } = props;
  const siteConfig = getSiteConfig();

  return `
    <div class="${className}">
      <h2 class="text-4xl font-bold text-center text-color-primary fade-in">${siteConfig.description}</h2>
    </div>
  `;
}