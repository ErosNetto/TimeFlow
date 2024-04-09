import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServiceCompany from "../services/authServiceCompany";

const company = JSON.parse(localStorage.getItem("company"));

const initialState = {
  company: company ? company : null,
  error: false,
  success: false,
  loading: false,
};

// Register an company and sign in
export const register = createAsyncThunk(
  "authCompany/register",
  async (company, thunkAPI) => {
    const data = await authServiceCompany.register(company);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSliceCompany = createSlice({
  name: "authCompany",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSliceCompany.actions;
export default authSliceCompany.reducer;
