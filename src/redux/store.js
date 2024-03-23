import { configureStore } from "@reduxjs/toolkit";
import theCryptoReducer from "../redux/features/cryptoSlice"

export const store = configureStore({
    reducer: {
        cryptoReducer: theCryptoReducer,
    }
})