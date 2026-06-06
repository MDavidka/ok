export interface PhoneProduct {
  id: string;
  name: string;
  brand: 'Aura' | 'Apex' | 'Vortex' | 'Lite';
  tagline: string;
  description: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  colors: { name: string; hex: string; image: string }[];
  storageOptions: { size: string; priceBump: number }[];
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
    os: 'AuraOS' | 'Android' | 'iOS' | 'VortexOS';
    weight: string;
    waterProof: string;
  };
  featured: boolean;
  onSale: boolean;
  saleDiscount?: number; // percentage
  badge?: string;
  stock: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const PHONE_PRODUCTS: PhoneProduct[] = [
  {
    id: "aura-15-pro",
    name: "Aura 15 Pro Ultra",
    brand: "Aura",
    tagline: "The pinnacle of mobile luxury and optical prowess.",
    description: "Crafted from aerospace-grade titanium, the Aura 15 Pro Ultra introduces the revolutionary Neural-X9 processor and a dual-liquid telephoto camera system. It redefines what a smartphone can achieve with 150W ultra-charging and an adaptive 144Hz Super Retina OLED display.",
    basePrice: 1199,
    rating: 4.9,
    reviewCount: 148,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Titanium Gray", hex: "#8A9597", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80" },
      { name: "Deep Obsidian", hex: "#1C1C1C", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" },
      { name: "Satin Emerald", hex: "#0F5257", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: [
      { size: "128GB", priceBump: 0 },
      { size: "256GB", priceBump: 100 },
      { size: "512GB", priceBump: 250 },
      { size: "1TB", priceBump: 450 }
    ],
    specs: {
      screen: "6.8-inch LTPO OLED, 144Hz, 2800 nits peak brightness",
      processor: "Aura Neural-X9 (3nm)",
      camera: "108MP Main + 48MP Ultra-wide + 50MP Periscope (5x optical)",
      battery: "5000 mAh (150W wire, 50W wireless)",
      os: "AuraOS",
      weight: "198g",
      waterProof: "IP68 (up to 6m for 30 mins)"
    },
    featured: true,
    onSale: false,
    badge: "Best Seller",
    stock: 24
  },
  {
    id: "apex-fold-x",
    name: "Apex Fold X",
    brand: "Apex",
    tagline: "Unfold the future of multitasking.",
    description: "The Apex Fold X features a seamless 7.9-inch flexible inner AMOLED screen and a fully functional 6.3-inch outer cover screen. Built with a zero-gap armored hinge, it offers incredible durability and a powerhouse productivity workspace in your pocket.",
    basePrice: 1799,
    rating: 4.7,
    reviewCount: 82,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Cosmic Silver", hex: "#C0C0C0", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" },
      { name: "Midnight Black", hex: "#000000", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: [
      { size: "256GB", priceBump: 0 },
      { size: "512GB", priceBump: 150 },
      { size: "1TB", priceBump: 350 }
    ],
    specs: {
      screen: "7.9-inch Foldable Dynamic AMOLED 2X, 120Hz",
      processor: "Snapdragon 8 Gen 3 Aura Edition",
      camera: "50MP Main + 12MP Ultra-wide + 12MP Telephoto",
      battery: "4800 mAh (45W charging)",
      os: "Android",
      weight: "239g",
      waterProof: "IPX8 water resistant"
    },
    featured: true,
    onSale: true,
    saleDiscount: 10, // 10% off
    badge: "Innovation",
    stock: 12
  },
  {
    id: "vortex-pulse-12",
    name: "Vortex Pulse 12",
    brand: "Vortex",
    tagline: "Engineered for elite mobile gaming and entertainment.",
    description: "With active cooling fans, dedicated trigger buttons, and a customizable RGB rear matrix, the Vortex Pulse 12 is built from the ground up for hardcore gamers. Experience zero lag, immersive sound, and a battery that lasts through marathon sessions.",
    basePrice: 899,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Cyber Neon Blue", hex: "#00E5FF", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80" },
      { name: "Crimson Spark", hex: "#FF1744", image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: [
      { size: "256GB", priceBump: 0 },
      { size: "512GB", priceBump: 100 }
    ],
    specs: {
      screen: "6.78-inch AMOLED, 165Hz Refresh, 720Hz Touch Sampling",
      processor: "Vortex Gaming Engine G2 + Dimensity 9300",
      camera: "64MP Main + 13MP Macro",
      battery: "6000 mAh (80W HyperCharge)",
      os: "VortexOS",
      weight: "220g",
      waterProof: "IP54 dust and splash resistant"
    },
    featured: false,
    onSale: false,
    badge: "Gaming Elite",
    stock: 18
  },
  {
    id: "aura-15-lite",
    name: "Aura 15 Lite",
    brand: "Lite",
    tagline: "Premium aesthetics, lightweight budget.",
    description: "Get the gorgeous design and FluidOS speed of the Aura family at a fraction of the cost. The Aura 15 Lite features a sleek polycarbonate body with a glass-like finish, a reliable dual camera, and exceptional 2-day battery life.",
    basePrice: 499,
    rating: 4.6,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Sleek Pearl White", hex: "#F5F5F7", image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80" },
      { name: "Pastel Lavender", hex: "#E6E6FA", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80" },
      { name: "Charcoal Blue", hex: "#2F4F4F", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: [
      { size: "128GB", priceBump: 0 },
      { size: "256GB", priceBump: 60 }
    ],
    specs: {
      screen: "6.5-inch IPS LCD, 90Hz, Full HD+",
      processor: "MediaTek Dimensity 8200",
      camera: "50MP Main + 8MP Wide",
      battery: "5200 mAh (33W charging)",
      os: "AuraOS",
      weight: "185g",
      waterProof: "IP53 splash proof"
    },
    featured: false,
    onSale: true,
    saleDiscount: 15, // 15% off
    badge: "Value King",
    stock: 45
  },
  {
    id: "apex-pro-max",
    name: "Apex Pro Max Prime",
    brand: "Apex",
    tagline: "The absolute standard for mobile work and design.",
    description: "Equipped with an integrated stylus pen with ultra-low 2.8ms latency, the Apex Pro Max Prime lets you sketch, annotate, and manage worksheets on the go. Armed with an advanced telephoto portrait lens and top-tier security chips.",
    basePrice: 1299,
    rating: 4.9,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Champagne Gold", hex: "#D4AF37", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80" },
      { name: "Phantom Black", hex: "#1A1A1A", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: [
      { size: "256GB", priceBump: 0 },
      { size: "512GB", priceBump: 120 },
      { size: "1TB", priceBump: 300 }
    ],
    specs: {
      screen: "6.9-inch Dynamic AMOLED 2X, QHD+, 120Hz",
      processor: "Exynos 2400 Pro / Snapdragon 8 Gen 3",
      camera: "200MP Main + 50MP Periscope + 12MP Ultra-wide",
      battery: "5400 mAh (65W fast charging)",
      os: "Android",
      weight: "228g",
      waterProof: "IP68 dust and water proof"
    },
    featured: true,
    onSale: false,
    badge: "Stylus Included",
    stock: 19
  },
  {
    id: "vortex-edge-z",
    name: "Vortex Edge Z",
    brand: "Vortex",
    tagline: "Compact form factor, monumental performance.",
    description: "For lovers of small and handy premium phones. The Vortex Edge Z packs flagship internals into a 5.9-inch design that fits comfortably in one hand. Features a gorgeous bezel-less screen and dual-lens high-precision camera.",
    basePrice: 749,
    rating: 4.5,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Polar Ice Blue", hex: "#AFEEEE", image: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=600&q=80" },
      { name: "Matte Black", hex: "#262626", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80" }
    ],
    storageOptions: [
      { size: "128GB", priceBump: 0 },
      { size: "256GB", priceBump: 80 }
    ],
    specs: {
      screen: "5.9-inch Super AMOLED, 120Hz",
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Main + 12MP Ultra-wide",
      battery: "4200 mAh (30W charging)",
      os: "Android",
      weight: "165g",
      waterProof: "IP68 water resistant"
    },
    featured: false,
    onSale: false,
    badge: "Compact Flagship",
    stock: 15
  }
];

export const MOCK_REVIEWS: Record<string, Review[]> = {
  "aura-15-pro": [
    { id: "r1", author: "Marcus V.", rating: 5, comment: "This is easily the best phone I've ever owned. The screen is absurdly bright even under direct sunlight, and the titanium chassis feels amazingly premium.", date: "2024-02-12" },
    { id: "r2", author: "Sarah Jenkins", rating: 5, comment: "The 5x optical zoom camera is mindblowing. I took this to a concert and the photos look like they came from a professional DSLR.", date: "2024-02-05" },
    { id: "r3", author: "Derrick K.", rating: 4, comment: "Incredible battery life and charging speed. AuraOS is very clean, but takes a few days to get used to if you are transitioning from standard Android.", date: "2024-01-28" }
  ],
  "apex-fold-x": [
    { id: "r4", author: "Leah T.", rating: 5, comment: "I can read spreadsheets and watch videos simultaneously without squinting. The crease is barely noticeable after 5 minutes of use.", date: "2024-02-10" },
    { id: "r5", author: "Kenji S.", rating: 4, comment: "An absolute multitasker's dream. It is a bit heavy, but the utility of having a tablet in my pocket is unmatched.", date: "2024-02-01" }
  ],
  "vortex-pulse-12": [
    { id: "r6", author: "GamerPro99", rating: 5, comment: "165Hz screen is incredibly smooth. Games like Genshin and PUBG run at absolute max settings without any thermal throttling thanks to the active cooling fan.", date: "2024-02-14" },
    { id: "r7", author: "Elena Rostova", rating: 4, comment: "The battery is a beast! Easily lasts 2 full days of normal use. The gaming triggers work excellently.", date: "2024-02-03" }
  ]
};

export const PROMO_CODES: Record<string, number> = {
  "WELCOME10": 10,  // 10% off
  "AURASPECIAL": 15, // 15% off
  "SUPERPHONE": 50,  // $50 off flat
};
