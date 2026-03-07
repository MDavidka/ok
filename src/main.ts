import './style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Menu } from './components/menu';
import { OrderForm } from './components/orderForm';
import { ReservationForm } from './components/reservationForm';
import { LoginForm } from './components/loginForm';
import { SiteConfig, MenuItem } from './types';
import { generateUniqueId } from './utils';

const siteConfig: SiteConfig = {
  name: 'Sycostaurant',
  description: 'Serving delicious breakfast at home',
  navItems: [
    { label: 'Menu', href: '/menu' },
    { label: 'Order Online', href: '/order' },
    { label: 'Reservations', href: '/reservations' },
    { label: 'Login', href: '/login' },
  ],
};

const menuItems: MenuItem[] = [
    { id: generateUniqueId(), name: 'Pancakes', description: 'Fluffy pancakes with syrup', price: 7.99, image: 'https://placehold.co/400x300/e63946/fff?text=Pancakes' },
    { id: generateUniqueId(), name: 'Eggs Benedict', description: 'Classic eggs benedict', price: 9.99, image: 'https://placehold.co/400x300/e63946/fff?text=Eggs+Benedict' },
    { id: generateUniqueId(), name: 'Waffles', description: 'Crispy waffles with fruit', price: 8.99, image: 'https://placehold.co/400x300/e63946/fff?text=Waffles' },
];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${Header({ siteName: siteConfig.name, navItems: siteConfig.navItems, className: 'bg-color-bg shadow-md' })}
  <main class="container mx-auto py-8">
    <h1>Welcome to ${siteConfig.name}</h1>
    <p>${siteConfig.description}</p>
    ${Menu({ menuItems: menuItems, className: 'mb-8' })}
    ${OrderForm({ className: 'mb-8' })}
    ${ReservationForm({ className: 'mb-8' })}
    ${LoginForm({ className: 'mb-8' })}
  </main>
  ${Footer({ copyright: '&copy; 2023 Sycostaurant', className: 'bg-color-bg border-t border-color-muted' })}
`;
`
