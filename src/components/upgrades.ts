import { GameState, Upgrade } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the upgrades store component.
 * Handles the display of available upgrades and purchase logic.
 */
export function renderUpgrades(
  container: HTMLElement,
  gameState: GameState,
  onPurchase: (upgradeId: string) => void
): void {
  const upgradesList = Object.values(gameState.upgrades);

  container.innerHTML = `
    <div class="card h-full flex flex-col">
      <h2 class="text-xl font-bold mb-4 text-[var(--color-accent)]">Upgrades</h2>
      <div class="space-y-3 overflow-y-auto flex-1 pr-2" id="upgrades-list">
        ${upgradesList
          .map((upgrade) => {
            const cost = calculateCost(upgrade);
            const canAfford = gameState.cookies >= cost;
            return `
              <div class="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded-lg border border-gray-700">
                <div>
                  <h3 class="font-bold text-sm">${upgrade.name}</h3>
                  <p class="text-xs text-[var(--color-text-muted)]">
                    Owned: ${upgrade.owned} | +${formatNumber(upgrade.baseCps)} CPS
                  </p>
                  <p class="text-xs font-mono text-[var(--color-primary)]">Cost: ${formatNumber(cost)}</p>
                </div>
                <button 
                  class="btn-primary text-sm py-1 px-3" 
                  data-id="${upgrade.id}" 
                  ${!canAfford ? 'disabled' : ''}
                >
                  Buy
                </button>
              </div>
            `;
          })
          .join('')}
      </div>
    </div>
  `;

  // Attach event listeners for purchase buttons
  container.querySelectorAll('button[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (id) onPurchase(id);
    });
  });
}

/**
 * Calculates the current cost of an upgrade based on quantity owned.
 * Formula: baseCost * (1.15 ^ owned)
 */
export function calculateCost(upgrade: Upgrade): number {
  return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
}

/**
 * Updates the store UI state (disabled/enabled buttons) without full re-render
 */
export function updateUpgradeStore(gameState: GameState): void {
  const list = document.getElementById('upgrades-list');
  if (!list) return;

  Object.values(gameState.upgrades).forEach((upgrade) => {
    const cost = calculateCost(upgrade);
    const btn = list.querySelector(`button[data-id="${upgrade.id}"]`) as HTMLButtonElement;
    if (btn) {
      btn.disabled = gameState.cookies < cost;
    }
  });
}