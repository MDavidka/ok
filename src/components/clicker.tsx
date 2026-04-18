import React, { useState, useRef, useCallback } from 'react';
import { Card, CardBody, Image } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '../utils';

export interface ClickerProps {
  /** Current total score/cookies */
  score: number;
  /** Current Clicks Per Second */
  cps: number;
  /** Callback fired when the cookie is clicked */
  onCookieClick: () => void;
}

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export function Clicker({ score, cps, onCookieClick }: ClickerProps) {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const clickIdRef = useRef(0);

  const handleInteraction = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent default browser behaviors like drag or text selection
    e.preventDefault();
    
    // Trigger the game logic
    onCookieClick();

    // Calculate click coordinates relative to the cookie container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create a unique ID for the floating text animation
    const id = clickIdRef.current++;
    
    setClickEffects((prev) => [...prev, { id, x, y }]);

    // Clean up the effect after animation completes
    setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== id));
    }, 1000);
  }, [onCookieClick]);

  return (
    <Card className="w-full max-w-md mx-auto bg-surface/40 backdrop-blur-md border border-white/10 shadow-2xl">
      <CardBody className="flex flex-col items-center justify-center p-8 overflow-hidden relative min-h-[500px]">
        
        {/* Score Display */}
        <div className="text-center mb-12 z-10">
          <h2 className="text-6xl font-heading font-extrabold text-text mb-2 tracking-tight drop-shadow-sm">
            {formatNumber(score)}
          </h2>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/20 border border-white/5">
            <p className="text-lg text-accent font-medium">
              {formatNumber(cps)} <span className="text-muted text-sm">cookies / sec</span>
            </p>
          </div>
        </div>

        {/* Interactive Cookie Area */}
        <div
          className="relative cursor-pointer select-none touch-manipulation z-20"
          onPointerDown={handleInteraction}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative"
          >
            {/* Glow effect behind the cookie */}
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10 scale-110 animate-pulse" />
            
            <Image
              src="https://placehold.co/320x320/8B4513/FFFFFF.png?text=Cookie"
              alt="Giant Interactive Cookie"
              width={320}
              height={320}
              className="rounded-full shadow-2xl pointer-events-none border-4 border-accent/20"
              draggable={false}
            />
          </motion.div>

          {/* Floating Click Effects (+1) */}
          <AnimatePresence>
            {clickEffects.map((effect) => (
              <motion.div
                key={effect.id}
                initial={{ opacity: 1, y: effect.y - 20, x: effect.x - 20, scale: 0.5 }}
                animate={{ opacity: 0, y: effect.y - 120, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute pointer-events-none text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-50"
                style={{ left: 0, top: 0 }}
              >
                +1
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Subtle instruction text */}
        <p className="mt-12 text-sm text-muted/60 font-medium tracking-wide uppercase z-10">
          Click to bake
        </p>
      </CardBody>
    </Card>
  );
}