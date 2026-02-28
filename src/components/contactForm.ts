import { ComponentProps, ContactFormData } from '../types';

export function ContactForm(props: ComponentProps = {}) {
  return `
    <div class="${props.className || ''}">
      <form id="contactForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
          <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
          <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        </div>
        <div>
          <label for="message" class="block text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>
        <div>
          <button type="submit" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
        </div>
      </form>
    </div>
  `;
}

export function renderContactForm(container: HTMLElement, props: ComponentProps = {}): void {
  if (!container) {
    console.error('Contact form container not found');
    return;
  }

  container.innerHTML = ContactForm(props);

  const form = container.querySelector('#contactForm') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData: ContactFormData = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      };

      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all fields.');
        return;
      }

      // You would typically send this data to a server here
      console.log('Form data submitted:', formData);
      alert('Form submitted successfully!'); // Replace with actual submission logic
      form.reset();
    });
  }
}