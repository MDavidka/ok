export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'OnePlus';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  colors: { name: string; hex: string }[];
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
    weight: string;
    storage: string[];
  };
  tags: string[];
  description: string;
  isBestSeller?: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Titanium Gray", hex: "#8a8b8c" },
      { name: "Titanium Black", hex: "#232426" },
      { name: "Titanium Blue", hex: "#2f4452" }
    ],
    specs: {
      screen: "6.7\" Super Retina XDR OLED, 120Hz",
      processor: "A17 Pro Chip (3nm)",
      camera: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      battery: "4441 mAh with 25W Fast Charging",
      weight: "221g",
      storage: ["256GB", "512GB", "1TB"]
    },
    tags: ["Flagship", "Titanium", "Pro Camera"],
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    isBestSeller: true,
    featured: true
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    rating: 4.8,
    reviewsCount: 245,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Titanium Yellow", hex: "#ded5be" },
      { name: "Titanium Violet", hex: "#4a3b5c" },
      { name: "Titanium Gray", hex: "#7a7e85" }
    ],
    specs: {
      screen: "6.8\" Dynamic AMOLED 2X, QHD+, 120Hz",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Main + 50MP + 12MP + 10MP Quad Camera",
      battery: "5000 mAh with 45W Fast Charging",
      weight: "232g",
      storage: ["256GB", "512GB", "1TB"]
    },
    tags: ["Galaxy AI", "200MP Camera", "S-Pen Included"],
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    isBestSeller: true,
    featured: true
  },
  {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 999,
    originalPrice: 1049,
    rating: 4.7,
    reviewsCount: 189,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Bay Blue", hex: "#a4c2e6" },
      { name: "Porcelain", hex: "#f4f0ea" },
      { name: "Obsidian", hex: "#2d2e30" }
    ],
    specs: {
      screen: "6.7\" Super Actua Display, 120Hz",
      processor: "Google Tensor G3 (Titan M2)",
      camera: "50MP Main + 48MP Ultra Wide + 48MP 5x Zoom",
      battery: "5050 mAh with 30W Fast Charging",
      weight: "213g",
      storage: ["128GB", "256GB", "512GB"]
    },
    tags: ["Pure Android", "Magic Eraser", "Tensor AI"],
    description: "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera yet, and can even help you screen calls.",
    isBestSeller: false,
    featured: true
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12 Pro",
    brand: "OnePlus",
    price: 799,
    originalPrice: 899,
    rating: 4.6,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Flowy Emerald", hex: "#4f7564" },
      { name: "Silky Black", hex: "#1c1d1f" }
    ],
    specs: {
      screen: "6.82\" 2K Oriental AMOLED, 120Hz",
      processor: "Snapdragon 8 Gen 3",
      camera: "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP UW",
      battery: "5400 mAh with 100W SUPERVOOC",
      weight: "220g",
      storage: ["256GB", "512GB"]
    },
    tags: ["100W Charging", "Hasselblad Camera", "Value King"],
    description: "Redefined flagship specs. Powered by Snapdragon 8 Gen 3 with up to 16GB RAM and revolutionary Hasselblad Camera for Mobile.",
    isBestSeller: true,
    featured: false
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    brand: "Apple",
    price: 799,
    rating: 4.7,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Black", hex: "#222" },
      { name: "Blue", hex: "#d1e0e8" },
      { name: "Pink", hex: "#f7d6db" }
    ],
    specs: {
      screen: "6.1\" Super Retina XDR OLED",
      processor: "A16 Bionic Chip",
      camera: "48MP Dual Camera system",
      battery: "3349 mAh with 20W Charging",
      weight: "171g",
      storage: ["128GB", "256GB", "512GB"]
    },
    tags: ["Dynamic Island", "USB-C", "Lightweight"],
    description: "Features Dynamic Island, a 48MP Main camera, and USB-C, all in a durable color-infused glass and aluminum design.",
    isBestSeller: false,
    featured: false
  },
  {
    id: "galaxy-s24",
    name: "Galaxy S24+",
    brand: "Samsung",
    price: 999,
    rating: 4.7,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=600&q=80",
    colors: [
      { name: "Onyx Black", hex: "#292a2c" },
      { name: "Marble Gray", hex: "#8b8d90" },
      { name: "Cobalt Violet", hex: "#3e3745" }
    ],
    specs: {
      screen: "6.7\" Dynamic AMOLED 2X, QHD+",
      processor: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "50MP Main + 10MP Zoom + 12MP Ultra Wide",
      battery: "4900 mAh with 45W Fast Charging",
      weight: "196g",
      storage: ["256GB", "512GB"]
    },
    tags: ["Galaxy AI", "Sleek Design", "Stunning Screen"],
    description: "The perfect middle ground. Get the ultimate display, premium AI capabilities, and outstanding battery life in an ergonomic form factor.",
    isBestSeller: false,
    featured: false
  }
];
