import { About } from '../types';

const aboutData: About = {
  heading: 'About Me',
  content: `I am a passionate software engineer with experience in building web applications.
            I enjoy working with new technologies and solving challenging problems.`,
  imageUrl: 'https://via.placeholder.com/300', // Replace with your actual image URL
  skills: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Vite']
};

export function renderAbout(container: HTMLElement): void {
  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.className = 'py-16 bg-gray-900 text-white';

  aboutSection.innerHTML = `
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">${aboutData.heading}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src="${aboutData.imageUrl}" alt="About Me" class="rounded-lg shadow-md">
        </div>
        <div>
          <p class="text-lg mb-4">${aboutData.content}</p>
          <h3 class="text-xl font-semibold mb-2">Skills</h3>
          <ul class="list-disc list-inside">
            ${aboutData.skills.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  container.appendChild(aboutSection);
}