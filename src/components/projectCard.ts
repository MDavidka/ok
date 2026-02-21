import { Project } from '../types';

export function renderProjectCard(project: Project, container: HTMLElement): void {
  const card = document.createElement('div');
  card.className = 'rounded-lg shadow-md bg-gray-800 text-white p-4 hover:scale-105 transition-transform duration-200';

  const title = document.createElement('h3');
  title.className = 'text-xl font-semibold mb-2';
  title.textContent = project.title;

  const description = document.createElement('p');
  description.className = 'text-gray-300 mb-4';
  description.textContent = project.description;

  const link = document.createElement('a');
  link.className = 'inline-block bg-accent hover:bg-accent-dark text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  link.href = project.link;
  link.textContent = 'View Project';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(link);

  container.appendChild(card);
}