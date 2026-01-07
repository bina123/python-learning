// src/stores/cartStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            // State
            items: [],
            discountCode: null,
            discountPercent: 0,

            // Actions
            addItem: (product) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                    };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            clearCart: () => set({ items: [], discountCode: null, discountPercent: 0 }),

            applyDiscount: (code, percent) =>
                set({ discountCode: code, discountPercent: percent }),

            removeDiscount: () => set({ discountCode: null, discountPercent: 0 }),

            // Computed values
            getSubtotal: () => {
                const { items } = get();
                return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },

            getDiscount: () => {
                const { discountPercent } = get();
                return get().getSubtotal() * (discountPercent / 100);
            },

            getTax: () => {
                const subtotal = get().getSubtotal();
                const discount = get().getDiscount();
                return (subtotal - discount) * 0.1; // 10% tax
            },

            getTotal: () => {
                const subtotal = get().getSubtotal();
                const discount = get().getDiscount();
                const tax = get().getTax();
                return subtotal - discount + tax;
            },

            getItemCount: () => {
                const { items } = get();
                return items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;