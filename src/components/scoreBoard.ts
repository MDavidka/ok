import { GameState, GameComponent } from '../types';
import { formatNumber } from '../utils';

/**
 * Creates the scoreboard component that displays the player's current cookies and CPS.
 * 
 * @returns A GameComponent instance
 */
export function createScoreBoard(): GameComponent {
    // Keep references to the specific DOM nodes we need to update frequently
    // This prevents us from having to re-render the entire component on every game tick
    let cookiesCountNode: HTMLElement | null = null;
    let cpsCountNode: HTMLElement | null = null;

    return {
        render(container: HTMLElement): void {
            // Create the main panel container
            const board = document.createElement('div');
            board.className = 'panel p-6 md:p-8 text-center w-full max-w-md mx-auto flex flex-col items-center justify-center relative overflow-hidden';

            // Optional: Add a subtle background decoration
            const bgDeco = document.createElement('div');
            bgDeco.className = 'absolute -right-10 -top-10 text-9xl opacity-5 select-none pointer-events-none';
            bgDeco.textContent = '🍪';
            board.appendChild(bgDeco);

            // --- Cookies Display ---
            const cookiesWrapper = document.createElement('div');
            cookiesWrapper.className = 'relative z-10 flex flex-col items-center';

            cookiesCountNode = document.createElement('div');
            cookiesCountNode.className = 'text-5xl md:text-6xl font-heading font-extrabold text-[var(--color-text)] tracking-tight drop-shadow-sm transition-all duration-75';
            cookiesCountNode.textContent = '0';

            const cookiesLabel = document.createElement('div');
            cookiesLabel.className = 'text-sm md:text-base font-bold text-[var(--color-primary)] uppercase tracking-widest mt-1';
            cookiesLabel.textContent = 'Cookies';

            cookiesWrapper.appendChild(cookiesCountNode);
            cookiesWrapper.appendChild(cookiesLabel);

            // --- CPS Display ---
            const cpsWrapper = document.createElement('div');
            cpsWrapper.className = 'relative z-10 mt-4 inline-flex items-center gap-2 bg-[var(--color-bg)] px-4 py-2 rounded-full border border-[var(--color-surface-hover)]';

            const cpsLabel = document.createElement('span');
            cpsLabel.className = 'text-xs md:text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider';
            cpsLabel.textContent = 'per second:';

            cpsCountNode = document.createElement('span');
            cpsCountNode.className = 'text-sm md:text-base font-bold text-[var(--color-secondary)]';
            cpsCountNode.textContent = '0';

            cpsWrapper.appendChild(cpsLabel);
            cpsWrapper.appendChild(cpsCountNode);

            // Assemble the board
            board.appendChild(cookiesWrapper);
            board.appendChild(cpsWrapper);

            container.appendChild(board);
        },
        
        update(state: GameState, currentCps: number): void {
            // Update the DOM nodes efficiently on every game tick
            if (cookiesCountNode) {
                // We floor the cookies so the user doesn't see decimals for their main currency
                cookiesCountNode.textContent = formatNumber(Math.floor(state.cookies));
            }
            
            if (cpsCountNode) {
                // Format CPS, showing up to 1 decimal place if needed (handled by formatNumber)
                cpsCountNode.textContent = formatNumber(currentCps);
            }
        }
    };
}