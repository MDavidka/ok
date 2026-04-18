import { Upgrade } from './types';

/**
 * Formats a large number into a readable string with suffixes (e.g., 1.5K, 2.3M)
 * using the native Intl.NumberFormat API.
 */
export function formatCookies(amount: number): string {
  if (amount < 0) return "0";
  
  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1,
    minimumFractionDigits: 0
  }).format(Math.floor(amount));
}

/**
 * Calculates the cost of the next upgrade based on the base cost, 
 * the multiplier, and the current quantity owned.
 * Formula: BaseCost * (Multiplier ^ CurrentQuantity)
 */
export function calculateUpgradeCost(baseCost: number, costMultiplier: number, currentQuantity: number): number {
  if (currentQuantity === 0) return baseCost;
  return Math.ceil(baseCost * Math.pow(costMultiplier, currentQuantity));
}

/**
 * Calculates the total Cookies Per Second (CPS) based on the user's 
 * owned upgrades and the master list of upgrade definitions.
 */
export function calculateTotalCps(ownedUpgrades: Record<string, number>, upgradeDefinitions: Upgrade[]): number {
  let totalCps = 0;
  
  if (!ownedUpgrades || typeof ownedUpgrades !== 'object') {
    return totalCps;
  }

  for (const [upgradeId, quantity] of Object.entries(ownedUpgrades)) {
    if (quantity <= 0) continue;
    
    const upgrade = upgradeDefinitions.find(u => u.id === upgradeId);
    if (upgrade) {
      totalCps += upgrade.baseCps * quantity;
    }
  }
  
  return totalCps;
}

/**
 * Calculates how many cookies were earned while the user was away.
 * Caps the offline production to a maximum of 24 hours to balance the game.
 */
export function calculateOfflineCookies(lastSaveTime: number, currentCps: number): number {
  if (!lastSaveTime || currentCps <= 0) return 0;
  
  const now = Date.now();
  const secondsOffline = Math.max(0, (now - lastSaveTime) / 1000);
  
  // Cap offline time to 24 hours (86400 seconds)
  const MAX_OFFLINE_SECONDS = 86400;
  const effectiveSeconds = Math.min(secondsOffline, MAX_OFFLINE_SECONDS);
  
  return Math.floor(effectiveSeconds * currentCps);
}

/**
 * Generates a simple random alphanumeric user ID for session tracking.
 */
export function generateUserId(): string {
  return 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}