import { CartItem } from '../types';
import { 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  getCartTotal, 
  formatCurrency, 
  navigateTo 
} from '../utils';

/**
 * Verdant Aura - Cart Overlay Component
 * 
 * A slide-over shopping cart interface that allows users to review their
 * selections, adjust quantities, and proceed to checkout.
 * It listens for global 'toggle-cart' and 'cart-updated' events.
 */

export function renderCartOverlay(container: HTMLElement): void {
  // Create the main wrapper
  const wrapper = document.createElement('div');
  wrapper.id = 'cart-overlay-wrapper';
  wrapper.className = 'fixed inset-0 z-[100] invisible transition-all duration-300';
  
  wrapper.innerHTML = `
    <!-- Backdrop -->
    <div id="cart-backdrop" class="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 cursor-pointer"></div>
    
    <!-- Panel -->
    <div id="cart-panel" class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl translate-x-full transition-transform duration-500 ease-out flex flex-col">
      
      <!-- Header -->
      <div class="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-emerald-950 font-heading">Your Greenery</h2>
        <button id="close-cart" class="p-2 text-gray-400 hover:text-emerald-900 transition-colors" aria-label="Close Cart">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Cart Items List -->
      <div id="cart-items-container" class="flex-grow overflow-y-auto px-6 py-4 space-y-6">
        <!-- Items will be injected here -->
      </div>

      <!-- Footer / Summary -->
      <div id="cart-footer" class="px-6 py-8 bg-emerald-50 border-t border-emerald-100 space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-600 font-medium">Subtotal</span>
          <span id="cart-subtotal" class="text-xl font-bold text-emerald-950">
            $0.00
          </span>
        </div>
        <p class="text-xs text-emerald-700/70 italic">
          Shipping and taxes calculated at checkout. Free shipping on orders over $50.
        </p>
        <button id="checkout-btn" class="w-full btn-primary py-4 text-lg shadow-lg shadow-emerald-900/20">
          Proceed to Checkout
        </button>
        <button id="continue-shopping" class="w-full text-center text-sm font-medium text-emerald-800 hover:text-emerald-600 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  `;

  container.appendChild(wrapper);

  const backdrop = wrapper.querySelector('#cart-backdrop') as HTMLElement;
  const panel = wrapper.querySelector('#cart-panel') as HTMLElement;
  const itemsContainer = wrapper.querySelector('#cart-items-container') as HTMLElement;
  const subtotalEl = wrapper.querySelector('#cart-subtotal') as HTMLElement;
  const closeBtn = wrapper.querySelector('#close-cart');
  const checkoutBtn = wrapper.querySelector('#checkout-btn');
  const continueBtn = wrapper.querySelector('#continue-shopping');

  // --- UI Logic ---

  const openCart = () => {
    wrapper.classList.remove('invisible');
    backdrop.classList.add('opacity-100');
    panel.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden'; // Prevent scroll
    updateCartList();
  };

  const closeCart = () => {
    backdrop.classList.remove('opacity-100');
    panel.classList.add('translate-x-full');
    document.body.style.overflow = '';
    setTimeout(() => {
      wrapper.classList.add('invisible');
    }, 300);
  };

  const updateCartList = () => {
    const cart = getCart();
    
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-64 text-center space-y-4">
          <div class="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <p class="text-gray-900 font-bold">Your cart is empty</p>
            <p class="text-gray-500 text-sm">Looks like you haven't found your perfect plant yet.</p>
          </div>
          <button id="empty-shop-btn" class="btn-outline px-4 py-2 text-sm">Start Browsing</button>
        </div>
      `;
      
      itemsContainer.querySelector('#empty-shop-btn')?.addEventListener('click', () => {
        closeCart();
        navigateTo('/shop');
      });

      subtotalEl.textContent = formatCurrency(0);
      if (checkoutBtn) (checkoutBtn as HTMLButtonElement).disabled = true;
      return;
    }

    if (checkoutBtn) (checkoutBtn as HTMLButtonElement).disabled = false;
    subtotalEl.textContent = formatCurrency(getCartTotal());

    itemsContainer.innerHTML = cart.map((item: CartItem) => `
      <div class="flex gap-4 animate-fade-in" data-item-id="${item.plantId}">
        <!-- Product Image -->
        <div class="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <img src="${item.plant.image}" alt="${item.plant.name}" class="w-full h-full object-cover" />
        </div>
        
        <!-- Details -->
        <div class="flex-grow flex flex-col justify-between py-1">
          <div>
            <div class="flex justify-between items-start">
              <h3 class="text-sm font-bold text-gray-900">${item.plant.name}</h3>
              <button class="remove-item p-1 text-gray-400 hover:text-rose-500 transition-colors" data-id="${item.plantId}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 italic">${item.plant.scientificName}</p>
          </div>
          
          <div class="flex justify-between items-center">
            <!-- Quantity Controls -->
            <div class="flex items-center border border-gray-200 rounded-md">
              <button class="qty-btn minus px-2 py-1 text-gray-500 hover:bg-gray-50" data-id="${item.plantId}">-</button>
              <span class="px-2 text-xs font-bold text-gray-700 min-w-[24px] text-center">${item.quantity}</span>
              <button class="qty-btn plus px-2 py-1 text-gray-500 hover:bg-gray-50" data-id="${item.plantId}">+</button>
            </div>
            <span class="text-sm font-bold text-emerald-900">
              ${formatCurrency(item.plant.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners to new items
    attachItemListeners();
  };

  const attachItemListeners = () => {
    // Remove Buttons
    itemsContainer.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (id) removeFromCart(id);
      });
    });

    // Quantity Buttons
    itemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id;
        if (!id) return;

        const cart = getCart();
        const item = cart.find(i => i.plantId === id);
        if (!item) return;

        if (btn.classList.contains('plus')) {
          updateQuantity(id, item.quantity + 1);
        } else {
          updateQuantity(id, item.quantity - 1);
        }
      });
    });
  };

  // --- Event Listeners ---

  // Global toggle event (from Header)
  window.addEventListener('toggle-cart', openCart);

  // Global cart update event (from Utils)
  window.addEventListener('cart-updated', () => {
    if (!wrapper.classList.contains('invisible')) {
      updateCartUI();
    }
  });

  const updateCartUI = () => {
    // Smoothly update the list and subtotal
    updateCartList();
  };

  // Close actions
  backdrop.addEventListener('click', closeCart);
  closeBtn?.addEventListener('click', closeCart);
  continueBtn?.addEventListener('click', closeCart);

  // Checkout action
  checkoutBtn?.addEventListener('click', () => {
    closeCart();
    // In a real app, navigate to /checkout
    // For now, we'll just show a success message or go to shop
    alert('Thank you for your interest! This is a demo store. In a production environment, you would now be redirected to a secure Stripe checkout page.');
    navigateTo('/');
  });
}