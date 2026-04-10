import { GameState } from '../types';
import { formatNumber } from '../utils';
import { createElement, clearChildren } from '../utils';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (state: GameState) => boolean;
  unlocked: boolean;
}

// Define all achievements for the game
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_cookie',
    name: 'First Cookie',
    description: 'Bake your first cookie',
    icon: '🍪',
    condition: (state) => state.totalCookies >= 1,
    unlocked: false
  },
  {
    id: 'hundred_cookies',
    name: 'Century Club',
    description: 'Bake 100 cookies',
    icon: '🍪',
    condition: (state) => state.totalCookies >= 100,
    unlocked: false
  },
  {
    id: 'thousand_cookies',
    name: 'Cookie Monster',
    description: 'Bake 1,000 cookies',
    icon: '🍪',
    condition: (state) => state.totalCookies >= 1000,
    unlocked: false
  },
  {
    id: 'million_cookies',
    name: 'Millionaire',
    description: 'Bake 1 million cookies',
    icon: '🍪',
    condition: (state) => state.totalCookies >= 1000000,
    unlocked: false
  },
  {
    id: 'first_upgrade',
    name: 'Smart Shopper',
    description: 'Purchase your first upgrade',
    icon: '🛒',
    condition: (state) => Object.values(state.inventory).some(count => count > 0),
    unlocked: false
  },
  {
    id: 'ten_upgrades',
    name: 'Upgrade Enthusiast',
    description: 'Own 10 upgrades',
    icon: '📈',
    condition: (state) => Object.values(state.inventory).reduce((sum, count) => sum + count, 0) >= 10,
    unlocked: false
  },
  {
    id: 'cps_1',
    name: 'Automation Beginner',
    description: 'Reach 1 cookie per second',
    icon: '⏱️',
    condition: (state) => state.cps >= 1,
    unlocked: false
  },
  {
    id: 'cps_10',
    name: 'Automation Expert',
    description: 'Reach 10 cookies per second',
    icon: '⏱️',
    condition: (state) => state.cps >= 10,
    unlocked: false
  },
  {
    id: 'cps_100',
    name: 'Factory Owner',
    description: 'Reach 100 cookies per second',
    icon: '🏭',
    condition: (state) => state.cps >= 100,
    unlocked: false
  },
  {
    id: 'click_power_10',
    name: 'Strong Fingers',
    description: 'Reach 10 cookies per click',
    icon: '👆',
    condition: (state) => state.clickPower >= 10,
    unlocked: false
  },
  {
    id: 'prestige_1',
    name: 'Rebirth',
    description: 'Perform your first prestige reset',
    icon: '🔄',
    condition: (state) => state.totalCookies >= 1000000000, // 1 billion as indicator of possible prestige
    unlocked: false
  },
  {
    id: 'prestige_5',
    name: 'Ascended',
    description: 'Prestige 5 times',
    icon: '⭐',
    condition: (state) => state.totalCookies >= 5000000000, // 5 billion as indicator
    unlocked: false
  }
];

/**
 * Renders the achievements panel
 * @param container The container element to render the achievements in
 * @param gameState The current game state
 */
export function renderAchievements(container: HTMLElement, gameState: GameState): void {
  // Clear previous content
  clearChildren(container);
  
  // Update achievement unlock status
  const updatedAchievements = ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: achievement.condition(gameState)
  }));
  
  // Create header
  const header = createElement('h2', {
    classes: ['text-2xl', 'font-bold', 'mb-4', 'text-amber-900'],
    text: 'Achievements'
  });
  
  // Create stats summary
  const unlockedCount = updatedAchievements.filter(a => a.unlocked).length;
  const totalCount = updatedAchievements.length;
  
  const statsSummary = createElement('div', {
    classes: ['mb-6', 'p-4', 'bg-amber-50', 'rounded-lg', 'border', 'border-amber-200'],
    html: `
      <p class="text-lg font-semibold text-amber-800">Progress: ${unlockedCount}/${totalCount} unlocked</p>
      <div class="w-full bg-amber-200 rounded-full h-2.5 mt-2">
        <div class="bg-amber-600 h-2.5 rounded-full" style="width: ${(unlockedCount/totalCount)*100}%"></div>
      </div>
    `
  });
  
  // Create achievements grid
  const grid = createElement('div', {
    classes: ['grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-4']
  });
  
  // Render each achievement
  updatedAchievements.forEach(achievement => {
    const achievementCard = createElement('div', {
      classes: [
        'p-4', 
        'rounded-lg', 
        'border', 
        achievement.unlocked ? 'bg-amber-50 border-amber-300' : 'bg-gray-100 border-gray-300',
        'flex', 
        'items-start',
        'transition-all',
        'duration-200'
      ]
    });
    
    // Icon container
    const iconContainer = createElement('div', {
      classes: [
        'text-2xl', 
        'mr-3', 
        'mt-1',
        achievement.unlocked ? 'text-amber-700' : 'text-gray-400'
      ],
      text: achievement.icon
    });
    
    // Content container
    const contentContainer = createElement('div', {
      classes: ['flex-1']
    });
    
    // Achievement name
    const nameElement = createElement('h3', {
      classes: [
        'font-bold', 
        'text-lg',
        achievement.unlocked ? 'text-amber-900' : 'text-gray-500'
      ],
      text: achievement.name
    });
    
    // Achievement description
    const descElement = createElement('p', {
      classes: [
        'text-sm',
        achievement.unlocked ? 'text-amber-800' : 'text-gray-400'
      ],
      text: achievement.description
    });
    
    // Status badge
    const statusBadge = createElement('span', {
      classes: [
        'inline-block', 
        'px-2', 
        'py-1', 
        'text-xs', 
        'font-semibold', 
        'rounded-full', 
        'mt-2',
        achievement.unlocked 
          ? 'bg-amber-500 text-white' 
          : 'bg-gray-300 text-gray-700'
      ],
      text: achievement.unlocked ? 'Unlocked' : 'Locked'
    });
    
    contentContainer.appendChild(nameElement);
    contentContainer.appendChild(descElement);
    contentContainer.appendChild(statusBadge);
    
    achievementCard.appendChild(iconContainer);
    achievementCard.appendChild(contentContainer);
    
    grid.appendChild(achievementCard);
  });
  
  container.appendChild(header);
  container.appendChild(statsSummary);
  container.appendChild(grid);
}

/**
 * Updates the achievements panel with the current game state
 * @param container The container element containing the achievements
 * @param gameState The current game state
 */
export function updateAchievements(container: HTMLElement, gameState: GameState): void {
  renderAchievements(container, gameState);
}