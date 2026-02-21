import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderHero } from './components/hero';
import { renderProjectList } from './components/projectList';
import { renderAbout } from './components/about';
import { renderContactForm } from './components/contactForm';

function initApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    console.error('App container not found!');
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

  // Render components
  renderHeader(headerContainer);

  // Create sections within the main container
  const heroSection = document.createElement('section');
  heroSection.id = 'hero';
  heroSection.classList.add('mb-12');

  const projectsSection = document.createElement('section');
  projectsSection.id = 'projects';
  projectsSection.classList.add('mb-12');

  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.classList.add('mb-12');

  const contactSection = document.createElement('section');
  contactSection.id = 'contact';

  mainContainer.appendChild(heroSection);
  mainContainer.appendChild(projectsSection);
  mainContainer.appendChild(aboutSection);
  mainContainer.appendChild(contactSection);

  renderHero(heroSection);
  renderProjectList(projectsSection);
  renderAbout(aboutSection);
  renderContactForm(contactSection);

  renderFooter(footerContainer);
}

document.addEventListener('DOMContentLoaded', initApp);