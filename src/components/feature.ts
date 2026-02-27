// src/components/feature.ts
import { ComponentProps } from '../types';

interface FeatureProps extends ComponentProps {
  title: string;
  description: string;
  icon?: string; // Optional icon (e.g., path to an SVG)
}

export function Feature({ title, description, icon, className }: FeatureProps) {
  const featureElement = document.createElement('div');
  featureElement.className = `feature ${className || ''} flex flex-col items-center p-4 rounded shadow-md bg-color-secondary`;

  if (icon) {
    const iconElement = document.createElement('img');
    iconElement.src = icon;
    iconElement.alt = title + ' icon';
    iconElement.className = 'h-12 w-12 mb-2'; // Adjust size as needed
    featureElement.appendChild(iconElement);
  }

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  titleElement.className = 'text-xl font-bold mb-2 text-color-primary';
  featureElement.appendChild(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  descriptionElement.className = 'text-color-text text-center';
  featureElement.appendChild(descriptionElement);

  return featureElement;
}