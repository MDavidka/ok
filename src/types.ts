export type GameState = {
  cookies: number;
  cps: number;
  upgrades: UpgradeState[];
  prestigeCount: number;
  lastTick: number;
};

export type Upgrade = {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  cps: number;
};

export type UpgradeState = Upgrade & {
  owned: number;
  cost: number;
};

export type Settings = {
  sound: boolean;
  darkMode: boolean;
};

export type TabKey = 'home' | 'upgrades' | 'prestige' | 'settings';