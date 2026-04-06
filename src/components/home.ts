import { Plant } from '../types';
import { navigateTo } from '../utils';
import { renderProductCard } from './product-card';

/**
 * Verdant Aura - Home Component
 * 
 * The main landing page featuring a high-impact hero section, 
 * curated featured products, and brand value propositions.
 */

// Mock data for featured plants on the home page
const FEATURED_PLANTS: Plant[] = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    description: 'The iconic "Swiss Cheese Plant" known for its dramatic, perforated leaves and tropical vibe.',
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
    description: 'Virtually indestructible and excellent for air purification. Perfect for beginners.',
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
    description: 'A stunning statement plant with large, violin-shaped leaves that adds elegance to any room.',
    price: 65.00,
    category: 'indoor',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    careLevel: 'expert',
    light: 'bright',
    water: 'weekly',
    isFeatured: true,
    stock: 5
  }
];

export function renderHome(container: HTMLElement): void {
  // Clear container
  container.innerHTML = '';

  const homeSection = document.createElement('div');
  homeSection.className = 'flex flex-col w-full animate-fade-in';

  homeSection.innerHTML = `
    <!-- Hero Section -->
    <section class="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-emerald-950">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=2000" 
          alt="Lush green plants" 
          class="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/60 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="max-w-2xl">
          <span class="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 border border-emerald-500/30">
            Premium Botanical Curators
          </span>
          <h1 class="text-5xl md:text-7xl font-bold text-white font-heading leading-tight mb-6">
            Bring the <span class="text-emerald-400 italic">Soul</span> of Nature Indoors.
          </h1>
          <p class="text-lg md:text-xl text-emerald-100/80 mb-10 leading-relaxed max-w-lg">
            Verdant Aura delivers hand-picked, healthy plants directly to your doorstep. Transform your living space into a sanctuary.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button id="hero-cta-shop" class="btn-primary px-8 py-4 text-lg shadow-xl shadow-emerald-900/40">
              Explore Collection
            </button>
            <button id="hero-cta-care" class="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-lg font-bold transition-all">
              Care Guides
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Propositions -->
    <section class="py-16 bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">Safe Delivery</h3>
              <p class="text-sm text-gray-500">Specially designed eco-packaging ensures your plants arrive stress-free.</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">30-Day Guarantee</h3>
              <p class="text-sm text-gray-500">Not happy? We'll replace your plant or refund you within 30 days of arrival.</p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900 mb-1">Expert Support</h3>
              <p class="text-sm text-gray-500">Access our botanical experts anytime for personalized care advice.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-4">Curated for Your Space</h2>
            <p class="text-gray-500 max-w-xl">Our current favorites, hand-picked for their beauty and resilience. Perfect for starting or expanding your indoor jungle.</p>
          </div>
          <button id="view-all-featured" class="text-emerald-700 font-bold flex items-center gap-2 hover:text-emerald-900 transition-colors group">
            View All Plants
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div id="featured-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Product cards will be injected here -->
        </div>
      </div>
    </section>

    <!-- Category Teaser -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer" id="cat-indoor">
            <img src="https://images.unsplash.com/photo-1512428813833-df44b7528396?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Indoor Plants" />
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute bottom-8 left-8">
              <h3 class="text-3xl font-bold text-white font-heading mb-2">Indoor Oasis</h3>
              <p class="text-white/80 mb-4">Lush greenery for every room.</p>
              <span class="inline-block bg-white text-emerald-950 px-6 py-2 rounded-lg font-bold text-sm">Shop Indoor</span>
            </div>
          </div>
          <div class="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer" id="cat-rare">
            <img src="https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=1000" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Rare Plants" />
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
            <div class="absolute bottom-8 left-8">
              <h3 class="text-3xl font-bold text-white font-heading mb-2">Rare Finds</h3>
              <p class="text-white/80 mb-4">Unique specimens for collectors.</p>
              <span class="inline-block bg-white text-emerald-950 px-6 py-2 rounded-lg font-bold text-sm">Shop Rare</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="py-24 bg-emerald-50">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <svg class="w-12 h-12 text-emerald-200 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H5.01697C3.9124 8 3.01697 7.10457 3.01697 6V3L10.017 3V15C10.017 18.3137 7.3307 21 4.01697 21H3.01697Z" />
        </svg>
        <p class="text-2xl md:text-3xl font-heading italic text-emerald-900 leading-relaxed mb-8">
          "Plants give us oxygen for the lungs and for the soul. Verdant Aura helped me turn my tiny apartment into a breathing sanctuary."
        </p>
        <div class="flex items-center justify-center space-x-4">
          <div class="w-12 h-12 rounded-full bg-emerald-200 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=elara" alt="Customer" />
          </div>
          <div class="text-left">
            <p class="font-bold text-emerald-950">Elara Vance</p>
            <p class="text-sm text-emerald-600">Interior Designer</p>
          </div>
        </div>
      </div>
    </section>
  `;

  container.appendChild(homeSection);

  // Inject Featured Product Cards
  const grid = homeSection.querySelector('#featured-grid');
  if (grid) {
    FEATURED_PLANTS.forEach(plant => {
      grid.appendChild(renderProductCard(plant));
    });
  }

  // --- Event Listeners ---

  // Hero CTAs
  homeSection.querySelector('#hero-cta-shop')?.addEventListener('click', () => navigateTo('/shop'));
  homeSection.querySelector('#hero-cta-care')?.addEventListener('click', () => navigateTo('/care'));
  homeSection.querySelector('#view-all-featured')?.addEventListener('click', () => navigateTo('/shop'));

  // Category Teasers
  homeSection.querySelector('#cat-indoor')?.addEventListener('click', () => navigateTo('/shop'));
  homeSection.querySelector('#cat-rare')?.addEventListener('click', () => navigateTo('/shop'));
}