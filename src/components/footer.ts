import { createElement } from '../utils';

/**
 * Renders the footer component with copyright and version info.
 * @param container The parent element to append the footer to
 */
export function renderFooter(container: HTMLElement): void {
  const footer = createElement('footer', {
    classes: ['bg-amber-50', 'border-t', 'border-amber-200', 'py-4', 'mt-8']
  });

  const innerDiv = createElement('div', {
    classes: ['container', 'mx-auto', 'px-4', 'flex', 'flex-col', 'md:flex-row', 'justify-between', 'items-center']
  });

  const copyright = createElement('p', {
    classes: ['text-amber-800', 'text-sm'],
    text: `© ${new Date().getFullYear()} Cookie Clicker. All rights reserved.`
  });

  const version = createElement('p', {
    classes: ['text-amber-600', 'text-sm', 'mt-2', 'md:mt-0'],
    text: 'Version 1.0.0'
  });

  innerDiv.appendChild(copyright);
  innerDiv.appendChild(version);
  footer.appendChild(innerDiv);
  container.appendChild(footer);
}