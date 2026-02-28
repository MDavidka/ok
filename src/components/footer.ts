import { ComponentProps } from '../types';

interface FooterProps extends ComponentProps {}

export function Footer(props: FooterProps): string {
  const { className } = props;
  return `
    <footer class="${className}">
      <p class="text-center text-color-muted">© 2024</p>
    </footer>
  `;
}