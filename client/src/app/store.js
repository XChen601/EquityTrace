import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";
import tradeModalReducer from "../features/tradeModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoriteReducer,
    tradeModal: tradeModalReducer,
  },
});
