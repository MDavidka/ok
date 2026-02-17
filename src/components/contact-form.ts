import { validateEmail } from '../utils';

export function renderContactForm(container: HTMLElement): void {
  container.innerHTML = `
    <section id="contact" class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <form id="contactForm" class="max-w-lg mx-auto">
          <div class="mb-4">
            <label for="name" class="block text-gray-300 text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700" placeholder="Your Name">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-300 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700" placeholder="Your Email">
            <p id="emailError" class="text-red-500 text-xs italic hidden">Please enter a valid email address.</p>
          </div>
          <div class="mb-6">
            <label for="message" class="block text-gray-300 text-sm font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white border-gray-700" placeholder="Your Message"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  `;

  const form = document.getElementById('contactForm') as HTMLFormElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const emailError = document.getElementById('emailError') as HTMLParagraphElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!validateEmail(emailInput.value)) {
      emailError.classList.remove('hidden');
      return;
    } else {
      emailError.classList.add('hidden');
    }

    // Simulate form submission (replace with actual submission logic)
    alert('Form submitted!');
    form.reset();
  });
}