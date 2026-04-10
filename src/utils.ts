export * from './types';

export function saveGameStateToLocalStorage(gameState: GameState): void {
  try {
    localStorage.setItem('cookieClickerGameState', JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
}

export function loadGameStateFromLocalStorage(): GameState | null {
  try {
    const savedState = localStorage.getItem('cookieClickerGameState');
    if (!savedState) return null;
    return JSON.parse(savedState) as GameState;
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
    return null;
  }
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + 'B';
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + 'K';
  }
  return value.toString();
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}