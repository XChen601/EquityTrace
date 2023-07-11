import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favoriteService from "./favoriteService";

const initialState = {
  favorites: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create new favorite
export const createFavorite = createAsyncThunk(
  "favorites/create",
  async (favoriteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteService.createFavorite(favoriteData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites.push(action.payload);
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = favoriteSlice.actions;
export default favoriteSlice.reducer;
