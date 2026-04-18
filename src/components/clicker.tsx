import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardBody, Chip, Image } from '@heroui/react';
import { MousePointerClick, Zap, TrendingUp } from 'lucide-react';
import { formatCookies } from '../utils';

export interface ClickerProps {
  cookies: number;
  cps: number;
  clickPower: number;
  onManualClick: () => void;
}

interface FloatingText {
  id: string;
  x: number;
  y: number;
  value: number;
}

export function Clicker({ cookies, cps, clickPower, onManualClick }: ClickerProps): JSX.Element {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Cleanup floating texts to prevent memory leaks
  useEffect(() => {
    if (floatingTexts.length > 0) {
      const timer = setTimeout(() => {
        setFloatingTexts((prev) => prev.slice(1));
      }, 800); // Matches the 0.8s animation duration in style.css
      return () => clearTimeout(timer);
    }
  }, [floatingTexts]);

  const handleCookieClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent default behavior like text selection
    e.preventDefault();
    
    // Trigger the state update in the parent
    onManualClick();

    // Add a new floating text at the mouse coordinates
    const newText: FloatingText = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
      value: clickPower,
    };

    setFloatingTexts((prev) => [...prev, newText]);
  }, [clickPower, onManualClick]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 gap-8 relative">
      
      {/* Stats Header */}
      <Card className="w-full bg-background/60 backdrop-blur-md border-none shadow-lg" shadow="sm">
        <CardBody className="flex flex-col items-center py-8 gap-4">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-default-500 font-heading font-semibold tracking-wider uppercase text-sm">
              Current Bakery Balance
            </h2>
            <div className="text-5xl sm:text-6xl font-heading font-black text-primary drop-shadow-sm flex items-center gap-3">
              {formatCookies(cookies)}
              <span className="text-3xl sm:text-4xl text-cookie">🍪</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Chip
              startContent={<TrendingUp className="w-4 h-4" />}
              variant="flat"
              color="success"
              size="lg"
              className="font-semibold"
            >
              {formatCookies(cps)} CPS
            </Chip>
            <Chip
              startContent={<MousePointerClick className="w-4 h-4" />}
              variant="flat"
              color="primary"
              size="lg"
              className="font-semibold"
            >
              {formatCookies(clickPower)} / Click
            </Chip>
          </div>
        </CardBody>
      </Card>

      {/* Main Clicker Area */}
      <div className="relative flex items-center justify-center w-full py-12 select-none">
        {/* Decorative background glow based on CPS */}
        <div 
          className={`absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10 transition-opacity duration-1000 ${cps > 0 ? 'animate-subtle-pulse opacity-100' : 'opacity-0'}`}
          style={{ transform: `scale(${Math.min(1 + cps / 1000, 1.5)})` }}
        />

        {/* The Cookie */}
        <div 
          className="cookie-btn relative rounded-full shadow-2xl shadow-primary/20"
          onMouseDown={handleCookieClick}
          role="button"
          tabIndex={0}
          aria-label="Click to bake cookies"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              // Simulate a click in the center of the element for keyboard users
              const rect = e.currentTarget.getBoundingClientRect();
              handleCookieClick({
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
                preventDefault: () => {},
              } as React.MouseEvent<HTMLDivElement>);
            }
          }}
        >
          <Image
            src="https://placehold.co/400x400/d97706/ffffff.png?text=Click+Me"
            alt="Giant Cookie"
            width={320}
            height={320}
            className="rounded-full border-8 border-cookie/30 object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Floating Numbers Layer */}
      {floatingTexts.map((text) => (
        <div
          key={text.id}
          className="floating-number"
          style={{
            left: text.x,
            top: text.y,
            // Center the text exactly on the cursor
            transform: 'translate(-50%, -50%)',
          }}
        >
          +{formatCookies(text.value)}
        </div>
      ))}

      {/* Quick Info Footer */}
      <div className="flex items-center gap-2 text-default-400 text-sm font-medium">
        <Zap className="w-4 h-4 text-warning" />
        <p>Click the cookie to earn more!</p>
      </div>
    </div>
  );
}