import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../hooks/useAxiosSecure";
import { backendUrl } from "../../../Shared/backendUrl";

const allBaseApi = createApi({
    reducerPath: 'allBaseApi',
    baseQuery: axiosBaseQuery({ baseUrl: backendUrl }),
    endpoints: (builder) => ({
        
        // Product APIs
        // Get all products
        getAllProducts: builder.query({
            query: () => ({
                url: `/allProducts`,
                method: 'GET',
            }),
            providesTags: ['allProducts'],
        }),
        // Get single product by ID
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `/singleProduct/${id}`,
                method: 'GET',
            }),
        }),
        // Add a new product
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/addProducts',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['allProducts'],
        }),
        // Update a product by ID
        updateProduct: builder.mutation({
            query: ({ data, id }) => ({
                url: `/updateProducts/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['allProducts'],
        }),
        // Delete a product by ID
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/deleteProducts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['allProducts'],
        }),

        // User APIs
        // Get user data by email
        getUserData: builder.query({
            query: (email) => ({
                url: `/singleUser/${email}`,
                method: 'GET',
            }),
        }),
        // Add a new user
        addUsers: builder.mutation({
            query: (data) => ({
                url: `/addUsers`,
                method: 'POST',
                body: data,
            }),
        }),
        // Update user data by ID
        updateSingleUser: builder.mutation({
            query: ({ data, id }) => ({
                url: `/updateSingleUsers/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        // Category APIs
        // Get all categories
        getCategory: builder.query({
            query: () => ({
                url: `/categories`,
                method: 'GET',
            }),
            providesTags: ['allCategories'],
        }),
        // Get single category by ID
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/singleCategory/${id}`,
                method: 'GET',
            }),
            providesTags: [`singleCategory`],
        }),
        // Add a new category
        addCategory: builder.mutation({
            query: (data) => ({
                url: `/addCategory`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['allCategories'],
            
        }),
        // Update a category by ID
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updateCategory/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['allCategories'],
        }),
        // Delete a category by ID
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/deleteCategory/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['allCategories'],
        }),

        // Order APIs
        // Get ordered products by email
        getOrderedProductByEmail: builder.query({
            query: (email) => ({
                url: `/getOrderedProductByEmail/${email}`,
                method: 'GET',
            }),
        }),
        // Get single order by ID
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/singleOrder/${id}`,
                method: 'GET',
            }),
        }),
        // Store ordered product
        storeOrderedProduct: builder.mutation({
            query: (data) => ({
                url: `/storeOrderedProduct`,
                method: 'POST',
                body: data,
            }),
        }),
        // Delete order by ID
        deleteOrders: builder.mutation({
            query: (id) => ({
                url: `/deleteOrders/${id}`,
                method: 'DELETE',
            }),
        }),
        // Make order pending by ID
        makeOrderPending: builder.mutation({
            query: (id) => ({
                url: `/makeOrderPending/${id}`,
                method: 'PUT',
            }),
        }),
        // Make order on processing by ID
        makeOrderOnProcessing: builder.mutation({
            query: (id) => ({
                url: `/makeOrderOnProcessing/${id}`,
                method: 'PUT',
            }),
        }),
        // Make order completed by ID
        makeOrderCompleted: builder.mutation({
            query: (id) => ({
                url: `/makeOrderCompleted/${id}`,
                method: 'PUT',
            }),
        }),
        // Make order incomplete by ID
        makeOrderIncomplete: builder.mutation({
            query: (id) => ({
                url: `/makeOrderIncomplete/${id}`,
                method: 'PUT',
            }),
        }),

        // Miscellaneous APIs
        // Get category-wise products count
        getCategoryWiseProductsCount: builder.query({
            query: (category) => ({
                url: `/categoryWiseProductsCount/${category}`,
                method: 'GET',
            }),
        }),
        // Get admin by email
        getAdmin: builder.query({
            query: (email) => ({
                url: `/admin/${email}`,
                method: 'GET',
            }),
        }),
        // Get client orders count
        getClientOrdersCount: builder.query({
            query: () => ({
                url: '/clientOrdersCount',
                method: 'GET',
            }),
        }),
        // Get pending orders
        getPendingOrders: builder.query({
            query: () => ({
                url: '/pendingOrders',
                method: 'GET',
            }),
        }),
        // Get on processing orders
        getOnProcessingOrders: builder.query({
            query: () => ({
                url: '/onProcessingOrders',
                method: 'GET',
            }),
        }),
        // Get completed orders
        getCompletedOrders: builder.query({
            query: () => ({
                url: '/completedOrders',
                method: 'GET',
            }),
        }),
        // Get home content
        getHomeContent: builder.query({
            query: () => ({
                url: `/homeContent`,
                method: 'GET',
            }),
        }),
        // Update home content by ID
        updateHomeContent: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updateHomeContent/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        // Get cart products (mutation for demonstration purposes)
        getCartProducts: builder.mutation({
            query: (data) => ({
                url: `/cartProducts`,
                method: 'POST',
                body: data,
            }),
        }),
        // Create token for user authentication
        createToken: builder.mutation({
            query: (email) => ({
                url: '/jwt',
                method: 'POST',
                body: email,
            }),
        }),
    }),
});

export const {
    // Product API hooks
    useGetAllProductsQuery,            // Get all products
    useGetSingleProductQuery,          // Get single product by ID
    useAddProductMutation,             // Add a new product
    useUpdateProductMutation,          // Update a product by ID
    useDeleteProductsMutation,         // Delete a product by ID

    // User API hooks
    useGetUserDataQuery,               // Get user data by email
    useAddUsersMutation,               // Add a new user
    useUpdateSingleUserMutation,       // Update user data by ID

    // Category API hooks
    useGetCategoryQuery,               // Get all categories
    useGetSingleCategoryQuery,         // Get single category by ID
    useAddCategoryMutation,            // Add a new category
    useUpdateCategoryMutation,         // Update a category by ID
    useDeleteCategoryMutation,         // Delete a category by ID

    // Order API hooks
    useGetOrderedProductByEmailQuery,  // Get ordered products by email
    useGetSingleOrderQuery,            // Get single order by ID
    useStoreOrderedProductMutation,    // Store ordered product
    useMakeOrderPendingMutation,       // Make order pending by ID
    useMakeOrderOnProcessingMutation,  // Make order on processing by ID
    useMakeOrderCompletedMutation,     // Make order completed by ID
    useMakeOrderIncompleteMutation,    // Make order incomplete by ID
    useDeleteOrdersMutation,           // Delete order by ID

    // Miscellaneous API hooks
    useGetCategoryWiseProductsCountQuery, // Get category-wise products count
    useGetAdminQuery,                    // Get admin by email
    useGetClientOrdersCountQuery,        // Get client orders count
    useGetPendingOrdersQuery,            // Get pending orders
    useGetOnProcessingOrdersQuery,       // Get on processing orders
    useGetCompletedOrdersQuery,          // Get completed orders
    useGetHomeContentQuery,              // Get home content
    useUpdateHomeContentMutation,        // Update home content by ID
    useGetCartProductsMutation,          // Get cart products
    useCreateTokenMutation,              // Create token for user authentication
} = allBaseApi;

export default allBaseApi;
