import { validateEmail } from '../utils';

export function renderContactForm(container: HTMLElement): void {
  container.innerHTML = `
    <section id="contact" class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <form id="contactForm" class="max-w-lg mx-auto">
          <div class="mb-4">
            <label for="name" class="block text-gray-300 text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600" placeholder="Your Name">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600" placeholder="Your Email">
            <p id="email-error" class="text-red-500 text-xs italic hidden">Please enter a valid email address.</p>
          </div>
          <div class="mb-6">
            <label for="message" class="block text-gray-300 text-sm font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white border-gray-600" placeholder="Your Message"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button id="submitButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  `;

  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  if (!form) {
    console.error('Contact form not found');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
    const emailError = document.getElementById('email-error') as HTMLParagraphElement | null;

    if (!nameInput || !emailInput || !messageInput || !emailError) {
      console.error('One or more form elements not found');
      return;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    if (!validateEmail(email)) {
      emailError.classList.remove('hidden');
      return;
    } else {
      emailError.classList.add('hidden');
    }

    // Basic form validation (you can add more)
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Simulate a successful submission
      alert('Message sent successfully!');
      form.reset(); // Clear the form
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred while sending your message. Please try again later.');
    }
  });
}