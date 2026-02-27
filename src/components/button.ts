import { ComponentProps } from '../types';

interface ButtonProps extends ComponentProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, className, variant = 'primary' }: ButtonProps): HTMLElement {
  const button = document.createElement('button');
  button.textContent = label;
  button.addEventListener('click', onClick || (() => { }));

  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = 'bg-color-accent text-color-secondary hover:bg-amber-600';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-color-secondary text-color-primary hover:bg-gray-700';
  }

  button.className = `button ${variantClasses} ${className || ''}`;
  return button;
}