import { GameState } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the score display component.
 * Shows the current cookie count and the passive income rate (CPS).
 */
export function renderScore(container: HTMLElement, gameState: GameState): void {
  container.innerHTML = `
    <div class="card flex flex-col items-center justify-center gap-2 text-center">
      <h2 class="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Total Cookies</h2>
      <div class="text-4xl font-bold text-[var(--color-accent)]" id="total-cookies">
        ${formatNumber(gameState.cookies)}
      </div>
      <div class="text-sm text-[var(--color-text-muted)]">
        per second: <span id="cps-display" class="font-mono text-[var(--color-primary)]">${formatNumber(gameState.cookiesPerSecond)}</span>
      </div>
    </div>
  `;
}

/**
 * Updates the score display elements without re-rendering the entire component.
 * This is called by the main game loop to keep the UI in sync with the state.
 */
export function updateScoreDisplay(gameState: GameState): void {
  const totalEl = document.getElementById('total-cookies');
  const cpsEl = document.getElementById('cps-display');

  if (totalEl) {
    totalEl.textContent = formatNumber(gameState.cookies);
  }
  
  if (cpsEl) {
    cpsEl.textContent = formatNumber(gameState.cookiesPerSecond);
  }
}