import './style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { renderHero } from './components/hero';
import { renderAbout } from './components/about';
import { ContactForm } from './components/contactForm';
import { SiteConfig } from './types';
import { renderProjects } from './components/projects';
import { renderTestimonials } from './components/testimonials';
import { renderPricing } from './components/pricing';
import { ReservationForm } from './components/reservation-form';

const siteConfig: SiteConfig = {
  name: 'High-End Reservations',
  description: 'Experience the epitome of luxury. Reserve your exclusive experience today.',
  navItems: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reservation', href: '#reservation' },
  ],
};

const projectsData = [
  {
    name: 'Project 1',
    description: 'A brief description of project 1.',
    imageUrl: 'https://via.placeholder.com/400x300',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'Project 2',
    description: 'A brief description of project 2.',
    imageUrl: 'https://via.placeholder.com/400x300',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'Project 3',
    description: 'A brief description of project 3.',
    imageUrl: 'https://via.placeholder.com/400x300',
    liveUrl: '#',
    githubUrl: '#',
  },
];

const testimonialsData = [
  {
    quote: 'This is a great service!',
    author: 'John Doe',
    title: 'CEO of Company',
  },
  {
    quote: 'I highly recommend this.',
    author: 'Jane Smith',
    title: 'Marketing Manager',
  },
];

function init() {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found');
    return;
  }

  // Header
  const header = Header({ navItems: siteConfig.navItems, siteName: siteConfig.name });
  root.appendChild(header);

  // Hero
  const heroContainer = document.createElement('div');
  root.appendChild(heroContainer);
  renderHero(siteConfig, heroContainer);

  // About
  const aboutContainer = document.createElement('div');
  aboutContainer.id = 'about';
  root.appendChild(aboutContainer);
  renderAbout(aboutContainer);

  // Projects
  const projectsContainer = document.createElement('div');
  projectsContainer.id = 'projects';
  root.appendChild(projectsContainer);
  renderProjects(projectsContainer, { projects: projectsData });

  // Testimonials
  const testimonialsContainer = document.createElement('div');
  root.appendChild(testimonialsContainer);
  renderTestimonials(testimonialsContainer, { testimonials: testimonialsData });

  // Pricing
  const pricingContainer = document.createElement('div');
  pricingContainer.id = 'pricing';
  root.appendChild(pricingContainer);
  renderPricing(pricingContainer);

  // Reservation Form
  const reservationContainer = document.createElement('div');
  reservationContainer.id = 'reservation';
  root.appendChild(reservationContainer);
  reservationContainer.className = 'container mx-auto mt-8';
  const reservationForm = ReservationForm({});
  reservationContainer.appendChild(reservationForm);

  // Contact Form
  const contactContainer = document.createElement('div');
  contactContainer.id = 'contact';
  root.appendChild(contactContainer);
  const contactForm = ContactForm({});
  contactContainer.className = 'container mx-auto mt-8';
  contactContainer.appendChild(contactForm);

  // Footer
  const footer = Footer({});
  root.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', init);