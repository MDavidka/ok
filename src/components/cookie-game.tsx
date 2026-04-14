import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Spacer, Divider, Chip } from '@heroui/react';
import { loadState, saveState, resetState, formatNumber } from '../utils';
import { GameState } from '../types';

const COOKIE_URL = 'https://raw.githubusercontent.com/HerouiFramework/heroui/main/packages/theme/src/assets/cookie.png';

export default function CookieGame() {
  const [state, setState] = useState<GameState>(() => loadState() || { score: 0, lastClickAt: Date.now(), clicks: 0 });
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addScore = (points: number) => {
    setAnimating(true);
    setState((s) => ({
      score: s.score + points,
      lastClickAt: Date.now(),
      clicks: s.clicks + 1
    }));
    setTimeout(() => setAnimating(false), 300);
  };

  const handleReset = () => {
    setState(resetState());
  };

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - state.lastClickAt) / 1000));
  const cps = elapsedSeconds > 0 ? state.clicks / elapsedSeconds : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden" shadow="lg">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <h1 className="text-2xl font-bold">Cookie Clicker</h1>
          <p className="text-default-500 text-sm">Click the cookie to earn points</p>
        </CardHeader>
        <CardBody className="flex flex-col items-center gap-6 py-8">
          <Button
            isIconOnly
            size="lg"
            className={`w-44 h-44 rounded-full shadow-2xl border-4 border-default-200/20 dark:border-default-600/20 transition-transform ${isAnimating ? 'scale-95' : 'scale-100'}`}
            onPress={() => addScore(1)}
          >
            <img
              src={COOKIE_URL}
              alt="cookie"
              className="w-28 h-28 object-contain drop-shadow-lg"
            />
          </Button>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary">{formatNumber(state.score)}</div>
            <div className="text-default-500 text-sm">points</div>
          </div>
          <Divider className="w-full" />
          <div className="flex gap-4 text-xs text-default-400">
            <Chip color="primary">CPS: {cps.toFixed(2)}</Chip>
            <Chip color="secondary">Clicks: {state.clicks}</Chip>
            <Chip color="accent">Session: {formatNumber(state.score)} pts</Chip>
          </div>
        </CardBody>
        <CardFooter>
          <Spacer />
          <Button size="sm" color="danger" variant="flat" onPress={handleReset}>
            Reset Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}