import { Project } from '../types';

export function renderProjectCard(project: Project, container: HTMLElement): void {
  if (!container) {
    console.error('Project card container not found');
    return;
  }

  const card = document.createElement('div');
  card.className = 'bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-200';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold text-white mb-2';
  title.textContent = project.title;

  const description = document.createElement('p');
  description.className = 'text-gray-400 mb-4';
  description.textContent = project.description;

  const link = document.createElement('a');
  link.className = 'text-blue-500 hover:text-blue-400 font-medium';
  link.href = project.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'View Project';

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(link);

  container.appendChild(card);
}