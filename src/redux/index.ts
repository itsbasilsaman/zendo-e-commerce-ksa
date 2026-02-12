import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/slice";
import wishlistSlice from "./wishlist/slice";
import productSlice from "./product/slice";
import brandSlice from "./brand/slice";
import cartSlice from "./cart/slice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    wishlist: wishlistSlice,
    brand: brandSlice,
    cart: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
