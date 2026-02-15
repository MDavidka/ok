import { Project } from '../types';
import { renderProjectCard } from './project-card';

interface ProjectsProps {
  projects: Project[];
}

export function renderProjects(container: HTMLElement, props: ProjectsProps): void {
  const { projects } = props;

  const projectsSection = document.createElement('section');
  projectsSection.id = 'projects';
  projectsSection.className = 'py-12 bg-color-bg-secondary';

  const projectsContainer = document.createElement('div');
  projectsContainer.className = 'container mx-auto px-4';

  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = 'Projects';
  sectionTitle.className = 'text-3xl font-semibold text-color-text mb-8 text-center';

  const projectsGrid = document.createElement('div');
  projectsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  projects.forEach(project => {
    const projectCardContainer = document.createElement('div');
    renderProjectCard(project, projectCardContainer);
    projectsGrid.appendChild(projectCardContainer);
  });

  projectsContainer.appendChild(sectionTitle);
  projectsContainer.appendChild(projectsGrid);
  projectsSection.appendChild(projectsContainer);
  container.appendChild(projectsSection);
}