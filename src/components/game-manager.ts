import { GameState, Upgrade } from '../types';
import { calculateCost } from './shop';

// Define the available upgrades in the game
export const UPGRADES: Upgrade[] = [
    { id: 'cursor', name: 'Cursor', description: 'Auto-clicks once every 10 seconds.', baseCost: 15, cps: 0.1 },
    { id: 'grandma', name: 'Grandma', description: 'A nice grandma to bake more cookies.', baseCost: 100, cps: 1 },
    { id: 'farm', name: 'Cookie Farm', description: 'Grows cookie plants from cookie seeds.', baseCost: 1100, cps: 8 },
    { id: 'mine', name: 'Mine', description: 'Mines out cookie dough and chocolate chips.', baseCost: 12000, cps: 47 },
    { id: 'factory', name: 'Factory', description: 'Produces large quantities of cookies.', baseCost: 130000, cps: 260 },
    { id: 'bank', name: 'Bank', description: 'Generates cookies from interest.', baseCost: 1400000, cps: 1400 },
    { id: 'temple', name: 'Temple', description: 'Full of precious, ancient chocolate.', baseCost: 20000000, cps: 7800 }
];

const SAVE_KEY = 'cookie_clicker_save_state';

/**
 * The GameManager orchestrates the core game loop, state management,
 * and coordinates updates across all UI components.
 */
export class GameManager {
    private state: GameState;
    private lastTickTime: number;
    private onTickCallbacks: ((state: GameState) => void)[] = [];
    private saveIntervalId: number | null = null;

    constructor() {
        this.state = this.loadState();
        this.recalculateCPS();
        this.lastTickTime = Date.now();
        
        // Start the core game loop
        requestAnimationFrame(() => this.loop());

        // Auto-save every 5 seconds
        this.saveIntervalId = window.setInterval(() => {
            this.saveState();
        }, 5000);
    }

    /**
     * Subscribe to state changes. Callbacks are fired every frame.
     */
    public subscribe(callback: (state: GameState) => void): void {
        this.onTickCallbacks.push(callback);
        // Immediately call with current state to initialize UI
        callback(this.state);
    }

    /**
     * Get the current game state.
     */
    public getState(): GameState {
        return this.state;
    }

    /**
     * Handle a manual cookie click.
     */
    public clickCookie(): void {
        // Base click is 1. This could be expanded with click multiplier upgrades.
        const clickValue = 1;
        this.state.cookies += clickValue;
        this.state.totalCookies += clickValue;
        this.notify();
    }

    /**
     * Attempt to buy an upgrade. Deducts cookies and recalculates CPS if successful.
     * 
     * @param upgradeId The ID of the upgrade to purchase
     * @returns boolean indicating if the purchase was successful
     */
    public buyUpgrade(upgradeId: string): boolean {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        if (!upgrade) return false;

        const owned = this.state.upgrades[upgradeId] || 0;
        const cost = calculateCost(upgrade.baseCost, owned);

        if (this.state.cookies >= cost) {
            this.state.cookies -= cost;
            this.state.upgrades[upgradeId] = owned + 1;
            this.recalculateCPS();
            this.notify();
            this.saveState(); // Save immediately on purchase to prevent data loss
            return true;
        }
        
        return false;
    }

    /**
     * Hard reset the game state (useful for prestige mechanics or debugging).
     */
    public resetGame(): void {
        this.state = this.getDefaultState();
        this.saveState();
        this.lastTickTime = Date.now();
        this.notify();
    }

    /**
     * Recalculates the total Cookies Per Second based on owned upgrades.
     */
    private recalculateCPS(): void {
        let newCps = 0;
        for (const upgrade of UPGRADES) {
            const owned = this.state.upgrades[upgrade.id] || 0;
            newCps += owned * upgrade.cps;
        }
        this.state.cps = newCps;
    }

    /**
     * The main game loop running on requestAnimationFrame.
     * Calculates offline progress and continuous CPS generation.
     */
    private loop(): void {
        const now = Date.now();
        const deltaMs = now - this.lastTickTime;
        
        // Cap offline progress to 24 hours to prevent overflow/exploits
        const maxOfflineMs = 24 * 60 * 60 * 1000;
        const effectiveDeltaMs = Math.min(deltaMs, maxOfflineMs);

        if (effectiveDeltaMs > 0) {
            const deltaSec = effectiveDeltaMs / 1000;
            if (this.state.cps > 0) {
                const generated = this.state.cps * deltaSec;
                this.state.cookies += generated;
                this.state.totalCookies += generated;
            }
            this.lastTickTime = now;
            this.notify();
        }

        requestAnimationFrame(() => this.loop());
    }

    /**
     * Notify all subscribers of the current state.
     */
    private notify(): void {
        for (const cb of this.onTickCallbacks) {
            cb(this.state);
        }
    }

    /**
     * Returns a fresh, empty game state.
     */
    private getDefaultState(): GameState {
        return {
            cookies: 0,
            totalCookies: 0,
            cps: 0,
            upgrades: {}
        };
    }

    /**
     * Loads the game state from localStorage.
     */
    private loadState(): GameState {
        try {
            const saved = localStorage.getItem(SAVE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with default state to ensure all properties exist even if the save is old
                return { ...this.getDefaultState(), ...parsed };
            }
        } catch (e) {
            console.error('Failed to load game state:', e);
        }
        return this.getDefaultState();
    }

    /**
     * Saves the current game state to localStorage.
     */
    private saveState(): void {
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save game state:', e);
        }
    }
}