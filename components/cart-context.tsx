"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  phoneId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  color: string;
  storage: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: string;
  };
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
}

interface CartContextType {
  cart: CartItem[];
  compareList: string[]; // Phone IDs
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (phoneId: string, color: string, storage: string) => void;
  updateQuantity: (phoneId: string, color: string, storage: string, quantity: number) => void;
  clearCart: () => void;
  toggleCompare: (phoneId: string) => boolean; // returns true if added, false if removed
  removeFromCompare: (phoneId: string) => void;
  clearCompare: () => void;
  addOrder: (order: Order) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('phonex_cart');
      const storedCompare = localStorage.getItem('phonex_compare');
      const storedOrders = localStorage.getItem('phonex_orders');

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedCompare) setCompareList(JSON.parse(storedCompare));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('phonex_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('phonex_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error(e);
    }
  }, [compareList, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('phonex_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders, isLoaded]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (i) => i.phoneId === item.phoneId && i.color === item.color && i.storage === item.storage
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += qty;
        return newCart;
      }

      return [...prevCart, { ...item, quantity: qty }];
    });
  };

  const removeFromCart = (phoneId: string, color: string, storage: string) => {
    setCart((prevCart) =>
      prevCart.filter((i) => !(i.phoneId === phoneId && i.color === color && i.storage === storage))
    );
  };

  const updateQuantity = (phoneId: string, color: string, storage: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(phoneId, color, storage);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.phoneId === phoneId && i.color === color && i.storage === storage
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCompare = (phoneId: string): boolean => {
    let added = false;
    setCompareList((prev) => {
      if (prev.includes(phoneId)) {
        return prev.filter((id) => id !== phoneId);
      } else {
        if (prev.length >= 3) {
          // Replace the last one or do nothing. Let's do nothing but alert
          // We limit to 3 items
          return prev;
        }
        added = true;
        return [...prev, phoneId];
      }
    });
    return added;
  };

  const removeFromCompare = (phoneId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== phoneId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        compareList,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        addOrder,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
