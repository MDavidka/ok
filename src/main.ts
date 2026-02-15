import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderHero } from './components/hero';
import { renderAbout } from './components/about';
import { renderProjectList } from './components/project-list';
import { renderContactForm } from './components/contact-form';
import { SiteConfig, NavItem } from './types';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    console.error('Root element with id "app" not found.');
    return;
  }

  const siteConfig: SiteConfig = {
    title: 'My Portfolio',
    description: 'A showcase of my work and skills.',
    author: 'Your Name',
  };

  const navItems: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  // Create container for all content
  const container = document.createElement('div');
  container.classList.add('container', 'mx-auto', 'p-4');
  app.appendChild(container);

  // Render Header
  const headerContainer = document.createElement('header');
  container.appendChild(headerContainer);
  renderHeader(headerContainer, navItems);

  // Render Hero Section
  const heroContainer = document.createElement('section');
  heroContainer.id = 'hero';
  container.appendChild(heroContainer);
  renderHero(heroContainer);

  // Render About Section
  const aboutContainer = document.createElement('section');
  aboutContainer.id = 'about';
  container.appendChild(aboutContainer);
  renderAbout(aboutContainer);

  // Render Projects Section
  const projectsContainer = document.createElement('section');
  projectsContainer.id = 'projects';
  container.appendChild(projectsContainer);
  renderProjectList(projectsContainer);

  // Render Contact Form
  const contactContainer = document.createElement('section');
  contactContainer.id = 'contact';
  container.appendChild(contactContainer);
  renderContactForm(contactContainer);

  // Render Footer
  const footerContainer = document.createElement('footer');
  container.appendChild(footerContainer);
  renderFooter(footerContainer, siteConfig);
});