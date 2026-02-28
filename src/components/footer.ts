import { ComponentProps } from '../types';

interface FooterProps extends ComponentProps {
  copyright?: string;
}

export function Footer(props: FooterProps): string {
  const currentYear = new Date().getFullYear();
  const copyrightText = props.copyright || `© ${currentYear} High-End Reservations. All rights reserved.`;

  return `
    <footer class="footer ${props.className || ''}">
      <div class="container">
        <p>${copyrightText}</p>
      </div>
    </footer>
  `;
}

export function renderFooter(container: HTMLElement, props: FooterProps): void {
  container.innerHTML = Footer(props);
}