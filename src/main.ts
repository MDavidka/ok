import './style.css'
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderMenu } from './components/menu';
import { renderReservationForm } from './components/reservationForm';
import { renderTestimonials } from './components/testimonials';
import { renderHero } from './components/hero';

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header');
  const footerContainer = document.getElementById('footer');
  const menuContainer = document.getElementById('menu');
  const reservationFormContainer = document.getElementById('reservationForm');
  const testimonialsContainer = document.getElementById('testimonials');
  const heroContainer = document.getElementById('hero');

  if (headerContainer) {
    renderHeader(headerContainer);
  } else {
    console.error('Header container not found');
  }

  if (footerContainer) {
    renderFooter(footerContainer);
  } else {
    console.error('Footer container not found');
  }

  if (menuContainer) {
    renderMenu(menuContainer);
  } else {
    console.error('Menu container not found');
  }

  if (reservationFormContainer) {
    renderReservationForm(reservationFormContainer);
  } else {
    console.error('Reservation form container not found');
  }

  if (testimonialsContainer) {
    renderTestimonials(testimonialsContainer);
  } else {
    console.error('Testimonials container not found');
  }

  if (heroContainer) {
    renderHero(heroContainer);
  } else {
    console.error('Hero container not found');
  }
});