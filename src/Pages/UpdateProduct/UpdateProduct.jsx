import { useGetAllProductsQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import UpdateProductCard from "../../Shared/UpdateProductCard/UpdateProductCard";

const UpdateProduct = () => {
    const { data: allProducts, isLoading, isError, error } = useGetAllProductsQuery()
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="px-2 space-y-5">
            <RoutesTitle />
            <div className="flex flex-wrap gap-7 justify-center">
                {
                    allProducts?.map(product => <UpdateProductCard key={product?._id} productDetails={product} />)
                }
            </div>
        </div>
    );
};

export default UpdateProduct;