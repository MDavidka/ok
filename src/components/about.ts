import { ComponentProps } from '../types';

export interface AboutProps extends ComponentProps {
    title: string;
    content: string;
    image?: string;
}

export function renderAbout(container: HTMLElement, props: AboutProps): void {
  const aboutSection = document.createElement('section');
  aboutSection.className = `py-12 ${props.className || ''}`;

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4 sm:px-6 lg:px-8';

  if (props.image) {
    const imageElement = document.createElement('img');
    imageElement.src = props.image;
    imageElement.alt = props.title;
    imageElement.className = 'w-full rounded-md shadow-md mb-8';
    containerDiv.appendChild(imageElement);
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = props.title;
  titleElement.className = 'text-3xl font-bold text-[var(--color-primary)] mb-4';
  containerDiv.appendChild(titleElement);

  const contentElement = document.createElement('p');
  contentElement.textContent = props.content;
  contentElement.className = 'text-lg text-[var(--color-muted)]';
  containerDiv.appendChild(contentElement);

  aboutSection.appendChild(containerDiv);
  container.appendChild(aboutSection);
}