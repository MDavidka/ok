import { GameState, Settings, Upgrade, UpgradeState } from './types';

const STORAGE_KEYS = {
  game: 'cookie-clikker-game-v1',
  settings: 'cookie-clikker-settings-v1'
};

export const defaultSettings: Settings = {
  sound: true,
  darkMode: true
};

export const defaultUpgrades: Upgrade[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'A basic cursor that clicks for you',
    baseCost: 15,
    costMultiplier: 1.15,
    cps: 0.1
  },
  {
    id: 'grandma',
    name: 'Grandma',
    description: 'An old lady who bakes cookies',
    baseCost: 100,
    costMultiplier: 1.18,
    cps: 1
  },
  {
    id: 'farm',
    name: 'Farm',
    description: 'A farm that grows cookies',
    baseCost: 500,
    costMultiplier: 1.2,
    cps: 5
  },
  {
    id: 'mine',
    name: 'Mine',
    description: 'A mine that digs for cookies',
    baseCost: 2000,
    costMultiplier: 1.25,
    cps: 20
  },
  {
    id: 'factory',
    name: 'Factory',
    description: 'A cookie factory',
    baseCost: 10000,
    costMultiplier: 1.3,
    cps: 100
  },
  {
    id: 'portal',
    name: 'Portal',
    description: 'A portal to cookie universes',
    baseCost: 50000,
    costMultiplier: 1.5,
    cps: 500
  }
];

export function loadGameState(): GameState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.game);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    cookies: 0,
    cps: 0,
    upgrades: defaultUpgrades.map((u) => ({ ...u, owned: 0, cost: u.baseCost })),
    prestigeCount: 0,
    lastTick: Date.now()
  };
}

export function saveGameState(state: GameState): void {
  sessionStorage.setItem(STORAGE_KEYS.game, JSON.stringify(state));
}

export function loadSettings(): Settings {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.settings);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ...defaultSettings };
}

export function saveSettings(settings: Settings): void {
  sessionStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

export function formatNumber(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2) + 'k';
  return n.toFixed(0);
}

export function formatCost(cost: number): string {
  if (cost >= 1e6) return (cost / 1e6).toFixed(1) + 'M';
  if (cost >= 1e3) return (cost / 1e3).toFixed(1) + 'k';
  return cost.toFixed(0);
}

export function getTotalCPS(upgrades: UpgradeState[]): number {
  return upgrades.reduce((sum, u) => sum + u.cps * u.owned, 0);
}

export function tickGame(state: GameState, now: number): GameState {
  const dt = Math.min((now - state.lastTick) / 1000, 1);
  const earned = state.cps * dt;
  return { ...state, cookies: state.cookies + earned, lastTick: now };
}

export function canAfford(state: GameState, upgrade: Upgrade): boolean {
  return state.cookies >= upgrade.cost;
}

export function buyUpgrade(state: GameState, upgrade: Upgrade): GameState {
  if (!canAfford(state, upgrade)) return state;
  const owned = state.upgrades.find((u) => u.id === upgrade.id)?.owned || 0;
  const newOwned = owned + 1;
  const newCost = Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier, newOwned));
  const newCps = state.cps + upgrade.cps;
  const newUpgrades = state.upgrades.map((u) =>
    u.id === upgrade.id ? { ...u, owned: newOwned, cost: newCost } : u
  );
  return {
    ...state,
    cookies: state.cookies - (state.upgrades.find((u) => u.id === upgrade.id)?.cost || upgrade.cost),
    cps: newCps,
    upgrades: newUpgrades
  };
}

export function prestige(state: GameState): GameState {
  const totalCookies = state.cookies + state.cps * ((Date.now() - state.lastTick) / 1000);
  const prestigeMultiplier = 1 + Math.floor(state.prestigeCount / 5 + 1) * 0.1;
  return {
    cookies: 0,
    cps: 0,
    upgrades: defaultUpgrades.map((u) => ({ ...u, owned: 0, cost: u.baseCost })),
    prestigeCount: state.prestigeCount + 1,
    lastTick: Date.now()
  };
}