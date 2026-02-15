import { MenuItem } from '../types';

export function renderMenuItem(menuItem: MenuItem): HTMLElement {
  const menuItemElement = document.createElement('div');
  menuItemElement.className = 'menu-item p-4 border rounded-lg shadow-md flex flex-col';

  const imageElement = document.createElement('img');
  imageElement.src = menuItem.image;
  imageElement.alt = menuItem.name;
  imageElement.className = 'w-full h-48 object-cover rounded-md mb-2';

  const nameElement = document.createElement('h3');
  nameElement.textContent = menuItem.name;
  nameElement.className = 'text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1';

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = menuItem.description;
  descriptionElement.className = 'text-gray-600 dark:text-gray-400 mb-2 flex-grow';

  const priceElement = document.createElement('span');
  priceElement.textContent = `$${menuItem.price.toFixed(2)}`;
  priceElement.className = 'text-lg font-bold text-accent';

  menuItemElement.appendChild(imageElement);
  menuItemElement.appendChild(nameElement);
  menuItemElement.appendChild(descriptionElement);
  menuItemElement.appendChild(priceElement);

  return menuItemElement;
}