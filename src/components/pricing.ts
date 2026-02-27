// src/components/pricing.ts
import { ComponentProps } from '../types';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$9.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Standard',
    price: '$19.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    isPopular: true,
  },
  {
    name: 'Premium',
    price: '$29.99',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6', 'Feature 7'],
  },
];

export function renderPricing(container: HTMLElement, className?: string): void {
  const pricingContainer = document.createElement('div');
  pricingContainer.className = `pricing-container ${className || ''} grid grid-cols-1 md:grid-cols-3 gap-4`;

  pricingPlans.forEach((plan) => {
    const planCard = document.createElement('div');
    planCard.className = `plan-card bg-color-secondary rounded-md shadow-md p-4 ${plan.isPopular ? 'border-2 border-color-accent' : ''}`;

    const planName = document.createElement('h3');
    planName.textContent = plan.name;
    planName.className = 'text-xl font-bold mb-2';
    planCard.appendChild(planName);

    const planPrice = document.createElement('p');
    planPrice.textContent = plan.price + '/month';
    planPrice.className = 'text-lg mb-4';
    planCard.appendChild(planPrice);

    const featuresList = document.createElement('ul');
    featuresList.className = 'list-disc pl-5';
    plan.features.forEach((feature) => {
      const featureItem = document.createElement('li');
      featureItem.textContent = feature;
      featureItem.className = 'mb-1';
      featuresList.appendChild(featureItem);
    });
    planCard.appendChild(featuresList);

    const selectButton = document.createElement('button');
    selectButton.textContent = 'Select Plan';
    selectButton.className = 'button mt-4';
    planCard.appendChild(selectButton);

    pricingContainer.appendChild(planCard);
  });

  container.appendChild(pricingContainer);
}