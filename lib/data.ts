export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Phone {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'OnePlus';
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  tag?: string; // e.g. "Best Seller", "New", "Hot Deal"
  colors: { name: string; hex: string }[];
  storage: string[]; // e.g. ["128GB", "256GB", "512GB", "1TB"]
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
    os: string;
    weight: string;
    waterResistance: string;
    charging: string;
  };
  description: string;
  reviews: Review[];
}

export const phonesData: Phone[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1695048133116-291771f28b24?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1695048133148-52643a758784?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.9,
    reviewCount: 142,
    featured: true,
    tag: "Best Seller",
    colors: [
      { name: "Titanium Gray", hex: "#8E8D8A" },
      { name: "Titanium Black", hex: "#232426" },
      { name: "Titanium Blue", hex: "#2F4452" },
      { name: "Titanium Silver", hex: "#E3E4E5" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      screen: "6.7-inch Super Retina XDR OLED, 120Hz ProMotion",
      processor: "A17 Pro chip with 6-core GPU",
      camera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      battery: "4441 mAh (Up to 29 hours video playback)",
      os: "iOS 17 (Upgradable to iOS 18)",
      weight: "221g",
      waterResistance: "IP68 (depth of 6 meters up to 30 mins)",
      charging: "25W USB-C fast charging, 15W MagSafe wireless"
    },
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    reviews: [
      { id: "r1", author: "Sarah Jenkins", rating: 5, date: "2024-02-15", comment: "The titanium build feels incredibly premium and lightweight. The 5x camera lens zoom is crystal clear!" },
      { id: "r2", author: "David K.", rating: 5, date: "2024-02-10", comment: "Incredible battery life. Easily lasts me two days of moderate usage. A17 Pro runs modern games flawlessly." },
      { id: "r3", author: "Marc L.", rating: 4.5, date: "2024-01-28", comment: "Excellent screen and build. A bit pricey, but absolutely worth it if you are upgrading from an older iPhone." }
    ]
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    originalPrice: 1399,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.8,
    reviewCount: 118,
    featured: true,
    tag: "AI Powered",
    colors: [
      { name: "Titanium Yellow", hex: "#EEDC82" },
      { name: "Titanium Violet", hex: "#4B0082" },
      { name: "Titanium Gray", hex: "#708090" },
      { name: "Titanium Black", hex: "#0F0F0F" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      screen: "6.8-inch Dynamic AMOLED 2X, QHD+, 120Hz, 2600 nits",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Main + 50MP Telephoto + 12MP Ultra Wide + 10MP Telephoto",
      battery: "5000 mAh (45W Super Fast Charging 2.0)",
      os: "Android 14 with One UI 6.1",
      weight: "232g",
      waterResistance: "IP68 dust/water resistant",
      charging: "45W Wired, 15W Wireless (Qi), 4.5W Reverse Wireless"
    },
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    reviews: [
      { id: "r4", author: "Elena Rostova", rating: 5, date: "2024-02-18", comment: "The live translation feature works like magic! S-Pen is as handy as ever and the anti-reflective screen is outstanding." },
      { id: "r5", author: "John Miller", rating: 4, date: "2024-02-12", comment: "200MP camera is insane. Zooming in reveals details you can't see with the naked eye. Quite bulky though." }
    ]
  },
  {
    id: "google-pixel-8-pro",
    name: "Pixel 8 Pro",
    brand: "Google",
    price: 999,
    originalPrice: 1049,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.7,
    reviewCount: 95,
    featured: true,
    tag: "Best Camera",
    colors: [
      { name: "Bay Blue", hex: "#87CEEB" },
      { name: "Porcelain", hex: "#FAEBD7" },
      { name: "Obsidian", hex: "#1C1C1C" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    specs: {
      screen: "6.7-inch Super Actua LTPO OLED, 120Hz, 2400 nits",
      processor: "Google Tensor G3 with Titan M2 security",
      camera: "50MP Main + 48MP Ultra Wide + 48MP 5x Zoom",
      battery: "5050 mAh (30W Fast Charging)",
      os: "Android 14 (7 years of guaranteed updates)",
      weight: "213g",
      waterResistance: "IP68 dust/water resistant",
      charging: "30W Wired, 23W Wireless (Pixel Stand)"
    },
    description: "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera yet, and can even help you filter out spam calls.",
    reviews: [
      { id: "r6", author: "Clara S.", rating: 5, date: "2024-02-22", comment: "Magic Eraser and Best Take are amazing features. The software feels so clean and fluid." },
      { id: "r7", author: "Tobias M.", rating: 4, date: "2024-02-05", comment: "Superb photo quality, particularly skin tones and night shots. Battery life is decent but not as stellar as the S24 Ultra." }
    ]
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 799,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.6,
    reviewCount: 74,
    featured: true,
    tag: "Value Flagship",
    colors: [
      { name: "Flowy Emerald", hex: "#507D6E" },
      { name: "Silky Black", hex: "#1A1A1A" }
    ],
    storage: ["256GB", "512GB"],
    specs: {
      screen: "6.82-inch 2K Oriental AMOLED, ProXDR 120Hz, 4500 nits peak",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultra Wide",
      battery: "5400 mAh (100W SUPERVOOC charging)",
      os: "OxygenOS based on Android 14",
      weight: "220g",
      waterResistance: "IP65 water/dust resistant",
      charging: "100W Wired (0-100% in 26 mins), 50W AIRVOOC wireless"
    },
    description: "Redefined flagship specs. Powered by Snapdragon 8 Gen 3 with up to 16GB RAM and revolutionary 100W fast charging that juices up your phone in minutes.",
    reviews: [
      { id: "r8", author: "Alex R.", rating: 5, date: "2024-02-14", comment: "100W charging is life-changing. Literally plug it in for 15 minutes while getting ready and you're good for the day." },
      { id: "r9", author: "Samantha T.", rating: 4, date: "2024-01-20", comment: "The display is absolutely gorgeous. Camera tuning by Hasselblad gives beautiful artistic tones. IP65 rather than IP68 is the only minor downside." }
    ]
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    brand: "Apple",
    price: 799,
    originalPrice: 849,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.7,
    reviewCount: 88,
    featured: false,
    tag: "Popular",
    colors: [
      { name: "Black", hex: "#222222" },
      { name: "Blue", hex: "#D2E4EE" },
      { name: "Pink", hex: "#FADADD" },
      { name: "Yellow", hex: "#FFFDD0" },
      { name: "Green", hex: "#E0EEE0" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    specs: {
      screen: "6.1-inch Super Retina XDR OLED with Dynamic Island",
      processor: "A16 Bionic chip with 5-core GPU",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "3349 mAh (Up to 20 hours video playback)",
      os: "iOS 17",
      weight: "171g",
      waterResistance: "IP68 (depth of 6 meters up to 30 mins)",
      charging: "20W Wired, 15W MagSafe wireless"
    },
    description: "Features Dynamic Island, a 48MP Main camera, and USB-C, all in a durable color-infused glass and aluminum design.",
    reviews: [
      { id: "r10", author: "Jordan P.", rating: 5, date: "2024-02-28", comment: "Dynamic Island is incredibly useful! The pastel pink color looks beautiful and feels amazing in hand." }
    ]
  },
  {
    id: "galaxy-s24-plus",
    name: "Galaxy S24+",
    brand: "Samsung",
    price: 999,
    originalPrice: 1049,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.7,
    reviewCount: 52,
    featured: false,
    tag: "New",
    colors: [
      { name: "Onyx Black", hex: "#292A2C" },
      { name: "Marble Gray", hex: "#7E8082" },
      { name: "Cobalt Violet", hex: "#3B2F4C" },
      { name: "Amber Yellow", hex: "#E9D2A3" }
    ],
    storage: ["256GB", "512GB"],
    specs: {
      screen: "6.7-inch Dynamic AMOLED 2X, QHD+, 120Hz, 2600 nits",
      processor: "Exynos 2400 / Snapdragon 8 Gen 3",
      camera: "50MP Main + 10MP Telephoto + 12MP Ultra Wide",
      battery: "4900 mAh (45W Super Fast Charging)",
      os: "Android 14 with One UI 6.1",
      weight: "196g",
      waterResistance: "IP68 dust/water resistant",
      charging: "45W Wired, 15W Wireless"
    },
    description: "The perfect balance of size and performance. Features a gorgeous QHD+ screen, high-capacity battery, and Galaxy AI tools.",
    reviews: [
      { id: "r11", author: "Lucas G.", rating: 4.5, date: "2024-03-01", comment: "Awesome battery life and screen. It is lighter than the Ultra and fits better in the pocket." }
    ]
  },
  {
    id: "google-pixel-8",
    name: "Pixel 8",
    brand: "Google",
    price: 699,
    originalPrice: 749,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.5,
    reviewCount: 63,
    featured: false,
    tag: "Compact Pick",
    colors: [
      { name: "Hazel", hex: "#8A9A86" },
      { name: "Rose", hex: "#F3CFC6" },
      { name: "Obsidian", hex: "#2E2E2E" }
    ],
    storage: ["128GB", "256GB"],
    specs: {
      screen: "6.2-inch Actua OLED, 120Hz, 2000 nits peak",
      processor: "Google Tensor G3",
      camera: "50MP Main + 12MP Ultra Wide",
      battery: "4575 mAh (27W Fast Charging)",
      os: "Android 14 (7 years updates)",
      weight: "187g",
      waterResistance: "IP68 dust/water resistant",
      charging: "27W Wired, 18W Wireless"
    },
    description: "The helpful phone that fits in your hand. Powered by Google Tensor G3, it offers incredible photography and advanced AI features in a compact design.",
    reviews: [
      { id: "r12", author: "Nora B.", rating: 4.5, date: "2024-02-11", comment: "Finally, a flagship phone that isn't a giant brick! Fits nicely in smaller hands, and takes superb photos." }
    ]
  },
  {
    id: "oneplus-12r",
    name: "OnePlus 12R",
    brand: "OnePlus",
    price: 499,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&q=80&w=600",
    images: [
      "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&q=80&w=600"
    ],
    rating: 4.6,
    reviewCount: 41,
    featured: false,
    tag: "Budget Beast",
    colors: [
      { name: "Cool Blue", hex: "#9BC4E2" },
      { name: "Iron Gray", hex: "#4A4D4F" }
    ],
    storage: ["128GB", "256GB"],
    specs: {
      screen: "6.78-inch 1.5K AMOLED, 120Hz ProXDR with LTPO 4.0",
      processor: "Snapdragon 8 Gen 2",
      camera: "50MP Sony IMX890 + 8MP Ultra Wide + 2MP Macro",
      battery: "5500 mAh (100W SUPERVOOC)",
      os: "OxygenOS based on Android 14",
      weight: "207g",
      waterResistance: "IP64 water splash resistance",
      charging: "100W wired fast charging (0-100% in 26 minutes)"
    },
    description: "The performance powerhouse. Boasting a massive 5,500 mAh battery, 100W charging, and Snapdragon 8 Gen 2, it sets a new standard for budget flagships.",
    reviews: [
      { id: "r13", author: "Marcus V.", rating: 5, date: "2024-03-05", comment: "The battery on this thing is endless! Easily get 10-11 hours of screen-on-time. Best value phone of the year." }
    ]
  }
];

export function getPhoneById(id: string): Phone | undefined {
  return phonesData.find(p => p.id === id);
}

export function getFeaturedPhones(): Phone[] {
  return phonesData.filter(p => p.featured);
}

export function getBrands(): string[] {
  return Array.from(new Set(phonesData.map(p => p.brand)));
}
