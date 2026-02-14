import { About } from '../types';

const aboutData: About = {
  heading: "About Me",
  content: `I am a passionate software engineer with a focus on building scalable and maintainable web applications. I have experience with a variety of technologies, including TypeScript, React, Node.js, and more. I am always eager to learn new things and contribute to challenging projects.`,
  skills: ["TypeScript", "JavaScript", "React", "Node.js", "Tailwind CSS", "HTML", "CSS", "Git", "REST APIs"]
};

export function renderAbout(container: HTMLElement): void {
  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.className = 'py-12 bg-gray-900 text-white';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';

  const heading = document.createElement('h2');
  heading.className = 'text-3xl font-bold mb-6';
  heading.textContent = aboutData.heading;

  const content = document.createElement('p');
  content.className = 'mb-8 leading-relaxed';
  content.textContent = aboutData.content;

  const skillsHeading = document.createElement('h3');
  skillsHeading.className = 'text-2xl font-semibold mb-4';
  skillsHeading.textContent = 'Skills';

  const skillsList = document.createElement('ul');
  skillsList.className = 'list-disc list-inside';

  aboutData.skills.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.textContent = skill;
    skillsList.appendChild(skillItem);
  });

  containerDiv.appendChild(heading);
  containerDiv.appendChild(content);
  containerDiv.appendChild(skillsHeading);
  containerDiv.appendChild(skillsList);
  aboutSection.appendChild(containerDiv);
  container.appendChild(aboutSection);
}