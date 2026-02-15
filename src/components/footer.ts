import { SiteConfig } from '../types';

export function renderFooter(container: HTMLElement, config: SiteConfig): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-900 text-white py-8 mt-12';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container mx-auto px-4';

  const gridDiv = document.createElement('div');
  gridDiv.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';

  // Contact Information
  const contactDiv = document.createElement('div');
  contactDiv.innerHTML = `
    <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
    <p>${config.restaurantName}</p>
    <p>${config.address}</p>
    <p>Phone: ${config.phone}</p>
    <p>Email: ${config.email}</p>
  `;
  gridDiv.appendChild(contactDiv);

  // Opening Hours
  const hoursDiv = document.createElement('div');
  hoursDiv.innerHTML = `
    <h3 class="text-lg font-semibold mb-4">Opening Hours</h3>
    <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
    <p>Saturday: 11:00 AM - 11:00 PM</p>
    <p>Sunday: 12:00 PM - 9:00 PM</p>
  `;
  gridDiv.appendChild(hoursDiv);

  // Quick Links
  const linksDiv = document.createElement('div');
  linksDiv.innerHTML = `
    <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
    <ul>
      <li><a href="#" class="hover:text-gray-300">Menu</a></li>
      <li><a href="#" class="hover:text-gray-300">Reservations</a></li>
      <li><a href="#" class="hover:text-gray-300">About Us</a></li>
      <li><a href="#" class="hover:text-gray-300">Contact</a></li>
    </ul>
  `;
  gridDiv.appendChild(linksDiv);

  // Social Media
  const socialDiv = document.createElement('div');
  socialDiv.innerHTML = `
    <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
    <div class="flex space-x-4">
      <a href="#" class="hover:text-gray-300">Facebook</a>
      <a href="#" class="hover:text-gray-300">Instagram</a>
      <a href="#" class="hover:text-gray-300">Twitter</a>
    </div>
  `;
  gridDiv.appendChild(socialDiv);

  containerDiv.appendChild(gridDiv);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'text-center mt-8';
  copyrightDiv.innerHTML = `<p>&copy; ${new Date().getFullYear()} ${config.restaurantName}. All rights reserved.</p>`;
  containerDiv.appendChild(copyrightDiv);

  footer.appendChild(containerDiv);
  container.appendChild(footer);
}