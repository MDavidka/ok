export function renderFooter(container: HTMLElement): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-color-bg py-4 text-center text-color-text-light';

  const copyright = document.createElement('p');
  copyright.textContent = `© ${new Date().getFullYear()} My Simple Site`;

  footer.appendChild(copyright);
  container.appendChild(footer);
}