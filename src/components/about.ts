import { ComponentProps } from '../types';

interface AboutProps extends ComponentProps {
  title: string;
  content: string;
  image?: string;
}

export function renderAbout(container: HTMLElement, props: AboutProps): void {
  const aboutSection = document.createElement('section');
  aboutSection.className = `py-12 ${props.className || ''}`;

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center';

  if (props.image) {
    const imageElement = document.createElement('img');
    imageElement.src = props.image;
    imageElement.alt = 'About Us';
    imageElement.className = 'rounded-lg shadow-md';
    contentWrapper.appendChild(imageElement);
  }

  const textContent = document.createElement('div');

  const titleElement = document.createElement('h2');
  titleElement.textContent = props.title;
  titleElement.className = 'text-3xl font-bold mb-4';
  textContent.appendChild(titleElement);

  const contentParagraph = document.createElement('p');
  contentParagraph.textContent = props.content;
  contentParagraph.className = 'text-lg text-color-muted leading-relaxed';
  textContent.appendChild(contentParagraph);

  contentWrapper.appendChild(textContent);
  containerDiv.appendChild(contentWrapper);
  aboutSection.appendChild(containerDiv);
  container.appendChild(aboutSection);
}