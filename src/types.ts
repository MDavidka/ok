export interface GameState {
  cookieCount: number;
  clickValue: number;
  autoClickValue: number;
  autoClickInterval: number;
  upgrades: Upgrade[];
  lastSaveTime: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: (gameState: GameState) => void;
  isUnlocked: boolean;
}