import { Upgrade, GameState } from '../types';
import { formatNumber, createElement } from '../utils';
import { UPGRADES } from './game-manager';

/**
 * Calculates the current cost of an upgrade based on how many the player owns.
 * Uses exponential growth formula: baseCost * (costMultiplier ^ owned)
 * @param baseCost Initial cost of the upgrade
 * @param owned Number currently owned by the player
 * @returns Current cost to purchase another unit
 */
export function calculateCost(baseCost: number, owned: number): number {
  return Math.floor(baseCost * Math.pow(1.15, owned));
}

/**
 * Initializes and renders the shop component with all available upgrades.
 * Handles purchase logic and dynamic updates to costs/quantities.
 * @param container The HTMLElement to render the shop into
 * @param gameState Reference to the current game state
 * @param onPurchase Callback function to handle purchase effects
 */
export function initShop(
  container: HTMLElement,
  gameState: GameState,
  onPurchase: (upgrade: Upgrade) => void
): void {
  // Clear existing content
  container.innerHTML = '';
  
  // Create shop header
  const header = createElement('h2', {
    classes: ['text-2xl', 'font-bold', 'mb-4', 'text-amber-900'],
    text: '🏪 Shop'
  });
  container.appendChild(header);
  
  // Create shop grid
  const grid = createElement('div', {
    classes: ['grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-4']
  });
  container.appendChild(grid);
  
  // Render each upgrade
  UPGRADES.forEach(upgrade => {
    const owned = gameState.inventory[upgrade.id] || 0;
    const cost = calculateCost(upgrade.baseCost, owned);
    
    const card = createElement('div', {
      classes: [
        'bg-white', 
        'rounded-lg', 
        'shadow-md', 
        'p-4', 
        'border', 
        'border-amber-200',
        'hover:shadow-lg',
        'transition-shadow'
      ]
    });
    
    // Icon and name row
    const headerRow = createElement('div', {
      classes: ['flex', 'items-center', 'mb-2']
    });
    
    const icon = createElement('span', {
      classes: ['text-2xl', 'mr-2'],
      text: upgrade.icon
    });
    
    const name = createElement('h3', {
      classes: ['font-bold', 'text-lg'],
      text: upgrade.name
    });
    
    headerRow.appendChild(icon);
    headerRow.appendChild(name);
    card.appendChild(headerRow);
    
    // Description
    const description = createElement('p', {
      classes: ['text-sm', 'text-gray-600', 'mb-3'],
      text: upgrade.description
    });
    card.appendChild(description);
    
    // Stats row
    const statsRow = createElement('div', {
      classes: ['flex', 'justify-between', 'items-center', 'mb-3']
    });
    
    const cpsDisplay = createElement('span', {
      classes: ['text-xs', 'font-medium', 'text-green-700'],
      text: `+${formatNumber(upgrade.cpsIncrease)} CPS`
    });
    
    const ownedDisplay = createElement('span', {
      classes: ['text-xs', 'font-medium', 'text-amber-700'],
      text: `Owned: ${owned}`
    });
    
    statsRow.appendChild(cpsDisplay);
    statsRow.appendChild(ownedDisplay);
    card.appendChild(statsRow);
    
    // Purchase button
    const button = createElement('button', {
      classes: [
        'w-full', 
        'py-2', 
        'px-4', 
        'rounded-md', 
        'font-semibold',
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-amber-500'
      ],
      text: `${formatNumber(cost)} 🍪`
    });
    
    // Update button state based on affordability
    if (gameState.cookies >= cost) {
      button.classList.add('bg-amber-500', 'hover:bg-amber-600', 'text-white');
    } else {
      button.classList.add('bg-gray-200', 'text-gray-500', 'cursor-not-allowed');
    }
    
    button.addEventListener('click', () => {
      if (gameState.cookies >= cost) {
        onPurchase(upgrade);
        // Re-render to update costs and quantities
        initShop(container, gameState, onPurchase);
      }
    });
    
    card.appendChild(button);
    grid.appendChild(card);
  });
}