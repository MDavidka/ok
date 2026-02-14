import { validateEmail } from '../utils';

export function renderContact(container: HTMLElement): void {
  container.innerHTML = `
    <section id="contact" class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <div class="max-w-lg mx-auto">
          <form id="contactForm" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" name="name" class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" name="email" class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
              <p id="email-error" class="mt-2 text-sm text-red-500 hidden">Please enter a valid email address.</p>
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" name="message" rows="4" class="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>
            <div>
              <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  const form = document.getElementById('contactForm') as HTMLFormElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const emailError = document.getElementById('email-error') as HTMLParagraphElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateEmail(emailInput.value)) {
      emailError.classList.remove('hidden');
      return;
    } else {
      emailError.classList.add('hidden');
    }

    // In a real application, you would send the form data to a server here.
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Data:', data);

    // Reset the form after submission (optional)
    form.reset();
  });
}