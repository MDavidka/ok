export interface Upgrade {
  id: string;
  name: string;
  baseCost: number;
  baseCps: number;
  owned: number;
}

export interface GameState {
  cookies: number;
  totalCookiesEarned: number;
  cookiesPerSecond: number;
  upgrades: Record<string, Upgrade>;
  lastUpdated: number;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number;
}

export interface SiteConfig {
  title: string;
  description: string;
  version: string;
}

export interface NavItem {
  label: string;
  href: string;
}