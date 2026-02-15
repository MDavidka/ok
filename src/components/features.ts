import { Feature } from '../types';

const featuresData: Feature[] = [
  {
    title: 'Feature One',
    description: 'Description of feature one. Explain its benefits and how it helps users.',
    icon: 'icon-one', // Replace with actual icon class or SVG
  },
  {
    title: 'Feature Two',
    description: 'Description of feature two. Explain its benefits and how it helps users.',
    icon: 'icon-two', // Replace with actual icon class or SVG
  },
  {
    title: 'Feature Three',
    description: 'Description of feature three. Explain its benefits and how it helps users.',
    icon: 'icon-three', // Replace with actual icon class or SVG
  },
  {
    title: 'Feature Four',
    description: 'Description of feature four. Explain its benefits and how it helps users.',
    icon: 'icon-four', // Replace with actual icon class or SVG
  },
];

export function renderFeatures(container: HTMLElement): void {
  const featuresSection = document.createElement('section');
  featuresSection.id = 'features';
  featuresSection.className = 'bg-gray-100 dark:bg-gray-900 py-12';

  const featuresContainer = document.createElement('div');
  featuresContainer.className = 'container mx-auto px-4';

  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';

  featuresData.forEach((feature) => {
    const featureCard = document.createElement('div');
    featureCard.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300';

    const icon = document.createElement('div');
    icon.className = `text-3xl text-primary mb-4 ${feature.icon}`; // Use the icon class

    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2';
    title.textContent = feature.title;

    const description = document.createElement('p');
    description.className = 'text-gray-600 dark:text-gray-400';
    description.textContent = feature.description;

    featureCard.appendChild(icon);
    featureCard.appendChild(title);
    featureCard.appendChild(description);
    featuresGrid.appendChild(featureCard);
  });

  featuresContainer.appendChild(featuresGrid);
  featuresSection.appendChild(featuresContainer);
  container.appendChild(featuresSection);
}