import { Building, Upgrade, Achievement, Stock, Spell } from '../types/game';

export const INITIAL_BUILDINGS: Building[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    cost: 15,
    baseCost: 15,
    count: 0,
    baseCps: 0.1,
    cps: 0.1,
    description: 'Autoclicks once every 10 seconds. Smoothly adds 0.1 cookies per second.',
    icon: 'MousePointerClick'
  },
  {
    id: 'grandma',
    name: 'Grandma',
    cost: 100,
    baseCost: 100,
    count: 0,
    baseCps: 1,
    cps: 1,
    description: 'A friendly, baking-obsessed grandma who bakes cookies with love.',
    icon: 'User'
  },
  {
    id: 'farm',
    name: 'Farm',
    cost: 1100,
    baseCost: 1100,
    count: 0,
    baseCps: 8,
    cps: 8,
    description: 'Grows delicious cookie plants from organic chocolate-chip seeds.',
    icon: 'Sprout'
  },
  {
    id: 'mine',
    name: 'Mine',
    cost: 12000,
    baseCost: 12000,
    count: 0,
    baseCps: 47,
    cps: 47,
    description: 'Mines deep underground veins of raw cookie dough and white chocolate chips.',
    icon: 'Pickaxe'
  },
  {
    id: 'factory',
    name: 'Factory',
    cost: 130000,
    baseCost: 130000,
    count: 0,
    baseCps: 260,
    cps: 260,
    description: 'A heavy-duty industrial assembly line mass-producing cookies 24/7.',
    icon: 'Factory'
  },
  {
    id: 'bank',
    name: 'Bank',
    cost: 1400000,
    baseCost: 1400000,
    count: 0,
    baseCps: 1400,
    cps: 1400,
    description: 'Generates interest on your cookie assets and loans dough to small bakeries.',
    icon: 'Coins'
  },
  {
    id: 'temple',
    name: 'Temple',
    cost: 20000000,
    baseCost: 20000000,
    count: 0,
    baseCps: 7800,
    cps: 7800,
    description: 'A majestic cathedral dedicated to the ancient, chocolatey Cookie Deity.',
    icon: 'Church'
  },
  {
    id: 'wizard_tower',
    name: 'Wizard Tower',
    cost: 330000000,
    baseCost: 330000000,
    count: 0,
    baseCps: 44000,
    cps: 44000,
    description: 'Summons cookies out of thin air using ancient, high-calorie magic spells.',
    icon: 'Wand2'
  },
  {
    id: 'portal',
    name: 'Portal',
    cost: 5100000000,
    baseCost: 5100000000,
    count: 0,
    baseCps: 260000,
    cps: 260000,
    description: 'Opens a quantum wormhole directly to the cookie dimension.',
    icon: 'Orbit'
  },
  {
    id: 'time_machine',
    name: 'Time Machine',
    cost: 75000000000,
    baseCost: 75000000000,
    count: 0,
    baseCps: 1600000,
    cps: 1600000,
    description: 'Brings cookies from the past, before they were even baked or eaten.',
    icon: 'History'
  },
  {
    id: 'antimatter_condenser',
    name: 'Antimatter Condenser',
    cost: 1100000000000,
    baseCost: 1100000000000,
    count: 0,
    baseCps: 10000000,
    cps: 10000000,
    description: 'Condenses dark antimatter into super-dense, highly-energetic chocolate chips.',
    icon: 'Atom'
  },
  {
    id: 'prism',
    name: 'Prism',
    cost: 14000000000000,
    baseCost: 14000000000000,
    count: 0,
    baseCps: 65000000,
    cps: 65000000,
    description: 'Converts light waves and rainbows directly into pure, sugary cookies.',
    icon: 'Sun'
  }
];

export const INITIAL_UPGRADES: Upgrade[] = [
  // Click Upgrades
  {
    id: 'click_plastic',
    name: 'Plastic Mouse',
    cost: 50,
    description: 'The click power is increased by +1.',
    purchased: false,
    unlocked: true,
    type: 'click',
    icon: 'MousePointer',
    multiplier: 1 // Custom processing
  },
  {
    id: 'click_iron',
    name: 'Iron Mouse',
    cost: 500,
    description: 'The click power is increased by +5.',
    purchased: false,
    unlocked: false,
    type: 'click',
    icon: 'MousePointer',
    multiplier: 5
  },
  {
    id: 'click_titanium',
    name: 'Titanium Mouse',
    cost: 10000,
    description: 'The click power is increased by +1% of your current total CpS.',
    purchased: false,
    unlocked: false,
    type: 'click',
    icon: 'MousePointer',
    multiplier: 0.01
  },
  {
    id: 'click_adamantium',
    name: 'Adamantium Mouse',
    cost: 1000000,
    description: 'The click power is increased by +5% of your current total CpS.',
    purchased: false,
    unlocked: false,
    type: 'click',
    icon: 'MousePointer',
    multiplier: 0.05
  },

  // Cursor Upgrades
  {
    id: 'up_cursor_1',
    name: 'Reinforced Index Finger',
    cost: 150,
    description: 'Cursors are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'cursor',
    icon: 'MousePointerClick',
    multiplier: 2
  },
  {
    id: 'up_cursor_2',
    name: 'Ambidextrous',
    cost: 400,
    description: 'Cursors are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'cursor',
    icon: 'MousePointerClick',
    multiplier: 2
  },

  // Grandma Upgrades
  {
    id: 'up_grandma_1',
    name: 'Forwards from Grandma',
    cost: 1000,
    description: 'Grandmas are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'grandma',
    icon: 'User',
    multiplier: 2
  },
  {
    id: 'up_grandma_2',
    name: 'Steel-plated Rolling Pins',
    cost: 5000,
    description: 'Grandmas are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'grandma',
    icon: 'User',
    multiplier: 2
  },

  // Farm Upgrades
  {
    id: 'up_farm_1',
    name: 'Organic Fertilizer',
    cost: 11000,
    description: 'Farms are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'farm',
    icon: 'Sprout',
    multiplier: 2
  },

  // Mine Upgrades
  {
    id: 'up_mine_1',
    name: 'Sugar-powered Drills',
    cost: 120000,
    description: 'Mines are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'mine',
    icon: 'Pickaxe',
    multiplier: 2
  },

  // Factory Upgrades
  {
    id: 'up_factory_1',
    name: 'Steam-powered Mixers',
    cost: 1300000,
    description: 'Factories are twice as efficient.',
    purchased: false,
    unlocked: false,
    type: 'building',
    buildingId: 'factory',
    icon: 'Factory',
    multiplier: 2
  },

  // Global Upgrades
  {
    id: 'cookie_sugar',
    name: 'Sugar Cookies',
    cost: 5000,
    description: 'Global cookie production multiplier +5%.',
    purchased: false,
    unlocked: false,
    type: 'global',
    icon: 'Cookie',
    multiplier: 1.05
  },
  {
    id: 'cookie_chocolate',
    name: 'Chocolate Chip Cookies',
    cost: 25000,
    description: 'Global cookie production multiplier +5%.',
    purchased: false,
    unlocked: false,
    type: 'global',
    icon: 'Cookie',
    multiplier: 1.05
  },
  {
    id: 'cookie_oatmeal',
    name: 'Oatmeal Raisin Cookies',
    cost: 100000,
    description: 'Global cookie production multiplier +10%.',
    purchased: false,
    unlocked: false,
    type: 'global',
    icon: 'Cookie',
    multiplier: 1.10
  },
  {
    id: 'cookie_macadamia',
    name: 'White Chocolate Macadamia',
    cost: 5000000,
    description: 'Global cookie production multiplier +15%.',
    purchased: false,
    unlocked: false,
    type: 'global',
    icon: 'Cookie',
    multiplier: 1.15
  },
  {
    id: 'cookie_royal',
    name: 'Royal Icing Cookies',
    cost: 100000000,
    description: 'Global cookie production multiplier +25%.',
    purchased: false,
    unlocked: false,
    type: 'global',
    icon: 'Cookie',
    multiplier: 1.25
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // Cookie count achievements
  {
    id: 'ach_cookies_1',
    name: 'Wake and Bake',
    description: 'Bake your very first cookie.',
    unlocked: false,
    icon: 'Cookie',
    requirementType: 'cookies',
    requirementValue: 1
  },
  {
    id: 'ach_cookies_100',
    name: 'Making Dough',
    description: 'Bake 100 cookies.',
    unlocked: false,
    icon: 'Cookie',
    requirementType: 'cookies',
    requirementValue: 100
  },
  {
    id: 'ach_cookies_10k',
    name: 'Cookie Connoisseur',
    description: 'Bake 10,000 cookies.',
    unlocked: false,
    icon: 'Sparkles',
    requirementType: 'cookies',
    requirementValue: 10000
  },
  {
    id: 'ach_cookies_1m',
    name: 'Cookie Monster',
    description: 'Bake 1,000,000 cookies (1 Million).',
    unlocked: false,
    icon: 'Trophy',
    requirementType: 'cookies',
    requirementValue: 1000000
  },
  {
    id: 'ach_cookies_1b',
    name: 'Galactic Bakery',
    description: 'Bake 1,000,000,000 cookies (1 Billion).',
    unlocked: false,
    icon: 'Globe',
    requirementType: 'cookies',
    requirementValue: 1000000000
  },

  // Clicking achievements
  {
    id: 'ach_clicks_1',
    name: 'Click!',
    description: 'Click the big cookie 1 time.',
    unlocked: false,
    icon: 'MousePointerClick',
    requirementType: 'clicks',
    requirementValue: 1
  },
  {
    id: 'ach_clicks_100',
    name: 'Clickastic',
    description: 'Click the big cookie 100 times.',
    unlocked: false,
    icon: 'MousePointerClick',
    requirementType: 'clicks',
    requirementValue: 100
  },
  {
    id: 'ach_clicks_1000',
    name: 'Clickageddon',
    description: 'Click the big cookie 1,000 times.',
    unlocked: false,
    icon: 'Flame',
    requirementType: 'clicks',
    requirementValue: 1000
  },

  // Building count achievements
  {
    id: 'ach_grandma_1',
    name: 'Grandma\'s Friend',
    description: 'Own 1 Grandma.',
    unlocked: false,
    icon: 'User',
    requirementType: 'building',
    requirementValue: 1,
    requirementId: 'grandma'
  },
  {
    id: 'ach_grandma_10',
    name: 'Grandma\'s Coven',
    description: 'Own 10 Grandmas.',
    unlocked: false,
    icon: 'Users',
    requirementType: 'building',
    requirementValue: 10,
    requirementId: 'grandma'
  },
  {
    id: 'ach_cursor_10',
    name: 'Clicking Army',
    description: 'Own 10 Cursors.',
    unlocked: false,
    icon: 'MousePointer',
    requirementType: 'building',
    requirementValue: 10,
    requirementId: 'cursor'
  },
  {
    id: 'ach_farm_5',
    name: 'Green Thumb',
    description: 'Own 5 Farms.',
    unlocked: false,
    icon: 'Sprout',
    requirementType: 'building',
    requirementValue: 5,
    requirementId: 'farm'
  },
  {
    id: 'ach_mine_5',
    name: 'Digging Deep',
    description: 'Own 5 Mines.',
    unlocked: false,
    icon: 'Pickaxe',
    requirementType: 'building',
    requirementValue: 5,
    requirementId: 'mine'
  },
  {
    id: 'ach_factory_5',
    name: 'Industrial Revolution',
    description: 'Own 5 Factories.',
    unlocked: false,
    icon: 'Factory',
    requirementType: 'building',
    requirementValue: 5,
    requirementId: 'factory'
  }
];

export const INITIAL_STOCKS: Stock[] = [
  {
    id: 'sugar',
    symbol: 'SGR',
    name: 'Refined Sugar',
    currentPrice: 10,
    history: [10, 11, 10, 9, 8, 10, 11, 12, 10],
    volatility: 0.15,
    stability: 0.1,
    quantity: 0
  },
  {
    id: 'flour',
    symbol: 'FLR',
    name: 'Wheat Flour',
    currentPrice: 5,
    history: [5, 4, 5, 6, 5, 4, 5, 5, 6],
    volatility: 0.08,
    stability: 0.05,
    quantity: 0
  },
  {
    id: 'butter',
    symbol: 'BTR',
    name: 'Churned Butter',
    currentPrice: 20,
    history: [20, 22, 21, 19, 18, 20, 22, 25, 23],
    volatility: 0.20,
    stability: 0.0,
    quantity: 0
  },
  {
    id: 'chocolate',
    symbol: 'CHOC',
    name: 'Cocoa Beans',
    currentPrice: 45,
    history: [45, 48, 44, 40, 42, 46, 50, 48, 52],
    volatility: 0.30,
    stability: 0.15,
    quantity: 0
  },
  {
    id: 'vanilla',
    symbol: 'VNL',
    name: 'Vanilla Extract',
    currentPrice: 120,
    history: [120, 118, 122, 125, 121, 128, 132, 130, 135],
    volatility: 0.40,
    stability: 0.2,
    quantity: 0
  }
];

export const SPELLS: Spell[] = [
  {
    id: 'conjure_cookies',
    name: 'Conjure Baked Goods',
    description: 'Instantly conjures cookies worth 30 minutes of your current CpS (up to 15% of your bank). Costs 40 Mana.',
    cost: 40,
    effectName: 'conjure',
    icon: 'Sparkles'
  },
  {
    id: 'lucky_day',
    name: 'Force the Hand of Fate',
    description: 'Summons a Golden Cookie right now! Costs 60 Mana.',
    cost: 60,
    effectName: 'summon_golden',
    icon: 'Wand2'
  },
  {
    id: 'mana_frenzy',
    name: 'Mana Frenzy',
    description: 'Gives +20% global production multiplier for 5 minutes. Costs 30 Mana.',
    cost: 30,
    effectName: 'frenzy_spell',
    icon: 'Zap'
  },
  {
    id: 'gamble',
    name: 'Spontaneous Edifice',
    description: 'Instantly grants you a random building you can afford, but has a 15% chance to destroy one instead! Costs 50 Mana.',
    cost: 50,
    effectName: 'gamble_building',
    icon: 'Dice5'
  }
];
