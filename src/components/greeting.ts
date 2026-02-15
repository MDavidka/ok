import '../style.css'; // Import global styles

export function renderGreeting(container: HTMLElement, name: string = 'Visitor'): void {
  const greetingElement = document.createElement('div');
  greetingElement.className = 'text-2xl font-semibold text-color-text mb-4';
  greetingElement.textContent = `Hello, ${name}!`;

  container.appendChild(greetingElement);
}