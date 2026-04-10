import { GameState } from './types';

/**
 * Format large numbers into human-readable strings with suffixes
 * e.g. 1234567 -> 1.23M
 */
export function formatNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toString();
}

/**
 * Get the initial game state when starting a new game
 */
export function getInitialGameState(): GameState {
  return {
    cookies: 0,
    totalCookies: 0,
    cps: 0,
    clickPower: 1,
    inventory: {},
    lastSaveTime: Date.now(),
    achievements: {},
    prestigeLevel: 0,
    prestigePoints: 0
  };
}

/**
 * Save the current game state to localStorage
 */
export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem('cookieClickerState', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

/**
 * Load the game state from localStorage
 */
export function loadGameState(): GameState {
  try {
    const savedState = localStorage.getItem('cookieClickerState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Ensure all required fields are present
      return {
        ...getInitialGameState(),
        ...parsedState,
        lastSaveTime: parsedState.lastSaveTime || Date.now()
      };
    }
  } catch (e) {
    console.error('Failed to load game state:', e);
  }
  return getInitialGameState();
}

/**
 * Calculate offline progress based on time elapsed since last save
 */
export function calculateOfflineProgress(state: GameState): number {
  const now = Date.now();
  const timeDiff = Math.max(0, now - state.lastSaveTime);
  
  // Cap offline time at 24 hours (86400000 ms)
  const cappedTime = Math.min(timeDiff, 86400000);
  
  // Convert milliseconds to seconds and calculate cookies earned
  const seconds = cappedTime / 1000;
  return state.cps * seconds;
}

/**
 * Create an HTML element with optional attributes and children
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes: Record<string, string> = {},
  children: (HTMLElement | string)[] = []
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
}

/**
 * Remove all child elements from a container
 */
export function clearChildren(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Throttle a function to limit how often it can be called
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

/**
 * Debounce a function to delay its execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  } as T;
}