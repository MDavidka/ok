"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhoneProduct, PHONE_PRODUCTS } from '@/lib/data';

export interface CartItem {
  id: string; // unique cart item id (productId + color + storage)
  product: PhoneProduct;
  selectedColor: string;
  selectedStorage: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  addToCart: (product: PhoneProduct, color: string, storage: string, price: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  promoCode: string | null;
  discountPercentage: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('auraphone_cart');
    const savedWishlist = localStorage.getItem('auraphone_wishlist');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    localStorage.setItem('auraphone_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('auraphone_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: PhoneProduct, color: string, storage: string, price: number) => {
    const cartItemId = `${product.id}-${color.replace(/\s+/g, '')}-${storage}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedColor: color,
          selectedStorage: storage,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setDiscountPercentage(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyPromo = (code: string): boolean => {
    const formattedCode = code.toUpperCase().trim();
    // Simple verification
    if (formattedCode === 'WELCOME10') {
      setPromoCode('WELCOME10');
      setDiscountPercentage(10);
      return true;
    } else if (formattedCode === 'AURASPECIAL') {
      setPromoCode('AURASPECIAL');
      setDiscountPercentage(15);
      return true;
    } else if (formattedCode === 'SUPERPHONE') {
      setPromoCode('SUPERPHONE');
      // Represent flat $50 off by translating to dynamic equivalent or custom handle
      setDiscountPercentage(12); // flat translation for simpler math, or keep it 12%
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setPromoCode(null);
    setDiscountPercentage(0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = (subtotal * discountPercentage) / 100;
    return Math.max(0, subtotal - discount);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        promoCode,
        discountPercentage,
        applyPromo,
        removePromo,
        getCartSubtotal,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
