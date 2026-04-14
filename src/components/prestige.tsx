import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from '@heroui/react';
import { RefreshCw, Reset } from 'lucide-react';
import { prestige } from '../utils';
import { GameState } from '../types';

interface Props {
  state: GameState;
  setState: (next: GameState) => void;
}

export default function Prestige({ state, setState }: Props) {
  const [count, setCount] = useState(state.prestigeCount);

  const doPrestige = () => {
    const next = prestige(state);
    setState(next);
    setCount(next.prestigeCount);
  };

  const bonus = 1 + Math.floor(count / 5 + 1) * 0.1;

  return (
    <div className="p-4 sm:p-8 max-w-xl mx-auto">
      <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/30">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Prestige</h2>
          <p className="text-muted">Reset to earn bigger bonuses</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="text-center space-y-4">
            <div className="text-5xl font-bold text-primary">×{bonus.toFixed(2)}</div>
            <p className="text-muted">Prestige multiplier</p>
            <Divider />
            <div className="space-y-2">
              <p className="text-sm text-muted">Resets: {count}</p>
              <p className="text-sm text-muted">Cookies earned persist as multiplier</p>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            fullWidth
            className="bg-accent text-white font-semibold"
            endContent={<Reset className="h-4 w-4" />}
            onPress={doPrestige}
          >
            Perform Prestige
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}