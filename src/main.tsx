x
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider, Tabs, Tab, Button, Card, CardBody } from '@heroui/react';
import { Cloud, Download, AlertCircle } from 'lucide-react';

// Import global styles
import './style.css';

// Import shared utilities and database functions
import { loadState, saveState } from './utils';
import { saveGameStateToCloud, loadGameStateFromCloud } from './db';

// Import all generated components
import Header from './components/header';
import AppFooter from './components/footer';
import CookieGame from './components/cookie-game';
import { Clicker } from './components/clicker';
import { Shop, SHOP_ITEMS } from './components/shop';
import { Stats } from './components/stats';

// Note: Header uses react-router-dom. We provide a mock router context here 
// to ensure the app renders even if routing isn't fully configured at the project level.
// In a real app, you would import { BrowserRouter } from 'react-router-dom'.
const MockRouter = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export function App() {
  // --- State Management ---
  // We maintain score as a float internally for smooth fractional CPS additions,
  // but we will pass Math.floor(score) to components for display.
  const [score, setScore] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // --- Initialization ---
  useEffect(() => {
    // Load base state (score, clicks) from utils
    const localState = loadState();
    if (localState) {
      setScore(localState.score || 0);
      setClicks(localState.clicks || 0);
    }

    // Load inventory from localStorage (since GameState type doesn't include it)
    const savedInv = localStorage.getItem('cookie_inventory');
    if (savedInv) {
      try {
        setInventory(JSON.parse(savedInv));
      } catch (e) {
        console.error('Failed to parse inventory', e);
      }
    }
  }, []);

  // --- Persistence ---
  useEffect(() => {
    // Save base state using utils
    saveState({ score, clicks, lastClickAt: Date.now() });
    // Save inventory locally
    localStorage.setItem('cookie_inventory', JSON.stringify(inventory));
  }, [score, clicks, inventory]);

  // --- Game Logic ---
  // Calculate total Clicks Per Second based on owned inventory
  const currentCps = useMemo(() => {
    return SHOP_ITEMS.reduce((total, item) => {
      const owned = inventory[item.id] || 0;
      return total + (owned * item.cpsIncrease);
    }, 0);
  }, [inventory]);

  // The main game loop: adds cookies automatically based on CPS
  useEffect(() => {
    if (currentCps === 0) return;
    
    // Run 10 times a second for a smoother visual update
    const interval = setInterval(() => {
      setScore(prev => prev + (currentCps / 10));
    }, 100);
    
    return () => clearInterval(interval);
  }, [currentCps]);

  // --- Handlers ---
  const handleCookieClick = useCallback(() => {
    setScore(prev => prev + 1);
    setClicks(prev => prev + 1);
  }, []);

  const handlePurchase = useCallback((upgradeId: string, cost: number, cpsIncrease: number) => {
    setScore(prev => {
      if (prev >= cost) {
        // Update inventory
        setInventory(inv => ({
          ...inv,
          [upgradeId]: (inv[upgradeId] || 0) + 1
        }));
        // Deduct cost
        return prev - cost;
      }
      return prev;
    });
  }, []);

  // --- Cloud Sync ---
  const handleCloudSave = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const success = await saveGameStateToCloud('demo_player_1', { 
        score: Math.floor(score), 
        clicks, 
        lastClickAt: Date.now() 
      });
      
      if (success) {
        setSyncMessage({ text: 'Progress saved to cloud!', type: 'success' });
      } else {
        throw new Error('Save returned false');
      }
    } catch (error) {
      console.error('Cloud save failed:', error);
      setSyncMessage({ text: 'Failed to save to cloud.', type: 'error' });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 3000);
    }
  };

  const handleCloudLoad = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const cloudState = await loadGameStateFromCloud('demo_player_1');
      if (cloudState) {
        setScore(cloudState.score);
        setClicks(cloudState.clicks);
        setSyncMessage({ text: 'Progress loaded from cloud!', type: 'success' });
      } else {
        setSyncMessage({ text: 'No cloud save found.', type: 'error' });
      }
    } catch (error) {
      console.error('Cloud load failed:', error);
      setSyncMessage({ text: 'Failed to load from cloud.', type: 'error' });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 3000);
    }
  };

  return (
    <HeroUIProvider>
      <MockRouter>
        <div className="min-h-screen flex flex-col bg-bg text-text font-body selection:bg-primary/30">
          <Header />
          
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
            
            {/* Cloud Sync Control Panel */}
            <Card className="bg-surface/40 border border-white/10 backdrop-blur-md shadow-sm">
              <CardBody className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
                <div>
                  <h2 className="text-lg font-heading font-bold text-text flex items-center gap-2">
                    <Cloud size={20} className="text-primary" />
                    Cloud Sync
                  </h2>
                  <p className="text-sm text-muted mt-0.5">
                    Save your progress to MongoDB Atlas to play across devices.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {syncMessage && (
                    <span className={`text-sm font-medium flex items-center gap-1.5 ${syncMessage.type === 'success' ? 'text-success' : 'text-danger'}`}>
                      {syncMessage.type === 'error' && <AlertCircle size={14} />}
                      {syncMessage.text}
                    </span>
                  )}
                  <Button 
                    color="secondary" 
                    variant="flat" 
                    onPress={handleCloudLoad} 
                    isLoading={isSyncing} 
                    startContent={!isSyncing && <Download size={16} />}
                  >
                    Load
                  </Button>
                  <Button 
                    color="primary" 
                    variant="solid" 
                    onPress={handleCloudSave} 
                    isLoading={isSyncing} 
                    startContent={!isSyncing && <Cloud size={16} />}
                  >
                    Save
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Main Game Interface Tabs */}
            <Tabs 
              aria-label="Game Views" 
              color="primary" 
              variant="underlined" 
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/10",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-primary font-medium tracking-wide"
              }}
            >
              <Tab key="modern" title="Modern Dashboard">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                  {/* Left Column: Stats */}
                  <div className="lg:col-span-3 flex flex-col gap-6">
                    <Stats 
                      score={Math.floor(score)} 
                      cps={currentCps} 
                      clicks={clicks} 
                      inventory={inventory} 
                    />
                  </div>
                  
                  {/* Middle Column: Clicker */}
                  <div className="lg:col-span-5 flex justify-center items-start">
                    <Clicker 
                      score={Math.floor(score)} 
                      cps={currentCps} 
                      onCookieClick={handleCookieClick} 
                    />
                  </div>
                  
                  {/* Right Column: Shop */}
                  <div className="lg:col-span-4 h-[650px]">
                    <Shop 
                      score={Math.floor(score)} 
                      inventory={inventory} 
                      onPurchase={handlePurchase} 
                    />
                  </div>
                </div>
              </Tab>
              
              <Tab key="classic" title="Classic View">
                <div className="mt-6">
                  {/* Renders the previously generated standalone game component */}
                  <CookieGame />
                </div>
              </Tab>
            </Tabs>

          </main>
          
          <AppFooter />
        </div>
      </MockRouter>
    </HeroUIProvider>
  );
}

// Safely mount the React application
export function init() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Failed to find the root element. Ensure index.html has a <div id="root"></div>');
    return;
  }
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Auto-initialize if we are in a browser environment
if (typeof window !== 'undefined') {
  init();
}