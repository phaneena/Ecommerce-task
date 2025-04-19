"use client"

import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/userSlice"
import productReducer from "../features/productSlice"
import cartReducer from "../features/cartSlice"
import themeReducer from "../features/themeSlice"

const store = configureStore({
  reducer: {
    users:userReducer,
    products: productReducer,
    cart:cartReducer,
    theme:themeReducer
  },
});

export default store;
