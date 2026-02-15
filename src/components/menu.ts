import { MenuItem } from '../types';

interface MenuProps {
  menuItems: MenuItem[];
}

export function renderMenu(container: HTMLElement, props: MenuProps): void {
  const { menuItems } = props;

  const menuContainer = document.createElement('div');
  menuContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  menuItems.forEach(item => {
    const menuItemElement = createMenuItemElement(item);
    menuContainer.appendChild(menuItemElement);
  });

  container.appendChild(menuContainer);
}

function createMenuItemElement(item: MenuItem): HTMLElement {
  const menuItemDiv = document.createElement('div');
  menuItemDiv.className = 'bg-white rounded-lg shadow-md p-4 flex flex-col justify-between';

  const itemName = document.createElement('h3');
  itemName.className = 'text-xl font-semibold mb-2 text-gray-800';
  itemName.textContent = item.name;

  const itemDescription = document.createElement('p');
  itemDescription.className = 'text-gray-600 text-sm mb-4';
  itemDescription.textContent = item.description;

  const itemPrice = document.createElement('span');
  itemPrice.className = 'text-green-600 font-bold text-lg';
  itemPrice.textContent = `$${item.price.toFixed(2)}`;

  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.name;
  image.className = 'w-full h-48 object-cover rounded-md mb-4';

  menuItemDiv.appendChild(image);
  menuItemDiv.appendChild(itemName);
  menuItemDiv.appendChild(itemDescription);
  menuItemDiv.appendChild(itemPrice);

  return menuItemDiv;
}