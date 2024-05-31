import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import UpdateProductCard from "../../Shared/UpdateProductCard/UpdateProductCard";

const UpdateProduct = () => {
    const { data: allProducts, isLoading, isError, error, refetch } = useGetAllProductsQuery()
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="px-2 space-y-5">
            <RoutesTitle />
            <div className="flex flex-wrap gap-7 justify-center">
                <Link to={`/addProduct`}>
                    <div className="p-3 rounded-lg border border-gray-600 text-primary w-[280px] space-y-3 min-h-full flex flex-col justify-center items-center galleryParent cursor-pointer py-14">
                        <span className="flex flex-col text-center galleryImage transition-all duration-200">
                            <span className="text-7xl">+</span>
                            Add Product
                        </span>
                    </div>
                </Link>
                {
                    allProducts?.map(product => <UpdateProductCard key={product?._id} productDetails={product} refetch={refetch} />)
                }
            </div>
        </div>
    );
};

export default UpdateProduct;