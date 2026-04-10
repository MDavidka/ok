import './style.css';
import { GameState } from './types';
import { saveGame, loadGame } from './utils';
import { renderCookie, updateCookieDisplay } from './components/cookie';
import { renderScore, updateScoreDisplay } from './components/score';
import { renderUpgrades, updateUpgradeStore, calculateCost } from './components/upgrades';
import { renderLeaderboard } from './components/leaderboard';

// Initial Game State
const initialState: GameState = {
  cookies: 0,
  cookiesPerSecond: 0,
  upgrades: {
    cursor: { id: 'cursor', name: 'Auto-Clicker', baseCost: 15, baseCps: 0.1, owned: 0 },
    oven: { id: 'oven', name: 'Grandma\'s Oven', baseCost: 100, baseCps: 1, owned: 0 },
    factory: { id: 'factory', name: 'Cookie Factory', baseCost: 1100, baseCps: 8, owned: 0 },
  }
};

let gameState: GameState = loadGame() || initialState;

/**
 * Main Game Loop
 * Runs every 100ms to update passive income and UI
 */
function gameLoop() {
  // Add passive income (100ms = 0.1s)
  gameState.cookies += gameState.cookiesPerSecond / 10;
  
  updateScoreDisplay(gameState);
  updateUpgradeStore(gameState);
  updateCookieDisplay(Math.floor(gameState.cookies));
  
  // Auto-save every 5 seconds (approx)
  if (Math.random() < 0.02) {
    saveGame(gameState);
  }
}

/**
 * Handles purchasing upgrades
 */
function handlePurchase(upgradeId: string) {
  const upgrade = gameState.upgrades[upgradeId];
  const cost = calculateCost(upgrade);

  if (gameState.cookies >= cost) {
    gameState.cookies -= cost;
    upgrade.owned += 1;
    
    // Recalculate CPS
    gameState.cookiesPerSecond = Object.values(gameState.upgrades)
      .reduce((acc, u) => acc + (u.owned * u.baseCps), 0);
    
    updateScoreDisplay(gameState);
    updateUpgradeStore(gameState);
    saveGame(gameState);
  }
}

/**
 * Initializes the application
 */
function init() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-4 md:p-8">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-[var(--color-accent)]">Cookie Clicker</h1>
      </header>
      
      <main class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <section id="score-section"></section>
        <section id="cookie-section" class="flex justify-center items-center"></section>
        <section id="upgrades-section" class="h-[500px]"></section>
      </main>

      <section id="leaderboard-section" class="max-w-2xl mx-auto mt-12"></section>
    </div>
  `;

  // Render components
  renderScore(document.getElementById('score-section')!, gameState);
  renderCookie(document.getElementById('cookie-section')!, () => {
    gameState.cookies += 1;
    updateScoreDisplay(gameState);
    updateUpgradeStore(gameState);
  });
  renderUpgrades(document.getElementById('upgrades-section')!, gameState, handlePurchase);
  renderLeaderboard(document.getElementById('leaderboard-section')!, gameState.cookies);

  // Start loop
  setInterval(gameLoop, 100);
}

// Run init
init();