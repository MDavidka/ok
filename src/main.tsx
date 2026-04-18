import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider, Card, CardBody, Spinner, Button } from '@heroui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Database, AlertCircle } from 'lucide-react';

import './style.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Clicker } from './components/clicker';
import { Shop } from './components/shop';

import { Upgrade, GameState } from './types';
import { 
  calculateTotalCps, 
  generateUserId, 
  calculateOfflineCookies 
} from './utils';
import { IS_DB_CONNECTED, loadUserData, saveUserData } from './db';

// Define the available upgrades in the game
const UPGRADES: Upgrade[] = [
  { 
    id: 'cursor', 
    name: 'Cursor', 
    description: 'Auto-clicks once every 10 seconds. Also increases your manual click power by 1.', 
    baseCost: 15, 
    costMultiplier: 1.15, 
    cpsIncrease: 0.1, 
    clickIncrease: 1, 
    icon: '👆' 
  },
  { 
    id: 'grandma', 
    name: 'Grandma', 
    description: 'A nice grandma to bake more cookies for you.', 
    baseCost: 100, 
    costMultiplier: 1.15, 
    cpsIncrease: 1, 
    clickIncrease: 0, 
    icon: '👵' 
  },
  { 
    id: 'farm', 
    name: 'Cookie Farm', 
    description: 'Grows cookie plants from cookie seeds.', 
    baseCost: 1100, 
    costMultiplier: 1.15, 
    cpsIncrease: 8, 
    clickIncrease: 0, 
    icon: '🌾' 
  },
  { 
    id: 'mine', 
    name: 'Mine', 
    description: 'Mines out cookie dough and chocolate chips.', 
    baseCost: 12000, 
    costMultiplier: 1.15, 
    cpsIncrease: 47, 
    clickIncrease: 0, 
    icon: '⛏️' 
  },
  { 
    id: 'factory', 
    name: 'Factory', 
    description: 'Produces large quantities of cookies automatically.', 
    baseCost: 130000, 
    costMultiplier: 1.15, 
    cpsIncrease: 260, 
    clickIncrease: 0, 
    icon: '🏭' 
  },
  { 
    id: 'bank', 
    name: 'Bank', 
    description: 'Generates cookies from interest.', 
    baseCost: 1400000, 
    costMultiplier: 1.15, 
    cpsIncrease: 1400, 
    clickIncrease: 0, 
    icon: '🏦' 
  }
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [cookies, setCookies] = useState<number>(0);
  const [ownedUpgrades, setOwnedUpgrades] = useState<Record<string, number>>({});
  const [offlineEarnings, setOfflineEarnings] = useState<number>(0);

  // Derived stats
  const cps = useMemo(() => calculateTotalCps(ownedUpgrades, UPGRADES), [ownedUpgrades]);
  
  const clickPower = useMemo(() => {
    let power = 1;
    UPGRADES.forEach(u => {
      if (u.clickIncrease && ownedUpgrades[u.id]) {
        power += u.clickIncrease * ownedUpgrades[u.id];
      }
    });
    return power;
  }, [ownedUpgrades]);

  // Initialization & Loading
  useEffect(() => {
    const initGame = async () => {
      let uid = localStorage.getItem('cookie_userId');
      if (!uid) {
        uid = generateUserId();
        localStorage.setItem('cookie_userId', uid);
      }
      setUserId(uid);

      if (IS_DB_CONNECTED) {
        try {
          const res = await loadUserData(uid);
          if (res.data && res.data.gameState) {
            const state = res.data.gameState;
            setOwnedUpgrades(state.ownedUpgrades || {});
            
            const currentCps = calculateTotalCps(state.ownedUpgrades || {}, UPGRADES);
            const offline = calculateOfflineCookies(state.lastSaveTime, currentCps);
            
            setCookies((state.cookies || 0) + offline);
            if (offline > 0) setOfflineEarnings(offline);
          }
        } catch (error) {
          console.error("Failed to load game state from DB:", error);
          loadLocalFallback();
        }
      } else {
        loadLocalFallback();
      }
      
      setIsLoaded(true);
    };

    const loadLocalFallback = () => {
      const localStateStr = localStorage.getItem('cookie_gameState');
      if (localStateStr) {
        try {
          const state: GameState = JSON.parse(localStateStr);
          setOwnedUpgrades(state.ownedUpgrades || {});
          
          const currentCps = calculateTotalCps(state.ownedUpgrades || {}, UPGRADES);
          const offline = calculateOfflineCookies(state.lastSaveTime, currentCps);
          
          setCookies((state.cookies || 0) + offline);
          if (offline > 0) setOfflineEarnings(offline);
        } catch (e) {
          console.error("Failed to parse local game state", e);
        }
      }
    };

    initGame();
  }, []);

  // Game Loop (CPS)
  useEffect(() => {
    if (!isLoaded || cps === 0) return;

    // Run 10 times a second for smoother visual updates
    const interval = setInterval(() => {
      setCookies(prev => prev + (cps / 10));
    }, 100);

    return () => clearInterval(interval);
  }, [isLoaded, cps]);

  // Auto-save Loop
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      const state: GameState = {
        cookies,
        ownedUpgrades,
        lastSaveTime: Date.now()
      };

      if (IS_DB_CONNECTED) {
        saveUserData(userId, state).catch(err => console.error("Auto-save failed:", err));
      } else {
        localStorage.setItem('cookie_gameState', JSON.stringify(state));
      }
    }, 10000); // Save every 10 seconds

    return () => clearInterval(interval);
  }, [isLoaded, cookies, ownedUpgrades, userId]);

  // Handlers
  const handleManualClick = useCallback(() => {
    setCookies(prev => prev + clickPower);
  }, [clickPower]);

  const handlePurchase = useCallback((upgradeId: string, cost: number) => {
    setCookies(prevCookies => {
      if (prevCookies >= cost) {
        setOwnedUpgrades(prev => ({
          ...prev,
          [upgradeId]: (prev[upgradeId] || 0) + 1
        }));
        return prevCookies - cost;
      }
      return prevCookies;
    });
  }, []);

  const dismissOfflineEarnings = () => setOfflineEarnings(0);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
        <Spinner size="lg" color="primary" />
        <h2 className="text-xl font-heading font-semibold animate-pulse">Heating up the ovens...</h2>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
        <Header />
        
        <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6">
          
          {/* Database Connection Warning */}
          {!IS_DB_CONNECTED && (
            <Card className="bg-warning-50 border-warning-200 shadow-sm">
              <CardBody className="flex flex-row items-center gap-4 py-3 px-4">
                <div className="p-2 bg-warning-100 rounded-full text-warning-600">
                  <Database className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-sm font-semibold text-warning-800">Local Save Mode Active</h3>
                  <p className="text-xs text-warning-700 mt-0.5">
                    Connect a database from the Integrations tab to enable cloud saving across devices.
                  </p>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Offline Earnings Notification */}
          {offlineEarnings > 0 && (
            <Card className="bg-success-50 border-success-200 shadow-sm animate-appearance-in">
              <CardBody className="flex flex-row items-center justify-between gap-4 py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success-100 rounded-full text-success-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-success-800">Welcome Back!</h3>
                    <p className="text-xs text-success-700 mt-0.5">
                      Your bakery produced <strong>{Math.floor(offlineEarnings).toLocaleString()}</strong> cookies while you were away.
                    </p>
                  </div>
                </div>
                <Button size="sm" color="success" variant="flat" onPress={dismissOfflineEarnings}>
                  Awesome
                </Button>
              </CardBody>
            </Card>
          )}

          {/* Routing */}
          <div className="flex-grow flex flex-col">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Clicker 
                    cookies={Math.floor(cookies)} 
                    cps={cps} 
                    clickPower={clickPower} 
                    onManualClick={handleManualClick} 
                  />
                } 
              />
              <Route 
                path="/shop" 
                element={
                  <Shop 
                    cookies={Math.floor(cookies)} 
                    upgrades={UPGRADES} 
                    ownedUpgrades={ownedUpgrades} 
                    onPurchase={handlePurchase} 
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

// Mount the React application
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure there is a <div id='root'></div> in your index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>
);