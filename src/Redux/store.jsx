import { configureStore } from "@reduxjs/toolkit"
import allBaseApi from "./features/api/allBaseApi"
import searchingProductsSlice from "./features/searchingProductsSlice/searchingProductsSlice"

const store = configureStore({
    reducer: {
        [allBaseApi.reducerPath]: allBaseApi.reducer,
        searchingProductsSlice: searchingProductsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(allBaseApi.middleware),
})

export default store