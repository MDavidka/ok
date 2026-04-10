import { GameState } from '../types';
import { createElement, formatNumber } from '../utils';

interface CookieComponentProps {
  gameState: GameState;
  onCookieClick: (event: MouseEvent) => void;
}

export function renderCookieArea(
  container: HTMLElement,
  props: CookieComponentProps
): void {
  // Clear previous content
  container.innerHTML = '';
  
  // Create cookie wrapper
  const cookieWrapper = createElement('div', {
    classes: ['flex', 'flex-col', 'items-center', 'justify-center', 'py-8']
  });
  
  // Create cookie count display
  const cookieCount = createElement('div', {
    classes: ['text-3xl', 'font-bold', 'mb-4', 'text-amber-900'],
    text: `${formatNumber(props.gameState.cookies)} cookies`
  });
  cookieCount.id = 'cookie-count';
  
  // Create cookie button
  const cookieButton = createElement('button', {
    classes: [
      'relative',
      'w-64',
      'h-64',
      'rounded-full',
      'bg-amber-500',
      'border-8',
      'border-amber-600',
      'shadow-lg',
      'hover:shadow-xl',
      'active:scale-95',
      'transition-all',
      'duration-75',
      'focus:outline-none',
      'animate-cookie-pulse'
    ],
    attributes: {
      'aria-label': 'Click to bake cookies',
      'type': 'button'
    }
  });
  
  // Add cookie texture
  const cookieTexture = createElement('div', {
    classes: [
      'absolute',
      'inset-0',
      'rounded-full',
      'bg-gradient-to-br',
      'from-amber-400',
      'to-amber-600',
      'opacity-90'
    ]
  });
  
  // Add chocolate chips
  const chipPositions = [
    { top: '25%', left: '25%' },
    { top: '40%', left: '60%' },
    { top: '65%', left: '30%' },
    { top: '70%', left: '70%' },
    { top: '50%', left: '45%' },
    { top: '30%', left: '75%' },
    { top: '60%', left: '20%' },
    { top: '20%', left: '40%' }
  ];
  
  chipPositions.forEach(pos => {
    const chip = createElement('div', {
      classes: [
        'absolute',
        'w-4',
        'h-4',
        'rounded-full',
        'bg-amber-900',
        'opacity-80'
      ],
      attributes: {
        style: `top: ${pos.top}; left: ${pos.left};`
      }
    });
    cookieButton.appendChild(chip);
  });
  
  // Add click event listener
  cookieButton.addEventListener('click', props.onCookieClick);
  
  // Add visual feedback elements
  const clickEffect = createElement('div', {
    classes: [
      'absolute',
      'inset-0',
      'rounded-full',
      'bg-white',
      'opacity-0',
      'pointer-events-none'
    ],
    id: 'cookie-click-effect'
  });
  
  // Assemble cookie button
  cookieButton.appendChild(cookieTexture);
  cookieButton.appendChild(clickEffect);
  
  // Create CPS display
  const cpsDisplay = createElement('div', {
    classes: ['mt-4', 'text-lg', 'text-amber-800'],
    text: `${formatNumber(props.gameState.cps)} cookies per second`
  });
  cpsDisplay.id = 'cps-display';
  
  // Assemble component
  cookieWrapper.appendChild(cookieCount);
  cookieWrapper.appendChild(cookieButton);
  cookieWrapper.appendChild(cpsDisplay);
  container.appendChild(cookieWrapper);
}

/**
 * Updates the cookie count display
 */
export function updateCookieCount(gameState: GameState): void {
  const cookieCountElement = document.getElementById('cookie-count');
  if (cookieCountElement) {
    cookieCountElement.textContent = `${formatNumber(gameState.cookies)} cookies`;
  }
}

/**
 * Updates the CPS display
 */
export function updateCpsDisplay(gameState: GameState): void {
  const cpsDisplayElement = document.getElementById('cps-display');
  if (cpsDisplayElement) {
    cpsDisplayElement.textContent = `${formatNumber(gameState.cps)} cookies per second`;
  }
}

/**
 * Triggers the click animation effect
 */
export function triggerClickEffect(event: MouseEvent): void {
  const clickEffect = document.getElementById('cookie-click-effect');
  if (!clickEffect) return;
  
  // Position effect at click location
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  clickEffect.style.left = `${x}px`;
  clickEffect.style.top = `${y}px`;
  
  // Reset animation
  clickEffect.classList.remove('animate-cookie-click');
  void clickEffect.offsetWidth; // Trigger reflow
  clickEffect.classList.add('animate-cookie-click');
}