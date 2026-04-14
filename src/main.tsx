import React, { useEffect, useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import Header from './components/header';
import Home from './components/home';
import Upgrades from './components/upgrades';
import Prestige from './components/prestige';
import Settings from './components/settings';
import './style.css';
import { loadGameState, loadSettings, TabKey } from './utils';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('home');
  const [gameState, setGameState] = useState(() => loadGameState());
  const [settings] = useState(loadSettings);

  useEffect(() => {
    const saved = loadGameState();
    setGameState(saved);
  }, []);

  if (!gameState) return <div>Loading...</div>;

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'upgrades':
        return <Upgrades upgrades={gameState.upgrades} onBuy={(u) => setGameState((s) => { const ns = (import('../utils').then(m => m.buyUpgrade(s, u))); return ns; })} cookies={gameState.cookies} />;
      case 'prestige':
        return <Prestige state={gameState} setState={setGameState} />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <HeroUIProvider>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} cookies={gameState.cookies} />
      <main className="min-h-screen">{renderContent()}</main>
    </HeroUIProvider>
  );
}