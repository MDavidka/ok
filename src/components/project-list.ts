import { Project } from '../types';
import { classNames } from '../utils';

interface ProjectListProps {
  projects: Project[];
}

export function renderProjectList(container: HTMLElement, props: ProjectListProps): void {
  if (!props.projects || props.projects.length === 0) {
    container.innerHTML = '<p>No projects to display.</p>';
    return;
  }

  const projectList = document.createElement('div');
  projectList.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  props.projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden';

    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.title;
    image.className = 'w-full h-48 object-cover';

    const content = document.createElement('div');
    content.className = 'p-4';

    const title = document.createElement('h3');
    title.textContent = project.title;
    title.className = 'text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2';

    const description = document.createElement('p');
    description.textContent = project.description;
    description.className = 'text-gray-600 dark:text-gray-400';

    content.appendChild(title);
    content.appendChild(description);

    projectCard.appendChild(image);
    projectCard.appendChild(content);

    projectList.appendChild(projectCard);
  });

  container.appendChild(projectList);
}