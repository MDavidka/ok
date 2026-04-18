import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import './style.css';

// Components
import { Header } from './components/header';
import { Footer } from './components/footer';
import { CookieButton } from './components/cookie-button';
import { Shop } from './components/shop';
import { StatsDisplay } from './components/stats-display';

// Types & Utils
import { GameState, Upgrade } from './types';
import { calculateTotalCps, calculateOfflineCookies } from './utils';

const SAVE_KEY = 'cookie_clicker_save';

// Master list of all available upgrades in the game
const UPGRADES: Upgrade[] = [
  {
    id: 'cursor',
    name: 'Auto-Cursor',
    description: 'Automatically clicks the cookie once every 10 seconds.',
    baseCost: 15,
    baseCps: 0.1,
    costMultiplier: 1.15,
    iconUrl: 'https://placehold.co/100x100/f59e0b/ffffff.png?text=Cursor'
  },
  {
    id: 'grandma',
    name: 'Grandma',
    description: 'A nice grandma to bake more cookies.',
    baseCost: 100,
    baseCps: 1,
    costMultiplier: 1.15,
    iconUrl: 'https://placehold.co/100x100/f59e0b/ffffff.png?text=Grandma'
  },
  {
    id: 'farm',
    name: 'Cookie Farm',
    description: 'Grows cookie plants from cookie seeds.',
    baseCost: 1100,
    baseCps: 8,
    costMultiplier: 1.15,
    iconUrl: 'https://placehold.co/100x100/f59e0b/ffffff.png?text=Farm'
  },
  {
    id: 'mine',
    name: 'Cookie Mine',
    description: 'Mines out cookie dough and chocolate chips.',
    baseCost: 12000,
    baseCps: 47,
    costMultiplier: 1.15,
    iconUrl: 'https://placehold.co/100x100/f59e0b/ffffff.png?text=Mine'
  },
  {
    id: 'factory',
    name: 'Cookie Factory',
    description: 'Produces large quantities of cookies.',
    baseCost: 130000,
    baseCps: 260,
    costMultiplier: 1.15,
    iconUrl: 'https://placehold.co/100x100/f59e0b/ffffff.png?text=Factory'
  },
  {
    id: 'bank',
    name: 'Cookie Bank',
    description: 'Generates cookies from interest.',
    baseCost: 1400000,
    baseCps: 1400,
    costMultiplier: 1.15,
    iconUrl: 'https://placehold.co/100x100/f59e0b/ffffff.png?text=Bank'
  }
];

function App(): JSX.Element {
  // Initialize state from sessionStorage or use defaults
  const [gameState, setGameState] = useState<GameState>(() => {
    const defaultState: GameState = {
      cookies: 0,
      totalCookies: 0,
      clickPower: 1,
      cps: 0,
      upgrades: {},
      lastSaveTime: Date.now()
    };

    try {
      const saved = sessionStorage.getItem(SAVE_KEY);
      if (!saved) return defaultState;

      const parsed: GameState = JSON.parse(saved);
      
      // Calculate offline progress
      const offlineCookies = calculateOfflineCookies(parsed.lastSaveTime, parsed.cps);
      if (offlineCookies > 0) {
        parsed.cookies += offlineCookies;
        parsed.totalCookies += offlineCookies;
        console.info(`Welcome back! You baked ${Math.floor(offlineCookies)} cookies while away.`);
      }

      parsed.lastSaveTime = Date.now();
      // Ensure CPS is accurate based on current upgrade definitions
      parsed.cps = calculateTotalCps(parsed.upgrades, UPGRADES);

      return parsed;
    } catch (e) {
      console.error("Failed to parse save data, starting fresh.", e);
      return defaultState;
    }
  });

  const lastTickRef = useRef<number>(Date.now());
  const saveCounterRef = useRef<number>(0);

  // Main Game Loop
  useEffect(() => {
    const tickRate = 100; // Run 10 times per second for smooth UI updates
    
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaSeconds = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      setGameState(prev => {
        if (prev.cps === 0) return prev;

        const generatedCookies = prev.cps * deltaSeconds;
        const newState = {
          ...prev,
          cookies: prev.cookies + generatedCookies,
          totalCookies: prev.totalCookies + generatedCookies,
          lastSaveTime: now
        };

        // Throttle sessionStorage writes to roughly once per second (every 10 ticks)
        saveCounterRef.current += 1;
        if (saveCounterRef.current >= 10) {
          sessionStorage.setItem(SAVE_KEY, JSON.stringify(newState));
          saveCounterRef.current = 0;
        }

        return newState;
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, []);

  // Save on window unload to ensure no data is lost
  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [gameState]);

  // Handlers
  const handleManualClick = useCallback(() => {
    setGameState(prev => {
      const newState = {
        ...prev,
        cookies: prev.cookies + prev.clickPower,
        totalCookies: prev.totalCookies + prev.clickPower
      };
      // Immediate save on manual action
      sessionStorage.setItem(SAVE_KEY, JSON.stringify(newState));
      return newState;
    });
  }, []);

  const handlePurchase = useCallback((upgradeId: string, cost: number) => {
    setGameState(prev => {
      if (prev.cookies < cost) return prev; // Double-check affordability

      const newUpgrades = {
        ...prev.upgrades,
        [upgradeId]: (prev.upgrades[upgradeId] || 0) + 1
      };

      const newCps = calculateTotalCps(newUpgrades, UPGRADES);

      const newState = {
        ...prev,
        cookies: prev.cookies - cost,
        upgrades: newUpgrades,
        cps: newCps
      };
      
      // Immediate save on purchase
      sessionStorage.setItem(SAVE_KEY, JSON.stringify(newState));
      return newState;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 sm:gap-8">
        
        {/* Left Column: Stats & Interactive Clicker */}
        <div className="flex-1 flex flex-col gap-6 sm:gap-8">
          <StatsDisplay
            cookies={Math.floor(gameState.cookies)}
            cps={gameState.cps}
            clickPower={gameState.clickPower}
            totalCookies={Math.floor(gameState.totalCookies)}
          />
          
          <div className="flex-grow flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <CookieButton
              onClick={handleManualClick}
              clickPower={gameState.clickPower}
            />
          </div>
        </div>

        {/* Right Column: Upgrade Shop */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 h-[600px] lg:h-auto">
          <Shop
            upgrades={UPGRADES}
            ownedUpgrades={gameState.upgrades}
            currentCookies={Math.floor(gameState.cookies)}
            onPurchase={handlePurchase}
          />
        </div>
        
      </main>

      <Footer />
    </div>
  );
}

// Safely initialize the React application without top-level DOM access
export function init(): void {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Failed to find the root element. Ensure index.html has a <div id="root"></div>');
    return;
  }

  // Prevent double initialization in development
  if (rootElement.hasChildNodes()) {
    return;
  }

  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </React.StrictMode>
  );
}

// Bootstrapper
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}