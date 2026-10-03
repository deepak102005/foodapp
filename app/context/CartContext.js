'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const initialCartItems = [
  {
    id: 'cb_item_1',
    baseId: 'quinoa-power-bowl',
    name: 'Quinoa Power Bowl',
    price: 249,
    basePrice: 249,
    desc: 'Tri-Color Quinoa, Hass Avocado, Steamed Broccoli, Baby Greens, Lemon Tahini',
    image: '/quinoa-power-bowl.jpg',
    tags: [
      { text: 'Vegan', isGreen: true },
      { text: 'Gluten Free', isGreen: true },
    ],
    customizations: {
      base: 'Tri-Color Organic Quinoa (Standard)',
      proteins: [],
      toppings: ['Fresh Hass Avocado', 'Steamed Broccoli', 'Chia & Pumpkin Seeds'],
      dressing: 'Creamy Lemon Tahini (Standard)',
      notes: '',
    },
    calories: 450,
    protein: 18,
    allergens: ['Sesame'],
    quantity: 1,
  },
  {
    id: 'cb_item_2',
    baseId: 'lime-soda',
    name: 'Fresh Lime Soda',
    price: 89,
    basePrice: 89,
    desc: 'Refreshing lime soda with fresh mint leaves and pink salt.',
    image: '/checkout-lime-soda.jpg',
    tags: [],
    customizations: null,
    calories: 60,
    protein: 0,
    allergens: [],
    quantity: 1,
  },
];

const CartContext = createContext({
  cart: [],
  cartCount: 0,
  itemTotal: 0,
  deliveryFee: 40,
  taxes: 32,
  grandTotal: 0,
  savings: 60,
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(initialCartItems);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    let ignore = false;

    async function loadSavedCart() {
      try {
        const saved = localStorage.getItem('clearbite_cart');
        if (saved && !ignore) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCart(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to load cart from storage', e);
      } finally {
        if (!ignore) {
          setIsLoaded(true);
        }
      }
    }

    loadSavedCart();

    return () => {
      ignore = true;
    };
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('clearbite_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to persist cart to storage', e);
      }
    }
  }, [cart, isLoaded]);

  const addItem = (item) => {
    setCart((prev) => {
      // If it's a customized item with unique id, add as separate item or increment
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + (item.quantity || 1) } : x
        );
      }
      return [
        ...prev,
        {
          ...item,
          id: item.id || `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          quantity: item.quantity || 1,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const itemTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const taxes = cart.length > 0 ? Math.round(itemTotal * 0.05) : 0;
  const grandTotal = itemTotal + deliveryFee + taxes;
  const savings = cart.length > 0 ? 60 : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        itemTotal,
        deliveryFee,
        taxes,
        grandTotal,
        savings,
        addItem,
        removeItem,
        updateQty,
        clearCart,
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
