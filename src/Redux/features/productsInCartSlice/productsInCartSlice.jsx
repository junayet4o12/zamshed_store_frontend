import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addedToCartData: JSON.parse(localStorage.getItem('zamshedStoreCartProducts')) || []
}

const productsInCartSlice = createSlice({
    name: 'productsInCartSlice',
    initialState,
    reducers: {
        restoreAddToCartData: (state) => {
            state.addedToCartData = JSON.parse(localStorage.getItem('zamshedStoreCartProducts')) || []
        }
    }
})
export const { restoreAddToCartData } = productsInCartSlice.actions
export default productsInCartSlice.reducer