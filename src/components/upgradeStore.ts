import { GameState, Upgrade, GameComponent } from '../types';
import { formatNumber, calculateUpgradeCost } from '../utils';

/**
 * Creates the upgrade store component.
 * Renders a list of available upgrades, handles dynamic pricing, and triggers purchase events.
 * 
 * @param availableUpgrades The master list of all upgrades in the game
 * @param onPurchase Callback triggered when an upgrade is successfully purchased
 * @returns A GameComponent instance
 */
export function createUpgradeStore(
    availableUpgrades: Upgrade[],
    onPurchase: (upgradeId: string, cost: number) => void
): GameComponent {
    // Keep a local reference to the latest state to validate purchases
    let currentState: GameState | null = null;

    // Store references to specific DOM nodes for efficient updates
    interface UpgradeNodes {
        container: HTMLElement;
        costText: HTMLElement;
        ownedText: HTMLElement;
    }
    const upgradeNodes = new Map<string, UpgradeNodes>();

    return {
        render(container: HTMLElement): void {
            // Main store wrapper
            const storeWrapper = document.createElement('div');
            storeWrapper.className = 'panel flex flex-col h-full w-full max-w-md mx-auto md:max-w-none overflow-hidden bg-[var(--color-surface)]';

            // Store Header
            const header = document.createElement('div');
            header.className = 'p-4 border-b border-[var(--color-surface-hover)] bg-[var(--color-bg)] flex justify-between items-center z-10 shadow-sm';
            
            const title = document.createElement('h2');
            title.className = 'font-heading font-bold text-lg md:text-xl text-[var(--color-text)]';
            title.textContent = 'Store';
            
            const subtitle = document.createElement('span');
            subtitle.className = 'text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider';
            subtitle.textContent = 'Upgrades';

            header.appendChild(title);
            header.appendChild(subtitle);
            storeWrapper.appendChild(header);

            // Scrollable list container
            const listContainer = document.createElement('div');
            listContainer.className = 'flex-1 overflow-y-auto p-2 md:p-3 space-y-2 custom-scrollbar';

            // Create an item for each available upgrade
            availableUpgrades.forEach(upgrade => {
                const item = document.createElement('div');
                // Base classes - we will toggle affordable/unaffordable classes in the update method
                item.className = 'flex items-center p-3 rounded-xl border border-[var(--color-surface-hover)] transition-all select-none bg-[var(--color-surface)] relative overflow-hidden group';
                
                // Click handler for purchasing
                item.addEventListener('click', () => {
                    if (!currentState) return;
                    
                    const owned = currentState.upgrades[upgrade.id] || 0;
                    const currentCost = calculateUpgradeCost(upgrade.baseCost, owned);
                    
                    // Validate affordability before triggering purchase
                    if (currentState.cookies >= currentCost) {
                        onPurchase(upgrade.id, currentCost);
                        
                        // Optional: Add a quick click feedback animation
                        item.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            item.style.transform = '';
                        }, 100);
                    }
                });

                // Icon
                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'text-3xl md:text-4xl mr-4 drop-shadow-sm group-hover:scale-110 transition-transform';
                iconWrapper.textContent = upgrade.icon;

                // Details (Name, Desc, CPS)
                const detailsWrapper = document.createElement('div');
                detailsWrapper.className = 'flex-1 min-w-0'; // min-w-0 helps with text truncation if needed

                const name = document.createElement('div');
                name.className = 'font-heading font-bold text-[var(--color-text)] text-base md:text-lg leading-tight';
                name.textContent = upgrade.name;

                const cpsInfo = document.createElement('div');
                cpsInfo.className = 'text-xs text-[var(--color-secondary)] font-bold mt-0.5';
                cpsInfo.textContent = `+${formatNumber(upgrade.baseCps)} CPS`;

                detailsWrapper.appendChild(name);
                detailsWrapper.appendChild(cpsInfo);

                // Cost and Owned Stats
                const statsWrapper = document.createElement('div');
                statsWrapper.className = 'flex flex-col items-end ml-2';

                const costWrapper = document.createElement('div');
                costWrapper.className = 'flex items-center gap-1 text-[var(--color-primary)] font-bold text-sm md:text-base';
                
                const cookieIcon = document.createElement('span');
                cookieIcon.textContent = '🍪';
                cookieIcon.className = 'text-xs';
                
                const costText = document.createElement('span');
                costText.textContent = formatNumber(upgrade.baseCost);

                costWrapper.appendChild(cookieIcon);
                costWrapper.appendChild(costText);

                const ownedWrapper = document.createElement('div');
                ownedWrapper.className = 'text-xs font-bold text-[var(--color-text-muted)] mt-1 bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-surface-hover)]';
                
                const ownedText = document.createElement('span');
                ownedText.textContent = '0';
                
                ownedWrapper.appendChild(document.createTextNode('Owned: '));
                ownedWrapper.appendChild(ownedText);

                statsWrapper.appendChild(costWrapper);
                statsWrapper.appendChild(ownedWrapper);

                // Assemble the item
                item.appendChild(iconWrapper);
                item.appendChild(detailsWrapper);
                item.appendChild(statsWrapper);

                listContainer.appendChild(item);

                // Store references for fast updates
                upgradeNodes.set(upgrade.id, {
                    container: item,
                    costText: costText,
                    ownedText: ownedText
                });
            });

            storeWrapper.appendChild(listContainer);
            container.appendChild(storeWrapper);
        },
        
        update(state: GameState): void {
            currentState = state;

            // Update each upgrade's DOM nodes based on the current state
            availableUpgrades.forEach(upgrade => {
                const nodes = upgradeNodes.get(upgrade.id);
                if (!nodes) return;

                const owned = state.upgrades[upgrade.id] || 0;
                const currentCost = calculateUpgradeCost(upgrade.baseCost, owned);
                const isAffordable = state.cookies >= currentCost;

                // Update text values
                nodes.costText.textContent = formatNumber(currentCost);
                
                // Only update owned text if it changed to avoid unnecessary DOM writes
                if (nodes.ownedText.textContent !== owned.toString()) {
                    nodes.ownedText.textContent = owned.toString();
                }

                // Update visual state based on affordability
                if (isAffordable) {
                    // If it wasn't already affordable, update classes
                    if (nodes.container.classList.contains('upgrade-unaffordable')) {
                        nodes.container.classList.remove('upgrade-unaffordable');
                        nodes.container.classList.add('upgrade-affordable', 'hover:bg-[var(--color-surface-hover)]', 'hover:shadow-md');
                        nodes.costText.classList.remove('text-red-400');
                        nodes.costText.classList.add('text-[var(--color-primary)]');
                    }
                } else {
                    // If it was affordable, update classes
                    if (!nodes.container.classList.contains('upgrade-unaffordable')) {
                        nodes.container.classList.add('upgrade-unaffordable');
                        nodes.container.classList.remove('upgrade-affordable', 'hover:bg-[var(--color-surface-hover)]', 'hover:shadow-md');
                        nodes.costText.classList.remove('text-[var(--color-primary)]');
                        nodes.costText.classList.add('text-red-400');
                    }
                }
            });
        }
    };
}