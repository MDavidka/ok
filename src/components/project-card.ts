import { Project } from '../types';

export function renderProjectCard(project: Project): HTMLElement {
  const card = document.createElement('div');
  card.className = 'bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col';

  const image = document.createElement('img');
  image.src = project.imageUrl;
  image.alt = project.name;
  image.className = 'w-full h-48 object-cover';

  const content = document.createElement('div');
  content.className = 'p-4 flex flex-col flex-grow';

  const title = document.createElement('h3');
  title.textContent = project.name;
  title.className = 'text-xl font-semibold text-white mb-2';

  const description = document.createElement('p');
  description.textContent = project.description;
  description.className = 'text-gray-400 text-base flex-grow';

  const linkContainer = document.createElement('div');
  linkContainer.className = 'mt-4';

  const link = document.createElement('a');
  link.href = project.link;
  link.textContent = 'View Project';
  link.className = 'inline-block bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded';

  linkContainer.appendChild(link);
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(linkContainer);

  card.appendChild(image);
  card.appendChild(content);

  return card;
}