import './style.css';
import { renderHeader } from './components/header';
import { Footer } from './components/footer';
import { renderHero } from './components/hero';
import { Feature } from './components/feature';
import { renderPricing } from './components/pricing';
import { ContactForm } from './components/contactForm';
import { renderProjects } from './components/projects';
import { renderAbout } from './components/about';
import { renderCard } from './components/card';
import { renderTestimonials } from './components/testimonials';
import { MainSection } from './components/mainSection';
import { renderContactForm as renderSimpleContactForm } from './components/contact-form';
import { DatePicker } from './components/date-picker';
import { TimeSlotSelector } from './components/time-slot-selector';
import { ReservationForm } from './components/reservation-form';
import { getConfig } from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    console.error('Root element #app not found');
    return;
  }

  // Site configuration
  const siteConfig = getConfig();

  // Header
  const headerContainer = document.createElement('div');
  app.appendChild(headerContainer);
  renderHeader({ navItems: siteConfig.navItems, className: 'mb-8' }, headerContainer);

  // Hero section
  const heroProps = {
    title: 'High-End Reservation System',
    subtitle: 'Experience the ultimate in luxury and convenience.',
    image: 'https://images.unsplash.com/photo-1560786154-9ca4b8b71efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Book Now',
    ctaLink: '#reservation',
  };
  renderHero(heroProps, app);

  // About Section
  const aboutProps = {
    title: 'About Us',
    content: 'We are dedicated to providing you with the best reservation experience possible. Our system is designed to be both luxurious and convenient, ensuring that your every need is met.',
    image: 'https://images.unsplash.com/photo-1517245412959-17f07cb8f10d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };
  const aboutContainer = document.createElement('div');
  app.appendChild(aboutContainer);
  renderAbout(aboutContainer, aboutProps);

  // Main Section
  const mainSection = document.createElement('section');
  mainSection.className = 'py-12 bg-[var(--color-bg)] text-[var(--color-text)]';
  mainSection.innerHTML = MainSection({ className: 'mb-8' });
  app.appendChild(mainSection);

  // Features Section
  const featuresSection = document.createElement('div');
  featuresSection.className = 'container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8';
  featuresSection.innerHTML += Feature({ title: 'Luxury', description: 'Experience the finest in reservation services.' });
  featuresSection.innerHTML += Feature({ title: 'Convenience', description: 'Book your reservations with ease and speed.' });
  featuresSection.innerHTML += Feature({ title: 'Exclusivity', description: 'Enjoy access to premium venues and services.' });
  app.appendChild(featuresSection);

  // Pricing Section
  const pricingContainer = document.createElement('div');
  pricingContainer.className = 'container mx-auto px-4 sm:px-6 lg:px-8 mb-8';
  app.appendChild(pricingContainer);
  renderPricing(pricingContainer);

  // Projects Section (Dummy Data)
  const projects = [
    {
      name: 'Project 1',
      description: 'A description of project 1.',
      imageUrl: 'https://via.placeholder.com/400x300',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      name: 'Project 2',
      description: 'A description of project 2.',
      imageUrl: 'https://via.placeholder.com/400x300',
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      name: 'Project 3',
      description: 'A description of project 3.',
      imageUrl: 'https://via.placeholder.com/400x300',
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  const projectsContainer = document.createElement('div');
  app.appendChild(projectsContainer);
  renderProjects(projectsContainer, { projects });

  // Testimonials Section (Dummy Data)
  const testimonials = [
    {
      quote: 'The best reservation system I have ever used!',
      author: 'John Doe',
      title: 'CEO, Example Company',
    },
    {
      quote: 'Incredibly convenient and luxurious.',
      author: 'Jane Smith',
      title: 'Manager, Another Company',
    },
  ];
  const testimonialsContainer = document.createElement('div');
  app.appendChild(testimonialsContainer);
  renderTestimonials(testimonialsContainer, { testimonials });

  // Card Example
  const cardContainer = document.createElement('div');
  app.appendChild(cardContainer);
  renderCard({
    title: 'Luxury Experience',
    description: 'Enjoy the finest in reservation services.',
    imageUrl: 'https://via.placeholder.com/400x200',
    link: '#',
    className: 'container mx-auto px-4 sm:px-6 lg:px-8 mb-8',
  }, cardContainer);

  // Contact Form
  const contactFormContainer = document.createElement('div');
  contactFormContainer.className = 'container mx-auto px-4 sm:px-6 lg:px-8 mb-8';
  app.appendChild(contactFormContainer);

  const handleFormSubmit = (data: { name: string; email: string; message: string }) => {
    console.log('Form Data:', data);
    alert(`Thank you, ${data.name}! Your message has been received.`);
  };

  const contactForm = ContactForm({ onSubmit: handleFormSubmit, className: 'mb-8' });
  contactFormContainer.appendChild(contactForm);

    // Simple Contact Form
    const simpleContactFormContainer = document.createElement('div');
    simpleContactFormContainer.className = 'container mx-auto px-4 sm:px-6 lg:px-8 mb-8';
    app.appendChild(simpleContactFormContainer);
    renderSimpleContactForm(simpleContactFormContainer);

  // Reservation Form
  const reservationFormContainer = document.createElement('div');
  reservationFormContainer.className = 'container mx-auto px-4 sm:px-6 lg:px-8 mb-8';
  app.appendChild(reservationFormContainer);
  const reservationForm = ReservationForm({});
  reservationFormContainer.appendChild(reservationForm);

  // Footer
  const footerElement = Footer({ className: 'mt-8' });
  app.appendChild(footerElement);
});