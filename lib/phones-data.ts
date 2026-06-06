export interface Phone {
  id: string;
  name: string;
  brand: 'Aura' | 'Nebula' | 'Titan';
  price: number; // Base price for lowest storage
  rating: number;
  reviewsCount: number;
  featured: boolean;
  colors: { name: string; hex: string; bgClass: string }[];
  storage: string[]; // ['128GB', '256GB', '512GB', '1TB']
  is5G: boolean;
  specs: {
    screen: string;
    camera: string;
    battery: string;
    processor: string;
    weight: string;
    os: string;
  };
  description: string;
  longDescription: string;
  imageGradient: string; // Tailwinds classes for a beautiful premium backdrop card
}

export const phonesData: Phone[] = [
  {
    id: "aura-15-pro",
    name: "Aura 15 Pro",
    brand: "Aura",
    price: 999,
    rating: 4.9,
    reviewsCount: 312,
    featured: true,
    colors: [
      { name: "Titanium Silver", hex: "#E2E8F0", bgClass: "bg-slate-200" },
      { name: "Obsidian Black", hex: "#0F172A", bgClass: "bg-slate-900" },
      { name: "Emerald Teal", hex: "#0D9488", bgClass: "bg-teal-600" }
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    is5G: true,
    specs: {
      screen: '6.7" LTPO OLED (120Hz, 2000 nits)',
      camera: "200MP Triple Camera with Optical Zoom x5",
      battery: "5000 mAh, 45W Fast Charging, Qi Wireless",
      processor: "Aura Neural-X2 (3nm)",
      weight: "187g",
      os: "AuraOS 18 (with AI Core)"
    },
    description: "The ultimate flagship experience. Crafted with aerospace-grade titanium, featuring our revolutionary 200MP sensor and Neural-X2 chip.",
    longDescription: "Elevate your digital life with the Aura 15 Pro. Designed for those who demand perfection, this phone blends state-of-the-art computational photography, an ultra-bright LTPO OLED screen, and unprecedented power savings. Its titanium frame is both lighter and stronger than stainless steel, making it as durable as it is beautiful. Enjoy seamless multi-tasking, state-of-the-art gaming, and all-day battery life.",
    imageGradient: "from-blue-600 via-indigo-700 to-slate-900"
  },
  {
    id: "aura-15",
    name: "Aura 15 Standard",
    brand: "Aura",
    price: 799,
    rating: 4.7,
    reviewsCount: 185,
    featured: true,
    colors: [
      { name: "Silver Frost", hex: "#F1F5F9", bgClass: "bg-slate-100" },
      { name: "Obsidian Black", hex: "#0F172A", bgClass: "bg-slate-900" },
      { name: "Amethyst Violet", hex: "#7C3AED", bgClass: "bg-violet-600" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    is5G: true,
    specs: {
      screen: '6.1" OLED Super Retina (90Hz, 1600 nits)',
      camera: "108MP Dual Camera with Night Vision 3.0",
      battery: "4400 mAh, 30W Fast Charging",
      processor: "Aura Neural-X1 (4nm)",
      weight: "172g",
      os: "AuraOS 18"
    },
    description: "Incredible power in a sleek, compact profile. Premium dual cameras, gorgeous OLED screen, and standard 5G connectivity.",
    longDescription: "Aura 15 Standard brings flagship capabilities within reach. Experience the gorgeous 6.1-inch OLED display, custom-tuned stereo audio, and a dual-lens system powered by the Aura Neural-X1 processor. It is the perfect daily companion for creators, professionals, and students alike.",
    imageGradient: "from-violet-600 via-purple-700 to-slate-900"
  },
  {
    id: "nebula-ultra",
    name: "Nebula Ultra Fold",
    brand: "Nebula",
    price: 1399,
    rating: 4.8,
    reviewsCount: 94,
    featured: true,
    colors: [
      { name: "Cosmic Obsidian", hex: "#111827", bgClass: "bg-gray-900" },
      { name: "Stardust Bronze", hex: "#B45309", bgClass: "bg-amber-700" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    is5G: true,
    specs: {
      screen: '7.9" Foldable Flex-OLED (Inner) / 6.3" (Outer)',
      camera: "50MP Triple Camera with Periscope Lens",
      battery: "4800 mAh Dual-Cell, 65W HyperCharge",
      processor: "Snapdragon Elite Gen 4",
      weight: "235g",
      os: "NebulaUI on Android 15"
    },
    description: "The ultimate productivity powerhouse. Folds into a pocketable phone, unfolds into a gorgeous 7.9-inch tablet.",
    longDescription: "Redefine what is possible on a mobile device. The Nebula Ultra Fold features a zero-gap hinge mechanism tested for over 400,000 folds. Multi-task with up to three active apps side-by-side, sketch ideas with the integrated stylus capability, and take beautiful selfies using the rear ultra-res camera system.",
    imageGradient: "from-fuchsia-600 via-pink-700 to-slate-950"
  },
  {
    id: "nebula-x-prime",
    name: "Nebula X-Prime",
    brand: "Nebula",
    price: 899,
    rating: 4.6,
    reviewsCount: 142,
    featured: false,
    colors: [
      { name: "Shadow Black", hex: "#1E293B", bgClass: "bg-slate-800" },
      { name: "Aurora Green", hex: "#059669", bgClass: "bg-emerald-600" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    is5G: true,
    specs: {
      screen: '6.6" AMOLED Infinity (120Hz, HDR10+)',
      camera: "64MP Triple Camera with Action Stabilization",
      battery: "5000 mAh, 50W Fast Charging",
      processor: "Dimensity Ultra-9000",
      weight: "195g",
      os: "NebulaUI on Android 15"
    },
    description: "A creator-focused device with high-definition action stabilization, sleek matte back glass, and long battery life.",
    longDescription: "The Nebula X-Prime is custom built for those who live life on the go. Its class-leading Action Stabilization allows you to record cinematic, shake-free videos at 4K 60FPS. Fully charged in under 45 minutes, it is ready to capture your next adventure.",
    imageGradient: "from-emerald-500 via-teal-700 to-slate-900"
  },
  {
    id: "titan-guardian",
    name: "Titan Guardian Rugged",
    brand: "Titan",
    price: 699,
    rating: 4.5,
    reviewsCount: 78,
    featured: false,
    colors: [
      { name: "Stealth Black", hex: "#030712", bgClass: "bg-neutral-950" },
      { name: "Tactical Orange", hex: "#EA580C", bgClass: "bg-orange-600" }
    ],
    storage: ["128GB", "256GB"],
    is5G: true,
    specs: {
      screen: '6.5" Gorilla Glass Armor (60Hz, high-shatter resistance)',
      camera: "48MP Dual Camera with Thermal Imaging Sensor",
      battery: "8000 mAh Massive Battery, Reverse Charging",
      processor: "Octa-Core Rugged-X",
      weight: "290g",
      os: "Titan Shield OS (Android 14)"
    },
    description: "Indestructible construction meets high-end tech. Features an integrated thermal camera and a colossal 8000mAh battery.",
    longDescription: "Built to survive the harshest environments on Earth. The Titan Guardian is certified with IP68, IP69K, and military standard MIL-STD-810H. Perfect for outdoor enthusiasts, field engineers, and tactical response teams. It features a built-in FLIR thermal imaging camera and can charge other devices as a power bank.",
    imageGradient: "from-amber-600 via-orange-800 to-stone-950"
  },
  {
    id: "titan-lite",
    name: "Titan Lite 5G",
    brand: "Titan",
    price: 499,
    rating: 4.4,
    reviewsCount: 110,
    featured: false,
    colors: [
      { name: "Carbon Grey", hex: "#4B5563", bgClass: "bg-gray-600" },
      { name: "Military Tan", hex: "#D97706", bgClass: "bg-yellow-600" }
    ],
    storage: ["128GB"],
    is5G: true,
    specs: {
      screen: '6.4" HD+ IPS LCD (90Hz)',
      camera: "50MP Dual Camera",
      battery: "6000 mAh, 18W Charging",
      processor: "MediaTek Helio G99",
      weight: "220g",
      os: "Titan Shield OS (Android 14)"
    },
    description: "Affordable rugged design. Massive battery life, solid drops protection, and high-speed 5G connectivity.",
    longDescription: "The Titan Lite 5G brings heavy-duty durability to an attractive price point. Perfect for work environments where drops are frequent but you still require fast 5G data, high-quality audio calling, and multi-day battery reliability.",
    imageGradient: "from-zinc-700 via-zinc-800 to-slate-900"
  }
];
