export function renderWaveAnimation(container: HTMLElement): void {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 120 28");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("class", "absolute bottom-0 left-0 w-full h-12 md:h-20 lg:h-28");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0 28 C 21 28 42 0 63 0 C 84 0 105 28 120 28 L 120 0 L 0 0 Z");

  svg.appendChild(path);
  container.appendChild(svg);
}