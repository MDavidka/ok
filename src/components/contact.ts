import { ContactFormData } from '../types';
import { validateEmail } from '../utils';

export function renderContact(container: HTMLElement): void {
  container.innerHTML = `
    <section id="contact" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-center mb-8">Contact Me</h2>
        <form id="contact-form" class="max-w-lg mx-auto">
          <div class="mb-4">
            <label for="name" class="block text-color-text-light text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-color-text leading-tight focus:outline-none focus:shadow-outline bg-color-bg-secondary" required>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-color-text-light text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-color-text leading-tight focus:outline-none focus:shadow-outline bg-color-bg-secondary" required>
          </div>
          <div class="mb-6">
            <label for="message" class="block text-color-text-light text-sm font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-color-text leading-tight focus:outline-none focus:shadow-outline bg-color-bg-secondary" required></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button class="btn-primary" type="submit">Send Message</button>
          </div>
        </form>
        <div id="form-message" class="mt-4 text-center"></div>
      </div>
    </section>
  `;

  const form = document.getElementById('contact-form') as HTMLFormElement;
  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const contactFormData: ContactFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  };

  const messageDiv = document.getElementById('form-message') as HTMLElement;

  if (!validateEmail(contactFormData.email)) {
    messageDiv.textContent = 'Please enter a valid email address.';
    messageDiv.className = 'text-red-500 mt-4 text-center';
    return;
  }

  try {
    // Simulate a successful submission
    messageDiv.textContent = 'Message sent successfully!';
    messageDiv.className = 'text-green-500 mt-4 text-center';
    form.reset(); // Clear the form
    // In a real application, you would send the data to a server here.
    // Example:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(contactFormData),
    // });

    // if (response.ok) {
    //   messageDiv.textContent = 'Message sent successfully!';
    //   messageDiv.className = 'text-green-500 mt-4 text-center';
    //   form.reset(); // Clear the form
    // } else {
    //   messageDiv.textContent = 'An error occurred. Please try again later.';
    //   messageDiv.className = 'text-red-500 mt-4 text-center';
    // }
  } catch (error) {
    console.error('Form submission error:', error);
    messageDiv.textContent = 'An error occurred. Please try again later.';
    messageDiv.className = 'text-red-500 mt-4 text-center';
  }
}