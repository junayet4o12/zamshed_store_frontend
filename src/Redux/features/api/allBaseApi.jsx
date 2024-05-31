import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../../../Shared/backendUrl";

const allBaseApi = createApi({
    reducerPath: 'allBaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/allProducts'
        }),
        getSingleProduct: builder.query({
            query: (id) => `/singleProduct/${id}`
        }),
    })
})
export const { useGetAllProductsQuery,useGetSingleProductQuery } = allBaseApi

export default allBaseApi