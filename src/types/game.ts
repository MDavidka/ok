export interface Building {
  id: string;
  name: string;
  cost: number;
  baseCost: number;
  count: number;
  baseCps: number;
  cps: number; // Current CpS contribution of a single building of this type
  description: string;
  icon: string;
}

export interface Upgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  purchased: boolean;
  unlocked: boolean;
  type: 'click' | 'building' | 'global';
  icon: string;
  buildingId?: string; // If type is 'building', which building it upgrades
  multiplier?: number; // E.g., 2 for double, 1.1 for +10%
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
  requirementType: 'cookies' | 'clicks' | 'building' | 'prestige';
  requirementValue: number;
  requirementId?: string; // e.g. building id like 'cursor'
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  history: number[]; // Price history for graphing
  volatility: number; // How much it swings
  stability: number; // Likelihood to trend upwards or downwards (-1 to 1)
  quantity: number; // Owned amount
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  cost: number;
  effectName: string;
  icon: string;
}

export interface ActiveEffect {
  id: string; // 'frenzy', 'click_frenzy', etc.
  name: string;
  description: string;
  multiplier: number;
  duration: number; // remaining duration in seconds
  maxDuration: number;
  icon: string;
  color: string; // CSS color classes
}

export interface GameStats {
  startDate: number;
  lastSaveDate: number;
  totalClicks: number;
  totalCookiesBaked: number; // this run
  allTimeCookiesBaked: number; // across all resets
  goldenCookiesClicked: number;
  spellsCast: number;
  timePlayed: number; // seconds
}
