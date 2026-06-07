export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  storage: string[];
  specs: {
    processor: string;
    camera: string;
    battery: string;
    display: string;
    weight: string;
    os: string;
    network: string;
  };
  description: string;
  category: 'flagship' | 'budget' | 'eco' | 'gaming';
  badge?: string;
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "aero-pro-ultra",
    name: "Aero Pro Ultra",
    brand: "Aero",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#0f172a" },
      { name: "Cyber Cyan", hex: "#06b6d4" },
      { name: "Electric Violet", hex: "#8b5cf6" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      processor: "Aero Quantum X3 (3nm Super-Node)",
      camera: "200MP Triple Lens System with AI Neural Engine & 10x Optical Zoom",
      battery: "5500mAh with 120W HyperCharge & 50W Wireless",
      display: "6.82\" LTPO OLED, 144Hz, 3200 nits Peak Brightness",
      weight: "208g",
      os: "AeroOS 5.0 (Android 14 base)",
      network: "5G Ultra-Wideband, Wi-Fi 7, Satellite SOS"
    },
    description: "The ultimate peak of mobile engineering. Aero Pro Ultra brings premium dark glassmorphism styling, a bleeding-edge 3nm processor, and a revolutionary 200MP camera system designed to capture cinematic moments in pitch black darkness. Built for innovators, creators, and power users.",
    category: "flagship",
    badge: "Flagship Champion",
    isFeatured: true
  },
  {
    id: "aero-neon-strike",
    name: "Aero Neon Strike",
    brand: "Aero",
    price: 899,
    rating: 4.8,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Acid Green", hex: "#22c55e" },
      { name: "Electric Pink", hex: "#ec4899" },
      { name: "Slate Shadow", hex: "#475569" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    specs: {
      processor: "Snapdragon 8 Gen 3 Gaming Edition",
      camera: "108MP Dual Camera with NightSight AI",
      battery: "6000mAh Dual-Cell with 90W Fast Charge",
      display: "6.7\" AMOLED, 165Hz Refresh Rate, Dual Vapor Chambers",
      weight: "220g",
      os: "AeroOS Gaming Edition",
      network: "5G Elite, Wi-Fi 7, Dual SIM"
    },
    description: "Engineered specifically for competitive mobile gamers. Features active liquid cooling, custom shoulder triggers, and a lightning-fast 165Hz refresh rate screen. The battery lasts through marathon gaming sessions with bypass-charging safety.",
    category: "gaming",
    badge: "Gaming Beast",
    isFeatured: true
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    rating: 4.9,
    reviewsCount: 520,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1695048132717-57ecc5b40483?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Titanium Gray", hex: "#78716c" },
      { name: "Titanium Black", hex: "#1c1917" },
      { name: "Titanium Blue", hex: "#1e3a8a" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      processor: "A17 Pro Chip (3nm)",
      camera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      battery: "4441mAh with 25W charging, MagSafe",
      display: "6.7\" Super Retina XDR OLED, 120Hz ProMotion",
      weight: "221g",
      os: "iOS 17 (Upgradable to iOS 18)",
      network: "5G NR, Wi-Fi 6E, Ultra Wideband 2"
    },
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Experience premium performance in a lightweight titanium chassis.",
    category: "flagship"
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    originalPrice: 1399,
    rating: 4.8,
    reviewsCount: 410,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80", // secondary placeholder
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Titanium Yellow", hex: "#eab308" },
      { name: "Titanium Violet", hex: "#5b21b6" },
      { name: "Titanium Gray", hex: "#6b7280" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Wide + 50MP + 12MP + 10MP Quad Camera with 100x Space Zoom",
      battery: "5000mAh with 45W Fast Charging 2.0",
      display: "6.8\" Dynamic AMOLED 2X, QHD+, 120Hz, S-Pen Included",
      weight: "232g",
      os: "Android 14 with One UI 6.1",
      network: "5G, Wi-Fi 7, Bluetooth 5.3"
    },
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility starting with the most important device in your life. Complete with integrated S-Pen.",
    category: "flagship",
    badge: "Best Seller"
  },
  {
    id: "pixel-8-pro",
    name: "Pixel 8 Pro",
    brand: "Google",
    price: 999,
    rating: 4.7,
    reviewsCount: 290,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Bay Blue", hex: "#60a5fa" },
      { name: "Porcelain", hex: "#f5f5f4" },
      { name: "Obsidian", hex: "#18181b" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    specs: {
      processor: "Google Tensor G3 with Titan M2",
      camera: "50MP Main + 48MP Ultra Wide + 48MP 5x Zoom with Best Take AI",
      battery: "5050mAh with 30W charging, Qi wireless",
      display: "6.7\" Super Actua Display, 1-120Hz, Gorilla Glass Victus 2",
      weight: "213g",
      os: "Android 14 (7 Years of OS Updates)",
      network: "5G Sub-6/mmWave, Wi-Fi 7"
    },
    description: "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera ever, and can even help you fix photos, filter calls, and translate instantly. It is fully protected and designed for longevity.",
    category: "flagship"
  },
  {
    id: "aero-eco-pure",
    name: "Aero Eco Pure",
    brand: "Aero",
    price: 499,
    rating: 4.6,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Forest Green", hex: "#15803d" },
      { name: "Ocean Blue", hex: "#0369a1" },
      { name: "Recycled Silver", hex: "#94a3b8" }
    ],
    storage: ["128GB", "256GB"],
    specs: {
      processor: "MediaTek Dimensity 8200 Eco-Optimized",
      camera: "64MP Triple Camera with Biodegradable Housing",
      battery: "4800mAh with 33W Fast Charge (High Longevity Cycles)",
      display: "6.5\" IPS LCD, 90Hz, 100% Recycled glass layer",
      weight: "185g",
      os: "AeroOS Clean Edition (Zero Bloatware)",
      network: "5G, Wi-Fi 6, Dual SIM"
    },
    description: "Made with 85% recycled ocean plastics and 100% recycled aluminum frame. Aero Eco Pure is designed for easy self-repair with modular components. Every purchase contributes directly to global reforestation campaigns.",
    category: "eco",
    badge: "100% Carbon Neutral"
  },
  {
    id: "oneplus-12r",
    name: "OnePlus 12R",
    brand: "OnePlus",
    price: 599,
    originalPrice: 649,
    rating: 4.7,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Cool Blue", hex: "#38bdf8" },
      { name: "Iron Gray", hex: "#374151" }
    ],
    storage: ["128GB", "256GB"],
    specs: {
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Sony IMX890 Main + 8MP Ultra Wide",
      battery: "5500mAh with 100W SUPERVOOC Charge",
      display: "6.78\" AMOLED 1.5K, 120Hz ProXDR",
      weight: "207g",
      os: "OxygenOS based on Android 14",
      network: "5G, Wi-Fi 7, Bluetooth 5.3"
    },
    description: "The performance powerhouse that punches way above its price point. Combining a stunning 1.5K 120Hz display with a massive 5500mAh battery and crazy-fast 100W charger included in the box. A true budget beast.",
    category: "budget",
    badge: "Value King"
  },
  {
    id: "aero-lite-pocket",
    name: "Aero Lite Pocket",
    brand: "Aero",
    price: 299,
    rating: 4.5,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
    ],
    colors: [
      { name: "Matte Black", hex: "#1e293b" },
      { name: "Chalk White", hex: "#f8fafc" }
    ],
    storage: ["128GB"],
    specs: {
      processor: "Aero Core Duo Lite",
      camera: "48MP Dual Camera with AutoFocus",
      battery: "4200mAh with 18W USB-C Charge",
      display: "6.1\" OLED Compact, 60Hz",
      weight: "162g",
      os: "AeroOS Lite Edition",
      network: "5G Ready, Wi-Fi 5"
    },
    description: "A beautiful, compact smartphone that fits comfortably in any pocket. Aero Lite Pocket focuses on premium materials, long battery life, and clean software, without the bulky size or bloated price tag of modern flagships.",
    category: "budget",
    badge: "Compact & Cheap"
  }
];
