import { Project } from '../types';

export function renderProjectCard(project: Project, container: HTMLElement): void {
  const card = document.createElement('div');
  card.className = 'rounded-lg shadow-md bg-gray-800 text-white p-6 hover:scale-105 transition-transform duration-200';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold mb-2';
  title.textContent = project.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.className = 'text-gray-300 mb-4';
  description.textContent = project.description;
  card.appendChild(description);

  const link = document.createElement('a');
  link.href = project.link;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded';
  link.textContent = 'View Project';
  card.appendChild(link);

  container.appendChild(card);
}