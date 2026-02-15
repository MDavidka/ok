import { classNames } from '../utils';

export function renderContactForm(container: HTMLElement): void {
  const form = document.createElement('form');
  form.classList.add(
    'max-w-lg',
    'mx-auto',
    'space-y-6',
    'p-6',
    'rounded-lg',
    'shadow-md',
    'bg-gray-50',
    'dark:bg-gray-800'
  );

  form.innerHTML = `
    <div>
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
      <input type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="John Doe" required>
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
      <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@example.com" required>
    </div>
    <div>
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
      <input type="text" id="subject" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let's collaborate" required>
    </div>
    <div class="sm:col-span-2">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Message</label>
      <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
    </div>
    <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
      Send message
    </button>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = form.querySelector<HTMLInputElement>('#name');
    const emailInput = form.querySelector<HTMLInputElement>('#email');
    const subjectInput = form.querySelector<HTMLInputElement>('#subject');
    const messageInput = form.querySelector<HTMLTextAreaElement>('#message');

    if (nameInput && emailInput && subjectInput && messageInput) {
      const name = nameInput.value;
      const email = emailInput.value;
      const subject = subjectInput.value;
      const message = messageInput.value;

      // Basic validation (can be improved)
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // You would typically send the data to a server here
      console.log('Form data:', { name, email, subject, message });
      alert('Message sent! (This is a demo)');

      // Clear the form
      nameInput.value = '';
      emailInput.value = '';
      subjectInput.value = '';
      messageInput.value = '';
    }
  });

  container.appendChild(form);
}