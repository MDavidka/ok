import { MenuItem, ComponentProps } from '../types';
import { formatCurrency } from '../utils';
import '../style.css';

interface MenuProps extends ComponentProps {
    menuItems: MenuItem[];
}

export const Menu = ({ menuItems, className }: MenuProps) => {
    return `
    <section class="${className}">
        <div class="container mx-auto py-8">
            <h2 class="text-3xl font-bold mb-4 text-center">Our Menu</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${menuItems.map(item => `
                    <div class="bg-color-accent rounded-md p-4">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-md mb-2">
                        <h3 class="text-xl font-semibold">${item.name}</h3>
                        <p class="text-color-muted">${item.description}</p>
                        <p class="text-color-primary font-bold">${formatCurrency(item.price)}</p>
                        <button class="bg-color-primary text-color-accent py-2 px-4 rounded-md mt-2 hover:bg-color-secondary">Add to Order</button>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
};