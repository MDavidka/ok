import { ComponentProps } from '../types';

export function MainSection({ className }: ComponentProps) {
    const mainSectionElement = document.createElement('section');
    mainSectionElement.className = `py-12 ${className || ''}`;

    const containerElement = document.createElement('div');
    containerElement.className = 'container mx-auto text-center';

    const headingElement = document.createElement('h2');
    headingElement.textContent = 'Welcome to My Awesome Website';
    headingElement.className = 'text-3xl font-bold mb-4';

    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = 'This is the main section of the website.';
    paragraphElement.className = 'text-gray-700';

    containerElement.appendChild(headingElement);
    containerElement.appendChild(paragraphElement);
    mainSectionElement.appendChild(containerElement);

    return mainSectionElement;
}