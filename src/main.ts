import './style.css';
import { GameManager, UPGRADES } from './components/game-manager';
import { initShop } from './components/shop';
import { initLeaderboard } from './components/leaderboard';
import { initHeader } from './components/header';
import { initCookie } from './components/cookie';

/**
 * Bootstraps the application, sets up the DOM layout, 
 * initializes the game state, and mounts all components.
 */
function bootstrap() {
    const app = document.getElementById('app');
    if (!app) {
        throw new Error('Root element #app not found. Ensure index.html contains <div id="app"></div>');
    }

    // 1. Setup Main Layout
    // Using a mobile-first stacked layout that transitions to a side-by-side grid on large screens.
    app.innerHTML = `
        <div class="min-h-screen flex flex-col bg-orange-50/50 text-gray-900 font-sans selection:bg-orange-200">
            <!-- Header Area -->
            <div id="header-container" class="sticky top-0 z-50"></div>
            
            <!-- Main Game Area -->
            <main class="flex-1 container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-5rem)]">
                
                <!-- Left Column: Cookie Interaction -->
                <section id="cookie-container" class="w-full lg:w-5/12 flex flex-col relative min-h-[400px] lg:min-h-0 bg-white/40 rounded-3xl shadow-sm border border-white/60 p-4 backdrop-blur-sm">
                    <!-- Cookie component will mount here -->
                </section>
                
                <!-- Right Column: Shop & Leaderboard -->
                <section class="w-full lg:w-7/12 flex flex-col md:flex-row gap-6 lg:overflow-hidden">
                    <!-- Shop Panel -->
                    <div id="shop-container" class="flex-1 w-full h-[500px] md:h-auto"></div>
                    
                    <!-- Leaderboard Panel -->
                    <div id="leaderboard-container" class="flex-1 w-full h-[500px] md:h-auto"></div>
                </section>
                
            </main>
        </div>
    `;

    // 2. Grab Container References
    const headerContainer = document.getElementById('header-container');
    const cookieContainer = document.getElementById('cookie-container');
    const shopContainer = document.getElementById('shop-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');

    if (!headerContainer || !cookieContainer || !shopContainer || !leaderboardContainer) {
        throw new Error('Failed to initialize layout containers. DOM structure may be corrupted.');
    }

    // 3. Initialize Core Game Manager
    const game = new GameManager();

    // 4. Mount Components
    
    // Mount Header
    initHeader(headerContainer);

    // Mount Cookie Area
    // We pass a callback for when the cookie is clicked
    const updateCookieUI = initCookie(cookieContainer, () => {
        game.clickCookie();
    });

    // Mount Shop
    // We pass the available upgrades and a callback for purchasing
    const updateShopUI = initShop(shopContainer, UPGRADES, (upgradeId: string) => {
        game.buyUpgrade(upgradeId);
    });

    // Mount Leaderboard
    // We pass a getter so the leaderboard can fetch the current score when submitting
    initLeaderboard(leaderboardContainer, () => {
        return Math.floor(game.getState().cookies);
    });

    // 5. Subscribe UI to Game State Updates
    // The GameManager calls this callback every frame (or tick)
    game.subscribe((state) => {
        if (typeof updateCookieUI === 'function') {
            updateCookieUI(state);
        }
        if (typeof updateShopUI === 'function') {
            updateShopUI(state);
        }
    });
}

// Ensure the DOM is fully loaded before bootstrapping
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}