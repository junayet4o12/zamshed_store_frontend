import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    searchingText: '',
    filterCategory: 'Select Category'
}
const searchingProductsSlice = createSlice({
    name: 'searchingProductsSlice',
    initialState,
    reducers: {
        setSearchingText: (state, { payload }) => {
            state.searchingText = payload
        },
        setFilterCategory: (state, { payload }) => {
            state.filterCategory = payload
        },
    }
})
export const { setSearchingText, setFilterCategory } = searchingProductsSlice.actions
export default searchingProductsSlice.reducer;