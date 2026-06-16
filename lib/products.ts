export interface Product {
  id: string;
  name: string;
  brand: 'Aura' | 'Apple' | 'Samsung' | 'Google' | 'OnePlus';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  storage: string[]; // e.g. ["128GB", "256GB", "512GB", "1TB"]
  category: 'Pro Flagships' | 'Foldables' | 'Eco-Friendly Reclaimed' | 'Value Tech';
  features: string[];
  isTrending: boolean;
  specs: {
    processor: string;
    camera: string;
    battery: string;
    display: string;
    dimensions: string;
    weight: string;
    os: string;
    waterResistance: string;
    charging: string;
  };
}

export const products: Product[] = [
  {
    id: "aura-titan-pro",
    name: "Aura Titan Pro",
    brand: "Aura",
    price: 1299,
    rating: 4.9,
    reviewsCount: 142,
    description: "The ultimate obsidian-forged flagship. Powered by the Quantum-8 AI processor with a stunning 200MP holographic sensor array.",
    longDescription: "Crafted for those who demand absolute perfection, the Aura Titan Pro redefines mobile computing. Encased in aerospace-grade crystalline titanium, it features our custom-engineered Quantum-8 AI chip, an ultra-bright LTPO 3.0 display that hits 3000 nits peak brightness, and a revolutionary 200MP under-glass camera system that captures reality with unprecedented depth.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#0b0f19" },
      { name: "Cyan Spark", hex: "#06b6d4" },
      { name: "Nebula Purple", hex: "#a855f7" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    category: "Pro Flagships",
    features: ["5G Enabled", "Water Resistant (IP68)", "120Hz LTPO", "Under-display Camera", "100W Charging"],
    isTrending: true,
    specs: {
      processor: "Aura Quantum-8 AI (3nm, Octa-Core with Neural Core v4)",
      camera: "200MP Main + 50MP Ultra-wide + 64MP Periscope Zoom (10x Optical, 120x Digital)",
      battery: "5500 mAh Silicon-Carbon Anode Battery",
      display: "6.82-inch LTPO Dynamic AMOLED 3D Curved (1-120Hz, HDR10+, 3000 nits)",
      dimensions: "163.1 x 74.2 x 8.1 mm",
      weight: "208g",
      os: "AuraOS v4.5 (Based on Android 15)",
      waterResistance: "IP68 (Up to 6m for 45 mins)",
      charging: "100W Wired HyperCharge, 50W Wireless Qi2"
    }
  },
  {
    id: "aura-fold-x",
    name: "Aura Fold X",
    brand: "Aura",
    price: 1799,
    rating: 4.8,
    reviewsCount: 89,
    description: "Unfold the future. A seamless 8.0-inch flexible glass workspace inside a sleek, pocketable 6.3-inch phone chassis.",
    longDescription: "The Aura Fold X is a masterpiece of modern micro-engineering. Utilizing a zero-gap liquid-metal tear-drop hinge, it opens to reveal a breathtaking 8.0-inch tablet-class canvas. Multi-tasking is rewritten with three-window snapping, persistent app docks, and active digital stylus integration.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Satin Obsidian", hex: "#1e293b" },
      { name: "Chrome Platinum", hex: "#cbd5e1" },
      { name: "Deep Amethyst", hex: "#581c87" }
    ],
    storage: ["512GB", "1TB"],
    category: "Foldables",
    features: ["5G Enabled", "Foldable Dual-Screen", "Stylus Support", "Split-Screen Multi-Tasking"],
    isTrending: true,
    specs: {
      processor: "Aura Quantum-8 AI (3nm, Octa-Core)",
      camera: "108MP Main + 12MP Ultra-wide + 12MP Telephoto (3x)",
      battery: "5000 mAh Dual-Cell Intelligent Battery",
      display: "Foldable 8.0-inch Dynamic Flex AMOLED (120Hz) + Outer 6.31-inch AMOLED (120Hz)",
      dimensions: "Unfolded: 154.9 x 129.9 x 5.4 mm | Folded: 154.9 x 67.1 x 11.8 mm",
      weight: "239g",
      os: "AuraOS Fold Edition (Android 15)",
      waterResistance: "IPX8 Water Resistant",
      charging: "80W Wired, 30W Wireless"
    }
  },
  {
    id: "aura-eco-reclaim",
    name: "Aura Eco Reclaim",
    brand: "Aura",
    price: 699,
    rating: 4.7,
    reviewsCount: 114,
    description: "Zero compromise, zero waste. Built with 100% recycled aluminum chassis, ocean-bound plastics, and modular upgradeable parts.",
    longDescription: "The Aura Eco Reclaim sets a new gold standard for sustainable tech. It features a fully modular design allowing you to swap the battery and camera modules with a single screwdriver. Built with 100% recycled aerospace aluminum, bio-based polymers, and arriving in carbon-neutral packaging, it delivers pro-tier performance without costing the planet.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Sage Forest", hex: "#166534" },
      { name: "Earth Sand", hex: "#78350f" },
      { name: "Ocean Slate", hex: "#0f766e" }
    ],
    storage: ["128GB", "256GB"],
    category: "Eco-Friendly Reclaimed",
    features: ["Modular Repairable Design", "100% Recycled Chassis", "5G Enabled", "Biodegradable Box"],
    isTrending: false,
    specs: {
      processor: "EcoCore Green-7 Processor (Highly efficient 4nm architecture)",
      camera: "64MP Primary (F/1.8) + 12MP Ultra-Wide (Modular sensors)",
      battery: "4800 mAh User-Replaceable Eco-Battery",
      display: "6.5-inch OLED FHD+ High-Efficiency display (90Hz, 1500 nits)",
      dimensions: "159.8 x 73.5 x 8.5 mm",
      weight: "185g",
      os: "AuraOS Green Edition (Guaranteed 7 years of system updates)",
      waterResistance: "IP54 Splash & Dust Protection",
      charging: "45W Wired, Eco Charging Optimizer mode"
    }
  },
  {
    id: "iph_16_pm",
    name: "iPhonix 16 Pro Max",
    brand: "Apple",
    price: 1399,
    rating: 4.9,
    reviewsCount: 310,
    description: "Titanium design, ultimate camera control button, and the elite A18 Pro silicon with custom spatial video capture.",
    longDescription: "The iPhonix 16 Pro Max features a durable, lightweight titanium design with micro-blasted textures. The new dedicated Camera Control button provides tactile, instant feedback to calibrate focus, exposure, and zoom. Driven by the boundary-pushing A18 Pro chip, it supports console-level gaming and incredible high-frame-rate 4K120fps Dolby Vision video recording.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Desert Titanium", hex: "#b49d84" },
      { name: "Natural Titanium", hex: "#8b8c89" },
      { name: "Space Black", hex: "#1c1c1e" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    category: "Pro Flagships",
    features: ["5G Enabled", "Water Resistant (IP68)", "Titanium Frame", "Spatial Video Capture", "MagSafe Wireless"],
    isTrending: true,
    specs: {
      processor: "Apple A18 Pro (3nm, 6-core CPU + 6-core GPU)",
      camera: "48MP Fusion Camera + 48MP Ultra-wide + 12MP 5x Telephoto Zoom",
      battery: "4685 mAh battery with advanced power management",
      display: "6.9-inch Super Retina XDR OLED (120Hz ProMotion, HDR10, 2000 nits)",
      dimensions: "163.0 x 77.6 x 8.25 mm",
      weight: "227g",
      os: "iOS 18 with Apple Intelligence",
      waterResistance: "IP68 (Up to 6m for 30 mins)",
      charging: "30W Wired, 25W MagSafe Wireless"
    }
  },
  {
    id: "galaxia-s25-ultra",
    name: "Galaxia Ultra S25",
    brand: "Samsung",
    price: 1199,
    rating: 4.8,
    reviewsCount: 225,
    description: "The AI superphone. Integrated S-Pen stylus, gorgeous square-off titanium bezel, and a legendary 200MP quad camera.",
    longDescription: "Unleash limitless productivity and creativity with the Galaxia Ultra S25. Features a sleek, armored titanium casing and a flush-embedded S-Pen stylus. The Snapdragon 8 Gen 4 Galaxy Edition processor powers generative AI photo editing, live phone call translations, and crystal-clear 100x Space Zoom.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Titanium Gray", hex: "#7d7f82" },
      { name: "Titanium Yellow", hex: "#e2d1a6" },
      { name: "Titanium Violet", hex: "#3b304c" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    category: "Pro Flagships",
    features: ["5G Enabled", "Water Resistant (IP68)", "Integrated S-Pen Stylus", "100x Space Zoom", "DeX Desktop Mode"],
    isTrending: true,
    specs: {
      processor: "Snapdragon 8 Gen 4 for Galaxy (3nm)",
      camera: "200MP Main + 50MP Periscope (5x) + 10MP Telephoto (3x) + 12MP Ultra-wide",
      battery: "5000 mAh with Super Fast Charging 2.0",
      display: "6.8-inch Dynamic AMOLED 2X Flat (120Hz, HDR10+, Gorilla Glass Armor, 2600 nits)",
      dimensions: "162.3 x 79.0 x 8.6 mm",
      weight: "232g",
      os: "One UI 7 (Based on Android 15)",
      waterResistance: "IP68 (Up to 1.5m for 30 mins)",
      charging: "45W Wired, 15W Wireless PowerShare"
    }
  },
  {
    id: "pixelate-9-pro",
    name: "Pixelate 9 Pro XL",
    brand: "Google",
    price: 999,
    rating: 4.7,
    reviewsCount: 174,
    description: "The purest expression of Android. Powered by the Google Tensor G4 with unparalleled AI photography and 7 years of updates.",
    longDescription: "Engineered by Google, the Pixelate 9 Pro XL brings state-of-the-art AI right to your hand. Supported by the Tensor G4 security co-processor, it delivers magical photo edits like 'Add Me' and 'Magic Editor'. The triple rear camera system is fine-tuned to capture the most accurate skin tones and breathtaking night skies.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#22252a" },
      { name: "Porcelain White", hex: "#f3f4f6" },
      { name: "Hazel Gray", hex: "#70777a" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    category: "Pro Flagships",
    features: ["5G Enabled", "Google Gemini AI Integrated", "Magic Eraser & Editor", "Astrophotography Mode"],
    isTrending: false,
    specs: {
      processor: "Google Tensor G4 (4nm with Titan M2 Security)",
      camera: "50MP Main + 48MP Ultra-wide + 48MP Telephoto (5x Optical Zoom)",
      battery: "5060 mAh Intelligent battery with 24hr+ lifespan",
      display: "6.8-inch Super Actua OLED (1-120Hz, 3000 nits peak, HDR)",
      dimensions: "162.8 x 76.6 x 8.5 mm",
      weight: "221g",
      os: "Android 15 (Pure Pixel Experience)",
      waterResistance: "IP68 Dust/Water Resistant",
      charging: "37W Wired, 23W Wireless with Pixel Stand"
    }
  },
  {
    id: "nebula-prime-13",
    name: "Nebula Prime 13",
    brand: "OnePlus",
    price: 899,
    rating: 4.6,
    reviewsCount: 95,
    description: "The speed champion. 100W SuperVOOC wired charging that restores 100% battery in just 26 minutes.",
    longDescription: "The Nebula Prime 13 is engineered for raw velocity. Combining the Snapdragon 8 Gen 4 with up to 16GB of LPDDR5X RAM, this device flies through heavy workflows and demanding 3D gaming. Features the beloved alert slider and a beautiful high-frequency PWM dimming screen that reduces eye strain.",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Emerald Glaze", hex: "#064e3b" },
      { name: "Silky Black", hex: "#18181b" }
    ],
    storage: ["256GB", "512GB"],
    category: "Value Tech",
    features: ["5G Enabled", "100W SuperVOOC Charger Included", "Alert Slider Switch", "Cryo-velocity Cooling System"],
    isTrending: false,
    specs: {
      processor: "Snapdragon 8 Gen 4 (3nm)",
      camera: "50MP Main (Sony LYT-808) + 48MP Ultra-wide + 64MP Periscope (3x)",
      battery: "5400 mAh Dual-cell Battery",
      display: "6.82-inch 2K Oriental AMOLED (1-120Hz, 4500 nits peak, 2160Hz PWM)",
      dimensions: "164.3 x 75.8 x 9.15 mm",
      weight: "220g",
      os: "OxygenOS 15 (Based on Android 15)",
      waterResistance: "IP65 Splash Proof",
      charging: "100W SuperVOOC Wired (Full in 26m), 50W AirVOOC Wireless"
    }
  },
  {
    id: "aura-quantum-lite",
    name: "Aura Quantum Lite",
    brand: "Aura",
    price: 499,
    rating: 4.6,
    reviewsCount: 64,
    description: "Premium tech made affordable. 120Hz fluid screen, 50MP night-sight camera, and a stellar 2-day battery life.",
    longDescription: "Who says you have to pay four digits for elite speed? The Aura Quantum Lite packs our custom Quantum-5 chip, a bright 120Hz AMOLED screen, and a massive 5000 mAh battery that easily lasts up to two days. Arrives with a premium glass-feel finish and 5G speeds.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Neon Teal", hex: "#0d9488" },
      { name: "Space Gray", hex: "#4b5563" }
    ],
    storage: ["128GB", "256GB"],
    category: "Value Tech",
    features: ["5G Enabled", "5000 mAh 2-Day Battery", "120Hz AMOLED Screen", "3.5mm Headphone Jack"],
    isTrending: true,
    specs: {
      processor: "Aura Quantum-5 AI (4nm octa-core)",
      camera: "50MP Main (OIS) + 8MP Ultra-wide + 2MP Macro",
      battery: "5000 mAh Lithium-Polymer Battery",
      display: "6.67-inch AMOLED FHD+ (120Hz refresh, 1200 nits)",
      dimensions: "161.2 x 74.9 x 7.9 mm",
      weight: "179g",
      os: "AuraOS v4.5 Lite (Based on Android 15)",
      waterResistance: "IP53 Dust & Splash protection",
      charging: "33W Wired Fast Charge"
    }
  }
];
