import { GameState } from '../types';
import { formatNumber } from '../utils';

export function renderCookie(container: HTMLElement, gameState: GameState, onCookieClick: () => void): void {
  // Create the cookie element
  const cookie = document.createElement('div');
  cookie.className = 'cookie';
  cookie.style.backgroundImage = 'url(https://placehold.co/200x200.png/ffcc00/ffffff?text=Cookie)';
  cookie.style.backgroundSize = 'cover';
  cookie.style.backgroundPosition = 'center';
  cookie.style.borderRadius = '50%';
  cookie.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  cookie.style.transition = 'transform 0.1s ease-in-out';
  
  // Add click handler
  cookie.addEventListener('click', onCookieClick);
  
  // Add hover effect
  cookie.addEventListener('mouseenter', () => {
    cookie.style.transform = 'scale(1.05)';
  });
  
  cookie.addEventListener('mouseleave', () => {
    cookie.style.transform = 'scale(1)';
  });
  
  // Add active state for click feedback
  cookie.addEventListener('mousedown', () => {
    cookie.style.transform = 'scale(0.95)';
  });
  
  cookie.addEventListener('mouseup', () => {
    cookie.style.transform = 'scale(1)';
  });
  
  // Create cookie count display
  const countDisplay = document.createElement('div');
  countDisplay.className = 'cookie-count';
  countDisplay.textContent = `Cookies: ${formatNumber(gameState.cookieCount)}`;
  
  // Create click value display
  const clickValueDisplay = document.createElement('div');
  clickValueDisplay.className = 'text-sm text-gray-300 mb-2';
  clickValueDisplay.textContent = `+${gameState.clickValue} per click`;
  
  // Create auto-click display
  const autoClickDisplay = document.createElement('div');
  autoClickDisplay.className = 'text-sm text-gray-300';
  autoClickDisplay.textContent = `+${gameState.autoClickValue} per second`;
  
  // Create container for the cookie and stats
  const cookieContainer = document.createElement('div');
  cookieContainer.className = 'flex flex-col items-center';
  cookieContainer.appendChild(cookie);
  cookieContainer.appendChild(countDisplay);
  cookieContainer.appendChild(clickValueDisplay);
  cookieContainer.appendChild(autoClickDisplay);
  
  // Clear container and append new content
  container.innerHTML = '';
  container.appendChild(cookieContainer);
}

export function updateCookieDisplay(container: HTMLElement, gameState: GameState): void {
  // Update cookie count display
  const countDisplay = container.querySelector('.cookie-count');
  if (countDisplay) {
    countDisplay.textContent = `Cookies: ${formatNumber(gameState.cookieCount)}`;
  }
  
  // Update click value display
  const clickValueDisplay = container.querySelector('.text-sm.text-gray-300.mb-2');
  if (clickValueDisplay) {
    clickValueDisplay.textContent = `+${gameState.clickValue} per click`;
  }
  
  // Update auto-click display
  const autoClickDisplay = container.querySelector('.text-sm.text-gray-300');
  if (autoClickDisplay) {
    autoClickDisplay.textContent = `+${gameState.autoClickValue} per second`;
  }
}