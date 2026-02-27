import { ComponentProps } from '../types';

export interface CardProps extends ComponentProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export function renderCard(props: CardProps, container: HTMLElement): void {
  const card = document.createElement('div');
  card.className = `rounded-md shadow-md overflow-hidden ${props.className || ''}`;

  if (props.imageUrl) {
    const image = document.createElement('img');
    image.src = props.imageUrl;
    image.alt = props.title;
    image.className = 'w-full h-48 object-cover';
    card.appendChild(image);
  }

  const content = document.createElement('div');
  content.className = 'p-4';

  const title = document.createElement('h3');
  title.className = 'text-xl font-bold mb-2';
  title.textContent = props.title;
  content.appendChild(title);

  const description = document.createElement('p');
  description.className = 'text-color-muted text-base';
  description.textContent = props.description;
  content.appendChild(description);

  if (props.link) {
    const link = document.createElement('a');
    link.href = props.link;
    link.textContent = 'Learn More';
    link.className = 'inline-block mt-4 bg-color-accent text-color-secondary py-2 px-4 rounded hover:bg-color-primary hover:text-color-secondary transition-colors duration-200';
    content.appendChild(link);
  }

  card.appendChild(content);
  container.appendChild(card);
}