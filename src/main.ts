import './style.css';
import { GameState, Upgrade, GameComponent } from './types';
import { 
    calculateTotalCps, 
    saveGame, 
    loadGame, 
    clearSave, 
    createInitialGameState 
} from './utils';
import { createHeader } from './components/header';
import { createCookieArea } from './components/cookieArea';
import { createScoreBoard } from './components/scoreBoard';
import { createUpgradeStore } from './components/upgradeStore';

// Master list of all available upgrades in the game
const AVAILABLE_UPGRADES: Upgrade[] = [
    { 
        id: 'cursor', 
        name: 'Auto-Clicker', 
        description: 'Automatically clicks the cookie for you.', 
        baseCost: 15, 
        baseCps: 0.1, 
        icon: '🖱️' 
    },
    { 
        id: 'grandma', 
        name: 'Grandma', 
        description: 'A nice grandma to bake more cookies.', 
        baseCost: 100, 
        baseCps: 1, 
        icon: '👵' 
    },
    { 
        id: 'farm', 
        name: 'Cookie Farm', 
        description: 'Grows cookie plants from cookie seeds.', 
        baseCost: 1100, 
        baseCps: 8, 
        icon: '🌱' 
    },
    { 
        id: 'mine', 
        name: 'Cookie Mine', 
        description: 'Mines out cookie dough and chocolate chips.', 
        baseCost: 12000, 
        baseCps: 47, 
        icon: '⛏️' 
    },
    { 
        id: 'factory', 
        name: 'Factory', 
        description: 'Produces large quantities of cookies.', 
        baseCost: 130000, 
        baseCps: 260, 
        icon: '🏭' 
    },
    { 
        id: 'bank', 
        name: 'Bank', 
        description: 'Generates cookies from interest.', 
        baseCost: 1400000, 
        baseCps: 1400, 
        icon: '🏦' 
    }
];

/**
 * Main initialization function that sets up the game state,
 * mounts all UI components, and starts the game loop.
 */
export function init(): void {
    const app = document.getElementById('app');
    if (!app) {
        console.error('Root element #app not found. Cannot initialize game.');
        return;
    }

    // --- State Initialization ---
    let state: GameState = loadGame() || createInitialGameState();
    let currentCps: number = calculateTotalCps(state.upgrades, AVAILABLE_UPGRADES);

    // --- Component Instantiation ---
    
    const headerComponent: GameComponent = createHeader(
        () => {
            saveGame(state);
            // Optional: Show a brief toast notification here
        },
        () => {
            const loadedState = loadGame();
            if (loadedState) {
                state = loadedState;
                updateCps();
                updateAllComponents();
            }
        },
        () => {
            if (window.confirm('Are you sure you want to wipe your save? This cannot be undone.')) {
                clearSave();
                state = createInitialGameState();
                updateCps();
                updateAllComponents();
            }
        }
    );

    const scoreBoardComponent: GameComponent = createScoreBoard();

    const cookieAreaComponent: GameComponent = createCookieArea(() => {
        // Handle manual click
        state.cookies += state.clickPower;
        state.totalCookiesEarned += state.clickPower;
        state.clickCount += 1;
        
        // Update UI immediately for responsiveness
        scoreBoardComponent.update(state, currentCps);
        upgradeStoreComponent.update(state);
    });

    const upgradeStoreComponent: GameComponent = createUpgradeStore(
        AVAILABLE_UPGRADES, 
        (upgradeId: string, cost: number) => {
            // Handle purchase
            if (state.cookies >= cost) {
                state.cookies -= cost;
                state.upgrades[upgradeId] = (state.upgrades[upgradeId] || 0) + 1;
                
                updateCps();
                updateAllComponents();
            }
        }
    );

    // --- Helper Functions ---

    function updateCps(): void {
        currentCps = calculateTotalCps(state.upgrades, AVAILABLE_UPGRADES);
    }

    function updateAllComponents(): void {
        if (headerComponent.update) headerComponent.update(state);
        if (cookieAreaComponent.update) cookieAreaComponent.update(state);
        scoreBoardComponent.update(state, currentCps);
        upgradeStoreComponent.update(state);
    }

    // --- Layout Construction ---
    
    // Clear any existing content
    app.innerHTML = '';

    const layout = document.createElement('div');
    layout.className = 'min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] font-body selection:bg-[var(--color-primary)] selection:text-white';

    const headerContainer = document.createElement('header');
    layout.appendChild(headerContainer);

    const mainContainer = document.createElement('main');
    mainContainer.className = 'flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full';

    // Left Column: Score and Cookie
    const leftCol = document.createElement('div');
    leftCol.className = 'lg:col-span-7 xl:col-span-8 flex flex-col gap-6 items-center justify-start pt-4';

    const scoreContainer = document.createElement('div');
    scoreContainer.className = 'w-full';
    leftCol.appendChild(scoreContainer);

    const cookieContainer = document.createElement('div');
    cookieContainer.className = 'w-full flex-1 flex items-center justify-center min-h-[400px]';
    leftCol.appendChild(cookieContainer);

    // Right Column: Upgrades Store
    const rightCol = document.createElement('div');
    // On desktop, make the store sticky and scrollable
    rightCol.className = 'lg:col-span-5 xl:col-span-4 flex flex-col h-[600px] lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24';

    mainContainer.appendChild(leftCol);
    mainContainer.appendChild(rightCol);
    layout.appendChild(mainContainer);
    app.appendChild(layout);

    // --- Mount Components ---
    
    headerComponent.render(headerContainer);
    scoreBoardComponent.render(scoreContainer);
    cookieAreaComponent.render(cookieContainer);
    upgradeStoreComponent.render(rightCol);

    // Initial UI sync
    updateAllComponents();

    // --- Game Loop ---
    
    let lastTime = performance.now();
    let autoSaveTimer = 0;
    const AUTO_SAVE_INTERVAL = 30; // seconds

    function gameLoop(currentTime: number): void {
        // Calculate delta time in seconds
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // Add passive cookie generation
        if (currentCps > 0) {
            const earned = currentCps * deltaTime;
            state.cookies += earned;
            state.totalCookiesEarned += earned;
            
            // Update UI
            scoreBoardComponent.update(state, currentCps);
            upgradeStoreComponent.update(state);
        }

        // Handle Auto-save
        autoSaveTimer += deltaTime;
        if (autoSaveTimer >= AUTO_SAVE_INTERVAL) {
            saveGame(state);
            autoSaveTimer = 0;
        }

        // Request next frame
        requestAnimationFrame(gameLoop);
    }

    // Start the loop
    requestAnimationFrame(gameLoop);
}

// Bootstrap the application safely
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}