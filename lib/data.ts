export interface PhoneReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface PhoneColor {
  name: string;
  hex: string;
}

export interface PhoneStorage {
  size: string;
  priceModifier: number;
}

export interface PhoneSpecs {
  screen: string;
  processor: string;
  camera: string;
  battery: string;
  weight: string;
  os: string;
}

export interface Phone {
  id: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  colors: PhoneColor[];
  storageOptions: PhoneStorage[];
  specs: PhoneSpecs;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isDeal: boolean;
  stock: number;
  reviews: PhoneReview[];
}

export const PHONES: Phone[] = [
  {
    id: "iphone-15-pro-max",
    brand: "Apple",
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    colors: [
      { name: "Natural Titanium", hex: "#8F8A85" },
      { name: "Blue Titanium", hex: "#2F4452" },
      { name: "White Titanium", hex: "#F2F1ED" },
      { name: "Black Titanium", hex: "#35393B" }
    ],
    storageOptions: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 200 },
      { size: "1TB", priceModifier: 400 }
    ],
    specs: {
      screen: "6.7-inch Super Retina XDR OLED, 120Hz",
      processor: "A17 Pro chip with 6-core GPU",
      camera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      battery: "4441 mAh with 25W fast charging",
      weight: "221g",
      os: "iOS 17 (Upgradable to iOS 18)"
    },
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    isDeal: true,
    stock: 15,
    reviews: [
      { id: "r1", author: "Sarah M.", rating: 5, date: "2024-02-10", comment: "The titanium finish feels amazing in the hand. The camera is outstanding, especially the 5x zoom!" },
      { id: "r2", author: "David K.", rating: 5, date: "2024-02-01", comment: "Incredibly fast processor. Battery lasts easily over a day and a half under heavy usage." },
      { id: "r3", author: "Elena R.", rating: 4, date: "2024-01-20", comment: "Amazing screen and performance, but charging speed could be faster." }
    ]
  },
  {
    id: "galaxy-s24-ultra",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    price: 1299,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    colors: [
      { name: "Titanium Gray", hex: "#7E7F82" },
      { name: "Titanium Black", hex: "#212224" },
      { name: "Titanium Violet", hex: "#463F54" },
      { name: "Titanium Yellow", hex: "#EBE3CD" }
    ],
    storageOptions: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 120 },
      { size: "1TB", priceModifier: 360 }
    ],
    specs: {
      screen: "6.8-inch Dynamic AMOLED 2X, QHD+, 120Hz",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Main + 50MP + 12MP + 10MP Quad Camera",
      battery: "5000 mAh with 45W super fast charging",
      weight: "232g",
      os: "Android 14 with One UI 6.1"
    },
    rating: 4.8,
    reviewsCount: 98,
    isFeatured: true,
    isDeal: false,
    stock: 12,
    reviews: [
      { id: "r4", author: "James P.", rating: 5, date: "2024-02-15", comment: "The built-in S-Pen is awesome and the AI photo editor features are like magic. Recommended!" },
      { id: "r5", author: "Chloe W.", rating: 4, date: "2024-02-11", comment: "Outstanding display with almost zero reflection. Very big phone though, hard to use with one hand." }
    ]
  },
  {
    id: "pixel-8-pro",
    brand: "Google",
    name: "Pixel 8 Pro",
    price: 999,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600",
    description: "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera ever, and can translate languages in real time.",
    colors: [
      { name: "Bay Blue", hex: "#A6C8E0" },
      { name: "Porcelain", hex: "#F4EFE6" },
      { name: "Obsidian", hex: "#2E3033" }
    ],
    storageOptions: [
      { size: "128GB", priceModifier: 0 },
      { size: "256GB", priceModifier: 80 },
      { size: "512GB", priceModifier: 200 }
    ],
    specs: {
      screen: "6.7-inch Super Actua LTPO OLED, 120Hz",
      processor: "Google Tensor G3 (4nm)",
      camera: "50MP Main + 48MP Ultra Wide + 48MP 5x Zoom",
      battery: "5050 mAh with 30W fast charging",
      weight: "213g",
      os: "Android 14 (Pure Pixel Experience)"
    },
    rating: 4.7,
    reviewsCount: 84,
    isFeatured: true,
    isDeal: true,
    stock: 8,
    reviews: [
      { id: "r6", author: "Michael T.", rating: 5, date: "2024-01-28", comment: "Magic Eraser and Best Take are insane. Perfect for family photos. Cleanest Android experience ever." }
    ]
  },
  {
    id: "oneplus-12",
    brand: "OnePlus",
    name: "OnePlus 12",
    price: 799,
    image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&q=80&w=600",
    description: "Redefined flagship specs. Driven by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera, and record-breaking 100W SUPERVOOC charging.",
    colors: [
      { name: "Flowy Emerald", hex: "#5F7D6D" },
      { name: "Silky Black", hex: "#222527" }
    ],
    storageOptions: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 100 }
    ],
    specs: {
      screen: "6.82-inch 2K Oriental AMOLED, 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Main + 64MP 3x Periscope + 48MP Ultra Wide",
      battery: "5400 mAh with 100W SUPERVOOC",
      weight: "220g",
      os: "OxygenOS based on Android 14"
    },
    rating: 4.6,
    reviewsCount: 56,
    isFeatured: false,
    isDeal: true,
    stock: 20,
    reviews: [
      { id: "r7", author: "Lucas B.", rating: 5, date: "2024-02-05", comment: "Charges from 0 to 100 in 26 minutes! Absolutely mindblowing speed and gorgeous screen." }
    ]
  },
  {
    id: "galaxy-z-fold-5",
    brand: "Samsung",
    name: "Galaxy Z Fold 5",
    price: 1799,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
    description: "The ultimate 7.6-inch screen mobile powerhouse. Fold an entire tablet into your pocket with a zero-gap hinge and multi-window multitasking.",
    colors: [
      { name: "Icy Blue", hex: "#C5D1DC" },
      { name: "Phantom Black", hex: "#1C1D1E" },
      { name: "Cream", hex: "#F3EFE0" }
    ],
    storageOptions: [
      { size: "256GB", priceModifier: 0 },
      { size: "512GB", priceModifier: 150 },
      { size: "1TB", priceModifier: 350 }
    ],
    specs: {
      screen: "7.6-inch Foldable Dynamic AMOLED 2X + 6.2-inch Cover Screen",
      processor: "Snapdragon 8 Gen 2 for Galaxy",
      camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
      battery: "4400 mAh with 25W charging",
      weight: "253g",
      os: "Android 13 with One UI 5.1.1"
    },
    rating: 4.5,
    reviewsCount: 37,
    isFeatured: true,
    isDeal: false,
    stock: 6,
    reviews: [
      { id: "r8", author: "Rebecca F.", rating: 5, date: "2024-01-15", comment: "Multitasking is incredible. I can write emails while watching videos easily. Built like a tank too." }
    ]
  },
  {
    id: "iphone-15",
    brand: "Apple",
    name: "iPhone 15",
    price: 799,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600",
    description: "Features Dynamic Island, a 48MP Main camera, and USB-C, all in a durable color-infused glass and aluminum design.",
    colors: [
      { name: "Black", hex: "#222222" },
      { name: "Blue", hex: "#D2E5EC" },
      { name: "Pink", hex: "#F7D5D9" },
      { name: "Yellow", hex: "#FAF1C9" }
    ],
    storageOptions: [
      { size: "128GB", priceModifier: 0 },
      { size: "256GB", priceModifier: 100 },
      { size: "512GB", priceModifier: 300 }
    ],
    specs: {
      screen: "6.1-inch Super Retina XDR OLED",
      processor: "A16 Bionic chip with 5-core GPU",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "3349 mAh with 20W charging",
      weight: "171g",
      os: "iOS 17"
    },
    rating: 4.7,
    reviewsCount: 110,
    isFeatured: false,
    isDeal: false,
    stock: 25,
    reviews: [
      { id: "r9", author: "Leo G.", rating: 4, date: "2024-02-14", comment: "The dynamic island makes a big difference. The pastel pink color is beautiful in person." }
    ]
  },
  {
    id: "nothing-phone-2",
    brand: "Nothing",
    name: "Nothing Phone (2)",
    price: 599,
    originalPrice: 649,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600",
    description: "A unique glyph interface, premium materials, and custom Nothing OS 2.0. Experience technology with more soul, more focus, and less distraction.",
    colors: [
      { name: "Dark Gray", hex: "#3A3D40" },
      { name: "White", hex: "#FFFFFF" }
    ],
    storageOptions: [
      { size: "128GB", priceModifier: 0 },
      { size: "256GB", priceModifier: 50 },
      { size: "512GB", priceModifier: 150 }
    ],
    specs: {
      screen: "6.7-inch Flexible LTPO OLED, 120Hz",
      processor: "Snapdragon 8+ Gen 1",
      camera: "50MP Main + 50MP Ultra Wide",
      battery: "4700 mAh with 45W fast charging",
      weight: "201.2g",
      os: "Nothing OS 2.0 based on Android 13"
    },
    rating: 4.6,
    reviewsCount: 42,
    isFeatured: false,
    isDeal: true,
    stock: 10,
    reviews: [
      { id: "r10", author: "Oliver S.", rating: 5, date: "2024-01-30", comment: "The Glyph lights are not just a gimmick; they are super helpful for timers and silent notifications!" }
    ]
  }
];

export interface TradeInModel {
  brand: string;
  model: string;
  baseValue: number;
}

export const TRADE_IN_MODELS: TradeInModel[] = [
  { brand: "Apple", model: "iPhone 14 Pro Max", baseValue: 650 },
  { brand: "Apple", model: "iPhone 14 Pro", baseValue: 550 },
  { brand: "Apple", model: "iPhone 13 Pro Max", baseValue: 450 },
  { brand: "Apple", model: "iPhone 12", baseValue: 250 },
  { brand: "Samsung", model: "Galaxy S23 Ultra", baseValue: 600 },
  { brand: "Samsung", model: "Galaxy S22 Ultra", baseValue: 400 },
  { brand: "Samsung", model: "Galaxy S21", baseValue: 180 },
  { brand: "Google", model: "Pixel 7 Pro", baseValue: 350 },
  { brand: "Google", model: "Pixel 6", baseValue: 150 },
  { brand: "OnePlus", model: "OnePlus 11", baseValue: 300 }
];

export const FAQS = [
  {
    question: "Do Phonix smartphones come with a warranty?",
    answer: "Yes, all phones purchased from Phonix come with a 2-year manufacturer warranty that covers all technical defects. You can also purchase our Phonix Care+ accidental damage insurance during checkout."
  },
  {
    question: "How does the Trade-In program work?",
    answer: "Use our interactive Trade-In Estimator to calculate your old phone's value. You will receive an instant promo code that you can apply at checkout. Then, ship us your old device using our free prepaid label within 14 days of receiving your new phone!"
  },
  {
    question: "Can I book a repair online?",
    answer: "Absolutely! Go to our Support page, pick your device and the issue, select a date, and book an appointment at one of our 150+ express repair hubs, or choose a mail-in repair."
  },
  {
    question: "Is shipping free?",
    answer: "Yes! We offer free premium express shipping on all orders over $150. Delivery typically takes 1-3 business days depending on your location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day risk-free return policy. If you are not completely satisfied with your smartphone, you can return it in its original packaging for a full refund."
  }
];
