import { useSelector } from "react-redux";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import { useGetOrderedProductByEmailQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import OrderTableRow from "./OrderTableRow";
import NoOrderFound from "../../Shared/NoOrderFound/NoOrderFound";
import { useState } from "react";

const ClientOrderedProduct = () => {
    const [showStageWiseOrders, setShowStageWiseOrders] = useState('pending')
    const { user } = useSelector(state => state.userSlice)
    const token = localStorage.getItem('token')
    const { data: orderedData, isLoading: orderedDataIsLoading } = useGetOrderedProductByEmailQuery(user?.email, {
        skip: !token
    })
    if (orderedDataIsLoading) {
        return <Loading />
    }
    const pendingData = orderedData?.filter(item => item?.stage === 'pending');
    const onProcessingData = orderedData?.filter(item => item?.stage === 'processing');
    const completedData = orderedData?.filter(item => item?.stage === 'completed');
    const showingProduct = showStageWiseOrders === 'pending' ? pendingData : showStageWiseOrders === 'processing' ? onProcessingData : completedData
    const LinkStyle = `flex items-center gap-2 cursor-pointer toggleParent transition-all duration-300 relative`
    const StylingComponents = ({ isShow }) => {
        return <div className={`w-1.5 h-1.5 bg-primary ${isShow ? 'toggleStyleOnActive' : 'toggleStyle'} absolute left-0`}></div>
    }

    return (
        <div className="p-2 space-y-7">
            <RoutesTitle />

            <div className="max-w-[700px] mx-auto space-y-4">
                <Title text={'My Orders'} />
                <div>
                    <ul className="flex gap-4">

                        <li onClick={() =>
                            setShowStageWiseOrders('pending')
                        } className={`${LinkStyle} ${showStageWiseOrders === 'pending' && 'pl-4 text-primary'}`}>
                            <StylingComponents isShow={showStageWiseOrders === 'pending' ? true : false} />
                            Pending ({pendingData?.length})
                        </li>

                        <li onClick={() =>
                            setShowStageWiseOrders('processing')
                        } className={`${LinkStyle} ${showStageWiseOrders === 'processing' && 'pl-4 text-primary'}`}>
                            <StylingComponents isShow={showStageWiseOrders === 'processing' ? true : false} />
                            On Processing ({onProcessingData?.length})
                        </li>


                        <li onClick={() =>
                            setShowStageWiseOrders('completed')
                        } className={`${LinkStyle} ${showStageWiseOrders === 'completed' && 'pl-4 text-primary'}`}>
                            <StylingComponents isShow={showStageWiseOrders === 'completed' ? true : false} />
                            Completed ({completedData?.length})
                        </li>

                    </ul>
                </div>
                {showingProduct?.length > 0 ? <div className="overflow-x-auto rounded-xl">
                    <div className="min-w-max">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th></th>
                                    <th>Products</th>
                                    <th>Total Price</th>
                                    <th>Order Time</th>
                                    <th>Stage</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    showingProduct?.map((data, idx) => <OrderTableRow key={data?._id} idx={idx + 1} data={data} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : <div className="w-full flex justify-center items-center"><NoOrderFound /></div>}
            </div>
        </div>
    );
};

export default ClientOrderedProduct;