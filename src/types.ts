export interface SiteConfig {
  name: string;
  description: string;
  version: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  baseCps: number;
  costMultiplier: number;
  iconUrl?: string;
}

export interface GameState {
  cookies: number;
  totalCookies: number;
  clickPower: number;
  cps: number;
  upgrades: Record<string, number>; // Maps upgradeId to the quantity owned
  lastSaveTime: number;
}