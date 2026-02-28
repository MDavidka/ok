import { ComponentProps, PricingTier } from '../types';

interface PricingTableProps extends ComponentProps {
    tiers: PricingTier[];
}

export function renderPricingTable(props: PricingTableProps, container: HTMLElement): void {
    const table = document.createElement('div');
    table.className = `grid grid-cols-1 md:grid-cols-3 gap-6 ${props.className || ''}`;

    props.tiers.forEach(tier => {
        const tierElement = document.createElement('div');
        tierElement.className = 'card p-6 flex flex-col justify-between';

        const nameElement = document.createElement('h3');
        nameElement.className = 'text-2xl font-bold mb-4 text-center';
        nameElement.textContent = tier.name;
        tierElement.appendChild(nameElement);

        const priceElement = document.createElement('div');
        priceElement.className = 'text-4xl font-bold mb-4 text-center';
        priceElement.textContent = `$${tier.price}`;
        tierElement.appendChild(priceElement);

        const featuresList = document.createElement('ul');
        featuresList.className = 'mb-4';
        tier.features.forEach(feature => {
            const featureItem = document.createElement('li');
            featureItem.className = 'mb-2';
            featureItem.textContent = feature;
            featuresList.appendChild(featureItem);
        });
        tierElement.appendChild(featuresList);

        const ctaButton = document.createElement('a');
        ctaButton.href = tier.ctaLink;
        ctaButton.textContent = tier.ctaText;
        ctaButton.className = 'btn block text-center';
        tierElement.appendChild(ctaButton);

        table.appendChild(tierElement);
    });

    container.appendChild(table);
}