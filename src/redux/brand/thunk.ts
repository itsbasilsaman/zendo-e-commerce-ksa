import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/src/services/api";
import { BrandType } from "@/src/types/brand";
import { handleAxiosError } from "@/src/utils/handleAxiosError";
import { isAxiosError } from "axios";

export const fetchBrands = createAsyncThunk("brand/fetch", async () => {
  const res = await api.get("/brand");
  return res.data.data;
});

export const createBrand = createAsyncThunk(
  "brand/create",
  async (data: BrandType, { rejectWithValue }) => {
    try {
      const res = await api.post("/brand", data);
      toast.success("Brand created");
      return res.data.data;
    } catch (err) {
      handleAxiosError(err);
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/update",
  async (
    { id, data }: { id: string; data: Partial<BrandType> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.patch(`/brand/${id}`, data);
      toast.success("Brand updated");
      return res.data.data;
    } catch (err) {
      handleAxiosError(err);
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/brand/${id}`);
      toast.success("Brand deleted");
      return id;
    } catch (err) {
      handleAxiosError(err);
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);
