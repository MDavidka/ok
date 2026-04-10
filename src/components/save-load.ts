import { GameState, LeaderboardEntry } from '../types';
import { saveGameState, loadGameState, getInitialGameState } from '../utils';
import { submitScore } from '../db';

interface SaveLoadComponentProps {
  gameState: GameState;
  onStateLoaded: (state: GameState) => void;
}

export function initSaveLoadSystem(props: SaveLoadComponentProps): void {
  // Auto-save every 30 seconds
  setInterval(() => {
    saveGameState(props.gameState);
  }, 30000);

  // Save when page is about to unload
  window.addEventListener('beforeunload', () => {
    saveGameState(props.gameState);
  });

  // Load game state on initialization
  const loadedState = loadGameState();
  props.onStateLoaded(loadedState);
}

export function renderSaveLoadUI(container: HTMLElement, gameState: GameState): void {
  container.innerHTML = `
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 class="text-xl font-bold text-amber-800 mb-3">Game Management</h2>
      <div class="flex flex-wrap gap-3">
        <button id="save-btn" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Save Game
        </button>
        <button id="load-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Load Game
        </button>
        <button id="reset-btn" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Reset Game
        </button>
        <button id="submit-score-btn" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Submit Score
        </button>
      </div>
      <div id="save-message" class="mt-3 text-sm min-h-[20px]"></div>
    </div>
  `;

  const saveBtn = container.querySelector('#save-btn') as HTMLButtonElement;
  const loadBtn = container.querySelector('#load-btn') as HTMLButtonElement;
  const resetBtn = container.querySelector('#reset-btn') as HTMLButtonElement;
  const submitScoreBtn = container.querySelector('#submit-score-btn') as HTMLButtonElement;
  const messageEl = container.querySelector('#save-message') as HTMLDivElement;

  if (!saveBtn || !loadBtn || !resetBtn || !submitScoreBtn || !messageEl) {
    console.error('Save/Load UI elements not found');
    return;
  }

  // Save button handler
  saveBtn.addEventListener('click', () => {
    try {
      saveGameState(gameState);
      showMessage(messageEl, 'Game saved successfully!', 'text-green-600');
    } catch (error) {
      showMessage(messageEl, 'Error saving game', 'text-red-600');
      console.error('Save error:', error);
    }
  });

  // Load button handler
  loadBtn.addEventListener('click', () => {
    try {
      const loadedState = loadGameState();
      // We can't directly modify the game state here, so we'd need to communicate with the game manager
      // For now, we'll just show a message
      showMessage(messageEl, 'Game loaded successfully! Refresh to see changes.', 'text-blue-600');
    } catch (error) {
      showMessage(messageEl, 'Error loading game', 'text-red-600');
      console.error('Load error:', error);
    }
  });

  // Reset button handler
  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your game? This cannot be undone.')) {
      try {
        localStorage.removeItem('cookie_clicker_save_v1');
        showMessage(messageEl, 'Game reset! Refresh to start fresh.', 'text-red-600');
      } catch (error) {
        showMessage(messageEl, 'Error resetting game', 'text-red-600');
        console.error('Reset error:', error);
      }
    }
  });

  // Submit score button handler
  submitScoreBtn.addEventListener('click', async () => {
    const username = prompt('Enter your name for the leaderboard:');
    if (!username) return;

    try {
      const success = await submitScore(username, gameState.totalCookies);
      if (success) {
        showMessage(messageEl, 'Score submitted successfully!', 'text-purple-600');
      } else {
        showMessage(messageEl, 'Error submitting score', 'text-red-600');
      }
    } catch (error) {
      showMessage(messageEl, 'Network error submitting score', 'text-red-600');
      console.error('Submit error:', error);
    }
  });
}

function showMessage(element: HTMLElement, message: string, className: string): void {
  element.textContent = message;
  element.className = `mt-3 text-sm ${className}`;
  
  // Clear message after 3 seconds
  setTimeout(() => {
    if (element.textContent === message) {
      element.textContent = '';
      element.className = 'mt-3 text-sm min-h-[20px]';
    }
  }, 3000);
}