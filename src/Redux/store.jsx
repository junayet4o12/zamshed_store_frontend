import { configureStore } from "@reduxjs/toolkit"
import allBaseApi from "./features/api/allBaseApi"
import searchingProductsSlice from "./features/searchingProductsSlice/searchingProductsSlice"
import userSlice from "./features/userSlice/userSlice"
const store = configureStore({
    reducer: { 
        [allBaseApi.reducerPath]: allBaseApi.reducer,
        searchingProductsSlice: searchingProductsSlice,
        userSlice: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(allBaseApi.middleware),
})

export default store