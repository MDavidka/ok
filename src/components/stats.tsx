import React, { useMemo } from 'react';
import { Card, CardBody, Progress, Chip, Divider } from '@heroui/react';
import { BarChart3, MousePointerClick, Building2, Target, Zap } from 'lucide-react';
import { formatNumber } from '../utils';
import { SHOP_ITEMS, calculateCost } from './shop';

export interface StatsProps {
  /** Current total score/cookies */
  score: number;
  /** Current Clicks Per Second */
  cps: number;
  /** Total manual clicks performed by the user */
  clicks: number;
  /** Record of owned upgrades by ID */
  inventory?: Record<string, number>;
}

export function Stats({ score = 0, cps = 0, clicks = 0, inventory = {} }: StatsProps) {
  // Calculate total buildings owned
  const totalBuildings = useMemo(() => {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0);
  }, [inventory]);

  // Determine the next upgrade goal (the cheapest upgrade the user CANNOT currently afford)
  const nextGoal = useMemo(() => {
    const targets = SHOP_ITEMS.map(item => {
      const owned = inventory[item.id] || 0;
      const cost = calculateCost(item.baseCost, owned);
      return { ...item, currentCost: cost };
    });

    // Filter to items that cost more than current score, sort by cost ascending
    const unaffordable = targets
      .filter(t => t.currentCost > score)
      .sort((a, b) => a.currentCost - b.currentCost);

    if (unaffordable.length > 0) {
      return unaffordable[0];
    }

    // Fallback: if they can afford everything, set the most expensive item as the next goal
    return targets.sort((a, b) => b.currentCost - a.currentCost)[0];
  }, [score, inventory]);

  // Calculate progress percentage towards the next goal
  const progressPercentage = useMemo(() => {
    if (!nextGoal || nextGoal.currentCost === 0) return 0;
    return Math.min(100, Math.max(0, (score / nextGoal.currentCost) * 100));
  }, [score, nextGoal]);

  return (
    <Card className="w-full max-w-md mx-auto bg-surface/40 backdrop-blur-md border border-white/10 shadow-xl">
      {/* Header */}
      <div className="p-5 border-b border-white/10 bg-surface/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 size={20} className="text-primary" />
          <h3 className="text-xl font-heading font-bold text-text tracking-tight">Statistics</h3>
        </div>
        <Chip color="primary" variant="flat" size="sm" className="font-medium">
          Live Data
        </Chip>
      </div>

      <CardBody className="p-5 flex flex-col gap-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Clicks */}
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-muted mb-1">
              <MousePointerClick size={14} />
              <span className="text-xs font-medium uppercase tracking-wider">Manual Clicks</span>
            </div>
            <span className="text-xl font-bold text-text">{formatNumber(clicks)}</span>
          </div>

          {/* Total Buildings */}
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-muted mb-1">
              <Building2 size={14} />
              <span className="text-xs font-medium uppercase tracking-wider">Buildings</span>
            </div>
            <span className="text-xl font-bold text-text">{formatNumber(totalBuildings)}</span>
          </div>

          {/* Current CPS */}
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5 col-span-2">
            <div className="flex items-center gap-1.5 text-muted mb-1">
              <Zap size={14} className="text-accent" />
              <span className="text-xs font-medium uppercase tracking-wider">Production Rate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">{formatNumber(cps)}</span>
              <span className="text-sm text-muted">cookies per second</span>
            </div>
          </div>
        </div>

        <Divider className="bg-white/10" />

        {/* Next Goal Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-text">
              <Target size={16} className="text-secondary" />
              <span className="text-sm font-bold">Next Goal: {nextGoal?.name || 'Unknown'}</span>
            </div>
            <span className="text-xs font-medium text-muted">
              {formatNumber(score)} / {formatNumber(nextGoal?.currentCost || 0)}
            </span>
          </div>
          
          <Progress 
            size="md" 
            radius="full" 
            classNames={{
              base: "max-w-md",
              track: "drop-shadow-md border border-white/10 bg-white/5",
              indicator: "bg-gradient-to-r from-secondary to-primary",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            value={progressPercentage}
            showValueLabel={true}
          />
          
          <p className="text-xs text-muted/70 text-right mt-1">
            {progressPercentage >= 100 
              ? "Ready to purchase!" 
              : `Need ${formatNumber((nextGoal?.currentCost || 0) - score)} more cookies`}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}