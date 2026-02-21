import { About } from '../types';

const aboutData: About = {
  heading: 'About Me',
  content: `I am a passionate software engineer with a focus on building scalable and maintainable web applications.
  I have experience with a variety of technologies, including TypeScript, React, Node.js, and more.
  I am always eager to learn new things and contribute to challenging projects.`,
  skills: ['TypeScript', 'JavaScript', 'React', 'Node.js', 'Tailwind CSS', 'HTML', 'CSS', 'Git']
};

export function renderAbout(container: HTMLElement): void {
  if (!container) {
    console.error('About container not found');
    return;
  }

  container.innerHTML = `
    <section class="py-12 dark:bg-gray-800 dark:text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">${aboutData.heading}</h2>
        <p class="mb-4">${aboutData.content}</p>
        <h3 class="text-xl font-semibold mb-2">Skills</h3>
        <ul class="flex flex-wrap gap-2">
          ${aboutData.skills.map(skill => `<li class="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">${skill}</li>`).join('')}
        </ul>
      </div>
    </section>
  `;
}