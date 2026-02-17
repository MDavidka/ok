import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderHero } from './components/hero';
import { renderAbout } from './components/about';
import { renderProjects } from './components/projects';
import { renderContactForm } from './components/contact-form';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    console.error('Root element with id "app" not found.');
    return;
  }

  // Create container elements
  const headerContainer = document.createElement('header');
  const mainContainer = document.createElement('main');
  const footerContainer = document.createElement('footer');

  mainContainer.classList.add('container', 'mx-auto', 'py-8');

  // Append containers to the app
  app.appendChild(headerContainer);
  app.appendChild(mainContainer);
  app.appendChild(footerContainer);

  // Render components into their respective containers
  renderHeader(headerContainer);
  renderHero(mainContainer);
  renderAbout(mainContainer);
  renderProjects(mainContainer);
  renderContactForm(mainContainer);
  renderFooter(footerContainer);
});