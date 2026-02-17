import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export function renderProjects(container: HTMLElement, props: ProjectsProps): void {
  const { projects } = props;

  const projectsSection = document.createElement('section');
  projectsSection.id = 'projects';
  projectsSection.className = 'py-16 bg-gray-900 text-white';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';

  const title = document.createElement('h2');
  title.className = 'text-3xl font-semibold mb-8 text-center';
  title.textContent = 'Projects';

  const projectsGrid = document.createElement('div');
  projectsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'bg-gray-800 rounded-lg shadow-md overflow-hidden';

    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.name;
    image.className = 'w-full h-48 object-cover';

    const content = document.createElement('div');
    content.className = 'p-4';

    const projectName = document.createElement('h3');
    projectName.className = 'text-xl font-semibold mb-2';
    projectName.textContent = project.name;

    const description = document.createElement('p');
    description.className = 'text-gray-400 mb-4';
    description.textContent = project.description;

    const link = document.createElement('a');
    link.href = project.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded';
    link.textContent = 'View Project';

    content.appendChild(projectName);
    content.appendChild(description);
    content.appendChild(link);

    projectCard.appendChild(image);
    projectCard.appendChild(content);

    projectsGrid.appendChild(projectCard);
  });

  containerDiv.appendChild(title);
  containerDiv.appendChild(projectsGrid);
  projectsSection.appendChild(containerDiv);

  container.appendChild(projectsSection);
}