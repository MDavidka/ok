import { GameState } from './types';

const STORAGE_KEY = 'cookie_clicker_state';

export const INITIAL_STATE: GameState = {
  score: 0,
  lastClickAt: 0,
  clicks: 0
};

/**
 * Formats large numbers into a readable string with suffixes (e.g., 1.5M, 2B)
 * @param num The number to format
 * @returns A formatted string representation of the number
 */
export function formatNumber(num: number): string {
  if (num === 0) return "0";
  if (num < 1000) return Math.floor(num).toString();

  const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
  const suffixIndex = Math.floor(Math.log10(num) / 3);

  if (suffixIndex >= suffixes.length) {
    return num.toExponential(2);
  }

  const shortValue = num / Math.pow(1000, suffixIndex);
  
  // Format with up to 1 decimal place, dropping trailing zeros
  return Number(shortValue.toFixed(1)) + suffixes[suffixIndex];
}

/**
 * Calculates the Clicks Per Second (CPS)
 * @param clicks Total number of clicks
 * @param startTime Timestamp of the first click
 * @param currentTime Current timestamp (defaults to Date.now())
 * @returns The calculated CPS, rounded to 1 decimal place
 */
export function calculateCPS(clicks: number, startTime: number, currentTime: number = Date.now()): number {
  if (!startTime || clicks === 0) return 0;
  
  const secondsElapsed = (currentTime - startTime) / 1000;
  
  // Prevent division by zero or inflated CPS in the first fraction of a second
  if (secondsElapsed < 1) return clicks;
  
  return Number((clicks / secondsElapsed).toFixed(1));
}

/**
 * Loads the game state from browser sessionStorage
 * @returns The parsed GameState or the INITIAL_STATE if none exists/errors occur
 */
export function loadState(): GameState {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved) as Partial<GameState>;
      // Merge with initial state to ensure all properties exist
      return { ...INITIAL_STATE, ...parsedState };
    }
  } catch (error) {
    console.error('Failed to load game state from sessionStorage:', error);
  }
  return { ...INITIAL_STATE };
}

/**
 * Saves the current game state to browser sessionStorage
 * @param state The current GameState to save
 */
export function saveState(state: GameState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state to sessionStorage:', error);
  }
}

/**
 * Clears the game state from sessionStorage and returns a fresh state
 * @returns A fresh INITIAL_STATE object
 */
export function resetState(): GameState {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset game state in sessionStorage:', error);
  }
  return { ...INITIAL_STATE };
}