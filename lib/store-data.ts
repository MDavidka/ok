export interface PhoneReview {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface PhoneSpecs {
  screen: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
  weight: string;
  waterproof: string;
}

export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  image: string;
  colors: string[];
  storageOptions: string[];
  highlights: string[];
  specs: PhoneSpecs;
  description: string;
  isNew: boolean;
  isFeatured: boolean;
  reviews: PhoneReview[];
}

export const BRANDS = ["Volta", "Aura", "Zenith", "Titan", "Nova", "Quantum"];

export const PHONES: Phone[] = [
  {
    id: "volta-x1-pro",
    name: "Volta X-1 Pro",
    brand: "Volta",
    price: 999,
    originalPrice: 1099,
    rating: 4.9,
    ratingCount: 142,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    colors: ["Space Black", "Titanium Gold", "Emerald Wave"],
    storageOptions: ["128GB", "256GB", "512GB"],
    highlights: [
      "Next-Gen Voltaic A17 Bionic Processor",
      "Triple 108MP Pro-Grade Camera System",
      "6.7\" Dynamic LTPO AMOLED 120Hz Display",
      "65W SuperVolt Fast Wireless Charging"
    ],
    specs: {
      screen: "6.7 inches, Super AMOLED, 120Hz, HDR10+",
      processor: "Voltaic A17 (4nm) Octa-core",
      camera: "108MP Main + 48MP Telephoto (5x optical) + 12MP Ultra-wide",
      battery: "5000 mAh, 65W wired, 30W wireless",
      os: "VoltOS 16 (Based on Android 14)",
      weight: "189g",
      waterproof: "IP68 Dust/Water Resistant (up to 1.5m for 30 mins)"
    },
    description: "Experience absolute power and beauty. The Volta X-1 Pro redefines what a smartphone can accomplish with its industry-leading 108MP triple camera system, futuristic VoltOS customization, and ultra-efficient 4nm processor that easily powers through multiple days of intensive use.",
    isNew: true,
    isFeatured: true,
    reviews: [
      { id: "r1", user: "Alexander G.", rating: 5, date: "2024-02-12", comment: "The camera is absolutely unreal. Low light photos look like they were shot on a professional DSLR. Worth every single penny!" },
      { id: "r2", user: "Sophia L.", rating: 4.8, date: "2024-02-08", comment: "Very fast charging and the battery lasts almost 2 days of regular work use. The Space Black color is gorgeous." },
      { id: "r3", user: "Marcus K.", rating: 5, date: "2024-01-20", comment: "Unbelievable screen. Coming from a 60Hz phone, the 120Hz on Volta X-1 Pro is buttery smooth." }
    ]
  },
  {
    id: "zenith-fold-5g",
    name: "Zenith Fold 5G",
    brand: "Zenith",
    price: 1799,
    originalPrice: 1999,
    rating: 4.7,
    ratingCount: 68,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", // Placeholder but stylized
    colors: ["Cosmos Silver", "Nebula Purple"],
    storageOptions: ["256GB", "512GB"],
    highlights: [
      "7.8\" Foldable Ultra-Thin Glass Display",
      "Seamless Multi-Active Window Multitasking",
      "Under-Display Front Facing Camera",
      "Zenith Armor Hinge Technology"
    ],
    specs: {
      screen: "7.8 inches Foldable Dynamic AMOLED 2X, 120Hz (Cover: 6.2\")",
      processor: "Snapdragon 8 Gen 3 Mobile Platform",
      camera: "50MP Main + 12MP Telephoto + 12MP Ultra-wide",
      battery: "4800 mAh Dual Battery, 45W Fast Charging",
      os: "Zenith UI Fold Edition (Android 14)",
      weight: "235g",
      waterproof: "IPX8 Water Resistant"
    },
    description: "The future is flexible. The Zenith Fold 5G seamlessly transforms from a pocketable high-end smartphone into an expansive 7.8-inch tablet. Engineered with an aerospace-grade armor hinge and custom software optimizations for multitasking, it is the ultimate productivity and entertainment companion.",
    isNew: true,
    isFeatured: true,
    reviews: [
      { id: "r4", user: "David T.", rating: 5, date: "2024-02-15", comment: "Multitasking on this is a dream. I can have my email, a web page, and a video open simultaneously without any lag." },
      { id: "r5", user: "Elena R.", rating: 4, date: "2024-02-01", comment: "Amazing engineering. The crease is barely noticeable when the screen is on. It is a bit heavy, but expected for a foldable." }
    ]
  },
  {
    id: "aura-lite-14",
    name: "Aura Lite 14",
    brand: "Aura",
    price: 449,
    originalPrice: 499,
    rating: 4.6,
    ratingCount: 210,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    colors: ["Mint Green", "Sky Blue", "Snow White"],
    storageOptions: ["128GB", "256GB"],
    highlights: [
      "Ultra-Slim 7.2mm Ergonomic Profile",
      "64MP AI Dual-Lens Camera",
      "All-Day 4500mAh Battery Life",
      "Vibrant 6.4\" FHD+ AMOLED Screen"
    ],
    specs: {
      screen: "6.4 inches, AMOLED, 90Hz, Full HD+",
      processor: "Aura Core 880 (6nm)",
      camera: "64MP Main + 8MP Ultra-wide, 16MP Selfie",
      battery: "4500 mAh, 33W Fast Charging",
      os: "AuraOS Light (Android 13)",
      weight: "162g",
      waterproof: "IP53 Dust & Splash Protected"
    },
    description: "Elegant, lightweight, and surprisingly powerful. The Aura Lite 14 offers high-end aesthetics and essential features at a fraction of the price. Perfect for everyday users, social media creators, and anyone who values a sleek design that fits comfortably in any pocket.",
    isNew: false,
    isFeatured: true,
    reviews: [
      { id: "r6", user: "Chloe M.", rating: 5, date: "2024-01-18", comment: "I love how lightweight this phone is. The Mint Green color looks absolutely beautiful!" },
      { id: "r7", user: "Jason P.", rating: 4, date: "2024-01-05", comment: "Great budget option. Screen is bright and clear, and the camera is excellent for daytime photos." }
    ]
  },
  {
    id: "titan-rugged-neo",
    name: "Titan Rugged Neo",
    brand: "Titan",
    price: 599,
    rating: 4.8,
    ratingCount: 94,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    colors: ["Tactical Orange", "Stealth Grey"],
    storageOptions: ["128GB", "256GB"],
    highlights: [
      "Military-Grade MIL-STD-810H Drop Protection",
      "Massive 8000mAh Extreme Battery",
      "Built-in 800 Lumen Emergency Flashlight",
      "Underwater Photography Mode"
    ],
    specs: {
      screen: "6.5 inches, IPS LCD, Gorilla Glass Victus 2",
      processor: "MediaTek Dimensity 8200 Rugged Edition",
      camera: "48MP Ruggedized Main + 20MP Night Vision Camera",
      battery: "8000 mAh, 33W wired charging, Reverse charging supported",
      os: "TitanOS 3.0 (Android 14 Rugged)",
      weight: "298g",
      waterproof: "IP68/IP69K Waterproof, Dustproof, Drop-to-concrete up to 2m"
    },
    description: "Built for adventurers, professionals, and the extreme outdoors. The Titan Rugged Neo can survive drops onto hard concrete, extreme temperatures, and underwater immersion up to 2 meters. With an extraordinary 8000mAh battery, you can spend days away from a power outlet with complete confidence.",
    isNew: false,
    isFeatured: false,
    reviews: [
      { id: "r8", user: "Robert B.", rating: 5, date: "2024-02-10", comment: "I work in heavy construction and this phone is a tank. Dropped it into wet cement and washed it off with a hose, still works perfectly!" },
      { id: "r9", user: "Sarah W.", rating: 4.6, date: "2024-01-29", comment: "The night vision camera is incredibly useful for camping. Battery literally lasts 3 full days of heavy usage." }
    ]
  },
  {
    id: "nova-se-speed",
    name: "Nova SE Speed",
    brand: "Nova",
    price: 349,
    originalPrice: 399,
    rating: 4.5,
    ratingCount: 128,
    image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
    colors: ["Sonic Blue", "Neon Crimson"],
    storageOptions: ["128GB"],
    highlights: [
      "HyperCharge 80W (0 to 100% in 25 minutes)",
      "90Hz Smooth Refresh Rate Screen",
      "AI Smart Game Booster Mode",
      "Stereo Surround Sound Speakers"
    ],
    specs: {
      screen: "6.5 inches, FHD+ IPS LCD, 90Hz",
      processor: "NovaSpeed 770 Octa-Core",
      camera: "50MP Main + 2MP Depth, 8MP Front",
      battery: "4200 mAh, 80W HyperCharge",
      os: "NovaUI 5 (Android 13)",
      weight: "175g",
      waterproof: "IP52 Splash Resistant"
    },
    description: "Speed has a new name. The Nova SE Speed is engineered for young power users and mobile gamers who demand lightning-fast performance and instant charging. Charge your battery to 100% in under 25 minutes while enjoying lag-free frame rates with the integrated AI Game Booster.",
    isNew: false,
    isFeatured: false,
    reviews: [
      { id: "r10", user: "Kevin L.", rating: 5, date: "2024-02-02", comment: "The 80W charging is standard-shattering. I plug it in, take a shower, and it is fully charged. Best budget gaming phone." },
      { id: "r11", user: "Rachel T.", rating: 4, date: "2024-01-15", comment: "Handles games like PUBG and Genshin on medium settings without overheating. Very pleased with this value." }
    ]
  },
  {
    id: "quantum-pro-14",
    name: "Quantum Pro 14",
    brand: "Quantum",
    price: 1199,
    rating: 4.9,
    ratingCount: 85,
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80",
    colors: ["Gravity Grey", "Stellar Bronze", "Deep Ocean Blue"],
    storageOptions: ["256GB", "512GB", "1TB"],
    highlights: [
      "Quantum Neural Cinematic Sensor",
      "144Hz Ultra-Fluid Pro Motion Display",
      "Symmetric Quad Stereo Speakers by Harman",
      "Integrated Smart Stylus Support"
    ],
    specs: {
      screen: "6.8 inches, Dynamic AMOLED 2X, 144Hz, QHD+",
      processor: "Quantum Neural Chipset Q1",
      camera: "200MP Main + 50MP Periscope Telephoto (10x) + 12MP Ultra-wide",
      battery: "5200 mAh, 45W Fast Charging",
      os: "QuantumCore OS 4.0 (Android 14)",
      weight: "208g",
      waterproof: "IP68 Dust/Water Resistant"
    },
    description: "The ultimate tool for creators, directors, and visionaries. Featuring a revolutionary 200MP cinematic main camera and custom Quantum Neural processor, the Quantum Pro 14 captures stunning 8K videos with real-time depth grading. Includes stylus support for professional sketching and editing on the go.",
    isNew: true,
    isFeatured: true,
    reviews: [
      { id: "r12", user: "Oliver S.", rating: 5, date: "2024-02-14", comment: "As a professional videographer, the manual control settings on the 200MP camera are exceptional. The QHD+ screen is perfectly color-calibrated." },
      { id: "r13", user: "Emily N.", rating: 4.8, date: "2024-02-05", comment: "The stylus works wonderfully for digital signatures and quick photo touch-ups. Very premium feel." }
    ]
  }
];

export function getPhoneById(id: string): Phone | undefined {
  return PHONES.find(phone => phone.id === id);
}

export function getRelatedPhones(currentId: string, limit = 3): Phone[] {
  return PHONES.filter(phone => phone.id !== currentId).slice(0, limit);
}
