import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function renderTestimonials(container: HTMLElement, props: TestimonialsProps): void {
  const { testimonials } = props;

  const testimonialsContainer = document.createElement('div');
  testimonialsContainer.className = 'bg-gray-100 dark:bg-gray-800 py-12';

  const innerContainer = document.createElement('div');
  innerContainer.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  const heading = document.createElement('h2');
  heading.className = 'text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl text-center';
  heading.textContent = 'What Our Customers Say';
  innerContainer.appendChild(heading);

  const testimonialsGrid = document.createElement('div');
  testimonialsGrid.className = 'mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  testimonials.forEach((testimonial) => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex flex-col justify-between';

    const quote = document.createElement('p');
    quote.className = 'text-gray-700 dark:text-gray-300 text-lg italic mb-4 flex-grow';
    quote.textContent = `"${testimonial.quote}"`;
    testimonialCard.appendChild(quote);

    const authorContainer = document.createElement('div');
    authorContainer.className = 'flex items-center mt-4';

    const authorImage = document.createElement('img');
    authorImage.className = 'w-12 h-12 rounded-full mr-4';
    authorImage.src = testimonial.image;
    authorImage.alt = testimonial.author;
    authorContainer.appendChild(authorImage);

    const authorInfo = document.createElement('div');
    authorInfo.className = 'flex flex-col';

    const authorName = document.createElement('p');
    authorName.className = 'text-gray-900 dark:text-gray-100 font-medium';
    authorName.textContent = testimonial.author;
    authorInfo.appendChild(authorName);

    const authorTitle = document.createElement('p');
    authorTitle.className = 'text-gray-500 dark:text-gray-400 text-sm';
    authorTitle.textContent = testimonial.title;
    authorInfo.appendChild(authorTitle);

    authorContainer.appendChild(authorInfo);
    testimonialCard.appendChild(authorContainer);

    testimonialsGrid.appendChild(testimonialCard);
  });

  innerContainer.appendChild(testimonialsGrid);
  testimonialsContainer.appendChild(innerContainer);
  container.appendChild(testimonialsContainer);
}