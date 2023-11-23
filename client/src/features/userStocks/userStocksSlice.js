import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userStocksService from "./userStocksService";

const initialState = {
  userStocks: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Check if stock in user's stocks list
export const checkUserStock = createAsyncThunk(
  "userStocks/check",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userStocksService.checkUserStock(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// add new stock
export const createUserStock = createAsyncThunk(
  "userStocks/create",
  async (stockData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userStocksService.createUserStock(stockData, token);
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

// Update a user's stock
export const updateUserStock = createAsyncThunk(
  "userStocks/update",
  async (stockData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userStocksService.updateUserStock(stockData, token);
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

// Get all user stocks
export const getUserStocks = createAsyncThunk(
  "userStocks/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userStocksService.getUserStocks(token);
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

// Delete a user stock
export const deleteUserStock = createAsyncThunk(
  "userStocks/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userStocksService.deleteUserStock(id, token);
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

export const userStocksSlice = createSlice({
  name: "userStock",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userStocks.push(action.payload);
      })
      .addCase(createUserStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserStocks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userStocks = action.payload;
      })
      .addCase(getUserStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUserStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userStocks = state.userStocks.filter(
          (stock) => stock._id !== action.payload.id
        );
      })
      .addCase(deleteUserStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(updateUserStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userStocksSlice.actions;
export default userStocksSlice.reducer;
