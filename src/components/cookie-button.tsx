import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from '@heroui/react';
import { Cookie } from 'lucide-react';
import { formatCookies } from '../utils';

export interface CookieButtonProps {
  /** Callback fired when the cookie is clicked */
  onClick: () => void;
  /** The amount of cookies earned per click (used for the floating number animation) */
  clickPower: number;
}

interface ClickAnimation {
  id: number;
  x: number;
  y: number;
  amount: number;
}

export function CookieButton({ onClick, clickPower }: CookieButtonProps): JSX.Element {
  const [clicks, setClicks] = useState<ClickAnimation[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Calculate click position relative to the button for accurate floating number placement
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Add slight randomness to the floating number position so rapid clicks don't perfectly overlap
    const randomOffsetX = (Math.random() - 0.5) * 40;
    const randomOffsetY = (Math.random() - 0.5) * 20;
    
    const x = e.clientX - rect.left + randomOffsetX;
    const y = e.clientY - rect.top + randomOffsetY;

    const newClick: ClickAnimation = {
      id: Date.now() + Math.random(),
      x,
      y,
      amount: clickPower
    };

    setClicks((prev) => [...prev, newClick]);

    // Clean up the animation state after it finishes to prevent memory leaks
    setTimeout(() => {
      setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
    }, 1000);

    // Trigger the actual game logic
    onClick();
  }, [clickPower, onClick]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-8 w-full max-w-md mx-auto">
      <Tooltip 
        content={`Click Power: +${formatCookies(clickPower)}`} 
        placement="top" 
        color="primary"
        showArrow
        delay={500}
      >
        <motion.button
          className="relative rounded-full bg-amber-500/10 p-6 sm:p-10 shadow-[0_0_80px_rgba(245,158,11,0.15)] border-8 border-amber-500/20 outline-none cursor-pointer touch-manipulation z-10"
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.92 }}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          aria-label="Click to bake cookies"
        >
          <Cookie 
            size={220} 
            className="text-amber-600 dark:text-amber-400 drop-shadow-[0_10px_20px_rgba(217,119,6,0.4)] w-48 h-48 sm:w-64 sm:h-64" 
            strokeWidth={1.2} 
          />
          
          {/* Floating Numbers Container */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <AnimatePresence>
              {clicks.map((click) => (
                <motion.div
                  key={click.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -150, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute font-heading font-black text-2xl sm:text-3xl text-primary drop-shadow-md z-50 pointer-events-none select-none"
                  style={{ 
                    left: click.x, 
                    top: click.y,
                    // Center the number exactly on the click coordinate
                    transform: 'translate(-50%, -50%)' 
                  }}
                >
                  +{formatCookies(click.amount)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.button>
      </Tooltip>
      
      <div className="mt-8 text-center animate-subtle-pulse">
        <p className="text-default-400 font-medium uppercase tracking-widest text-xs sm:text-sm">
          Tap the cookie to bake
        </p>
      </div>
    </div>
  );
}