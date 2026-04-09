import { GameState } from '../types';
import { createElement, formatNumber, randomInt } from '../utils';

/**
 * Spawns a floating "+X" text element at the specified coordinates.
 * The element automatically removes itself after the animation completes.
 * 
 * @param x The viewport X coordinate
 * @param y The viewport Y coordinate
 * @param amount The number to display (e.g., click power)
 */
function spawnFloatingText(x: number, y: number, amount: number): void {
  const floatEl = createElement('div', {
    classes: [
      'fixed', 
      'text-2xl', 
      'md:text-3xl',
      'font-bold', 
      'text-[var(--color-accent)]', 
      'pointer-events-none', 
      'z-50', 
      'animate-float-up',
      'drop-shadow-md',
      'select-none'
    ],
    text: `+${formatNumber(amount)}`
  });

  // Add slight randomness to the spawn position so rapid clicks don't perfectly overlap
  const offsetX = randomInt(-30, 30);
  const offsetY = randomInt(-30, 30);
  
  floatEl.style.left = `${x + offsetX}px`;
  floatEl.style.top = `${y + offsetY}px`;
  
  document.body.appendChild(floatEl);

  // Remove the element from the DOM after the animation completes (1s as defined in style.css)
  setTimeout(() => {
    if (document.body.contains(floatEl)) {
      document.body.removeChild(floatEl);
    }
  }, 1000);
}

/**
 * Renders the main cookie clicking area including the score, CPS, and the giant cookie.
 * 
 * @param container The DOM element to append the cookie area to.
 * @param onCookieClick Callback function triggered when the cookie is clicked.
 * @returns An object containing an `updateDisplay` method to refresh the UI with new state.
 */
export function renderCookieArea(
  container: HTMLElement,
  onCookieClick: () => void
) {
  // Keep a local reference to the latest state to know the click power for floating text
  let currentState: GameState | null = null;

  // Main wrapper for the cookie section
  const wrapper = createElement('section', {
    classes: [
      'flex', 
      'flex-col', 
      'items-center', 
      'justify-center', 
      'p-6', 
      'w-full', 
      'min-h-[60vh]',
      'lg:min-h-[80vh]',
      'relative'
    ],
    id: 'game'
  });

  // Score Display
  const scoreDisplay = createElement('h1', {
    classes: [
      'text-5xl', 
      'md:text-7xl', 
      'font-bold', 
      'text-[var(--color-primary)]', 
      'mb-2', 
      'drop-shadow-sm',
      'text-center',
      'transition-all',
      'duration-200'
    ],
    text: '0 cookies'
  });

  // Cookies Per Second (CPS) Display
  const cpsDisplay = createElement('div', {
    classes: [
      'text-lg', 
      'md:text-xl', 
      'text-[var(--color-text-muted)]', 
      'mb-12', 
      'font-medium',
      'bg-[var(--color-surface)]',
      'px-4',
      'py-1',
      'rounded-full',
      'shadow-sm',
      'border',
      'border-[var(--color-border)]'
    ],
    text: 'per second: 0'
  });

  // The Giant Clickable Cookie (Using a placeholder PNG as required)
  const cookieImg = createElement('img', {
    classes: [
      'w-64', 
      'h-64', 
      'md:w-80', 
      'md:h-80',
      'rounded-full', 
      'object-cover',
      'shadow-[0_15px_40px_rgba(139,69,19,0.4)]',
      'hover:scale-105', 
      'transition-transform',
      'animate-cookie-pulse', 
      'cursor-pointer',
      'select-none',
      'active:scale-95' // Fallback for immediate visual feedback
    ],
    attributes: {
      src: 'https://placehold.co/400x400/8b4513/fcd34d.png?text=COOKIE',
      alt: 'Giant Clickable Cookie',
      draggable: 'false'
    }
  });

  // Handle Cookie Clicks
  cookieImg.addEventListener('mousedown', (e: MouseEvent) => {
    // Prevent default behavior (like dragging the image)
    e.preventDefault();

    // Trigger the game logic callback
    onCookieClick();

    // Reset and re-trigger the click animation
    cookieImg.classList.remove('animate-cookie-pulse');
    cookieImg.classList.remove('animate-cookie-click');
    
    // Force a browser reflow to restart the animation
    void cookieImg.offsetWidth; 
    
    cookieImg.classList.add('animate-cookie-click');

    // Restore the idle pulse animation after the click animation finishes
    setTimeout(() => {
      cookieImg.classList.remove('animate-cookie-click');
      cookieImg.classList.add('animate-cookie-pulse');
    }, 80); // 80ms matches the animation duration in style.css

    // Spawn the floating "+1" text
    if (currentState) {
      spawnFloatingText(e.clientX, e.clientY, currentState.clickPower);
    }
  });

  // Prevent context menu on right click to avoid interrupting rapid clicking
  cookieImg.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault();
  });

  // Assemble the DOM
  wrapper.appendChild(scoreDisplay);
  wrapper.appendChild(cpsDisplay);
  wrapper.appendChild(cookieImg);
  container.appendChild(wrapper);

  // Return an interface to allow the GameManager to update the UI
  return {
    /**
     * Updates the score and CPS displays with the latest game state.
     * @param state The current GameState
     */
    updateDisplay: (state: GameState) => {
      currentState = state;
      
      // Format numbers for readability (e.g., 1.2M instead of 1200000)
      const formattedCookies = formatNumber(Math.floor(state.cookies));
      const formattedCps = formatNumber(state.cps);
      
      // Update text content only if it changed to minimize DOM updates
      const newScoreText = `${formattedCookies} cookies`;
      if (scoreDisplay.textContent !== newScoreText) {
        scoreDisplay.textContent = newScoreText;
      }

      const newCpsText = `per second: ${formattedCps}`;
      if (cpsDisplay.textContent !== newCpsText) {
        cpsDisplay.textContent = newCpsText;
      }
    }
  };
}