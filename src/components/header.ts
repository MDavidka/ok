import { ComponentProps } from '../types';
import { getSiteConfig } from '../utils';

interface HeaderProps extends ComponentProps {}

export function Header(props: HeaderProps): string {
  const { className } = props;
  const siteConfig = getSiteConfig();

  return `
    <header class="${className}">
      <h1 class="text-2xl font-bold text-center text-color-primary">${siteConfig.title}</h1>
    </header>
  `;
}