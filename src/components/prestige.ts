import { GameState } from '../types';
import { formatNumber, saveGameState } from '../utils';
import { UPGRADES } from './game-manager';

/**
 * Calculate the prestige reward based on total cookies baked
 * @param totalCookies Total cookies ever baked
 * @returns Prestige points to award
 */
export function calculatePrestigeReward(totalCookies: number): number {
  // Simple formula: sqrt(totalCookies) / 100, minimum 1 point
  return Math.max(1, Math.floor(Math.sqrt(totalCookies) / 100));
}

/**
 * Apply prestige bonuses to the game state
 * @param state Current game state
 * @param prestigePoints Number of prestige points to apply
 */
export function applyPrestigeBonuses(state: GameState, prestigePoints: number): void {
  // Reset all progress except prestige points
  state.cookies = 0;
  state.totalCookies = 0;
  state.cps = 0;
  state.clickPower = 1 + (prestigePoints * 0.1); // 10% bonus per prestige point
  state.inventory = {};
  
  // Save the updated state
  saveGameState(state);
}

/**
 * Render the prestige modal/dialog
 * @param container Parent element to render in
 * @param gameState Current game state
 * @param onPrestige Callback when prestige is confirmed
 */
export function renderPrestigeModal(
  container: HTMLElement, 
  gameState: GameState, 
  onPrestige: () => void
): void {
  const prestigePoints = calculatePrestigeReward(gameState.totalCookies);
  
  container.innerHTML = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-2 border-amber-200">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-amber-800 mb-2">Prestige Reset</h2>
          <div class="bg-amber-50 rounded-lg p-4 mb-4">
            <p class="text-amber-700 mb-2">
              Reset your progress to gain permanent bonuses!
            </p>
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-amber-200">
              <div>
                <p class="text-sm text-amber-600">Current Progress</p>
                <p class="font-bold text-amber-800">${formatNumber(gameState.totalCookies)} cookies baked</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-amber-600">Prestige Reward</p>
                <p class="font-bold text-2xl text-amber-600">+${prestigePoints}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-amber-50 rounded-lg p-4 mb-6">
            <h3 class="font-bold text-amber-800 mb-2">Bonuses You'll Receive:</h3>
            <ul class="text-left text-amber-700 space-y-1">
              <li class="flex items-start">
                <span class="text-amber-500 mr-2">•</span>
                <span>+${(prestigePoints * 0.1).toFixed(1)}% bonus to cookie clicks</span>
              </li>
              <li class="flex items-start">
                <span class="text-amber-500 mr-2">•</span>
                <span>All upgrades cost 5% less</span>
              </li>
              <li class="flex items-start">
                <span class="text-amber-500 mr-2">•</span>
                <span>Special golden cookie effects</span>
              </li>
            </ul>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <button id="cancel-prestige" class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button id="confirm-prestige" class="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105">
              Prestige Now
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  const cancelBtn = container.querySelector('#cancel-prestige');
  const confirmBtn = container.querySelector('#confirm-prestige');
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      container.innerHTML = '';
    });
  }
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      applyPrestigeBonuses(gameState, prestigePoints);
      container.innerHTML = '';
      onPrestige();
    });
  }
}

/**
 * Render the prestige button in the UI
 * @param container Parent element to render in
 * @param gameState Current game state
 * @param onPrestige Callback when prestige is initiated
 */
export function renderPrestigeButton(
  container: HTMLElement,
  gameState: GameState,
  onPrestige: () => void
): void {
  const prestigePoints = calculatePrestigeReward(gameState.totalCookies);
  
  // Only show prestige option if player has significant progress
  if (gameState.totalCookies < 1000000) {
    container.innerHTML = '';
    return;
  }
  
  container.innerHTML = `
    <button id="prestige-btn" class="w-full flex items-center justify-between p-3 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg border border-amber-300 hover:from-amber-200 hover:to-amber-300 transition-all">
      <div class="flex items-center">
        <span class="text-2xl mr-2">✨</span>
        <div>
          <p class="font-bold text-amber-800">Prestige Available!</p>
          <p class="text-sm text-amber-600">Earn ${prestigePoints} prestige points</p>
        </div>
      </div>
      <span class="text-amber-700">→</span>
    </button>
  `;
  
  const prestigeBtn = container.querySelector('#prestige-btn');
  if (prestigeBtn) {
    prestigeBtn.addEventListener('click', () => {
      const modalContainer = document.createElement('div');
      document.body.appendChild(modalContainer);
      renderPrestigeModal(modalContainer, gameState, onPrestige);
    });
  }
}