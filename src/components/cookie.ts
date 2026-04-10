import { GameState } from '../types';
import { createFloatingText } from '../utils';

/**
 * Renders the central interactive cookie component.
 * Handles click events, visual feedback, and state updates.
 */
export function renderCookie(
  container: HTMLElement,
  gameState: GameState,
  onCookieClick: (amount: number) => void
): void {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center p-8">
      <div class="relative group cursor-pointer transition-transform duration-100 active:scale-95" id="cookie-wrapper">
        <img 
          src="https://placehold.co/300x300.png" 
          alt="Big Cookie" 
          class="w-64 h-64 rounded-full shadow-2xl border-4 border-[var(--color-primary)] hover:scale-105 transition-transform duration-300"
          id="big-cookie"
        />
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span class="bg-black/50 px-4 py-2 rounded-full text-white font-bold">CLICK ME!</span>
        </div>
      </div>
      <p class="mt-8 text-[var(--color-text-muted)] text-lg font-medium">
        <span id="cookie-count">${Math.floor(gameState.cookies)}</span> cookies
      </p>
    </div>
  `;

  const cookieEl = container.querySelector('#big-cookie') as HTMLImageElement;
  const cookieWrapper = container.querySelector('#cookie-wrapper') as HTMLElement;

  if (cookieWrapper && cookieEl) {
    cookieWrapper.addEventListener('click', (e: MouseEvent) => {
      // Trigger click animation
      cookieEl.classList.add('cookie-click-animation');
      setTimeout(() => cookieEl.classList.remove('cookie-click-animation'), 100);

      // Create floating text feedback
      createFloatingText(e.clientX, e.clientY, '+1');

      // Update state
      onCookieClick(1);
    });
  }
}

/**
 * Updates the cookie count display without re-rendering the whole component
 */
export function updateCookieDisplay(count: number): void {
  const display = document.getElementById('cookie-count');
  if (display) {
    display.textContent = Math.floor(count).toString();
  }
}