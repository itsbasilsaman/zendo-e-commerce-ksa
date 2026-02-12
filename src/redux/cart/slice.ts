import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../product/slice";

interface CartItemType {
  product: ProductType;
  quantity: number;
}

interface CartState {
  items: CartItemType[];
}

const initialState: CartState = {
  items: [],
};

const saveCartToStorage = (items: CartItemType[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<CartItemType[]>) => {
      state.items = action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<{ product: ProductType; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      const existing = state.items.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.product._id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
