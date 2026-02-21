import { About } from '../types';

export function renderAbout(container: HTMLElement, aboutData: About): void {
  if (!container) {
    console.error('About container not found');
    return;
  }

  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.className = 'py-12 dark:bg-gray-800 dark:text-white';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';

  const title = document.createElement('h2');
  title.className = 'text-3xl font-bold mb-6 text-center';
  title.textContent = 'About Me';

  const content = document.createElement('div');
  content.className = 'md:flex md:items-center md:justify-center';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'md:w-1/3 mb-4 md:mb-0';

  const image = document.createElement('img');
  image.src = aboutData.imageSrc;
  image.alt = 'About Me';
  image.className = 'rounded-full shadow-md mx-auto block';
  image.style.maxWidth = '200px';
  image.style.maxHeight = '200px';

  imageContainer.appendChild(image);

  const textContainer = document.createElement('div');
  textContainer.className = 'md:w-2/3';

  const description = document.createElement('p');
  description.className = 'text-lg leading-relaxed';
  description.textContent = aboutData.description;

  textContainer.appendChild(description);

  content.appendChild(imageContainer);
  content.appendChild(textContainer);

  containerDiv.appendChild(title);
  containerDiv.appendChild(content);

  aboutSection.appendChild(containerDiv);
  container.appendChild(aboutSection);
}