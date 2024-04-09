import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServiceUser from "../services/authServiceUser";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register an user and sign in
export const register = createAsyncThunk(
  "authUser/register",
  async (user, thunkAPI) => {
    const data = await authServiceUser.register(user);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSliceUser = createSlice({
  name: "authUser",
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

export const { reset } = authSliceUser.actions;
export default authSliceUser.reducer;
