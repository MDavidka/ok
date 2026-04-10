import { GameState } from '../types';
import { formatNumber } from '../utils';

export function renderStatsDisplay(container: HTMLElement, gameState: GameState): void {
  // Create the stats display container
  const statsContainer = document.createElement('div');
  statsContainer.className = 'stats-display flex flex-col gap-2 mt-4';

  // Create cookie count display
  const cookieCountDisplay = document.createElement('div');
  cookieCountDisplay.className = 'cookie-count text-xl font-bold';
  cookieCountDisplay.textContent = `Cookies: ${formatNumber(gameState.cookieCount)}`;

  // Create click value display
  const clickValueDisplay = document.createElement('div');
  clickValueDisplay.className = 'text-sm text-gray-300';
  clickValueDisplay.textContent = `+${gameState.clickValue} per click`;

  // Create auto-click display
  const autoClickDisplay = document.createElement('div');
  autoClickDisplay.className = 'text-sm text-gray-300';
  autoClickDisplay.textContent = `+${gameState.autoClickValue} per second`;

  // Create total production display
  const totalProductionDisplay = document.createElement('div');
  totalProductionDisplay.className = 'text-sm text-gray-300';
  totalProductionDisplay.textContent = `Total production: ${formatNumber(gameState.clickValue + gameState.autoClickValue)} per click`;

  // Create upgrades count display
  const upgradesCountDisplay = document.createElement('div');
  upgradesCountDisplay.className = 'text-sm text-gray-300';
  const unlockedUpgrades = gameState.upgrades.filter(upgrade => upgrade.isUnlocked).length;
  upgradesCountDisplay.textContent = `Upgrades unlocked: ${unlockedUpgrades}/${gameState.upgrades.length}`;

  // Append all elements
  statsContainer.appendChild(cookieCountDisplay);
  statsContainer.appendChild(clickValueDisplay);
  statsContainer.appendChild(autoClickDisplay);
  statsContainer.appendChild(totalProductionDisplay);
  statsContainer.appendChild(upgradesCountDisplay);

  // Clear container and append new content
  container.innerHTML = '';
  container.appendChild(statsContainer);
}

export function updateStatsDisplay(container: HTMLElement, gameState: GameState): void {
  // Update cookie count display
  const cookieCountDisplay = container.querySelector('.cookie-count');
  if (cookieCountDisplay) {
    cookieCountDisplay.textContent = `Cookies: ${formatNumber(gameState.cookieCount)}`;
  }

  // Update click value display
  const clickValueDisplay = container.querySelector('.text-sm.text-gray-300:nth-child(2)');
  if (clickValueDisplay) {
    clickValueDisplay.textContent = `+${gameState.clickValue} per click`;
  }

  // Update auto-click display
  const autoClickDisplay = container.querySelector('.text-sm.text-gray-300:nth-child(3)');
  if (autoClickDisplay) {
    autoClickDisplay.textContent = `+${gameState.autoClickValue} per second`;
  }

  // Update total production display
  const totalProductionDisplay = container.querySelector('.text-sm.text-gray-300:nth-child(4)');
  if (totalProductionDisplay) {
    totalProductionDisplay.textContent = `Total production: ${formatNumber(gameState.clickValue + gameState.autoClickValue)} per click`;
  }

  // Update upgrades count display
  const upgradesCountDisplay = container.querySelector('.text-sm.text-gray-300:nth-child(5)');
  if (upgradesCountDisplay) {
    const unlockedUpgrades = gameState.upgrades.filter(upgrade => upgrade.isUnlocked).length;
    upgradesCountDisplay.textContent = `Upgrades unlocked: ${unlockedUpgrades}/${gameState.upgrades.length}`;
  }
}