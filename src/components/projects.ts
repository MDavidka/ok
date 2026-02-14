import { Project } from '../types';

const projectsData: Project[] = [
  {
    title: 'Project 1',
    description: 'A brief description of project 1.',
    imageUrl: 'https://via.placeholder.com/400x300',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Project 2',
    description: 'A brief description of project 2.',
    imageUrl: 'https://via.placeholder.com/400x300',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Project 3',
    description: 'A brief description of project 3.',
    imageUrl: 'https://via.placeholder.com/400x300',
    liveUrl: '#',
    githubUrl: '#'
  }
];

export function renderProjects(container: HTMLElement): void {
  const projectsSection = document.createElement('section');
  projectsSection.id = 'projects';
  projectsSection.className = 'py-12 bg-gray-900 text-white';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';

  const title = document.createElement('h2');
  title.className = 'text-3xl font-semibold mb-8 text-center';
  title.textContent = 'Projects';

  containerDiv.appendChild(title);

  const projectsGrid = document.createElement('div');
  projectsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  projectsData.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'rounded-lg shadow-md overflow-hidden bg-gray-800';

    const image = document.createElement('img');
    image.src = project.imageUrl;
    image.alt = project.title;
    image.className = 'w-full h-48 object-cover';

    const content = document.createElement('div');
    content.className = 'p-4';

    const projectTitle = document.createElement('h3');
    projectTitle.className = 'text-xl font-semibold mb-2';
    projectTitle.textContent = project.title;

    const description = document.createElement('p');
    description.className = 'text-gray-300 mb-4';
    description.textContent = project.description;

    const links = document.createElement('div');
    links.className = 'flex justify-between';

    const liveLink = document.createElement('a');
    liveLink.href = project.liveUrl;
    liveLink.textContent = 'Live Demo';
    liveLink.className = 'text-blue-500 hover:text-blue-400';

    const githubLink = document.createElement('a');
    githubLink.href = project.githubUrl;
    githubLink.textContent = 'GitHub';
    githubLink.className = 'text-blue-500 hover:text-blue-400';

    links.appendChild(liveLink);
    links.appendChild(githubLink);

    content.appendChild(projectTitle);
    content.appendChild(description);
    content.appendChild(links);

    projectCard.appendChild(image);
    projectCard.appendChild(content);

    projectsGrid.appendChild(projectCard);
  });

  containerDiv.appendChild(projectsGrid);
  projectsSection.appendChild(containerDiv);
  container.appendChild(projectsSection);
}