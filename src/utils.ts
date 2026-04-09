import { GameState } from './types';

const SAVE_KEY = 'cookie_clicker_save_v1';

/**
 * Formats a number into a compact string representation (e.g., 1.2M, 3.4B).
 * @param num The number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  if (num < 1000) return Math.floor(num).toString();

  const map = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = map.find(item => num >= item.value);
  
  return item 
    ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol 
    : Math.floor(num).toString();
}

/**
 * Returns a fresh, default game state.
 */
export function getInitialGameState(): GameState {
  return {
    cookies: 0,
    totalCookies: 0,
    cps: 0,
    clickPower: 1,
    inventory: {},
    lastSaveTime: Date.now()
  };
}

/**
 * Saves the current game state to localStorage.
 * @param state The current GameState
 */
export function saveGameState(state: GameState): void {
  try {
    state.lastSaveTime = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save game state to localStorage", e);
  }
}

/**
 * Loads the game state from localStorage, merging it with defaults
 * to ensure all required fields exist even if the save is old.
 */
export function loadGameState(): GameState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<GameState>;
      return { ...getInitialGameState(), ...parsed };
    }
  } catch (e) {
    console.error("Failed to load game state from localStorage", e);
  }
  return getInitialGameState();
}

/**
 * Calculates cookies earned while the player was away.
 * @param state The loaded GameState
 * @returns Number of cookies earned offline
 */
export function calculateOfflineProgress(state: GameState): number {
  if (!state.lastSaveTime || state.cps <= 0) return 0;
  
  const now = Date.now();
  const timeDiffSeconds = (now - state.lastSaveTime) / 1000;
  
  // Only award offline progress if away for more than 60 seconds
  if (timeDiffSeconds > 60) {
    return Math.floor(timeDiffSeconds * state.cps);
  }
  
  return 0;
}

/**
 * Helper to safely create DOM elements with attributes and classes.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: {
    classes?: string[];
    id?: string;
    text?: string;
    html?: string;
    attributes?: Record<string, string>;
  }
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName);
  
  if (options?.classes) {
    // Filter out empty strings to prevent DOMException
    const validClasses = options.classes.filter(c => c.trim() !== '');
    if (validClasses.length > 0) {
      el.classList.add(...validClasses);
    }
  }
  
  if (options?.id) el.id = options.id;
  if (options?.text) el.textContent = options.text;
  if (options?.html) el.innerHTML = options.html;
  
  if (options?.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      el.setAttribute(key, value);
    }
  }
  
  return el;
}

/**
 * Safely removes all child nodes from a given DOM element.
 */
export function clearChildren(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Generates a random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}