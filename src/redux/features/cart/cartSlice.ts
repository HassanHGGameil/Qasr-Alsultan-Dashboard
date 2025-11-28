import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductItem } from "@/types/frontendType/product"; 

export type CartItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  images: { url: string }[];
  price: number;
  quantity: number;
  productItems: IProductItem; // Now optional
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const normalizedProductItems = newItem.productItems || [];

      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.productItems || []) ===
            JSON.stringify(normalizedProductItems)
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          productItems: normalizedProductItems,
        });
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity -= 1;
        }
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // Ensure quantity doesn't go below 1
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  decreaseQuantity,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
