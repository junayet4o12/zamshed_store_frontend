import { useGetOnProcessingOrdersQuery } from "../../../Redux/features/api/allBaseApi";
import Loading from "../../../Shared/Loading/Loading";
import NoOrderFound from "../../../Shared/NoOrderFound/NoOrderFound";
import OrderTableRow from "../../ClientOrderedProduct/OrderTableRow";
import AdminOrderTableRow from "../AdminOrderTableRow";

const OnProcessingOrder = () => {
    const { data, isLoading } = useGetOnProcessingOrdersQuery();
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="max-w-[1100px] mx-auto space-y-4">
                {data?.length > 0 ? <div className="overflow-x-auto rounded-xl">
                    <div className="min-w-max">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-primary text-white">

                                    <th></th>
                                    <th>Client Name</th>
                                    <th>Contact Number</th>
                                    <th>Location</th>
                                    <th>Products</th>
                                    <th>Total Price</th>
                                    <th>Order Time</th>
                                    <th>Stage</th>
                                    <th>Action</th>
                                    <th>Make Pending</th>
                                    <th>Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((data, idx) => <AdminOrderTableRow key={data?._id} idx={idx + 1} data={data} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : <div className="w-full flex justify-center items-center"><NoOrderFound /></div>}
            </div>
        </div>
    );
};

export default OnProcessingOrder;