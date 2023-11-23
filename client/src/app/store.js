import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userStocksReducer from "../features/userStocks/userStocksSlice";
import tradeModalReducer from "../features/tradeModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userStocks: userStocksReducer,
    tradeModal: tradeModalReducer,
  },
});
