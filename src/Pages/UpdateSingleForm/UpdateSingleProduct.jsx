import { useParams } from "react-router-dom";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import UpdateProductForm from "../../Shared/UpdateProductForm/UpdateProductForm";
import Loading from "../../Shared/Loading/Loading";
import { useGetSingleProductQuery } from "../../Redux/features/api/allBaseApi";

const UpdateSingleProduct = () => {
    const {name, id} = useParams();
    const { data: singleProduct, isLoading, isError, error,refetch } = useGetSingleProductQuery(id)
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className="px-2 space-y-5">
            <RoutesTitle removeLastElement={true} productName={name} />
            <UpdateProductForm productData={singleProduct} refetch={refetch}  />
        </div>
    );
};

export default UpdateSingleProduct;