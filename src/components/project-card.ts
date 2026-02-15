import { Project } from '../types';

export function renderProjectCard(project: Project, container: HTMLElement): void {
  const card = document.createElement('div');
  card.className = 'rounded-lg shadow-md p-4 bg-gray-800 text-white hover:shadow-lg transition-shadow duration-200';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold mb-2';
  title.textContent = project.title;

  const description = document.createElement('p');
  description.className = 'text-gray-300 mb-4';
  description.textContent = project.description;

  const link = document.createElement('a');
  link.className = 'inline-block bg-accent hover:bg-accent-dark text-bg font-bold py-2 px-4 rounded transition-colors duration-200';
  link.href = project.link;
  link.textContent = 'View Project';
  link.target = '_blank'; // Open in new tab

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(link);

  container.appendChild(card);
}