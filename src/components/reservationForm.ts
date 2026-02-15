import { Reservation } from '../types';

export function renderReservationForm(container: HTMLElement): void {
  const form = document.createElement('form');
  form.classList.add('bg-white', 'shadow-md', 'rounded', 'px-8', 'pt-6', 'pb-8', 'mb-4', 'dark:bg-gray-800', 'dark:text-white');

  form.innerHTML = `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="name">
        Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600" id="name" type="text" placeholder="Your Name">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="email">
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600" id="email" type="email" placeholder="Your Email">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="date">
        Date
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600" id="date" type="date">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="time">
        Time
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600" id="time" type="time">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="guests">
        Number of Guests
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600" id="guests" type="number" placeholder="Number of Guests">
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Make Reservation
      </button>
    </div>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;
    const time = (document.getElementById('time') as HTMLInputElement).value;
    const guests = parseInt((document.getElementById('guests') as HTMLInputElement).value);

    if (!name || !email || !date || !time || isNaN(guests)) {
      alert('Please fill in all fields.');
      return;
    }

    const reservation: Reservation = {
      name,
      email,
      date,
      time,
      guests,
    };

    console.log('Reservation submitted:', reservation);
    // Here you would typically send the reservation data to a server
  });

  container.appendChild(form);
}