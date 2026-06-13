export interface PhoneProduct {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  basePrice: number;
  image: string;
  colors: { name: string; hex: string; desc: string }[];
  specs: {
    cpu: string;
    ram: string[];
    storage: string[];
    camera: string;
    battery: string;
    crypto: string;
    display: string;
    weight: string;
  };
  osOptions: { name: string; desc: string; securityScore: number }[];
  description: string;
  layers: {
    chassis: string;
    core: string;
    optics: string;
    battery: string;
  };
}

export const PRODUCTS: PhoneProduct[] = [
  {
    id: "nexus-alpha",
    name: "NEXUS // ALPHA",
    codename: "NX-800_ALPHA",
    tagline: "The Sovereign Hardened Flagship.",
    basePrice: 1249,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Matte Obsidian", hex: "#0a0a0a", desc: "Grade 5 Titanium with carbon-lattice coating" },
      { name: "Titanium Gray", hex: "#4b5563", desc: "Satin blasted pure biocompatible titanium" },
      { name: "Electric Amber", hex: "#f59e0b", desc: "Anodized solar-flare industrial finish" }
    ],
    specs: {
      cpu: "Phonic-9X Cryptographic Secure Octa-Core (4.1 GHz)",
      ram: ["12GB LPDDR5X", "16GB LPDDR5X", "24GB LPDDR5X"],
      storage: ["512GB UFS 4.0", "1TB UFS 4.0"],
      camera: "108MP Monochromatic True-Sensor + 50MP Spectroscopic",
      battery: "5800mAh Solid-State High-Density",
      crypto: "Aegis-v4 Hardware Security Module (Isolated Enclave)",
      display: "6.8\" LTPO Monochromatic-Optimized OLED, 144Hz",
      weight: "214g"
    },
    osOptions: [
      { name: "NexusOS", desc: "De-googled, sandboxed microkernel, localized LLM integrations", securityScore: 99 },
      { name: "GrapheneOS", desc: "Hardened memory allocator, strict app sandbox controls", securityScore: 98 },
      { name: "Sailfish OS", desc: "Independent Linux core, gesture-driven UX, full developer terminal", securityScore: 92 }
    ],
    description: "NEXUS // ALPHA is engineered for absolute physical and digital autonomy. Featuring discrete physical hardware kill-switches for the camera, microphone, and wireless arrays, it guarantees your environment remains yours. Encased in a pure grade-5 titanium chassis with raw technical aesthetics.",
    layers: {
      chassis: "Grade-5 Titanium Exo-frame with integrated copper vapor-cooling rails. Zero adhesives used. 100% screw-based assembly.",
      core: "Aegis-v4 Cryptographic Co-processor & Phonic-9X silicon. Fully shielded against electromagnetic side-channel attacks.",
      optics: "Dual physical lens-covers with mechanical interlocks. Zero-software override possible.",
      battery: "Solid-state electrolyte formulation. Explosive-resistant, slow-discharge profile under extreme Arctic/Desert temperatures."
    }
  },
  {
    id: "nexus-zero",
    name: "NEXUS // ZERO",
    codename: "NX-400_ZERO",
    tagline: "Ultra-Minimalist Monochromatic Terminal.",
    basePrice: 899,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Matte Obsidian", hex: "#0a0a0a", desc: "Grade 5 Titanium with carbon-lattice coating" },
      { name: "Titanium Gray", hex: "#4b5563", desc: "Satin blasted pure biocompatible titanium" }
    ],
    specs: {
      cpu: "Phonic-5X Low-Emission Quad-Core (2.8 GHz)",
      ram: ["12GB LPDDR5X"],
      storage: ["512GB UFS 4.0"],
      camera: "50MP True-Sensor Monochromatic Prime",
      battery: "4200mAh Solid-State High-Density",
      crypto: "Aegis-v3 Hardware Security Module",
      display: "6.1\" Reflective Memory LCD (Ultra-Low Power, daylight readable)",
      weight: "178g"
    },
    osOptions: [
      { name: "NexusOS", desc: "De-googled, sandboxed microkernel, localized LLM integrations", securityScore: 99 },
      { name: "GrapheneOS", desc: "Hardened memory allocator, strict app sandbox controls", securityScore: 98 }
    ],
    description: "The zero-distraction instrument. Features a high-contrast reflective Memory LCD that draws zero power when static. Ideal for field operations, secure communications, and minimal cognitive load.",
    layers: {
      chassis: "Recycled aerospace aluminum core with high-impact carbon fiber plates. Hard physical sliding shutter for privacy.",
      core: "Underclocked Phonic-5X processor optimized for ultra-low thermal signature and zero RF leakage.",
      optics: "High-contrast prime lens with physical optical filter selectors.",
      battery: "Sub-zero optimized lithium-iron-phosphate battery with 72-hour standby cycle."
    }
  },
  {
    id: "nexus-fold",
    name: "NEXUS // FOLD",
    codename: "NX-F_FOLD",
    tagline: "The Dual-Pane Tactical Workspace.",
    basePrice: 1899,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", // Alternative view
    colors: [
      { name: "Matte Obsidian", hex: "#0a0a0a", desc: "Grade 5 Titanium with carbon-lattice coating" },
      { name: "Electric Amber", hex: "#f59e0b", desc: "Anodized solar-flare industrial finish" }
    ],
    specs: {
      cpu: "Phonic-9X Cryptographic Secure Octa-Core (4.1 GHz)",
      ram: ["16GB LPDDR5X", "24GB LPDDR5X"],
      storage: ["1TB UFS 4.0"],
      camera: "108MP Monochromatic + 48MP Panoramic Lens System",
      battery: "6200mAh Dual-Cell Balanced Solid-State",
      crypto: "Aegis-v4 Hardware Security Module (Dual Isolated Enclaves)",
      display: "8.1\" Foldable Armored Dual-OLED + 6.3\" External Display",
      weight: "262g"
    },
    osOptions: [
      { name: "NexusOS", desc: "De-googled, sandboxed microkernel, localized LLM integrations", securityScore: 99 },
      { name: "Sailfish OS", desc: "Independent Linux core, gesture-driven UX, full developer terminal", securityScore: 92 }
    ],
    description: "An uncompromising tactical powerhouse. The dual-pane hinge is completely mechanical with an absolute physical lock. Run separate sandboxed virtual machines on each display panel simultaneously with physical isolation.",
    layers: {
      chassis: "Reinforced titanium gears with ceramic bearing plates. Hermetically sealed against dust and water (IP69K).",
      core: "Double-shielded motherboard with dual physical crypto keys for real-time memory scrubbing.",
      optics: "Telescopic physical zoom with manual dial calibration for absolute target accuracy.",
      battery: "Distributed dual-pack battery with active load balancing and dynamic heat dissipation."
    }
  }
];

export const ACCESSORIES = [
  {
    id: "lens-mod",
    name: "Spectroscopic Lens Module",
    category: "Optics",
    price: 249,
    specs: "Infrared + Ultraviolet band capture, physical magnetic latch",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "titanium-armor",
    name: "Grade-5 Titanium Tactical Case",
    category: "Chassis",
    price: 129,
    specs: "Explosion-resistant, EMP shielded liner, integrated kickstand",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "quantum-charger",
    name: "120W Secure Quantum Charger",
    category: "Power",
    price: 89,
    specs: "Data-pin isolation switch (prevents juice-jacking), Gallium Nitride (GaN)",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80"
  }
];

export const SYSTEM_STATUS = {
  activeNodes: 142,
  uptime: "99.9984%",
  queueWait: "4 min",
  firmwareVersion: "v4.19.2-hardened",
  auditDate: "2025-02-14",
  pgpKeyId: "0x8F9B2C3D4E5F6A7B"
};
