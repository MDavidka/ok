import React from 'react';
import { Card, CardBody, Chip, Tooltip } from '@heroui/react';
import { MousePointer2, User, Tractor, Pickaxe, Factory, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatNumber } from '../utils';

export interface ShopProps {
  /** Current total score/cookies available to spend */
  score: number;
  /** Record of owned upgrades by ID (e.g., { 'cursor': 5, 'grandma': 2 }) */
  inventory?: Record<string, number>;
  /** Callback fired when an upgrade is successfully purchased */
  onPurchase: (upgradeId: string, cost: number, cpsIncrease: number) => void;
}

export interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  cpsIncrease: number;
  icon: React.ElementType;
}

// Hardcoded list of available upgrades in the game
export const SHOP_ITEMS: UpgradeItem[] = [
  { 
    id: 'cursor', 
    name: 'Auto-Cursor', 
    description: 'Autoclicks once every 10 seconds.', 
    baseCost: 15, 
    cpsIncrease: 0.1, 
    icon: MousePointer2 
  },
  { 
    id: 'grandma', 
    name: 'Grandma', 
    description: 'A nice grandma to bake more cookies.', 
    baseCost: 100, 
    cpsIncrease: 1, 
    icon: User 
  },
  { 
    id: 'farm', 
    name: 'Cookie Farm', 
    description: 'Grows cookie plants from cookie seeds.', 
    baseCost: 1100, 
    cpsIncrease: 8, 
    icon: Tractor 
  },
  { 
    id: 'mine', 
    name: 'Cookie Mine', 
    description: 'Mines out cookie dough and chocolate chips.', 
    baseCost: 12000, 
    cpsIncrease: 47, 
    icon: Pickaxe 
  },
  { 
    id: 'factory', 
    name: 'Cookie Factory', 
    description: 'Produces large quantities of cookies.', 
    baseCost: 130000, 
    cpsIncrease: 260, 
    icon: Factory 
  },
  { 
    id: 'portal', 
    name: 'Antimatter Condenser', 
    description: 'Condenses the antimatter in the universe into cookies.', 
    baseCost: 1400000, 
    cpsIncrease: 1400, 
    icon: Rocket 
  },
];

/**
 * Calculates the current cost of an upgrade based on how many are already owned.
 * Uses the standard incremental game formula: baseCost * (1.15 ^ owned)
 */
export function calculateCost(baseCost: number, owned: number): number {
  return Math.ceil(baseCost * Math.pow(1.15, owned));
}

export function Shop({ score = 0, inventory = {}, onPurchase }: ShopProps) {
  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto bg-surface/40 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      {/* Shop Header */}
      <div className="p-5 border-b border-white/10 bg-surface/60 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        <div>
          <h3 className="text-xl font-heading font-bold text-text tracking-tight">Upgrades</h3>
          <p className="text-xs text-muted mt-0.5">Spend cookies to automate production</p>
        </div>
        <Chip color="primary" variant="flat" size="sm" className="font-medium tracking-wide">
          Store
        </Chip>
      </div>
      
      {/* Upgrades List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative z-10">
        {SHOP_ITEMS.map((item, index) => {
          const owned = inventory[item.id] || 0;
          const currentCost = calculateCost(item.baseCost, owned);
          const canAfford = score >= currentCost;

          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
            >
              <Tooltip 
                content={
                  <div className="px-2 py-2 max-w-xs">
                    <p className="text-sm font-bold text-text mb-1">{item.name}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                    {owned > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/10">
                        <p className="text-xs text-primary font-medium">
                          Currently producing {formatNumber(owned * item.cpsIncrease)} CPS
                        </p>
                      </div>
                    )}
                  </div>
                } 
                placement="left" 
                delay={400}
                closeDelay={0}
              >
                <Card 
                  isPressable={canAfford}
                  onPress={() => canAfford && onPurchase(item.id, currentCost, item.cpsIncrease)}
                  className={`w-full border transition-all duration-200 relative overflow-hidden ${
                    canAfford 
                      ? 'bg-surface/80 border-primary/30 hover:border-primary/60 hover:bg-surface shadow-md hover:shadow-primary/20' 
                      : 'bg-surface/30 border-white/5 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <CardBody className="flex flex-row items-center p-3 gap-4">
                    {/* Icon Container */}
                    <div className={`p-3 rounded-xl shrink-0 transition-colors duration-300 ${
                      canAfford ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-white/5 text-muted'
                    }`}>
                      <item.icon size={26} strokeWidth={1.5} />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 flex flex-col items-start text-left min-w-0 z-10">
                      <div className="flex items-center justify-between w-full gap-2">
                        <h4 className={`text-base font-bold truncate ${canAfford ? 'text-text' : 'text-muted'}`}>
                          {item.name}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className={`text-sm font-bold tracking-wide ${canAfford ? 'text-accent' : 'text-red-400/70'}`}>
                          {formatNumber(currentCost)}
                        </span>
                        <span className="text-xs text-muted flex items-center gap-1.5 font-medium">
                          <span className="w-1 h-1 rounded-full bg-muted/50" />
                          +{formatNumber(item.cpsIncrease)} CPS
                        </span>
                      </div>
                    </div>

                    {/* Background Watermark for Owned Count */}
                    {owned > 0 && (
                      <span className="text-5xl font-black text-white/5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                        {owned}
                      </span>
                    )}

                    {/* Owned Badge */}
                    {owned > 0 && (
                      <div className="absolute top-2 right-2 z-20">
                        <Chip size="sm" color="secondary" variant="solid" className="scale-75 origin-top-right font-bold shadow-lg">
                          {owned}
                        </Chip>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Tooltip>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}