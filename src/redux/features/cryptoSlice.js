import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency: 'INR',
    symbol: '₹'
}

export const cryptoSlice = createSlice({
    name: "cryptoReducer",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload
            if (state.currency === "INR") {
                state.symbol = "₹"
            }
            else if (state.currency === "USD") {
                state.symbol = "$"
            }
        },
        
    }
})

export const { setCurrency } = cryptoSlice.actions

export default cryptoSlice.reducer