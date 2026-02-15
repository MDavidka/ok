import { classNames } from '../utils';

export interface Skill {
  name: string;
  level: number; // 1-5, representing proficiency
}

interface AboutProps {
  bio: string;
  skills: Skill[];
}

export function renderAbout(container: HTMLElement, props: AboutProps): void {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'py-12 px-4 bg-gray-100 dark:bg-gray-800';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto';

  const title = document.createElement('h2');
  title.textContent = 'About Me';
  title.className = 'text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200';

  const bioParagraph = document.createElement('p');
  bioParagraph.textContent = props.bio;
  bioParagraph.className = 'text-lg mb-8 text-gray-700 dark:text-gray-300 leading-relaxed';

  const skillsTitle = document.createElement('h3');
  skillsTitle.textContent = 'Skills';
  skillsTitle.className = 'text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200';

  const skillsList = document.createElement('ul');
  skillsList.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

  props.skills.forEach(skill => {
    const skillItem = document.createElement('li');
    skillItem.className = 'flex items-center';

    const skillName = document.createElement('span');
    skillName.textContent = skill.name;
    skillName.className = 'mr-2 text-gray-700 dark:text-gray-300';

    const skillLevelContainer = document.createElement('div');
    skillLevelContainer.className = 'flex items-center';

    for (let i = 0; i < 5; i++) {
      const starIcon = document.createElement('span');
      starIcon.textContent = '★';
      starIcon.className = classNames(
        'text-sm',
        i < skill.level ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-600'
      );
      skillLevelContainer.appendChild(starIcon);
    }

    skillItem.appendChild(skillName);
    skillItem.appendChild(skillLevelContainer);
    skillsList.appendChild(skillItem);
  });

  containerDiv.appendChild(title);
  containerDiv.appendChild(bioParagraph);
  containerDiv.appendChild(skillsTitle);
  containerDiv.appendChild(skillsList);
  section.appendChild(containerDiv);
  container.appendChild(section);
}