import { GameState, Upgrade } from '../types';
import { formatNumber } from '../utils';

export function renderUpgradeList(container: HTMLElement, gameState: GameState, onUpgradeClick: (upgradeId: string) => void): void {
  // Create the upgrade list container
  const upgradeList = document.createElement('div');
  upgradeList.className = 'upgrade-list flex flex-col gap-2 mt-4';

  // Create each upgrade item
  gameState.upgrades.forEach((upgrade) => {
    const upgradeItem = document.createElement('div');
    upgradeItem.className = 'upgrade p-3 rounded-md bg-upgrade hover:bg-accent transition-transform hover:scale-102';

    // Create upgrade content
    const upgradeContent = document.createElement('div');
    upgradeContent.className = 'flex justify-between items-center';

    // Upgrade name and description
    const upgradeInfo = document.createElement('div');
    upgradeInfo.className = 'flex-1';

    const upgradeName = document.createElement('div');
    upgradeName.className = 'font-bold text-lg';
    upgradeName.textContent = upgrade.name;

    const upgradeDescription = document.createElement('div');
    upgradeDescription.className = 'text-sm text-gray-300';
    upgradeDescription.textContent = upgrade.description;

    upgradeInfo.appendChild(upgradeName);
    upgradeInfo.appendChild(upgradeDescription);

    // Upgrade cost
    const upgradeCost = document.createElement('div');
    upgradeCost.className = 'upgrade-cost font-bold text-primary';
    upgradeCost.textContent = `${formatNumber(upgrade.cost)} cookies`;

    // Upgrade button
    const upgradeButton = document.createElement('button');
    upgradeButton.className = 'ml-2 px-3 py-1 bg-button hover:bg-button-hover rounded-md text-sm';
    upgradeButton.textContent = 'Buy';
    upgradeButton.disabled = !upgrade.isUnlocked;
    
    // Add click handler to the upgrade button
    upgradeButton.addEventListener('click', () => {
      onUpgradeClick(upgrade.id);
    });

    // Append all elements
    upgradeContent.appendChild(upgradeInfo);
    upgradeContent.appendChild(upgradeCost);
    upgradeContent.appendChild(upgradeButton);
    
    upgradeItem.appendChild(upgradeContent);
    upgradeList.appendChild(upgradeItem);
  });

  // Clear container and append new content
  container.innerHTML = '';
  container.appendChild(upgradeList);
}

export function updateUpgradeList(container: HTMLElement, gameState: GameState): void {
  // Update each upgrade item
  const upgradeItems = container.querySelectorAll('.upgrade');
  upgradeItems.forEach((upgradeItem, index) => {
    const upgrade = gameState.upgrades[index];
    
    // Update cost display
    const costDisplay = upgradeItem.querySelector('.upgrade-cost');
    if (costDisplay) {
      costDisplay.textContent = `${formatNumber(upgrade.cost)} cookies`;
    }
    
    // Update button state
    const button = upgradeItem.querySelector('button');
    if (button) {
      button.disabled = !upgrade.isUnlocked;
    }
  });
}