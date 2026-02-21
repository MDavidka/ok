import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

export function renderProjectList(container: HTMLElement, props: ProjectListProps): void {
  if (!container) {
    console.error('Project list container not found');
    return;
  }

  container.innerHTML = ''; // Clear existing content

  if (!props || !props.projects || props.projects.length === 0) {
    container.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No projects to display.</p>';
    return;
  }

  const projectList = document.createElement('div');
  projectList.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'; // Responsive grid layout

  props.projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden';

    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.name;
    image.className = 'w-full h-48 object-cover';

    const content = document.createElement('div');
    content.className = 'p-4';

    const title = document.createElement('h3');
    title.textContent = project.name;
    title.className = 'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2';

    const description = document.createElement('p');
    description.textContent = project.description;
    description.className = 'text-gray-700 dark:text-gray-300';

    content.appendChild(title);
    content.appendChild(description);

    projectCard.appendChild(image);
    projectCard.appendChild(content);

    projectList.appendChild(projectCard);
  });

  container.appendChild(projectList);
}