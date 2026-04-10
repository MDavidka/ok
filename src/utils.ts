import { GameState } from './types';

/**
 * Formats large numbers into human-readable strings (e.g., 1.2M, 3.4B)
 */
export function formatNumber(num: number): string {
  if (num < 1000) return Math.floor(num).toString();
  
  const units = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi'];
  const i = Math.floor(Math.log10(num) / 3);
  const val = (num / Math.pow(1000, i)).toFixed(1);
  
  return `${val}${units[i] || ''}`;
}

/**
 * Saves the game state to localStorage
 */
export function saveGame(state: GameState): void {
  try {
    localStorage.setItem('cookie-clicker-save', JSON.stringify({
      ...state,
      lastUpdated: Date.now()
    }));
  } catch (e) {
    console.error('Failed to save game:', e);
  }
}

/**
 * Loads the game state from localStorage
 */
export function loadGame(): GameState | null {
  try {
    const saved = localStorage.getItem('cookie-clicker-save');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Failed to load game:', e);
    return null;
  }
}

/**
 * Creates a floating text element for click feedback
 */
export function createFloatingText(x: number, y: number, text: string): void {
  const el = document.createElement('div');
  el.className = 'floating-text';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.textContent = text;
  
  document.body.appendChild(el);
  
  // Remove element after animation completes
  setTimeout(() => {
    el.remove();
  }, 1000);
}