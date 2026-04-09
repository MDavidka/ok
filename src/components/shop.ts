import { GameState, Upgrade } from '../types';
import { formatNumber } from '../utils';

/**
 * Calculates the current cost of an upgrade based on how many are already owned.
 * Uses the standard incremental game formula: BaseCost * (1.15 ^ Owned)
 */
export function calculateCost(baseCost: number, owned: number): number {
    return Math.ceil(baseCost * Math.pow(1.15, owned));
}

/**
 * Initializes the shop UI and returns an update function to be called in the game loop.
 * 
 * @param container The DOM element to mount the shop into
 * @param upgrades The list of available upgrades
 * @param onPurchase Callback fired when an upgrade is clicked
 * @returns A function to update the shop UI based on the current GameState
 */
export function initShop(
    container: HTMLElement,
    upgrades: Upgrade[],
    onPurchase: (upgradeId: string) => void
) {
    // Setup the main shop container
    container.innerHTML = `
        <div class="bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border border-white/40 h-full flex flex-col max-h-[calc(100vh-6rem)]">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-heading font-black text-text flex items-center gap-2">
                    <span class="text-3xl drop-shadow-sm">🏪</span> Upgrades
                </h2>
            </div>
            <div id="shop-items-container" class="flex-1 overflow-y-auto pr-2 space-y-3 pb-4">
                <!-- Upgrade items will be injected here -->
            </div>
        </div>
    `;

    const itemsContainer = container.querySelector('#shop-items-container');
    if (!itemsContainer) {
        throw new Error('Shop items container not found in the DOM.');
    }

    // Create and append DOM elements for each upgrade
    upgrades.forEach(upgrade => {
        const btn = document.createElement('button');
        btn.id = `upgrade-btn-${upgrade.id}`;
        btn.className = `
            w-full flex items-center justify-between p-3 md:p-4 bg-white rounded-xl shadow-sm 
            border-2 border-transparent transition-all duration-200 group
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
            hover:border-accent hover:shadow-md active:scale-[0.98]
        `;
        
        btn.innerHTML = `
            <div class="text-left flex-1 pr-4">
                <h3 class="font-heading font-bold text-lg text-text leading-tight group-disabled:text-gray-500">
                    ${upgrade.name}
                </h3>
                <p class="text-xs text-gray-500 mb-2 line-clamp-2">${upgrade.description}</p>
                <div class="text-sm font-bold text-cookie flex items-center gap-1 bg-orange-50 inline-flex px-2 py-1 rounded-md group-disabled:bg-gray-100 group-disabled:text-gray-500">
                    <span>🍪</span>
                    <span id="cost-${upgrade.id}">${formatNumber(upgrade.baseCost)}</span>
                </div>
            </div>
            <div class="text-right flex flex-col items-end justify-center min-w-[4rem]">
                <div class="text-4xl font-heading font-black text-gray-200 leading-none tracking-tighter" id="owned-${upgrade.id}">
                    0
                </div>
                <div class="text-xs font-bold text-accent mt-1 bg-yellow-50 px-2 py-0.5 rounded-full group-disabled:bg-gray-100 group-disabled:text-gray-400">
                    +${formatNumber(upgrade.cps)} CPS
                </div>
            </div>
        `;

        // Attach purchase event listener
        btn.addEventListener('click', () => {
            // We don't deduct cookies here; we just signal the intent to purchase.
            // The game manager will validate and apply the purchase.
            onPurchase(upgrade.id);
        });

        itemsContainer.appendChild(btn);
    });

    /**
     * Updates the shop UI (costs, owned amounts, and button disabled states).
     * This should be called periodically by the game loop.
     */
    return function updateShop(state: GameState) {
        upgrades.forEach(upgrade => {
            const btn = container.querySelector(`#upgrade-btn-${upgrade.id}`) as HTMLButtonElement | null;
            const costEl = container.querySelector(`#cost-${upgrade.id}`);
            const ownedEl = container.querySelector(`#owned-${upgrade.id}`);

            if (!btn || !costEl || !ownedEl) return;

            const ownedCount = state.upgrades[upgrade.id] || 0;
            const currentCost = calculateCost(upgrade.baseCost, ownedCount);

            // Update displayed values
            if (ownedEl.textContent !== ownedCount.toString()) {
                ownedEl.textContent = ownedCount.toString();
                // Add a subtle pop animation when a new item is bought
                ownedEl.classList.add('scale-125', 'text-accent');
                setTimeout(() => ownedEl.classList.remove('scale-125', 'text-accent'), 200);
            }
            
            costEl.textContent = formatNumber(currentCost);

            // Enable or disable the button based on affordability
            if (state.cookies >= currentCost) {
                if (btn.disabled) {
                    btn.disabled = false;
                    // Optional: Add a subtle animation when an item becomes affordable
                    btn.classList.add('animate-pulse-once');
                    setTimeout(() => btn.classList.remove('animate-pulse-once'), 500);
                }
            } else {
                btn.disabled = true;
            }
        });
    };
}