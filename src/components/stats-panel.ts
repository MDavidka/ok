import { GameState } from '../types';
import { formatNumber } from '../utils';

/**
 * Renders the stats panel showing game metrics
 * @param container The parent element to render the stats panel into
 * @param gameState The current game state
 */
export function renderStatsPanel(container: HTMLElement, gameState: GameState): void {
  // Clear previous content
  container.innerHTML = '';
  
  // Create stats panel container
  const statsPanel = document.createElement('div');
  statsPanel.className = 'bg-white rounded-lg shadow-md p-4 mb-6 border border-amber-200';
  
  // Create title
  const title = document.createElement('h2');
  title.className = 'text-xl font-bold text-amber-900 mb-4 flex items-center';
  title.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
    </svg>
    Game Statistics
  `;
  
  // Create stats grid
  const statsGrid = document.createElement('div');
  statsGrid.className = 'grid grid-cols-2 gap-4';
  
  // Cookies stat
  const cookiesStat = document.createElement('div');
  cookiesStat.className = 'bg-amber-50 p-3 rounded-lg';
  cookiesStat.innerHTML = `
    <div class="text-sm text-amber-700">Cookies</div>
    <div class="text-xl font-bold text-amber-900">${formatNumber(gameState.cookies)}</div>
  `;
  
  // Total Cookies stat
  const totalCookiesStat = document.createElement('div');
  totalCookiesStat.className = 'bg-amber-50 p-3 rounded-lg';
  totalCookiesStat.innerHTML = `
    <div class="text-sm text-amber-700">Total Baked</div>
    <div class="text-xl font-bold text-amber-900">${formatNumber(gameState.totalCookies)}</div>
  `;
  
  // CPS stat
  const cpsStat = document.createElement('div');
  cpsStat.className = 'bg-amber-50 p-3 rounded-lg';
  cpsStat.innerHTML = `
    <div class="text-sm text-amber-700">Per Second</div>
    <div class="text-xl font-bold text-amber-900">${formatNumber(gameState.cps)}</div>
  `;
  
  // Click Power stat
  const clickPowerStat = document.createElement('div');
  clickPowerStat.className = 'bg-amber-50 p-3 rounded-lg';
  clickPowerStat.innerHTML = `
    <div class="text-sm text-amber-700">Per Click</div>
    <div class="text-xl font-bold text-amber-900">${formatNumber(gameState.clickPower)}</div>
  `;
  
  // Assemble the component
  statsGrid.appendChild(cookiesStat);
  statsGrid.appendChild(totalCookiesStat);
  statsGrid.appendChild(cpsStat);
  statsGrid.appendChild(clickPowerStat);
  
  statsPanel.appendChild(title);
  statsPanel.appendChild(statsGrid);
  
  container.appendChild(statsPanel);
}

/**
 * Updates the stats panel with new game state values
 * @param container The stats panel container element
 * @param gameState The updated game state
 */
export function updateStatsPanel(container: HTMLElement, gameState: GameState): void {
  const cookiesEl = container.querySelector('.bg-amber-50:nth-child(1) .text-xl') as HTMLElement;
  const totalCookiesEl = container.querySelector('.bg-amber-50:nth-child(2) .text-xl') as HTMLElement;
  const cpsEl = container.querySelector('.bg-amber-50:nth-child(3) .text-xl') as HTMLElement;
  const clickPowerEl = container.querySelector('.bg-amber-50:nth-child(4) .text-xl') as HTMLElement;
  
  if (cookiesEl) cookiesEl.textContent = formatNumber(gameState.cookies);
  if (totalCookiesEl) totalCookiesEl.textContent = formatNumber(gameState.totalCookies);
  if (cpsEl) cpsEl.textContent = formatNumber(gameState.cps);
  if (clickPowerEl) clickPowerEl.textContent = formatNumber(gameState.clickPower);
}