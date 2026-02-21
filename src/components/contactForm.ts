import { ContactFormData } from '../types';

export function renderContactForm(container: HTMLElement | null): void {
  if (!container) {
    console.error('Contact form container not found');
    return;
  }

  container.innerHTML = `
    <div class="bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-white mb-4">Contact Me</h2>
      <form id="contactForm" class="space-y-4">
        <div>
          <label for="name" class="block text-gray-300 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600" placeholder="Your Name">
        </div>
        <div>
          <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600" placeholder="Your Email">
        </div>
        <div>
          <label for="message" class="block text-gray-300 text-sm font-bold mb-2">Message</label>
          <textarea id="message" name="message" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600" placeholder="Your Message"></textarea>
        </div>
        <button type="submit" class="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Send Message
        </button>
      </form>
    </div>
  `;

  const form = document.getElementById('contactForm') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
}

async function handleSubmit(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const contactFormData: ContactFormData = {
    name: formData.get('name') as string || '',
    email: formData.get('email') as string || '',
    message: formData.get('message') as string || '',
  };

  try {
    // Replace with your actual API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactFormData),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('An error occurred. Please try again later.');
  }
}