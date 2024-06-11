import { useParams } from "react-router-dom";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import { useGetSingleOrderQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import { makeVisibleTime } from "../../Shared/makeVisibleTime";
import ProductPriceRow from "./ProductPriceRow";

const OrderDetails = () => {
    const { id } = useParams();
    console.log(id);
    const { data: orderData, isLoading } = useGetSingleOrderQuery(id);
    if (isLoading) {
        return <Loading />
    }

    const { _id, addedTime, clientEmail, contactNumber, productData, stage, totalPrice } = orderData;
    console.log(stage);

    return (
        <div className="p-2 space-y-4">
            <RoutesTitle removeLastElement={true} />
            <div className="w-full max-w-[400px] p-2 border border-black mx-auto  rounded-lg text-sm font-medium">
                <div className="">
                    Date: {makeVisibleTime(addedTime)}
                    <hr className="border-gray-500 my-1" />
                </div>
                {
                    productData?.map((data, idx)=> <ProductPriceRow key={idx} id={idx+1} data={data} />)
                }
                <div className="flex gap-1 justify-between">
                    <p>Total - </p> <p>- {totalPrice} BDT</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;