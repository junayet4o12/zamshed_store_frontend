import { configureStore } from "@reduxjs/toolkit"
import allBaseApi from "./features/api/allBaseApi"

const store = configureStore({
    reducer: {
        [allBaseApi.reducerPath]: allBaseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(allBaseApi.middleware),
})

export default store