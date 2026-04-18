import React from 'react';
import { Card, CardBody, Divider, Tooltip, Chip } from '@heroui/react';
import { Cookie, TrendingUp, MousePointerClick, Trophy, Info } from 'lucide-react';
import { formatCookies } from '../utils';

export interface StatsDisplayProps {
  /** Current available cookies to spend */
  cookies: number;
  /** Cookies generated automatically per second */
  cps: number;
  /** Cookies generated per manual click */
  clickPower: number;
  /** All-time total cookies baked (including spent ones) */
  totalCookies: number;
}

export function StatsDisplay({ cookies, cps, clickPower, totalCookies }: StatsDisplayProps): JSX.Element {
  return (
    <Card className="w-full bg-background/60 backdrop-blur-md border-none shadow-xl overflow-visible">
      <CardBody className="p-6 sm:p-8 flex flex-col gap-6">
        
        {/* Main Balance Display */}
        <div className="flex flex-col items-center justify-center text-center relative">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-default-500 text-sm sm:text-base font-bold uppercase tracking-widest">
              Current Balance
            </h2>
          </div>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Cookie 
              size={48} 
              className="text-primary drop-shadow-md hidden sm:block" 
              strokeWidth={1.5}
            />
            <span className="text-5xl sm:text-7xl font-heading font-black text-default-900 tracking-tighter drop-shadow-sm">
              {formatCookies(cookies)}
            </span>
          </div>
          <p className="text-default-400 text-xs sm:text-sm mt-2 font-medium">
            cookies ready to spend
          </p>
        </div>

        <Divider className="opacity-50" />

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          
          {/* Cookies Per Second (CPS) */}
          <Tooltip 
            content="Cookies generated automatically every second by your upgrades." 
            placement="bottom"
            color="foreground"
            showArrow
          >
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-default-100/50 hover:bg-default-100 transition-colors cursor-help border border-default-200/50">
              <div className="flex items-center gap-2 mb-1 text-accent">
                <TrendingUp size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Per Second</span>
              </div>
              <span className="text-2xl font-heading font-bold text-default-800">
                {formatCookies(cps)}
              </span>
            </div>
          </Tooltip>

          {/* Click Power */}
          <Tooltip 
            content="Cookies generated every time you manually click the big cookie." 
            placement="bottom"
            color="foreground"
            showArrow
          >
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-default-100/50 hover:bg-default-100 transition-colors cursor-help border border-default-200/50">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <MousePointerClick size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Per Click</span>
              </div>
              <span className="text-2xl font-heading font-bold text-default-800">
                {formatCookies(clickPower)}
              </span>
            </div>
          </Tooltip>

          {/* Total Baked All Time */}
          <Tooltip 
            content="Total cookies baked across your entire career, including spent ones." 
            placement="bottom"
            color="foreground"
            showArrow
          >
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-default-100/50 hover:bg-default-100 transition-colors cursor-help border border-default-200/50">
              <div className="flex items-center gap-2 mb-1 text-secondary">
                <Trophy size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Total Baked</span>
              </div>
              <span className="text-2xl font-heading font-bold text-default-800">
                {formatCookies(totalCookies)}
              </span>
            </div>
          </Tooltip>

        </div>
      </CardBody>
    </Card>
  );
}