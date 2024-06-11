import { useGetCompletedOrdersQuery } from "../../../Redux/features/api/allBaseApi";
import Loading from "../../../Shared/Loading/Loading";
import NoOrderFound from "../../../Shared/NoOrderFound/NoOrderFound";
import AdminOrderTableRow from "../AdminOrderTableRow";

const CompletedOrders = () => {
    const { data, isLoading } = useGetCompletedOrdersQuery();
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="max-w-[800px] mx-auto space-y-4">
                {data?.length > 0 ?<div className="overflow-x-auto rounded-xl">
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
                                    data?.map((data, idx) => <AdminOrderTableRow key={data?._id} idx={idx + 1} data={data} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : <div className="w-full flex justify-center items-center"><NoOrderFound/></div>}
            </div>
        </div>
    );
};

export default CompletedOrders;