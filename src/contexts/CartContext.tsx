'use client';

import {
  CartItem,
  CartSummary,
  MULTI_DAY_DISCOUNTS,
  Product,
  PROMO_CODES,
  PromoCode,
  TAX_RATE,
} from '@/types';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

const CART_STORAGE_KEY = 'rental_cart';
const PROMO_STORAGE_KEY = 'applied_promo';

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  summary: CartSummary;
  appliedPromo: PromoCode | null;
  isLoaded: boolean;
  addToCart: (product: Product, rentalDays?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateRentalDays: (productId: number, days: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      }

      if (savedPromo) {
        const parsedPromo = JSON.parse(savedPromo);
        setAppliedPromo(parsedPromo);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        if (appliedPromo) {
          localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(appliedPromo));
        } else {
          localStorage.removeItem(PROMO_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error saving promo to localStorage:', error);
      }
    }
  }, [appliedPromo, isLoaded]);

  const addToCart = useCallback((product: Product, rentalDays: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...product,
          quantity: 1,
          rentalDays,
          addedAt: Date.now(),
        };
        return [...prevCart, newItem];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const updateRentalDays = useCallback((productId: number, days: number) => {
    if (days < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, rentalDays: days } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedPromo(null);
  }, []);

  const getMultiDayDiscount = (days: number): number => {
    const applicable = MULTI_DAY_DISCOUNTS.filter((d) => days >= d.days).sort(
      (a, b) => b.discount - a.discount
    );
    return applicable.length > 0 ? applicable[0].discount : 0;
  };

  const calculateSummary = useCallback(
    (items: CartItem[], promo: PromoCode | null): CartSummary => {
      let subtotal = 0;
      let totalMultiDayDiscount = 0;

      items.forEach((item) => {
        const itemTotal = item.price * item.quantity * item.rentalDays;
        const multiDayDiscountPercent = getMultiDayDiscount(item.rentalDays);
        const multiDayDiscount = (itemTotal * multiDayDiscountPercent) / 100;

        subtotal += itemTotal;
        totalMultiDayDiscount += multiDayDiscount;
      });

      const afterMultiDayDiscount = subtotal - totalMultiDayDiscount;

      let promoDiscount = 0;
      if (promo) {
        if (promo.type === 'percentage') {
          promoDiscount = (afterMultiDayDiscount * promo.discount) / 100;
        } else {
          promoDiscount = promo.discount;
        }
      }

      const afterPromoDiscount = afterMultiDayDiscount - promoDiscount;

      const tax = afterPromoDiscount * TAX_RATE;

      const total = afterPromoDiscount + tax;

      return {
        subtotal,
        multiDayDiscount: totalMultiDayDiscount,
        promoDiscount,
        tax,
        total,
      };
    },
    []
  );

  const applyPromoCode = useCallback(
    (code: string): { success: boolean; message: string } => {
      const promo = PROMO_CODES.find(
        (p) => p.code.toLowerCase() === code.toLowerCase()
      );

      if (!promo) {
        return { success: false, message: 'Invalid promo code' };
      }

      const summary = calculateSummary(cart, null);

      if (promo.minAmount && summary.subtotal < promo.minAmount) {
        return {
          success: false,
          message: `Minimum order of $${promo.minAmount} required`,
        };
      }

      setAppliedPromo(promo);
      return { success: true, message: 'Promo code applied successfully!' };
    },
    [cart, calculateSummary]
  );

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
  }, []);

  const summary = calculateSummary(cart, appliedPromo);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    cart,
    itemCount,
    summary,
    appliedPromo,
    isLoaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalDays,
    clearCart,
    applyPromoCode,
    removePromoCode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
