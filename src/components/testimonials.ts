// src/components/testimonials.ts
import { ComponentProps } from '../types';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

interface TestimonialsProps extends ComponentProps {
  testimonials: Testimonial[];
}

export function renderTestimonials(container: HTMLElement, props: TestimonialsProps): void {
  const testimonialsSection = document.createElement('section');
  testimonialsSection.className = `testimonials ${props.className || ''} py-12`;

  const title = document.createElement('h2');
  title.textContent = 'Testimonials';
  title.className = 'text-3xl font-bold text-center mb-8';
  testimonialsSection.appendChild(title);

  const testimonialsContainer = document.createElement('div');
  testimonialsContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  props.testimonials.forEach(testimonial => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'bg-color-secondary rounded-lg shadow-md p-6';

    const quote = document.createElement('p');
    quote.textContent = testimonial.quote;
    quote.className = 'text-lg italic mb-4 text-color-text';
    testimonialCard.appendChild(quote);

    const author = document.createElement('p');
    author.textContent = testimonial.author;
    author.className = 'font-bold text-color-primary';
    testimonialCard.appendChild(author);

    const title = document.createElement('p');
    title.textContent = testimonial.title;
    title.className = 'text-color-muted';
    testimonialCard.appendChild(title);

    testimonialsContainer.appendChild(testimonialCard);
  });

  testimonialsSection.appendChild(testimonialsContainer);
  container.appendChild(testimonialsSection);
}