import { About } from '../types';

const aboutData: About = {
  heading: 'About Me',
  content: `I am a passionate software engineer with a focus on building scalable and maintainable web applications.
          I have experience with a variety of technologies, including TypeScript, React, Node.js, and Tailwind CSS.
          I am always eager to learn new things and contribute to challenging projects.`,
  imageSrc: 'https://via.placeholder.com/300', // Replace with your actual image
  skills: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Git', 'REST APIs'],
};

export function renderAbout(container: HTMLElement): void {
  container.innerHTML = `
    <section class="py-12 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold mb-8 text-center">${aboutData.heading}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src="${aboutData.imageSrc}" alt="About Me" class="rounded-lg shadow-md">
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
    </section>
  `;
}