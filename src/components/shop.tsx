import React, { useMemo, useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip, 
  Tabs, 
  Tab, 
  ScrollShadow, 
  Divider,
  Tooltip
} from '@heroui/react';
import { Store, Zap, TrendingUp, Lock, Cookie } from 'lucide-react';
import { Upgrade } from '../types';
import { formatCookies, calculateUpgradeCost } from '../utils';

export interface ShopProps {
  /** Master list of all available upgrades in the game */
  upgrades: Upgrade[];
  /** Record mapping upgrade IDs to the quantity currently owned by the player */
  ownedUpgrades: Record<string, number>;
  /** The player's current cookie balance */
  currentCookies: number;
  /** Callback fired when an upgrade is successfully purchased */
  onPurchase: (upgradeId: string, cost: number) => void;
}

export function Shop({ upgrades, ownedUpgrades, currentCookies, onPurchase }: ShopProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<React.Key>("all");

  // Pre-calculate costs and affordability for all upgrades to avoid recalculating on every render
  const processedUpgrades = useMemo(() => {
    return upgrades.map(upgrade => {
      const owned = ownedUpgrades[upgrade.id] || 0;
      const currentCost = calculateUpgradeCost(upgrade.baseCost, upgrade.costMultiplier, owned);
      const canAfford = currentCookies >= currentCost;
      
      return {
        ...upgrade,
        owned,
        currentCost,
        canAfford
      };
    });
  }, [upgrades, ownedUpgrades, currentCookies]);

  const affordableUpgrades = useMemo(() => {
    return processedUpgrades.filter(u => u.canAfford);
  }, [processedUpgrades]);

  const renderUpgradeList = (list: typeof processedUpgrades) => {
    if (list.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-default-400">
          <Lock size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">No upgrades available</p>
          <p className="text-sm">Keep baking cookies to unlock more!</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {list.map((upgrade) => (
          <Card 
            key={upgrade.id} 
            isPressable={upgrade.canAfford}
            onPress={() => upgrade.canAfford && onPurchase(upgrade.id, upgrade.currentCost)}
            className={`w-full transition-all duration-200 ${
              upgrade.canAfford 
                ? 'hover:border-primary hover:shadow-md border-transparent' 
                : 'opacity-70 grayscale-[0.5] cursor-not-allowed border-transparent'
            } border-2`}
            shadow="sm"
          >
            <CardBody className="p-3 sm:p-4 flex flex-row items-center gap-4">
              {/* Icon / Avatar Placeholder */}
              <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                upgrade.canAfford ? 'bg-primary/20 text-primary' : 'bg-default-100 text-default-400'
              }`}>
                {upgrade.iconUrl ? (
                  <img src={upgrade.iconUrl} alt={upgrade.name} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                ) : (
                  <Store size={28} />
                )}
              </div>

              {/* Upgrade Details */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-base sm:text-lg truncate text-default-900">
                    {upgrade.name}
                  </h4>
                  <Chip size="sm" color={upgrade.owned > 0 ? "secondary" : "default"} variant="flat" className="font-bold">
                    Owned: {upgrade.owned}
                  </Chip>
                </div>
                
                <p className="text-xs sm:text-sm text-default-500 line-clamp-2 mb-2">
                  {upgrade.description}
                </p>
                
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <span className="flex items-center gap-1 text-accent">
                    <TrendingUp size={14} />
                    +{formatCookies(upgrade.baseCps)} CPS
                  </span>
                  <span className={`flex items-center gap-1 ${upgrade.canAfford ? 'text-primary' : 'text-danger'}`}>
                    <Cookie size={14} />
                    Cost: {formatCookies(upgrade.currentCost)}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full h-full max-h-[800px] flex flex-col bg-background/60 backdrop-blur-md border-none shadow-xl">
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-0">
        <div className="flex items-center gap-2 mb-2">
          <Store className="text-primary" size={24} />
          <h2 className="text-2xl font-heading font-bold text-default-900">Upgrade Shop</h2>
        </div>
        <p className="text-sm text-default-500 mb-4">
          Spend your cookies to automate production and increase your Cookies Per Second (CPS).
        </p>
        
        <Tabs 
          aria-label="Shop Categories" 
          color="primary" 
          variant="underlined"
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          className="w-full"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary"
          }}
        >
          <Tab 
            key="all" 
            title={
              <div className="flex items-center space-x-2">
                <Store size={16} />
                <span>All Upgrades</span>
                <Chip size="sm" variant="faded">{processedUpgrades.length}</Chip>
              </div>
            }
          />
          <Tab 
            key="affordable" 
            title={
              <div className="flex items-center space-x-2">
                <Zap size={16} />
                <span>Affordable</span>
                <Chip size="sm" color="success" variant="flat">{affordableUpgrades.length}</Chip>
              </div>
            }
          />
        </Tabs>
      </CardHeader>
      
      <Divider />
      
      <CardBody className="p-0 overflow-hidden">
        <ScrollShadow className="h-full w-full p-4 sm:p-6" hideScrollBar>
          {selectedTab === "all" 
            ? renderUpgradeList(processedUpgrades) 
            : renderUpgradeList(affordableUpgrades)
          }
        </ScrollShadow>
      </CardBody>
    </Card>
  );
}