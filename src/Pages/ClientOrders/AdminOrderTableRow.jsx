// AdminOrderTableRow
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { makeVisibleTime } from "../../Shared/makeVisibleTime";
import ButtonStrongMini from "../../Shared/Button/ButtonStrongMini";
import { SiTicktick } from "react-icons/si";
import { MdCancelPresentation } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { FaAnglesDown } from "react-icons/fa6";
import { useDeleteOrdersMutation, useGetClientOrdersCountQuery, useGetCompletedOrdersQuery, useGetOnProcessingOrdersQuery, useGetPendingOrdersQuery, useMakeOrderCompletedMutation, useMakeOrderOnProcessingMutation, useMakeOrderPendingMutation } from "../../Redux/features/api/allBaseApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import ButtonDangerStrongMini from "../../Shared/Button/ButtonDangerStrongMini";
import ButtonWarningMini from "../../Shared/Button/ButtonWarningMini";
const AdminOrderTableRow = ({ data, idx }) => {

    const { refetch: clientOrdersCountRefetch } = useGetClientOrdersCountQuery()
    const { refetch: pendingRefetch } = useGetPendingOrdersQuery();
    const { refetch: onProcessingRefetch } = useGetOnProcessingOrdersQuery();
    const { refetch: completedRefetch } = useGetCompletedOrdersQuery();
    const [makeOrderCompleted, { data: makeOrderCompletedData }] = useMakeOrderCompletedMutation();
    const [makeOrderOnProcessing, { data: makeOrderOnProcessingData }] = useMakeOrderOnProcessingMutation();
    const [makeOrderPending, { data: makeOrderPendingData }] = useMakeOrderPendingMutation();
    const [deleteOrders, { data: deleteOrdersData }] = useDeleteOrdersMutation();

    useEffect(() => {
        if (makeOrderPendingData) {
            Swal.fire({
                title: "Updated!",
                text: "The Order has transfer to Processing Stage",
                icon: "success"
            });
            pendingRefetch()
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [makeOrderPendingData])
    useEffect(() => {
        if (makeOrderOnProcessingData) {
            Swal.fire({
                title: "Updated!",
                text: "The Order has transfer to Pending Stage",
                icon: "success"
            });
            pendingRefetch()
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [makeOrderOnProcessingData])
    useEffect(() => {
        if (makeOrderCompletedData) {
            Swal.fire({
                title: "Updated!",
                text: "The Order has completed",
                icon: "success"
            });
            pendingRefetch()
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [makeOrderCompletedData])
    useEffect(() => {
        if (deleteOrdersData) {
            Swal.fire({
                title: "Deleted!",
                text: "The Order has deleted",
                icon: "success"
            });
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [deleteOrdersData])

    const handleOrderPending = () => {
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
                makeOrderPending(data?._id)

            }
        });
    }
    const handleOrderOnProcessing = () => {
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
                makeOrderOnProcessing(data?._id)

            }
        });
    }
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
                makeOrderCompleted(data?._id)

            }
        });
    }
    const handleOrderDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Later You won't be to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Order!!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteOrders(data?._id)
            }
        });

    }
    return (
        <tr className={`${idx % 2 !== 0 ? 'bg-secondary/70' : 'bg-secondary/40'}`}>

            <th className="">{idx}</th>
            <td className="">{data?.clientName || 'Not Given'}</td>
            <td className="">{data?.contactNumber || 'Not Given'}</td>
            <td className="">{!data?.location ? 'Not Given' : data?.location === 'Other' ? (data?.writtenLocation || 'Not Given') : data?.location}</td>
            <td className=""><span className="font-bold">{data?.productData?.length}</span> Items</td>
            <td className="">{data?.totalPrice} BDT</td>
            <td className="">{makeVisibleTime(data?.addedTime)}</td>
            <td className="">{data?.stage === 'pending' ? 'Pending' : data?.stage === 'processing' ? 'On Processing' : 'Completed'}</td>
            <td className="flex gap-3">
                <button title="Details"><Link to={`/adminOrderDetails/${data?._id}`}><ButtonStrongMini text={<span className="text-xl"><CgFileDocument /></span>} /></Link></button>
                {
                    data?.stage === 'pending' && <>
                        <button className="rotate-180" onClick={handleOrderOnProcessing} title="Transfer to On Processing stage"><ButtonStrongMini text={<span className="text-xl"><FaAnglesDown /></span>} /></button>
                    </>
                }
                {
                    data?.stage === 'processing' && <>
                        <button onClick={handleOrderCompleted} title="Make Completed"><ButtonStrongMini text={<span className="text-xl"><SiTicktick /></span>} /></button>
                    </>
                }


            </td>
            
            {
                data?.stage === 'processing' && <td className="">
                    <button onClick={handleOrderPending} title="Downgrade to Pending Stage"><ButtonWarningMini text={<span className="text-xl"><FaAnglesDown /></span>} /></button>
                </td>
            }
            {
                data?.stage === 'completed' && <td className="">
                    <button onClick={handleOrderOnProcessing} title="Downgrade to On Processing Stage"><ButtonWarningMini text={<span className="text-xl"><FaAnglesDown /></span>} /></button>
                </td>
            }
            <td className=""><button onClick={handleOrderDelete} title="Cancel Order"><ButtonDangerStrongMini text={<span className="text-xl"><MdCancelPresentation /></span>} /></button></td>

           
        </tr>
    );
};

export default AdminOrderTableRow;