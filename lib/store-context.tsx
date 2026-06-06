"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Phone } from "./data";
import { toast } from "sonner";

export interface CartItem {
  phone: Phone;
  selectedColor: string;
  selectedStorage: string;
  price: number;
  quantity: number;
}

export interface AppliedPromo {
  code: string;
  discountAmount: number;
  deviceModel?: string;
}

interface StoreContextType {
  cart: CartItem[];
  compareList: string[]; // List of phone IDs
  appliedPromo: AppliedPromo | null;
  addToCart: (phone: Phone, color: string, storage: string, price: number) => void;
  removeFromCart: (phoneId: string, color: string, storage: string) => void;
  updateCartQuantity: (phoneId: string, color: string, storage: string, quantity: number) => void;
  clearCart: () => void;
  toggleCompare: (phoneId: string) => void;
  clearCompare: () => void;
  applyPromo: (code: string, discount: number, deviceModel?: string) => void;
  removePromo: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("phonix_cart");
    const savedCompare = localStorage.getItem("phonix_compare");
    const savedPromo = localStorage.getItem("phonix_promo");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {
        console.error("Error loading compare list", e);
      }
    }
    if (savedPromo) {
      try {
        setAppliedPromo(JSON.parse(savedPromo));
      } catch (e) {
        console.error("Error loading promo", e);
      }
    }
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    localStorage.setItem("phonix_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("phonix_compare", JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem("phonix_promo", JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem("phonix_promo");
    }
  }, [appliedPromo]);

  const addToCart = (phone: Phone, color: string, storage: string, price: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.phone.id === phone.id &&
          item.selectedColor === color &&
          item.selectedStorage === storage
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        toast.success(`Updated ${phone.name} quantity in your cart!`);
        return newCart;
      } else {
        toast.success(`${phone.name} (${storage}, ${color}) added to cart!`);
        return [...prevCart, { phone, selectedColor: color, selectedStorage: storage, price, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (phoneId: string, color: string, storage: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter(
        (item) =>
          !(item.phone.id === phoneId && item.selectedColor === color && item.selectedStorage === storage)
      );
      toast.info("Item removed from cart");
      return updated;
    });
  };

  const updateCartQuantity = (phoneId: string, color: string, storage: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(phoneId, color, storage);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.phone.id === phoneId && item.selectedColor === color && item.selectedStorage === storage
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleCompare = (phoneId: string) => {
    setCompareList((prev) => {
      if (prev.includes(phoneId)) {
        toast.info("Removed from comparison list");
        return prev.filter((id) => id !== phoneId);
      }
      if (prev.length >= 3) {
        toast.warning("You can compare up to 3 phones side-by-side!");
        return prev;
      }
      toast.success("Added to comparison list!");
      return [...prev, phoneId];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    toast.info("Comparison list cleared");
  };

  const applyPromo = (code: string, discount: number, deviceModel?: string) => {
    setAppliedPromo({
      code,
      discountAmount: discount,
      deviceModel,
    });
    toast.success(`Promo code "${code}" applied! Discount of $${discount} saved.`);
  };

  const removePromo = () => {
    setAppliedPromo(null);
    toast.info("Promo code removed");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        compareList,
        appliedPromo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleCompare,
        clearCompare,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
