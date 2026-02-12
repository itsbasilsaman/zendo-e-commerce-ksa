import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "./thunk";
import { BrandType } from "@/src/types/brand";

interface BrandState {
  data: BrandType[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  data: [],
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(createBrand.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        state.data = state.data.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })

      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.data = state.data.filter((b) => b._id !== action.payload);
      });
  },
});

export default brandSlice.reducer;
