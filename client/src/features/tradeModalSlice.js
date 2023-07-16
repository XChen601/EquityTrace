import { createSlice } from "@reduxjs/toolkit";

export const tradeModalSlice = createSlice({
  name: "tradeModal",
  initialState: {
    isOpen: false,
    symbol: "",
    quantity: 1,
    price: 0,
  },
  reducers: {
    openTradeModal: (state) => {
      state.isOpen = true;
    },
    closeTradeModal: (state) => {
      state.isOpen = false;
    },
    setTradeModal: (state, action) => {
      state.symbol = action.payload.symbol;
      state.price = action.payload.price;
    },
  },
});

export const { openTradeModal, closeTradeModal, setTradeModal } =
  tradeModalSlice.actions;

export default tradeModalSlice.reducer;
