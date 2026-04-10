import './style.css';
import { renderHeader } from './components/header';
import { renderFooter } from './components/footer';
import { renderCookieArea } from './components/cookie';
import { renderStatsPanel, updateStatsPanel } from './components/stats-panel';
import { initShop } from './components/shop';
import { renderAchievements, updateAchievements } from './components/achievements';
import { renderPrestigeButton } from './components/prestige';
import { initSaveLoadSystem, renderSaveLoadUI } from './components/save-load';
import { initLeaderboard } from './components/leaderboard';
import { GameState, Upgrade } from './types';
import { getInitialGameState, saveGameState, loadGameState } from './utils';
import { UPGRADES } from './components/game-manager';

// Main application container
const app = document.getElementById('app');
if (!app) {
  throw new Error('App root element not found');
}

// Initialize game state
let gameState: GameState = loadGameState() || getInitialGameState();

// Save game state periodically
initSaveLoadSystem({
  gameState,
  onStateLoaded: (state: GameState) => {
    gameState = state;
  }
});

// Render header
renderHeader(app);

// Create main content container
const mainContainer = document.createElement('main');
mainContainer.className = 'container mx-auto px-4 py-6';
app.appendChild(mainContainer);

// Create game area
const gameSection = document.createElement('section');
gameSection.className = 'mb-8';
gameSection.id = 'game';

// Create shop area
const shopSection = document.createElement('section');
shopSection.className = 'mb-8 hidden';
shopSection.id = 'shop';

// Create leaderboard area
const leaderboardSection = document.createElement('section');
leaderboardSection.className = 'mb-8 hidden';
leaderboardSection.id = 'leaderboard';

// Create achievements area
const achievementsSection = document.createElement('section');
achievementsSection.className = 'mb-8 hidden';
achievementsSection.id = 'achievements';

// Append sections to main container
mainContainer.appendChild(gameSection);
mainContainer.appendChild(shopSection);
mainContainer.appendChild(leaderboardSection);
mainContainer.appendChild(achievementsSection);

// Stats panel container
const statsPanelContainer = document.createElement('div');
statsPanelContainer.className = 'mb-6';
gameSection.appendChild(statsPanelContainer);

// Cookie area
const cookieContainer = document.createElement('div');
gameSection.appendChild(cookieContainer);

// Prestige button container
const prestigeContainer = document.createElement('div');
prestigeContainer.className = 'my-6';
gameSection.appendChild(prestigeContainer);

// Save/Load UI container
const saveLoadContainer = document.createElement('div');
saveLoadContainer.className = 'my-6';
gameSection.appendChild(saveLoadContainer);

// Initialize cookie area
const cookieComponent = renderCookieArea(cookieContainer, () => {
  gameState.cookies += gameState.clickPower;
  gameState.totalCookies += gameState.clickPower;
  updateStatsPanel(statsPanelContainer, gameState);
  saveGameState(gameState);
});

// Initialize stats panel
renderStatsPanel(statsPanelContainer, gameState);

// Initialize shop
const updateShop = initShop(shopSection, UPGRADES, (upgradeId: string) => {
  const upgrade = UPGRADES.find(u => u.id === upgradeId);
  if (!upgrade) return;

  const owned = gameState.inventory[upgradeId] || 0;
  const cost = Math.ceil(upgrade.baseCost * Math.pow(1.15, owned));

  if (gameState.cookies >= cost) {
    gameState.cookies -= cost;
    gameState.inventory[upgradeId] = (gameState.inventory[upgradeId] || 0) + 1;
    
    // Recalculate CPS
    let newCps = 0;
    UPGRADES.forEach(u => {
      const count = gameState.inventory[u.id] || 0;
      newCps += count * u.cpsIncrease;
    });
    gameState.cps = newCps;
    
    updateStatsPanel(statsPanelContainer, gameState);
    updateShop(gameState);
    saveGameState(gameState);
  }
});

// Initialize achievements
renderAchievements(achievementsSection, gameState);

// Initialize prestige button
renderPrestigeButton(prestigeContainer, gameState, () => {
  updateStatsPanel(statsPanelContainer, gameState);
  updateShop(gameState);
});

// Initialize save/load UI
renderSaveLoadUI(saveLoadContainer, gameState);

// Initialize leaderboard
initLeaderboard(leaderboardSection, () => gameState.totalCookies);

// Update shop initially
updateShop(gameState);

// Game loop for automatic cookie generation
setInterval(() => {
  if (gameState.cps > 0) {
    gameState.cookies += gameState.cps / 10;
    gameState.totalCookies += gameState.cps / 10;
    updateStatsPanel(statsPanelContainer, gameState);
    cookieComponent.updateDisplay(gameState);
    updateAchievements(achievementsSection, gameState);
    saveGameState(gameState);
  }
}, 100);

// Handle navigation
const handleNavigation = () => {
  const hash = window.location.hash || '#game';
  
  // Hide all sections
  gameSection.classList.add('hidden');
  shopSection.classList.add('hidden');
  leaderboardSection.classList.add('hidden');
  achievementsSection.classList.add('hidden');
  
  // Show the selected section
  switch(hash) {
    case '#shop':
      shopSection.classList.remove('hidden');
      break;
    case '#leaderboard':
      leaderboardSection.classList.remove('hidden');
      break;
    case '#achievements':
      achievementsSection.classList.remove('hidden');
      break;
    default: // #game
      gameSection.classList.remove('hidden');
  }
};

// Set up navigation event listener
window.addEventListener('hashchange', handleNavigation);

// Initial navigation handling
handleNavigation();

// Render footer
renderFooter(app);