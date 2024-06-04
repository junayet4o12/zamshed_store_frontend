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
        getCategoryWiseProductsCount: builder.query({
            query: (category) => `/categoryWiseProductsCount/${category}`
        }),
        addProduct: builder.mutation({
            query: (product)=> ({
                url:'/addProducts',
                method: 'POST',
                body: product
            })
        }),
        updateProduct: builder.mutation({
            query: ({data, id})=> ({
                url:`/updateProducts/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteProducts: builder.mutation({
            query: (id)=> ({
                url:`/deleteProducts/${id}`,
                method: 'DELETE',
                body: ''
            })
        }),
        getCartProducts: builder.mutation({
            query: (data)=> ({
                url:`/cartProducts`,
                method: 'POST',
                body: data
            })
        }),
        addUsers: builder.mutation({
            query: (data)=> ({
                url:`/addUsers`,
                method: 'POST',
                body: data
            })
        }),
    })
})
export const { useGetAllProductsQuery,useGetSingleProductQuery,useGetCategoryWiseProductsCountQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductsMutation,useGetCartProductsMutation, useAddUsersMutation } = allBaseApi

export default allBaseApi