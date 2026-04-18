import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Badge, 
  Chip, 
  Progress,
  Divider
} from '@heroui/react';
import { ShoppingCart, Zap, MousePointerClick, TrendingUp, Lock } from 'lucide-react';
import { Upgrade } from '../types';
import { formatCookies, calculateUpgradeCost } from '../utils';

export interface ShopProps {
  cookies: number;
  upgrades: Upgrade[];
  ownedUpgrades: Record<string, number>;
  onPurchase: (upgradeId: string, cost: number) => void;
}

export function Shop({ cookies, upgrades, ownedUpgrades, onPurchase }: ShopProps): JSX.Element {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-heading font-bold text-foreground">Upgrades Shop</h2>
        </div>
        <p className="text-default-500 font-medium">
          Spend your hard-earned cookies to automate your bakery and increase your clicking power.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upgrades.map((upgrade) => {
          const owned = ownedUpgrades[upgrade.id] || 0;
          const currentCost = calculateUpgradeCost(upgrade.baseCost, upgrade.costMultiplier, owned);
          const canAfford = cookies >= currentCost;
          const progressPercent = Math.min(100, (cookies / currentCost) * 100);
          
          // Determine primary stat to display
          const isClickUpgrade = (upgrade.clickIncrease ?? 0) > 0;
          const statValue = isClickUpgrade ? upgrade.clickIncrease : upgrade.cpsIncrease;
          const StatIcon = isClickUpgrade ? MousePointerClick : TrendingUp;
          const statLabel = isClickUpgrade ? 'per click' : 'CPS';

          return (
            <Card 
              key={upgrade.id} 
              className={`w-full transition-all duration-300 border-2 ${
                canAfford 
                  ? 'border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1' 
                  : 'border-transparent opacity-80 grayscale-[0.2]'
              }`}
            >
              <CardHeader className="flex justify-between items-start pt-6 px-6">
                <div className="flex items-center gap-4">
                  <Badge 
                    content={owned} 
                    color="primary" 
                    placement="top-right"
                    isInvisible={owned === 0}
                    shape="circle"
                  >
                    <div className="w-12 h-12 rounded-xl bg-default-100 flex items-center justify-center text-2xl shadow-inner">
                      {upgrade.icon || '📦'}
                    </div>
                  </Badge>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-heading font-bold leading-tight">{upgrade.name}</h3>
                    <p className="text-xs text-default-400 font-medium">Level {owned}</p>
                  </div>
                </div>
              </CardHeader>

              <CardBody className="px-6 py-2 flex flex-col gap-4">
                <p className="text-sm text-default-500 line-clamp-2 min-h-[2.5rem]">
                  {upgrade.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {statValue ? (
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      color={isClickUpgrade ? "secondary" : "success"}
                      startContent={<StatIcon className="w-3 h-3" />}
                    >
                      +{formatCookies(statValue)} {statLabel}
                    </Chip>
                  ) : null}
                </div>
              </CardBody>

              <Divider className="opacity-50" />

              <CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-4">
                <div className="w-full flex justify-between items-center text-sm font-semibold">
                  <span className="text-default-500">Cost:</span>
                  <span className={`${canAfford ? 'text-primary' : 'text-danger'} flex items-center gap-1`}>
                    {formatCookies(currentCost)} 🍪
                  </span>
                </div>

                {!canAfford && (
                  <Progress 
                    size="sm" 
                    value={progressPercent} 
                    color="warning" 
                    className="w-full"
                    aria-label={`Progress to afford ${upgrade.name}`}
                  />
                )}

                <Button
                  className="w-full font-bold tracking-wide mt-1"
                  color={canAfford ? "primary" : "default"}
                  variant={canAfford ? "solid" : "flat"}
                  isDisabled={!canAfford}
                  onPress={() => onPurchase(upgrade.id, currentCost)}
                  startContent={canAfford ? <Zap className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                >
                  {canAfford ? 'Purchase Upgrade' : 'Need More Cookies'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {upgrades.length === 0 && (
        <Card className="w-full p-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-divider bg-transparent shadow-none">
          <ShoppingCart className="w-12 h-12 text-default-300 mb-4" />
          <h3 className="text-xl font-heading font-semibold text-default-600">Shop is Empty</h3>
          <p className="text-default-400 max-w-md mt-2">
            No upgrades are currently available. Keep clicking that cookie and check back later!
          </p>
        </Card>
      )}
    </div>
  );
}