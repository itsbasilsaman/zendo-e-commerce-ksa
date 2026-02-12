import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "./thunk";
import { CategoryType } from "@/src/types/category";
import { BrandType } from "@/src/types/brand";

export interface ProductType {
  _id: string;
  name: { en: string; ar: string };
  categoryId: CategoryType | null;
  brandId: BrandType | null;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  discount?: string;
  discountColor?: string;
  badge?: string;
  badgeColor?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ProductStateType {
  loading: boolean;
  datas: ProductType[];
  single: ProductType | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  search: string;
  error: string | null;
}

const initialState: ProductStateType = {
  loading: false,
  datas: [],
  single: null,
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 0,
  hasNext: false,
  hasPrev: false,
  search: "",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.datas = action.payload.data;
        const p = action.payload.pagination;

        state.total = p.total;
        state.page = p.page;
        state.limit = p.limit;
        state.totalPages = p.totalPages;
        state.hasNext = p.hasNext;
        state.hasPrev = p.hasPrev;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.datas = state.datas.filter((p) => p._id !== action.payload);
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.datas.unshift(action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.datas = state.datas.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.single = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.single = action.payload.data;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
        state.single = null;
      });
  },
});

export const { changePage } = productSlice.actions;
export default productSlice.reducer;
