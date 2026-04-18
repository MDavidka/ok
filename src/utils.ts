import { Upgrade } from './types';

/**
 * Formats a large number into a human-readable string with suffixes (e.g., 1.5M, 2B).
 * @param amount The number of cookies to format.
 * @returns A formatted string representation of the number.
 */
export function formatCookies(amount: number): string {
  const safeAmount = Math.max(0, Math.floor(amount));
  
  if (safeAmount < 1000) {
    return safeAmount.toString();
  }

  const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
  const suffixIndex = Math.floor(Math.log10(safeAmount) / 3);

  // Fallback to scientific notation if we run out of suffixes
  if (suffixIndex >= suffixes.length) {
    return safeAmount.toExponential(2);
  }

  const shortValue = safeAmount / Math.pow(1000, suffixIndex);
  
  // Keep 1 decimal place if the number is less than 100 (e.g., 1.5M), otherwise 0 (e.g., 150M)
  const formattedValue = shortValue.toFixed(shortValue < 100 ? 1 : 0);
  
  // Remove trailing '.0' if it exists
  return formattedValue.replace(/\.0$/, '') + suffixes[suffixIndex];
}

/**
 * Calculates the cost of the next upgrade based on the base cost, multiplier, and current quantity owned.
 * Formula: BaseCost * (Multiplier ^ CurrentQuantity)
 * @param baseCost The initial cost of the upgrade.
 * @param costMultiplier The exponential multiplier for each subsequent purchase.
 * @param currentQuantity The number of this upgrade currently owned.
 * @returns The calculated cost for the next purchase.
 */
export function calculateUpgradeCost(baseCost: number, costMultiplier: number, currentQuantity: number): number {
  return Math.floor(baseCost * Math.pow(costMultiplier, currentQuantity));
}

/**
 * Calculates the total Cookies Per Second (CPS) based on all owned upgrades.
 * @param ownedUpgrades A record mapping upgrade IDs to the quantity owned.
 * @param upgradeDefinitions The array of all available upgrades with their base CPS values.
 * @returns The total calculated CPS.
 */
export function calculateTotalCps(ownedUpgrades: Record<string, number>, upgradeDefinitions: Upgrade[]): number {
  let totalCps = 0;
  
  for (const upgrade of upgradeDefinitions) {
    const quantity = ownedUpgrades[upgrade.id] || 0;
    totalCps += quantity * upgrade.baseCps;
  }
  
  return totalCps;
}

/**
 * Calculates the number of cookies earned while the user was offline.
 * Caps the offline time to 24 hours to prevent infinite accumulation exploits.
 * @param lastSaveTime The timestamp (in milliseconds) of the last save.
 * @param currentCps The user's current Cookies Per Second.
 * @returns The number of cookies earned offline.
 */
export function calculateOfflineCookies(lastSaveTime: number, currentCps: number): number {
  if (!lastSaveTime || currentCps <= 0) {
    return 0;
  }

  const now = Date.now();
  const secondsOffline = Math.floor((now - lastSaveTime) / 1000);
  
  // Cap offline time to 24 hours (86400 seconds)
  const MAX_OFFLINE_SECONDS = 86400;
  const effectiveSeconds = Math.min(Math.max(0, secondsOffline), MAX_OFFLINE_SECONDS);
  
  return Math.floor(effectiveSeconds * currentCps);
}

/**
 * Generates a random ID for new users or sessions.
 * @returns A random alphanumeric string.
 */
export function generateUserId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}