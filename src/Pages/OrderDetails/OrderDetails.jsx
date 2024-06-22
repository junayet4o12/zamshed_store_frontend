import { useParams } from "react-router-dom";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import { useGetSingleOrderQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import { makeVisibleTime } from "../../Shared/makeVisibleTime";
import ProductPriceRow from "./ProductPriceRow";
import logo from '../../assets/logo.png'
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

                <div className="relative min-h-24">
                    <div className="w-full h-full absolute -z-20 flex justify-center items-center">
                        <img className="h-20 " src={logo} alt="" />
                    </div>
                    <div className="w-full h-full absolute -z-10 flex justify-center items-center bg-white/85">
                    </div>
                    <h2 className="text-primary uppercase text-base font-bold"><span className="text-xl">Z</span>amshed <span className="text-xl">S</span>tore</h2>
                    <div className="">
                        Date: {makeVisibleTime(addedTime)}
                        <hr className="border-gray-500 my-1" />
                    </div>
                </div>
                {
                    productData?.map((data, idx) => <ProductPriceRow key={idx} id={idx + 1} data={data} />)
                }
                <div className="flex gap-1 justify-between">
                    <p>Total - </p> <p>- {totalPrice} BDT</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;