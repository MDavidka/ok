/**
 * Core Game State representing the player's current progress.
 * This is the object that gets saved to and loaded from localStorage.
 */
export interface GameState {
  /** Current number of cookies available to spend */
  cookies: number;
  /** Total number of cookies ever baked (used for leaderboard score) */
  totalCookies: number;
  /** Current Cookies Per Second (CPS) generated automatically */
  cps: number;
  /** Number of cookies generated per manual click */
  clickPower: number;
  /** Record of purchased upgrades. Key is the upgrade ID, value is the quantity owned. */
  inventory: Record<string, number>;
  /** Unix timestamp of the last time the game was saved (used for offline progress) */
  lastSaveTime: number;
}

/**
 * Definition of a purchasable upgrade in the shop.
 */
export interface Upgrade {
  /** Unique identifier for the upgrade */
  id: string;
  /** Display name of the upgrade */
  name: string;
  /** Short description of what the upgrade does */
  description: string;
  /** Initial cost of the upgrade in cookies */
  baseCost: number;
  /** Multiplier applied to the cost for each subsequent purchase (typically 1.15) */
  costMultiplier: number;
  /** Amount of CPS added per unit of this upgrade */
  cpsIncrease: number;
  /** Emoji or image URL representing the upgrade */
  icon: string;
}

/**
 * Represents a player's entry on the global leaderboard.
 */
export interface LeaderboardEntry {
  /** MongoDB document ID (optional when creating a new entry) */
  _id?: string;
  /** The player's chosen display name */
  username: string;
  /** The player's total cookies baked (all-time score) */
  score: number;
  /** Unix timestamp of when the score was submitted */
  timestamp: number;
}

/**
 * Configuration for the site metadata.
 */
export interface SiteConfig {
  title: string;
  description: string;
  version: string;
}

/**
 * Navigation item for the main menu/tabs.
 */
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

/**
 * Represents a floating text animation (e.g., "+1" when clicking the cookie).
 */
export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
}