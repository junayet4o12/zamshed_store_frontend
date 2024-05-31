import { useGetAllProductsQuery } from "../Redux/features/api/allBaseApi";

const useAllProductsRefetch = () => {
    const { refetch } = useGetAllProductsQuery()
    return { allProductRefetch: refetch }
};

export default useAllProductsRefetch;