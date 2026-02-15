import { classNames } from '../utils';

export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  tags?: string[];
}

export function renderProjectCard(container: HTMLElement, project: Project): void {
  const card = document.createElement('div');
  card.className = classNames(
    'rounded-lg',
    'shadow-md',
    'overflow-hidden',
    'bg-gray-800',
    'dark:bg-gray-900',
    'text-gray-100',
    'dark:text-gray-200',
    'hover:shadow-xl',
    'transition-shadow',
    'duration-300',
    'ease-in-out',
    'flex',
    'flex-col'
  );

  const imageContainer = document.createElement('div');
  imageContainer.className = 'aspect-w-16 aspect-h-9';

  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.title;
  image.className = 'object-cover w-full h-full';
  imageContainer.appendChild(image);

  const content = document.createElement('div');
  content.className = 'p-4 flex-grow';

  const title = document.createElement('h3');
  title.textContent = project.title;
  title.className = 'text-xl font-semibold mb-2';

  const description = document.createElement('p');
  description.textContent = project.description;
  description.className = 'text-gray-300 dark:text-gray-400 text-sm mb-4 flex-grow';

  content.appendChild(title);
  content.appendChild(description);

  if (project.tags && project.tags.length > 0) {
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'flex flex-wrap gap-2 mb-4';

    project.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tagElement.className = 'bg-gray-700 dark:bg-gray-600 text-gray-200 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-medium';
      tagsContainer.appendChild(tagElement);
    });

    content.appendChild(tagsContainer);
  }

  const actions = document.createElement('div');
  actions.className = 'mt-auto p-4 flex justify-end gap-2';

  if (project.link) {
    const linkButton = document.createElement('a');
    linkButton.href = project.link;
    linkButton.textContent = 'View Project';
    linkButton.target = '_blank';
    linkButton.rel = 'noopener noreferrer';
    linkButton.className = 'bg-color-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200';
    actions.appendChild(linkButton);
  }

  if (project.github) {
    const githubButton = document.createElement('a');
    githubButton.href = project.github;
    githubButton.textContent = 'GitHub';
    githubButton.target = '_blank';
    githubButton.rel = 'noopener noreferrer';
    githubButton.className = 'bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200';
    actions.appendChild(githubButton);
  }

  card.appendChild(imageContainer);
  card.appendChild(content);
  card.appendChild(actions);

  container.appendChild(card);
}