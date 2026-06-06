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

export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  likes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface EstimationParameter {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  type: 'platform' | 'feature' | 'design' | 'urgency';
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
    saleDiscount: 10,
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
    saleDiscount: 15,
    badge: "Value King",
    stock: 45
  }
];

export const MOCK_REVIEWS: Record<string, Review[]> = {
  "aura-15-pro": [
    { id: "r1", author: "Marcus V.", rating: 5, comment: "This is easily the best phone I've ever owned. The screen is absurdly bright even under direct sunlight.", date: "2024-02-12" }
  ]
};

export const PROMO_CODES: Record<string, number> = {
  "WELCOME10": 10,
  "AURASPECIAL": 15,
  "SUPERPHONE": 50,
};

// Seed Data for DevTools Portal
export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: "snip-1",
    title: "Next.js Route Handler with CORS",
    description: "A complete Route Handler template for Next.js App Router featuring custom CORS headers, error catching, and JSON parsing.",
    language: "typescript",
    tags: ["Next.js", "API", "Backend", "CORS"],
    likes: 142,
    difficulty: "Intermediate",
    code: `import { NextResponse } from 'next/server';

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required field' },
        { status: 400 }
      );
    }
    
    // Process your logic here (e.g. database, emailer)
    
    return NextResponse.json(
      { success: true, message: 'Data received successfully', data: body },
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid JSON payload format' },
      { status: 500 }
    );
  }
}`
  },
  {
    id: "snip-2",
    title: "Debounce Hook in React & TypeScript",
    description: "A high-performance custom hook for debouncing quick input state changes (ideal for real-time search bars and API query limits).",
    language: "typescript",
    tags: ["React", "Hooks", "Performance"],
    likes: 98,
    difficulty: "Beginner",
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: "snip-3",
    title: "JWT Token verification middleware",
    description: "Secure node-based token authentication utility with token expiry checks, ideal for Edge runtime or server-less server middlewares.",
    language: "javascript",
    tags: ["Security", "JWT", "Node.js"],
    likes: 210,
    difficulty: "Advanced",
    code: `import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-super-secret-key-for-local-only'
);

export async function verifyAuthToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
      algorithms: ['HS256'],
    });
    return payload; // Returns decoded token details
  } catch (error) {
    console.error('JWT Verification failed:', error.message);
    throw new Error('Unauthorized: Invalid or expired authentication token');
  }
}`
  },
  {
    id: "snip-4",
    title: "Tailwind Dynamic Color Composer",
    description: "Utility function combining clsx and tailwind-merge to safely compose dynamic style lists without collision.",
    language: "typescript",
    tags: ["Tailwind", "CSS", "UI"],
    likes: 76,
    difficulty: "Beginner",
    code: `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage example:
// <div className={cn('p-4 border rounded-md', isActive && 'bg-primary text-white')} />`
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Alex Rivera",
    role: "Lead Software Architect",
    company: "DevFlow Solutions",
    content: "The API Tester and Snippets repository has saved our frontend team hundreds of hours. Having a reliable live playground built right into our browser dashboard is a game changer.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    rating: 5
  },
  {
    id: "t-2",
    name: "Sarah Chen",
    role: "Fullstack Developer",
    company: "SaaSify Inc",
    content: "The project estimator is unbelievably accurate. We used the PDF-style dynamic receipt to pitch our client on a new microservice architecture and won the contract on the spot!",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: 5
  },
  {
    id: "t-3",
    name: "Douglas Miller",
    role: "CTO & Co-Founder",
    company: "HyperScale Tech",
    content: "Beautiful design, robust tools, and instant response testing. It is clear that this suite is made by developers, for developers. Highly recommended!",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is this DevTools portal?",
    answer: "This is an interactive suite of utility tools designed for developers and product managers. It includes a live API Client Tester, an interactive Code Snippet Repository, and a Project Cost Estimator that generates instant breakdowns."
  },
  {
    id: "faq-2",
    question: "Is the API Client secure for live testing?",
    answer: "Yes, our API Tester runs client-side requests directly from your browser. For testing local APIs or backend services, ensure your server has CORS enabled for this domain."
  },
  {
    id: "faq-3",
    question: "How does the Cost Estimator calculate final values?",
    answer: "It uses pre-set weights for platforms, design complexity, feature additions, and urgency multipliers based on industry-standard development rates. You can export a PDF-style invoice summary instantly."
  },
  {
    id: "faq-4",
    question: "Can I add custom snippets to the repository?",
    answer: "Absolutely! The Snippets page features an interactive form to register your custom code with tags, description, and difficulty level, stored dynamically in your current session."
  }
];

export const ESTIMATION_FACTORS = {
  platforms: [
    { id: 'web', name: 'Web Application (React/Next.js)', cost: 4500, icon: 'Globe' },
    { id: 'mobile-ios', name: 'iOS Mobile App (Swift)', cost: 6000, icon: 'Smartphone' },
    { id: 'mobile-android', name: 'Android Mobile App (Kotlin)', cost: 5500, icon: 'Smartphone' },
    { id: 'cross-platform', name: 'Cross-Platform Mobile (React Native)', cost: 7500, icon: 'Layers' },
  ],
  features: [
    { id: 'auth', name: 'User Authentication & JWT Security', cost: 1200, description: 'OAuth, roles, password resets, session management' },
    { id: 'payment', name: 'Stripe Payment & Subscription Integration', cost: 1500, description: 'Invoices, coupons, webhook listeners, secure checkout' },
    { id: 'database', name: 'Real-time Database & Syncing', cost: 1800, description: 'PostgreSQL/MongoDB, optimized indexes, backup scheduling' },
    { id: 'admin', name: 'Comprehensive Admin Dashboard', cost: 2000, description: 'Data tables, export CSV, metrics, user banning, logs' },
    { id: 'ai', name: 'AI Integration (OpenAI / LLMs)', cost: 2500, description: 'Prompt engineering, structured output, token optimization' },
    { id: 'notifications', name: 'Push Notifications & Email Alerts', cost: 800, description: 'Twilio SMS, Resend email templates, in-app bell' },
  ],
  designs: [
    { id: 'clean', name: 'Clean & Modern (Standard Templates)', multiplier: 1.0, description: 'Elegant Tailwind layouts with minimal custom branding' },
    { id: 'premium', name: 'Premium Custom UI (Bespoke Illustrations & Motion)', multiplier: 1.35, description: 'Framer Motion animations, custom icons, dark mode fine-tuning' },
    { id: 'enterprise', name: 'Enterprise Design System (Figma-to-Code Alignment)', multiplier: 1.6, description: 'Strict component rules, accessibility compliance, full design review sessions' },
  ],
  urgency: [
    { id: 'standard', name: 'Standard Delivery (4-8 weeks)', multiplier: 1.0 },
    { id: 'expedited', name: 'Expedited Delivery (2-3 weeks)', multiplier: 1.25 },
    { id: 'rush', name: 'Rush Dev Sprint (1 week)', multiplier: 1.5 },
  ]
};
