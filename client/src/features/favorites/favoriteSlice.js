import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favoriteService from "./favoriteService";

const initialState = {
  favorites: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Check if favorite in favorites
export const checkFavorite = createAsyncThunk(
  "favorites/check",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteService.checkFavorite(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

// Update favorite or create new favorite
export const updateFavorite = createAsyncThunk(
  "favorites/update",
  async (favoriteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteService.updateFavorite(favoriteData, token);
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

// Get all user favorites
export const getFavorites = createAsyncThunk(
  "favorites/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteService.getFavorites(token);
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

// Delete user favorite
export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await favoriteService.deleteFavorite(id, token);
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
      })
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload.id
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(updateFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // check if favorite already exists
        const index = state.favorites.findIndex(
          (favorite) => favorite._id === action.payload._id
        );
        if (index !== -1) {
          state.favorites[index] = action.payload;
        } else {
          state.favorites.push(action.payload);
        }
      })
      .addCase(updateFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = favoriteSlice.actions;
export default favoriteSlice.reducer;
