import { useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Spacer, Divider } from '@heroui/react';
import { Gift, RefreshCw, TrendingUp } from 'lucide-react';
import { formatNumber, formatCost, tickGame, getTotalCPS, buyUpgrade, canAfford } from '../utils';
import { UpgradeState } from '../types';
import { saveGameState } from '../utils';

export default function Home() {
  const [state, setState] = useState(() => {
    const s = (window as any)._gameState as ReturnType<typeof import('../utils').loadGameState> | undefined;
    return s || (() => { const st = import('../utils').then(m => m.loadGameState()); return st; })();
  });

  useEffect(() => {
    const loaded = (window as any)._gameState as any;
    if (!loaded) {
      const st = import('../utils').then(m => m.loadGameState());
      (window as any)._gameState = st;
    }
  }, []);

  useEffect(() => {
    if (!state) return;
    saveGameState(state);
  }, [state]);

  if (!state) return <div>Loading...</div>;

  const now = Date.now();
  const [localState, setLocalState] = useState(state);

  useEffect(() => {
    setLocalState(tickGame(state, now));
    const id = setInterval(() => setLocalState((s) => tickGame(s, Date.now())), 100);
    return () => clearInterval(id);
  }, [state, now]);

  const handleClick = () => {
    setLocalState((s) => ({ ...s, cookies: s.cookies + 1 }));
  };

  const handleUpgrade = (upgrade: UpgradeState) => {
    const next = buyUpgrade(localState, upgrade);
    if (next !== localState) setLocalState(next);
  };

  const handlePrestige = () => {
    const next = (import('../utils').then(m => m.prestige(localState)));
    next.then(setLocalState);
  };

  const totalCPS = getTotalCPS(localState.upgrades);

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardBody className="items-center text-center">
          <div className="text-6xl mb-4">
            <Gift className="h-16 w-16 text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{formatNumber(localState.cookies)}</h1>
          <p className="text-muted mb-4">cookies</p>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span className="text-lg">{formatNumber(totalCPS)} CPS</span>
          </div>
          <Divider className="my-4" />
          <Button
            size="lg"
            className="bg-primary text-white text-xl font-bold h-20 w-20 rounded-full shadow-xl shadow-primary/30"
            onPress={handleClick}
          >
            <Gift className="h-8 w-8" />
          </Button>
          <p className="mt-2 text-sm text-muted">Click to earn cookies</p>
        </CardBody>
      </Card>

      <Spacer y="lg" />

      <div className="grid gap-4">
        {localState.upgrades.map((u) => (
          u.owned > 0 && (
            <Card key={u.id} className="bg-surface/50 border-default-200/50">
              <CardBody className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{u.name} x {u.owned}</h3>
                  <p className="text-sm text-muted">{u.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted">+{u.cps} CPS</p>
                    <p className="text-sm text-muted">Cost: {formatCost(u.cost)}</p>
                  </div>
                  <Button
                    size="sm"
                    disabled={!canAfford(localState, u)}
                    onPress={() => handleUpgrade(u)}
                  >
                    Buy
                  </Button>
                </div>
              </CardBody>
            </Card>
          )
        ))}
      </div>

      <Spacer y="lg" />

      <Card className="bg-surface/30 border-default-200/30">
        <CardBody>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handlePrestige}
              className="px-4 py-2 bg-secondary text-white rounded font-semibold hover:bg-secondary/80"
            >
              Prestige (reset)
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}