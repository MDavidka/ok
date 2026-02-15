import { ButtonProps } from '../types';

export function renderButton(container: HTMLElement, props: ButtonProps): void {
  const button = document.createElement('button');
  button.textContent = props.label;
  button.className = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${props.className || ''}`;
  button.addEventListener('click', props.onClick);

  container.appendChild(button);
}