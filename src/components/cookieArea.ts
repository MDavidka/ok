import { GameState, GameComponent } from '../types';
import { formatNumber } from '../utils';

/**
 * Creates the main interactive cookie area component.
 * Handles clicking the cookie, spawning floating text animations, and notifying the game loop.
 * 
 * @param onCookieClick Callback triggered when the cookie is clicked or tapped
 * @returns A GameComponent instance
 */
export function createCookieArea(onCookieClick: () => void): GameComponent {
    let currentState: GameState | null = null;
    let containerRef: HTMLElement | null = null;

    /**
     * Spawns a floating text element at the specified coordinates.
     * 
     * @param x The x-coordinate relative to the container
     * @param y The y-coordinate relative to the container
     * @param amount The number to display in the floating text
     */
    function spawnFloatingText(x: number, y: number, amount: number): void {
        if (!containerRef) return;

        const text = document.createElement('div');
        text.textContent = `+${formatNumber(amount)}`;
        text.className = 'floating-text';
        
        // Add a slight random offset so rapid clicks don't perfectly overlap
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;

        text.style.left = `${x + offsetX}px`;
        text.style.top = `${y + offsetY}px`;

        containerRef.appendChild(text);

        // Clean up the DOM element after the CSS animation completes
        text.addEventListener('animationend', () => {
            text.remove();
        });
    }

    return {
        render(container: HTMLElement): void {
            containerRef = container;
            // Setup the container with relative positioning to contain absolute floating text
            container.className = 'relative flex flex-col items-center justify-center w-full h-full min-h-[50vh] p-8 select-none overflow-hidden';

            // Add a subtle glowing background effect behind the cookie
            const glow = document.createElement('div');
            glow.className = 'absolute w-64 h-64 md:w-96 md:h-96 bg-[var(--color-primary)] rounded-full blur-3xl opacity-20 pointer-events-none';
            container.appendChild(glow);

            // Create the main clickable cookie image
            const cookieImg = document.createElement('img');
            // Using a placeholder PNG as required by the design system rules
            cookieImg.src = 'https://placehold.co/400x400/d4813b/ffffff.png?text=COOKIE';
            cookieImg.alt = 'Giant Cookie';
            cookieImg.className = 'cookie-btn rounded-full w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover z-10';
            cookieImg.draggable = false;

            // Unified interaction handler for both mouse and touch
            const handleInteraction = (e: MouseEvent | TouchEvent) => {
                // Prevent default to stop double-firing on touch devices (touchstart + mousedown)
                // and to prevent unwanted text selection/zooming
                if (e.cancelable) {
                    e.preventDefault();
                }
                
                onCookieClick();

                // Calculate click position relative to the container for the floating text
                const rect = container.getBoundingClientRect();
                let clientX = 0;
                let clientY = 0;

                if ('touches' in e && e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else if ('clientX' in e) {
                    clientX = (e as MouseEvent).clientX;
                    clientY = (e as MouseEvent).clientY;
                }

                const x = clientX - rect.left;
                const y = clientY - rect.top;

                // Determine the current click power from the game state, default to 1
                const clickPower = currentState ? currentState.clickPower : 1;
                spawnFloatingText(x, y, clickPower);
            };

            // Bind events for immediate response
            cookieImg.addEventListener('mousedown', handleInteraction);
            cookieImg.addEventListener('touchstart', handleInteraction, { passive: false });

            // Prevent standard click event from doing anything since we handle mousedown/touchstart
            cookieImg.addEventListener('click', (e) => e.preventDefault());

            container.appendChild(cookieImg);
        },
        
        update(state: GameState): void {
            // Keep a local reference to the latest state so we know the current click power
            currentState = state;
        }
    };
}