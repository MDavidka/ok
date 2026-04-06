import { Plant } from '../types';
import { formatCurrency, addToCart, navigateTo } from '../utils';

/**
 * Verdant Aura - Product Card Component
 * 
 * Displays an individual plant with its key details, care requirements,
 * and an action to add it to the shopping cart.
 */

export function renderProductCard(plant: Plant): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card-botanical group flex flex-col h-full animate-fade-in';
  card.setAttribute('data-plant-id', plant.id);

  // Determine care level color
  const careLevelColor = {
    easy: 'text-emerald-600 bg-emerald-50',
    moderate: 'text-amber-600 bg-amber-50',
    expert: 'text-rose-600 bg-rose-50'
  }[plant.careLevel];

  card.innerHTML = `
    <!-- Image Container -->
    <div class="relative aspect-portrait overflow-hidden bg-gray-100 cursor-pointer" id="card-image-${plant.id}">
      <img 
        src="${plant.image}" 
        alt="${plant.name}" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      <!-- Quick Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        ${plant.isFeatured ? `
          <span class="bg-emerald-900 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest shadow-sm">
            Featured
          </span>
        ` : ''}
        <span class="badge ${careLevelColor} shadow-sm">
          ${plant.careLevel} care
        </span>
      </div>

      <!-- Quick Add Overlay (Desktop) -->
      <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent hidden md:block">
        <button 
          class="add-to-cart-btn w-full bg-white text-emerald-950 font-bold py-2 rounded-lg text-sm hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
          aria-label="Add ${plant.name} to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Quick Add
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-1">
        <h3 class="text-lg font-bold text-gray-900 leading-tight cursor-pointer hover:text-emerald-800 transition-colors" id="card-title-${plant.id}">
          ${plant.name}
        </h3>
        <span class="font-bold text-emerald-900">
          ${formatCurrency(plant.price)}
        </span>
      </div>
      
      <p class="text-xs italic text-gray-500 mb-3 font-medium">
        ${plant.scientificName}
      </p>

      <p class="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
        ${plant.description}
      </p>

      <!-- Specs -->
      <div class="flex items-center gap-4 pt-4 border-t border-gray-50 text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728L5.636 5.636" />
          </svg>
          ${plant.light}
        </div>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          ${plant.water}
        </div>
      </div>

      <!-- Mobile Add Button -->
      <button 
        class="add-to-cart-btn mt-5 w-full btn-primary py-2.5 text-sm md:hidden"
        aria-label="Add ${plant.name} to cart"
      >
        Add to Cart
      </button>
    </div>
  `;

  // --- Event Listeners ---

  // Navigation to details
  const navigateToDetails = () => {
    // In a real app, this would go to `/product/${plant.id}`
    // For this mesh router, we'll just log it or go to shop
    console.log(`Verdant Aura: Navigating to details for ${plant.name}`);
    navigateTo('/shop'); 
  };

  card.querySelector(`#card-image-${plant.id}`)?.addEventListener('click', navigateToDetails);
  card.querySelector(`#card-title-${plant.id}`)?.addEventListener('click', navigateToDetails);

  // Add to Cart
  const addButtons = card.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Visual feedback
      const originalText = btn.innerHTML;
      btn.classList.add('opacity-75', 'pointer-events-none');
      
      if (btn.classList.contains('btn-primary')) {
        btn.textContent = 'Added!';
      } else {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Added
        `;
      }

      // Logic
      addToCart(plant);

      // Reset feedback
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('opacity-75', 'pointer-events-none');
      }, 1500);
    });
  });

  return card;
}