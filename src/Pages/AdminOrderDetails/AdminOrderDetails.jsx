import { useParams } from "react-router-dom";
import { useGetClientOrdersCountQuery, useGetCompletedOrdersQuery, useGetOnProcessingOrdersQuery, useGetSingleOrderQuery, useMakeOrderCompletedMutation, useMakeOrderIncompleteMutation } from "../../Redux/features/api/allBaseApi";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import { makeVisibleTime } from "../../Shared/makeVisibleTime";
import AdminOrderTableRow from "../ClientOrders/AdminOrderTableRow";
import Loading from "../../Shared/Loading/Loading";
import AdminProductPriceRow from "./AdminProductPriceRow";
import ButtonStrongMini from "../../Shared/Button/ButtonStrongMini";
import Swal from "sweetalert2";
import { useEffect } from "react";
import ButtonSecondaryStrongMini from "../../Shared/Button/ButtonSecondaryStrongMini";


const AdminOrderDetails = () => {
    const { refetch: clientOrdersCountRefetch } = useGetClientOrdersCountQuery()
    const { refetch: onProcessingRefetch } = useGetOnProcessingOrdersQuery();
    const { refetch: completedRefetch } = useGetCompletedOrdersQuery();
    const [makeOrderCompleted, { data: makeOrderCompletedData }] = useMakeOrderCompletedMutation()

    const [makeOrderIncomplete, { data: makeOrderIncompleteData }] = useMakeOrderIncompleteMutation()
    const { id } = useParams();
    const { data: orderData, isLoading, refetch } = useGetSingleOrderQuery(id);
    useEffect(() => {
        if (makeOrderCompletedData) {
            Swal.fire({
                title: "Updated!",
                text: "The Order has completed",
                icon: "success"
            });
            refetch()
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [makeOrderCompletedData])
    useEffect(() => {
        if (makeOrderIncompleteData) {
            Swal.fire({
                title: "Updated!",
                text: "The Order has reverted to Incomplete",
                icon: "success"
            });
            refetch()
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [makeOrderIncompleteData])
    if (isLoading) {
        return <Loading />
    }

    const { _id, addedTime, clientEmail, contactNumber, productData, stage, totalPrice } = orderData;
    const handleOrderCompleted = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Later You will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Completed!"
        }).then((result) => {
            if (result.isConfirmed) {
                makeOrderCompleted(id)

            }
        });
    }
    const handleOrderIncomplete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Later You will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Incomplete!"
        }).then((result) => {
            if (result.isConfirmed) {
                makeOrderIncomplete(id)

            }
        });
    }
    return (
        <div className="p-2 space-y-4">
            <RoutesTitle removeLastElement={true} />
            <div className="w-full max-w-[400px] p-2 border border-black mx-auto  rounded-lg text-sm font-medium">
                <div className="">
                    <div className="flex xs:items-center flex-col xs:flex-row justify-between py-2 gap-4">
                        <p className="flex flex-col">
                            <span>Date: {makeVisibleTime(addedTime)}</span>
                            <span className={`text-base font-bold w-max px-4 mt-2 rounded-full  ${stage === 'processing' ? 'text-black bg-secondary' : 'text-white bg-primary'}`}>{stage === 'processing' ? 'On Processing' : 'Completed'}</span>
                        </p>
                        {stage === 'processing' ? <button onClick={handleOrderCompleted} className="w-max"><ButtonStrongMini text={'Complete'} /></button> : <button onClick={handleOrderIncomplete} className="w-max"><ButtonSecondaryStrongMini text={'Incomplete'} /></button>}

                    </div>
                    <hr className="border-gray-500 my-1" />
                </div>
                {
                    productData?.map((data, idx) => <AdminProductPriceRow key={idx} id={idx + 1} data={data} />)
                }
                <div className="flex gap-1 justify-between">
                    <p>Total - </p> <p>- {totalPrice} BDT</p>

                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;