import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../product/slice";

interface WishlistState {
  items: ProductType[];
}

const initialState: WishlistState = {
  items: [],
};


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist: (state, action: PayloadAction<ProductType[]>) => {
      state.items = action.payload;
    },
    toggleWishlist: (state, action: PayloadAction<ProductType>) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { toggleWishlist, clearWishlist, hydrateWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
