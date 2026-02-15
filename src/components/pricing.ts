import { PricingPlan } from '../types';

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: 19,
    features: [
      '1 User',
      '5 Projects',
      'Basic Support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: 49,
    features: [
      '5 Users',
      'Unlimited Projects',
      'Priority Support',
    ],
    cta: 'Upgrade Now',
  },
  {
    name: 'Enterprise',
    price: 99,
    features: [
      'Unlimited Users',
      'Unlimited Projects',
      '24/7 Support',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Us',
  },
];

export function renderPricing(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'pricing';
  section.className = 'bg-gray-100 dark:bg-gray-900 py-12';

  section.innerHTML = `
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mb-8">Pricing Plans</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${pricingPlans.map(plan => `
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">${plan.name}</h3>
            <div class="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">$${plan.price}</div>
            <ul class="text-gray-600 dark:text-gray-400 mb-6">
              ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <a href="#" class="inline-block bg-indigo-600 dark:bg-indigo-700 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600">${plan.cta}</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.appendChild(section);
}