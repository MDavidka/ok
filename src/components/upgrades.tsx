import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from '@heroui/react';
import { RefreshCw, ArrowUp } from 'lucide-react';
import { formatNumber, formatCost, canAfford, buyUpgrade } from '../utils';
import { UpgradeState } from '../types';

interface Props {
  upgrades: UpgradeState[];
  onBuy: (upgrade: UpgradeState) => void;
  cookies: number;
}

export default function Upgrades({ upgrades, onBuy, cookies }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Upgrades</h2>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="p-2 hover:bg-default-100 dark:hover:bg-default-600 rounded"
          aria-label="refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
      <div className="grid gap-4">
        {upgrades.map((u) => (
          <Card key={u.id} className="bg-surface/50 border-default-200/50">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg">{u.name}</h3>
                <p className="text-sm text-muted">{u.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">+{u.cps} CPS</p>
                <p className="text-sm text-muted">Cost: {formatCost(u.cost)}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{u.owned}</span>
                  <ArrowUp className="h-4 w-4 text-accent" />
                </div>
                <Button
                  disabled={!canAfford({ cookies, cps: 0, upgrades: [], prestigeCount: 0, lastTick: 0 }, u)}
                  onPress={() => onBuy(u)}
                >
                  Buy
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}