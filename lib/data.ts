export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs?: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
    os: string;
  };
  galleryImages?: string[];
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "SyraPhone X Pro",
    brand: "Syra",
    category: "Flagship",
    price: 999.99,
    image: "/images/syraphone-x-pro.webp",
    description: "The ultimate smartphone experience with a stunning display and powerful camera. Designed for professionals and enthusiasts alike, it combines cutting-edge technology with elegant design.",
    specs: {
      display: "6.7-inch Super Retina XDR",
      processor: "A17 Bionic Chip",
      ram: "8GB",
      storage: "256GB",
      camera: "48MP Main, 12MP Ultra-Wide, 12MP Telephoto",
      battery: "4500 mAh",
      os: "iOS 17",
    },
    galleryImages: [
      "/images/syraphone-x-pro.webp",
      "/images/syraphone-x-pro-side.webp",
      "/images/syraphone-x-pro-back.webp",
    ],
  },
  {
    id: "2",
    name: "SyraPhone 8 Lite",
    brand: "Syra",
    category: "Budget",
    price: 349.99,
    image: "/images/syraphone-8-lite.webp",
    description: "Affordable and reliable, perfect for everyday use. Get all the essential features without breaking the bank, wrapped in a sleek and durable design.",
    specs: {
      display: "6.5-inch HD+ LCD",
      processor: "Snapdragon 680",
      ram: "4GB",
      storage: "128GB",
      camera: "50MP Main, 2MP Macro",
      battery: "5000 mAh",
      os: "Android 13",
    },
    galleryImages: [
      "/images/syraphone-8-lite.webp",
      "/images/syraphone-8-lite-side.webp",
      "/images/syraphone-8-lite-back.webp",
    ],
  },
  {
    id: "3",
    name: "GamerPhone Elite",
    brand: "GamerTech",
    category: "Gaming",
    price: 1199.99,
    image: "/images/gamerphone-elite.webp",
    description: "Unleash your gaming potential with a high refresh rate screen and advanced cooling. Experience unparalleled performance and immersive gameplay on the go.",
    specs: {
      display: "6.8-inch AMOLED 165Hz",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      camera: "64MP Main, 13MP Ultra-Wide",
      battery: "6000 mAh",
      os: "Android 14 (Gaming OS)",
    },
    galleryImages: [
      "/images/gamerphone-elite.webp",
      "/images/gamerphone-elite-side.webp",
      "/images/gamerphone-elite-back.webp",
    ],
  },
  {
    id: "4",
    name: "PhotoMaster 5G",
    brand: "LensPro",
    category: "Camera",
    price: 899.99,
    image: "/images/photomaster-5g.webp",
    description: "Capture professional-grade photos and videos with its revolutionary camera system. Perfect for content creators and photography enthusiasts.",
    specs: {
      display: "6.6-inch OLED",
      processor: "Dimensity 9200+",
      ram: "12GB",
      storage: "256GB",
      camera: "108MP Main, 50MP Ultra-Wide, 10MP Telephoto",
      battery: "4800 mAh",
      os: "Android 14",
    },
    galleryImages: [
      "/images/photomaster-5g.webp",
      "/images/photomaster-5g-side.webp",
      "/images/photomaster-5g-back.webp",
    ],
  },
  {
    id: "5",
    name: "SyraPhone Z Fold",
    brand: "Syra",
    category: "Flagship",
    price: 1499.99,
    image: "/images/syraphone-z-fold.webp",
    description: "Experience the future with a foldable display and multitasking capabilities. A device that adapts to your needs, offering both a compact phone and a large tablet experience.",
    specs: {
      display: "7.6-inch Foldable AMOLED (inner), 6.2-inch AMOLED (outer)",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      camera: "50MP Main, 12MP Ultra-Wide, 10MP Telephoto",
      battery: "4400 mAh",
      os: "Android 14 (Fold UI)",
    },
    galleryImages: [
      "/images/syraphone-z-fold.webp",
      "/images/syraphone-z-fold-open.webp",
      "/images/syraphone-z-fold-closed.webp",
    ],
  },
  {
    id: "6",
    name: "EcoPhone Green",
    brand: "EcoTech",
    category: "Budget",
    price: 299.99,
    image: "/images/ecophone-green.webp",
    description: "Environmentally friendly and budget-conscious, without compromising on features. Made with recycled materials and designed for longevity.",
    specs: {
      display: "6.3-inch IPS LCD",
      processor: "MediaTek Helio G85",
      ram: "4GB",
      storage: "64GB",
      camera: "48MP Main, 8MP Ultra-Wide",
      battery: "4000 mAh",
      os: "Android 13 (Eco Edition)",
    },
    galleryImages: [
      "/images/ecophone-green.webp",
      "/images/ecophone-green-side.webp",
      "/images/ecophone-green-back.webp",
    ],
  },
  {
    id: "7",
    name: "SyraPhone Mini",
    brand: "Syra",
    category: "Flagship",
    price: 799.99,
    image: "/images/syraphone-mini.webp",
    description: "Compact power, delivering flagship performance in a pocket-friendly design. Ideal for those who prefer a smaller form factor without sacrificing power.",
    specs: {
      display: "5.4-inch Super Retina XDR",
      processor: "A16 Bionic Chip",
      ram: "6GB",
      storage: "128GB",
      camera: "12MP Main, 12MP Ultra-Wide",
      battery: "3000 mAh",
      os: "iOS 17",
    },
    galleryImages: [
      "/images/syraphone-mini.webp",
      "/images/syraphone-mini-side.webp",
      "/images/syraphone-mini-back.webp",
    ],
  },
  {
    id: "8",
    name: "GamerPhone Pro",
    brand: "GamerTech",
    category: "Gaming",
    price: 999.99,
    image: "/images/gamerphone-pro.webp",
    description: "Dominate the competition with a powerful processor and immersive audio. Designed for serious gamers, featuring dedicated gaming modes and triggers.",
    specs: {
      display: "6.7-inch AMOLED 144Hz",
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      camera: "50MP Main, 8MP Ultra-Wide",
      battery: "5500 mAh",
      os: "Android 14 (Gaming UI)",
    },
    galleryImages: [
      "/images/gamerphone-pro.webp",
      "/images/gamerphone-pro-side.webp",
      "/images/gamerphone-pro-back.webp",
    ],
  },
  {
    id: "9",
    name: "PhotoMaster Lite",
    brand: "LensPro",
    category: "Camera",
    price: 699.99,
    image: "/images/photomaster-lite.webp",
    description: "Stunning photography made accessible with advanced camera features. A great option for aspiring photographers looking for quality without the premium price tag.",
    specs: {
      display: "6.4-inch AMOLED",
      processor: "Snapdragon 7 Gen 1",
      ram: "8GB",
      storage: "128GB",
      camera: "64MP Main, 12MP Ultra-Wide",
      battery: "4200 mAh",
      os: "Android 14",
    },
    galleryImages: [
      "/images/photomaster-lite.webp",
      "/images/photomaster-lite-side.webp",
      "/images/photomaster-lite-back.webp",
    ],
  },
  {
    id: "10",
    name: "SyraPhone 10 Ultra",
    brand: "Syra",
    category: "Flagship",
    price: 1099.99,
    image: "/images/syraphone-10-ultra.webp",
    description: "The pinnacle of smartphone technology, designed for discerning users. Experience unparalleled performance, a breathtaking display, and an advanced camera system.",
    specs: {
      display: "6.9-inch Dynamic AMOLED 120Hz",
      processor: "A17 Bionic Chip",
      ram: "12GB",
      storage: "512GB",
      camera: "200MP Main, 50MP Ultra-Wide, 10MP Periscope Telephoto",
      battery: "5000 mAh",
      os: "iOS 17",
    },
    galleryImages: [
      "/images/syraphone-10-ultra.webp",
      "/images/syraphone-10-ultra-side.webp",
      "/images/syraphone-10-ultra-back.webp",
    ],
  },
];

export async function getAllProducts(): Promise<Product[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockProducts;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockProducts.find((product) => product.id === id);
}

export const allCategories = Array.from(new Set(mockProducts.map((p) => p.category)));
export const allBrands = Array.from(new Set(mockProducts.map((p) => p.brand)));