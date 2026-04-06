import { Plant, PlantCategory, CareLevel } from '../types';
import { renderProductCard } from './product-card';
import { debounce } from '../utils';

/**
 * Verdant Aura - Shop Component
 * 
 * A dynamic catalog view featuring real-time filtering by category,
 * care level, and search terms, along with sorting capabilities.
 */

// Mock Database of Plants
const ALL_PLANTS: Plant[] = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    description: 'The iconic "Swiss Cheese Plant" known for its dramatic, perforated leaves.',
    price: 45.00,
    category: 'indoor',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
    careLevel: 'moderate',
    light: 'indirect',
    water: 'weekly',
    isFeatured: true,
    stock: 12
  },
  {
    id: 'p2',
    name: 'Snake Plant Zeylanica',
    scientificName: 'Dracaena trifasciata',
    description: 'Virtually indestructible and excellent for air purification.',
    price: 28.00,
    category: 'indoor',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bac?auto=format&fit=crop&q=80&w=800',
    careLevel: 'easy',
    light: 'low',
    water: 'bi-weekly',
    isFeatured: true,
    stock: 25
  },
  {
    id: 'p3',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    description: 'A stunning statement plant with large, violin-shaped leaves.',
    price: 65.00,
    category: 'indoor',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    careLevel: 'expert',
    light: 'bright',
    water: 'weekly',
    isFeatured: true,
    stock: 5
  },
  {
    id: 'p4',
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    description: 'A fast-growing vine with heart-shaped, variegated leaves.',
    price: 18.00,
    category: 'indoor',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&q=80&w=800',
    careLevel: 'easy',
    light: 'indirect',
    water: 'weekly',
    isFeatured: false,
    stock: 40
  },
  {
    id: 'p5',
    name: 'Lavender "Phenomenal"',
    scientificName: 'Lavandula x intermedia',
    description: 'Highly fragrant purple blooms that thrive in full sun.',
    price: 22.00,
    category: 'outdoor',
    image: 'https://images.unsplash.com/photo-1528722828814-77b9b83acf12?auto=format&fit=crop&q=80&w=800',
    careLevel: 'moderate',
    light: 'direct',
    water: 'weekly',
    isFeatured: false,
    stock: 15
  },
  {
    id: 'p6',
    name: 'Echeveria "Blue Prince"',
    scientificName: 'Echeveria hybrid',
    description: 'A beautiful rosette-forming succulent with deep blue-green leaves.',
    price: 12.00,
    category: 'succulents',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e5f?auto=format&fit=crop&q=80&w=800',
    careLevel: 'easy',
    light: 'bright',
    water: 'monthly',
    isFeatured: false,
    stock: 50
  },
  {
    id: 'p7',
    name: 'Variegated Monstera Albo',
    scientificName: 'Monstera deliciosa variegata',
    description: 'A rare and highly sought-after specimen with striking white variegation.',
    price: 250.00,
    category: 'rare',
    image: 'https://images.unsplash.com/photo-1617173948498-4c4b6bb77912?auto=format&fit=crop&q=80&w=800',
    careLevel: 'expert',
    light: 'bright',
    water: 'weekly',
    isFeatured: false,
    stock: 2
  },
  {
    id: 'p8',
    name: 'Wildflower Meadow Mix',
    scientificName: 'Mixed Species',
    description: 'A premium blend of native seeds to attract pollinators to your garden.',
    price: 15.00,
    category: 'seeds',
    image: 'https://images.unsplash.com/photo-1599148482840-d7773e158bd2?auto=format&fit=crop&q=80&w=800',
    careLevel: 'easy',
    light: 'direct',
    water: 'daily',
    isFeatured: false,
    stock: 100
  }
];

// Component State
let currentCategory: PlantCategory | 'all' = 'all';
let currentCareLevel: CareLevel | 'all' = 'all';
let searchQuery = '';
let sortBy: 'price-asc' | 'price-desc' | 'name' = 'name';

export function renderShop(container: HTMLElement): void {
  container.innerHTML = '';

  const shopWrapper = document.createElement('div');
  shopWrapper.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in';

  shopWrapper.innerHTML = `
    <!-- Shop Header -->
    <header class="mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-emerald-950 font-heading mb-4">The Botanical Collection</h1>
      <p class="text-gray-500 max-w-2xl">
        Explore our carefully curated selection of healthy, vibrant plants. From beginner-friendly greens to rare collector specimens.
      </p>
    </header>

    <!-- Filter Bar -->
    <div class="flex flex-col lg:flex-row gap-8 mb-12">
      <!-- Search & Sort -->
      <div class="flex flex-col sm:flex-row gap-4 flex-grow">
        <div class="relative flex-grow">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            id="shop-search" 
            placeholder="Search plants..." 
            class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            value="${searchQuery}"
          />
        </div>
        
        <select id="shop-sort" class="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-700 font-medium">
          <option value="name" ${sortBy === 'name' ? 'selected' : ''}>Sort by Name</option>
          <option value="price-asc" ${sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
          <option value="price-desc" ${sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
        </select>
      </div>

      <!-- Category Pills -->
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">Categories:</span>
        <button class="cat-pill ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">All</button>
        <button class="cat-pill ${currentCategory === 'indoor' ? 'active' : ''}" data-cat="indoor">Indoor</button>
        <button class="cat-pill ${currentCategory === 'outdoor' ? 'active' : ''}" data-cat="outdoor">Outdoor</button>
        <button class="cat-pill ${currentCategory === 'succulents' ? 'active' : ''}" data-cat="succulents">Succulents</button>
        <button class="cat-pill ${currentCategory === 'rare' ? 'active' : ''}" data-cat="rare">Rare</button>
        <button class="cat-pill ${currentCategory === 'seeds' ? 'active' : ''}" data-cat="seeds">Seeds</button>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div id="active-filters" class="flex flex-wrap gap-3 mb-8 empty:hidden"></div>

    <!-- Product Grid -->
    <div id="shop-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <!-- Cards injected here -->
    </div>

    <!-- Empty State -->
    <div id="shop-empty" class="hidden py-24 text-center">
      <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-200 mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No plants found</h3>
      <p class="text-gray-500 mb-8">Try adjusting your filters or search terms.</p>
      <button id="clear-filters-btn" class="btn-outline px-6 py-2">Clear All Filters</button>
    </div>
  `;

  container.appendChild(shopWrapper);

  const grid = shopWrapper.querySelector('#shop-grid') as HTMLElement;
  const emptyState = shopWrapper.querySelector('#shop-empty') as HTMLElement;
  const searchInput = shopWrapper.querySelector('#shop-search') as HTMLInputElement;
  const sortSelect = shopWrapper.querySelector('#shop-sort') as HTMLSelectElement;
  const catPills = shopWrapper.querySelectorAll('.cat-pill');
  const clearBtn = shopWrapper.querySelector('#clear-filters-btn');

  // --- Logic ---

  const updateUI = () => {
    // 1. Filter
    let filtered = ALL_PLANTS.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = currentCategory === 'all' || plant.category === currentCategory;
      const matchesCare = currentCareLevel === 'all' || plant.careLevel === currentCareLevel;
      
      return matchesSearch && matchesCat && matchesCare;
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    // 3. Render Grid
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
    } else {
      grid.classList.remove('hidden');
      emptyState.classList.add('hidden');
      filtered.forEach(plant => {
        grid.appendChild(renderProductCard(plant));
      });
    }

    // 4. Update Active Pills UI
    catPills.forEach(pill => {
      const cat = (pill as HTMLElement).dataset.cat;
      if (cat === currentCategory) {
        pill.classList.add('bg-emerald-900', 'text-white', 'border-emerald-900');
        pill.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
      } else {
        pill.classList.remove('bg-emerald-900', 'text-white', 'border-emerald-900');
        pill.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
      }
    });
  };

  // --- Event Listeners ---

  // Search (Debounced)
  searchInput.addEventListener('input', debounce((e: Event) => {
    searchQuery = (e.target as HTMLInputElement).value;
    updateUI();
  }, 300));

  // Sort
  sortSelect.addEventListener('change', (e) => {
    sortBy = (e.target as HTMLSelectElement).value as any;
    updateUI();
  });

  // Categories
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      currentCategory = (pill as HTMLElement).dataset.cat as any;
      updateUI();
    });
  });

  // Clear Filters
  clearBtn?.addEventListener('click', () => {
    currentCategory = 'all';
    currentCareLevel = 'all';
    searchQuery = '';
    sortBy = 'name';
    searchInput.value = '';
    sortSelect.value = 'name';
    updateUI();
  });

  // Initial Render
  updateUI();
}

/**
 * Internal CSS for Shop Component
 * (Usually would be in style.css, but adding here for component-specific logic)
 */
const style = document.createElement('style');
style.textContent = `
  .cat-pill {
    @apply px-4 py-1.5 rounded-full border text-sm font-bold transition-all cursor-pointer;
  }
  .cat-pill:hover {
    @apply border-emerald-900 text-emerald-900;
  }
  /* Tailwind doesn't handle dynamic class injection well in vanilla TS without a build step 
     that sees the strings, so we use standard classes and ensure they are in the CSS */
`;
document.head.appendChild(style);