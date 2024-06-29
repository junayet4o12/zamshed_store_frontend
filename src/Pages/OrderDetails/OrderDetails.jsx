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

    const { _id, addedTime, clientEmail, contactNumber, productData, stage, totalPrice,clientName
, location, writtenLocation    } = orderData;
console.log(orderData); 
    return ( 
        <div className="p-2 space-y-4 ">

            <RoutesTitle removeLastElement={true} />
            <div className="w-full max-w-[400px] p-2 border border-black mx-auto  rounded-lg text-sm font-medium relative">
                <div className="w-full h-full absolute -z-20 flex justify-center items-center">
                    <img className="h-20 " src={logo} alt="" />
                </div>
                <div>

                    <div className="w-full h-full absolute -z-10 flex justify-center items-center bg-white/85">
                    </div>
                    <h2 className="text-primary uppercase text-base font-bold"><span className="text-xl">Z</span>amshed <span className="text-xl">S</span>tore</h2>
                    <div className="">
                        <p className="flex flex-col">
                            <span>Date: {makeVisibleTime(addedTime)}</span>
                            <span>Name: {clientName || 'Not Given'}</span>
                            <span>Location: {!location ? 'Not Given' : location === 'Other' ? (writtenLocation || 'Not Given') : location}</span>
                            <span className={`text-base font-bold w-max px-4 mt-2 rounded-full  ${stage === 'processing' ? 'text-black bg-secondary' : 'text-white bg-primary'}`}>{stage === 'processing' ? 'On Processing' : stage === 'pending' ? 'On Pending' : 'Completed'}</span>
                        </p>
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