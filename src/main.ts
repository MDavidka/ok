import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderHero } from './components/hero';
import { renderAbout } from './components/about';
import { renderProjects } from './components/projects';
import { renderContactForm } from './components/contact-form';

function init() {
  const headerContainer = document.querySelector<HTMLElement>('#header');
  const footerContainer = document.querySelector<HTMLElement>('#footer');
  const heroContainer = document.querySelector<HTMLElement>('#hero');
  const aboutContainer = document.querySelector<HTMLElement>('#about');
  const projectsContainer = document.querySelector<HTMLElement>('#projects');
  const contactContainer = document.querySelector<HTMLElement>('#contact');

  if (headerContainer) {
    renderHeader(headerContainer);
  }

  if (footerContainer) {
    renderFooter(footerContainer);
  }

  if (heroContainer) {
    renderHero(heroContainer);
  }

  if (aboutContainer) {
    renderAbout(aboutContainer);
  }

  if (projectsContainer) {
    renderProjects(projectsContainer);
  }

  if (contactContainer) {
    renderContactForm(contactContainer);
  }
}

document.addEventListener('DOMContentLoaded', init);