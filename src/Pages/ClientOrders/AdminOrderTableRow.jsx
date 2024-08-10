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
import Swal from "sweetalert2";
import ButtonDangerStrongMini from "../../Shared/Button/ButtonDangerStrongMini";
import ButtonWarningMini from "../../Shared/Button/ButtonWarningMini";
import toast from "react-hot-toast";

const AdminOrderTableRow = ({ data, idx }) => {
    // Refetch queries
    const { refetch: clientOrdersCountRefetch } = useGetClientOrdersCountQuery();
    const { refetch: pendingRefetch } = useGetPendingOrdersQuery();
    const { refetch: onProcessingRefetch } = useGetOnProcessingOrdersQuery();
    const { refetch: completedRefetch } = useGetCompletedOrdersQuery();

    // Mutations
    const [makeOrderCompleted] = useMakeOrderCompletedMutation();
    const [makeOrderOnProcessing] = useMakeOrderOnProcessingMutation();
    const [makeOrderPending] = useMakeOrderPendingMutation();
    const [deleteOrders] = useDeleteOrdersMutation();

    // Function to refetch all order counts and stages
    const handleAllRefetch = () => {
        pendingRefetch();
        onProcessingRefetch();
        completedRefetch();
        clientOrdersCountRefetch();
    };

    // Common function to show confirmation modal
    const showModal = (confirmButtonText, handleAction, isDelete = false) => {
        Swal.fire({
            title: "Are you sure?",
            text: isDelete ? `You won't be able to revert this later!` : "You will be able to revert this later!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText
        }).then((result) => {
            if (result.isConfirmed) handleAction();
        });
    };

    // Function to handle status change with toast notifications
    const handleStatusChange = (action, successMessage, toastLoadingMessage) => {
        const toastId = toast.loading(toastLoadingMessage);
        action(data?._id).unwrap()
            .then(res => {
                if (res?._id) {
                    toast.success(successMessage, { id: toastId });
                    handleAllRefetch();
                }
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            });
    };

    // Function to handle order deletion with toast notifications
    const handleOrderDelete = () => {
        const toastId = toast.loading("Deleting the order...");
        deleteOrders(data?._id).unwrap()
            .then(() => {
                toast.success("The Order has been deleted", { id: toastId });
                handleAllRefetch();
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            });
    };

    return (
        <tr className={`${idx % 2 !== 0 ? 'bg-secondary/70' : 'bg-secondary/40'}`}>
            <th>{idx}</th>
            <td>{data?.clientName || 'Not Given'}</td>
            <td>{data?.contactNumber || 'Not Given'}</td>
            <td>{!data?.location ? 'Not Given' : data?.location === 'Other' ? (data?.writtenLocation || 'Not Given') : data?.location}</td>
            <td><span className="font-bold">{data?.productData?.length}</span> Items</td>
            <td>{data?.totalPrice} BDT</td>
            <td>{makeVisibleTime(data?.addedTime)}</td>
            <td>{data?.stage === 'pending' ? 'Pending' : data?.stage === 'processing' ? 'On Processing' : 'Completed'}</td>
            <td className="flex gap-3">
                <button title="Details"><Link to={`/adminOrderDetails/${data?._id}`}><ButtonStrongMini text={<span className="text-xl"><CgFileDocument /></span>} /></Link></button>
                {data?.stage === 'pending' && (
                    <button className="rotate-180" onClick={() => showModal("Yes, Make Processing!", () => handleStatusChange(makeOrderOnProcessing, "The Order has transferred to Processing Stage", "The Order is on the way to transfer to Processing Stage"))} title="Transfer to On Processing stage">
                        <ButtonStrongMini text={<span className="text-xl"><FaAnglesDown /></span>} />
                    </button>
                )}
                {data?.stage === 'processing' && (
                    <button onClick={() => showModal("Yes, Make Completed!", () => handleStatusChange(makeOrderCompleted, "The Order has been completed", "The Order is on the way to Complete"))} title="Make Completed">
                        <ButtonStrongMini text={<span className="text-xl"><SiTicktick /></span>} />
                    </button>
                )}
            </td>
            {data?.stage === 'processing' && (
                <td>
                    <button onClick={() => showModal("Yes, Make Pending!", () => handleStatusChange(makeOrderPending, "The Order has transferred to Pending Stage", "The Order is on the way to transfer to Pending Stage"))} title="Downgrade to Pending Stage">
                        <ButtonWarningMini text={<span className="text-xl"><FaAnglesDown /></span>} />
                    </button>
                </td>
            )}
            {data?.stage === 'completed' && (
                <td>
                    <button onClick={() => showModal("Yes, Make Processing!", () => handleStatusChange(makeOrderOnProcessing, "The Order has transferred to Processing Stage", "The Order is on the way to transfer to Processing Stage"))} title="Downgrade to On Processing Stage">
                        <ButtonWarningMini text={<span className="text-xl"><FaAnglesDown /></span>} />
                    </button>
                </td>
            )}
            <td>
                <button onClick={() => showModal("Yes, Delete Order!!", handleOrderDelete, true)} title="Cancel Order">
                <ButtonDangerStrongMini text={<span className="text-xl"><MdCancelPresentation /></span>} />
            </button>
        </td>
        </tr >
    );
};

export default AdminOrderTableRow;
