import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export function renderProjects(container: HTMLElement, props: ProjectsProps): void {
  if (!container) {
    console.error('Projects container not found');
    return;
  }

  container.innerHTML = `
    <section id="projects" class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold mb-8 text-center">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${props.projects.map(project => `
            <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="${project.imageUrl}" alt="${project.name}" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${project.name}</h3>
                <p class="text-gray-400">${project.description}</p>
                <a href="${project.liveUrl}" target="_blank" class="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  Live Demo
                </a>
                <a href="${project.githubUrl}" target="_blank" class="inline-block mt-4 ml-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  GitHub
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}