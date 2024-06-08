import { useSelector } from "react-redux";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import { useGetOrderedProductByEmailQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import OrderTableRow from "./OrderTableRow";
import NoOrderFound from "../../Shared/NoOrderFound/NoOrderFound";

const OrderedProduct = () => {
    const { user } = useSelector(state => state.userSlice)
    const { data: orderedData, isLoading: orderedDataIsLoading } = useGetOrderedProductByEmailQuery(user?.email)
    if (orderedDataIsLoading) {
        return <Loading />
    }
    return (
        <div className="p-2 space-y-7">
            <RoutesTitle />
            <div className="max-w-[700px] mx-auto space-y-4">
                <Title text={'My Orders'} />
                {orderedData?.length > 0 ?<div className="overflow-x-auto rounded-xl">
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
                                    orderedData?.map((data, idx) => <OrderTableRow key={data?._id} idx={idx + 1} data={data} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : <div className="w-full flex justify-center items-center"><NoOrderFound/></div>}
            </div>
        </div>
    );
};

export default OrderedProduct;