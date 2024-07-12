import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../hooks/useAxiosSecure";
import { backendUrl } from "../../../Shared/backendUrl";
const allBaseApi = createApi({
    reducerPath: 'allBaseApi',
    baseQuery: axiosBaseQuery({ baseUrl: backendUrl }),
    endpoints: (builder) => ({
        // Queries
        getAllProducts: builder.query({
            query: () => ({
                url: `/allProducts`,
                method: 'GET',
            }),
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/singleProduct/${id}`,
                method: 'GET',
            }),
        }),
        getCategoryWiseProductsCount: builder.query({
            query: (category) => ({
                url: `/categoryWiseProductsCount/${category}`,
                method: 'GET',
            }),
        }),
        getUserData: builder.query({
            query: (email) => ({
                url: `/singleUser/${email}`,
                method: 'GET',
            }),
        }),
        getAdmin: builder.query({
            query: (email) => ({
                url: `/admin/${email}`,
                method: 'GET',
            }),
        }),
        getOrderedProductByEmail: builder.query({
            query: (email) => ({
                url: `/getOrderedProductByEmail/${email}`,
                method: 'GET',
            }),
        }),
        getClientOrdersCount: builder.query({
            query: () => ({
                url: '/clientOrdersCount',
                method: 'GET',
            }),
        }),
        getPendingOrders: builder.query({
            query: () => ({
                url: '/pendingOrders',
                method: 'GET',
            }),
        }),
        getOnProcessingOrders: builder.query({
            query: () => ({
                url: '/onProcessingOrders',
                method: 'GET',
            }),
        }),
        getCompletedOrders: builder.query({
            query: () => ({
                url: '/completedOrders',
                method: 'GET',
            }),
        }),
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/singleOrder/${id}`,
                method: 'GET',
            }),
        }),
        getHomeContent: builder.query({
            query: () => ({
                url: `/homeContent`,
                method: 'GET',
            }),
        }),

        // Mutations
        createToken: builder.mutation({
            query: (email) => ({
                url: '/jwt',
                method: 'POST',
                body: email,
            }),
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/addProducts',
                method: 'POST',
                body: product,
            }),
        }),
        updateProduct: builder.mutation({
            query: ({ data, id }) => ({
                url: `/updateProducts/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/deleteProducts/${id}`,
                method: 'DELETE',
            }),
        }),
        getCartProducts: builder.mutation({
            query: (data) => ({
                url: `/cartProducts`,
                method: 'POST',
                body: data,
            }),
        }),
        addUsers: builder.mutation({
            query: (data) => ({
                url: `/addUsers`,
                method: 'POST',
                body: data,
            }),
        }),
        updateSingleUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/updateSingleUsers/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        storeOrderedProduct: builder.mutation({
            query: (data) => ({
                url: `/storeOrderedProduct`,
                method: 'POST',
                body: data,
            }),
        }),
        makeOrderPending: builder.mutation({
            query: (id) => ({
                url: `/makeOrderPending/${id}`,
                method: 'PUT',
            }),
        }),
        makeOrderOnProcessing: builder.mutation({
            query: (id) => ({
                url: `/makeOrderOnProcessing/${id}`,
                method: 'PUT',
            }),
        }),
        makeOrderCompleted: builder.mutation({
            query: (id) => ({
                url: `/makeOrderCompleted/${id}`,
                method: 'PUT',
            }),
        }),
        makeOrderIncomplete: builder.mutation({
            query: (id) => ({
                url: `/makeOrderIncomplete/${id}`,
                method: 'PUT',
            }),
        }),
        deleteOrders: builder.mutation({
            query: (id) => ({
                url: `/deleteOrders/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateTokenMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetCategoryWiseProductsCountQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductsMutation,
    useGetCartProductsMutation,
    useAddUsersMutation,
    useGetUserDataQuery,
    useUpdateSingleUserMutation,
    useGetAdminQuery,
    useStoreOrderedProductMutation,
    useGetOrderedProductByEmailQuery,
    useGetClientOrdersCountQuery,
    useGetPendingOrdersQuery,
    useGetOnProcessingOrdersQuery,
    useGetCompletedOrdersQuery,
    useGetSingleOrderQuery,
    useMakeOrderPendingMutation,
    useMakeOrderOnProcessingMutation,
    useMakeOrderCompletedMutation,
    useMakeOrderIncompleteMutation,
    useDeleteOrdersMutation,
    useGetHomeContentQuery
} = allBaseApi;

export default allBaseApi;