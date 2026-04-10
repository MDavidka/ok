import './style.css';
import { GameState, Upgrade } from './types';
import { saveGameStateToLocalStorage, loadGameStateFromLocalStorage } from './utils';
import { renderCookie, updateCookieDisplay } from './components/Cookie';
import { renderUpgradeList, updateUpgradeList } from './components/UpgradeList';
import { renderStatsDisplay, updateStatsDisplay } from './components/StatsDisplay';

// Initialize game state
let gameState: GameState = {
  cookieCount: 0,
  clickValue: 1,
  autoClickValue: 0,
  autoClickInterval: 1000,
  upgrades: [
    {
      id: 'click-power',
      name: 'Click Power',
      description: 'Increase the value of each click',
      cost: 10,
      isUnlocked: true,
      effect: (gameState: GameState) => {
        gameState.clickValue += 1;
      }
    },
    {
      id: 'auto-clicker',
      name: 'Auto Clicker',
      description: 'Generate cookies automatically every second',
      cost: 50,
      isUnlocked: true,
      effect: (gameState: GameState) => {
        gameState.autoClickValue += 1;
      }
    },
    {
      id: 'double-click',
      name: 'Double Click',
      description: 'Double the value of each click',
      cost: 200,
      isUnlocked: false,
      effect: (gameState: GameState) => {
        gameState.clickValue *= 2;
      }
    },
    {
      id: 'triple-click',
      name: 'Triple Click',
      description: 'Triple the value of each click',
      cost: 1000,
      isUnlocked: false,
      effect: (gameState: GameState) => {
        gameState.clickValue *= 3;
      }
    }
  ],
  lastSaveTime: Date.now()
};

// Load saved game state from localStorage
const savedState = loadGameStateFromLocalStorage();
if (savedState) {
  gameState = savedState;
}

// Get DOM elements
const cookieContainer = document.getElementById('cookie-container') as HTMLElement;
const upgradeContainer = document.getElementById('upgrade-container') as HTMLElement;
const statsContainer = document.getElementById('stats-container') as HTMLElement;

// Initialize the game
function initGame() {
  // Render initial game state
  renderCookie(cookieContainer, gameState, () => {
    // Handle cookie click
    gameState.cookieCount += gameState.clickValue;
    updateCookieDisplay(cookieContainer, gameState);
    updateStatsDisplay(statsContainer, gameState);
    saveGameStateToLocalStorage(gameState);
  });

  renderUpgradeList(upgradeContainer, gameState, (upgradeId: string) => {
    // Handle upgrade click
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    if (upgrade && gameState.cookieCount >= upgrade.cost) {
      upgrade.effect(gameState);
      gameState.cookieCount -= upgrade.cost;
      upgrade.isUnlocked = false;
      
      // Update all displays
      updateCookieDisplay(cookieContainer, gameState);
      updateUpgradeList(upgradeContainer, gameState);
      updateStatsDisplay(statsContainer, gameState);
      saveGameStateToLocalStorage(gameState);
    }
  });

  renderStatsDisplay(statsContainer, gameState);
  
  // Auto-click functionality
  setInterval(() => {
    gameState.cookieCount += gameState.autoClickValue;
    updateCookieDisplay(cookieContainer, gameState);
    updateStatsDisplay(statsContainer, gameState);
    saveGameStateToLocalStorage(gameState);
  }, gameState.autoClickInterval);
}

// Run the game
initGame();