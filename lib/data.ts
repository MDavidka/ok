export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "starters" | "mains" | "desserts" | "cocktails";
  tags: string[]; // e.g. ["Vegan", "Gluten-Free", "Chef Recommended", "Vegetarian", "Nut-Free"]
  image: string; // descriptive placeholder or premium Unsplash
  pairing?: string; // sommelier pairing suggestion
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface FarmPartner {
  name: string;
  type: string;
  description: string;
  location: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: "s1",
    name: "Wood-Fired Heirloom Carrots",
    description: "Roasted over white oak, whipped goat cheese, wild honeycomb, toasted pistachio dust, and watercress oil.",
    price: 18,
    category: "starters",
    tags: ["Vegetarian", "Gluten-Free", "Chef Recommended"],
    image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?auto=format&fit=crop&q=80&w=600",
    pairing: "Chardonnay, Sonoma Coast, 2021"
  },
  {
    id: "s2",
    name: "Charred Octopus & Bone Marrow",
    description: "Smoked Spanish octopus, roasted marrow bone, caper berry relish, sourdough crisp, saffron emulsion.",
    price: 26,
    category: "starters",
    tags: ["Chef Recommended"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    pairing: "Albariño, Rías Baixas, 2022"
  },
  {
    id: "s3",
    name: "Truffle Forest Mushroom Consommé",
    description: "Double-clarified wild chanterelle broth, black winter truffle carpaccio, micro tarragon, puff pastry dome.",
    price: 22,
    category: "starters",
    tags: ["Vegetarian", "Nut-Free"],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    pairing: "Pinot Noir, Dundee Hills, 2020"
  },
  {
    id: "s4",
    name: "Aether Crudo Duo",
    description: "Hokkaido scallop and bluefin tuna, yuzu kosho vinaigrette, finger lime caviar, sea grapes, avocado mousse.",
    price: 28,
    category: "starters",
    tags: ["Gluten-Free", "Nut-Free"],
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600",
    pairing: "Champagne Brut, NV"
  },

  // Mains
  {
    id: "m1",
    name: "Dry-Aged Tomahawk Ribeye (For One)",
    description: "45-day dry-aged, wood-fire charred, smoked sea salt, roasted bone marrow jus, black garlic compound butter.",
    price: 68,
    category: "mains",
    tags: ["Gluten-Free", "Nut-Free", "Chef Recommended"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    pairing: "Cabernet Sauvignon, Napa Valley, 2018"
  },
  {
    id: "m2",
    name: "Pacific Sablefish & Sea Forest",
    description: "Miso-glazed sablefish, butter-poached lobster claw, sea bean salad, ginger-lemongrass dashi reduction.",
    price: 49,
    category: "mains",
    tags: ["Nut-Free"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    pairing: "Riesling Grand Cru, Alsace, 2019"
  },
  {
    id: "m3",
    name: "Heritage Duck Three Ways",
    description: "Crispy pan-seared breast, confit croquette, foie gras torchon, spiced plum reduction, parsnip purée.",
    price: 46,
    category: "mains",
    tags: ["Nut-Free"],
    image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=600",
    pairing: "Syrah, Northern Rhône, 2018"
  },
  {
    id: "m4",
    name: "Coal-Roasted Delicata Squash",
    description: "Wild ramp and farro risotto, smoked cashew cream, crispy sage leaf, pickled mustard seeds, pomegranate glaze.",
    price: 38,
    category: "mains",
    tags: ["Vegan", "Vegetarian"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    pairing: "Chenin Blanc, Loire Valley, 2020"
  },

  // Desserts
  {
    id: "d1",
    name: "Smoked Dark Chocolate Soufflé",
    description: "72% Valrhona single-origin chocolate, smoked sea salt caramel center, bourbon Madagascar vanilla bean gelato.",
    price: 18,
    category: "desserts",
    tags: ["Vegetarian", "Chef Recommended"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600",
    pairing: "Tawny Port 20 Year, Portugal"
  },
  {
    id: "d2",
    name: "Golden Pear Carpaccio",
    description: "Saffron-poached Bosc pears, champagne granita, pistachio brittle, honeycomb shards, local double cream.",
    price: 16,
    category: "desserts",
    tags: ["Vegetarian", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=600",
    pairing: "Sauternes, Bordeaux, 2016"
  },
  {
    id: "d3",
    name: "Meyer Lemon & Lavender Tart",
    description: "Almond shortbread crust, Meyer lemon curd, burnt honey meringue, culinary lavender buds, blackberry gel.",
    price: 15,
    category: "desserts",
    tags: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600",
    pairing: "Moscato d'Asti, Piedmont, 2022"
  },

  // Cocktails
  {
    id: "c1",
    name: "The Aether Smoked Old Fashioned",
    description: "Small-batch rye, demerara reduction, custom aromatic bitters, smoked with cherrywood chips under a glass cloche.",
    price: 24,
    category: "cocktails",
    tags: ["Vegan", "Vegetarian", "Gluten-Free", "Nut-Free", "Chef Recommended"],
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "c2",
    name: "Amber Solstice",
    description: "Mezcal Artesanal, yellow chartreuse, fresh passionfruit, spiced hot honey, toasted rosemary garnish.",
    price: 22,
    category: "cocktails",
    tags: ["Vegan", "Vegetarian", "Gluten-Free", "Nut-Free"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "c3",
    name: "Gilded Sage Botanical",
    description: "Empress gin, white vermouth, fresh sage tincture, elderflower cordial, gold leaf flake garnish.",
    price: 20,
    category: "cocktails",
    tags: ["Vegan", "Vegetarian", "Gluten-Free", "Nut-Free"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Marcus Vance",
    role: "Executive Chef & Founder",
    bio: "With over two decades in Michelin-starred kitchens across Paris, Tokyo, and San Francisco, Chef Marcus brings his signature wood-fired philosophy and passion for hyper-seasonal ingredients to Aether Bistro. He believes in letting the pure flavors of nature lead every creation.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Elena Rostova",
    role: "Pastry Chef",
    bio: "Elena's desserts are works of modern art. Trained at the legendary Le Cordon Bleu, she seamlessly blends classical French pastry discipline with modern culinary gastronomy, utilizing local herbs, honey, and smoked elements for unforgettable sweet closures.",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Clara Dupont",
    role: "Head Sommelier",
    bio: "Clara curates Aether's cellar of over 450 biodynamic and natural bottles. She specializes in creating harmony between Chef Marcus's wood-fired, robust plates and rare, expressive vintages that represent the true character of their terroirs.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
  }
];

export const FARM_PARTNERS: FarmPartner[] = [
  {
    name: "Whispering Pines Organics",
    type: "Organic Produce Partner",
    description: "Providing morning-harvested heirloom vegetables, microgreens, and culinary flowers grown under strict biodynamic practices.",
    location: "Sonoma Valley, CA (32 miles away)",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Golden Gate Sea Harvest",
    type: "Sustainable Seafood Supplier",
    description: "A coalition of local, independent fishers bringing line-caught wild sablefish, rockfish, and hand-harvested scallops daily.",
    location: "Half Moon Bay, CA (24 miles away)",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Meadow Creek Creamery",
    type: "Artisanal Dairy & Cheese",
    description: "Award-winning, grass-fed cows providing exceptional double cream, raw milk cheeses, and cultured butter exclusively crafted for our tables.",
    location: "Marin County, CA (45 miles away)",
    image: "https://images.unsplash.com/photo-1486887396153-fa416525c108?auto=format&fit=crop&q=80&w=400"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Aether Bistro isn't just dining; it's a sensory journey. The wood-fired heirloom carrots blew my mind, and the smoked Old Fashioned was theatrical perfection.",
    author: "Eleanor Sterling",
    title: "Culinary Editor, Haute Living",
    rating: 5
  },
  {
    quote: "Chef Marcus Vance is doing something truly revolutionary with wood and smoke. The dry-aged Tomahawk was perfectly tender, boasting depth of flavor I've never tasted elsewhere.",
    author: "Julian Mercer",
    title: "Michelin Guide Reviewer",
    rating: 5
  },
  {
    quote: "The wine pairings curated by Clara Dupont are genius. Each glass felt like a key unlocking hidden, delicate notes in the sablefish and the duck. Absolutely spectacular.",
    author: "Dr. Amanda Reyes",
    title: "Connoisseur & Patron",
    rating: 5
  }
];
