// AdminOrderTableRow
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { makeVisibleTime } from "../../Shared/makeVisibleTime";
import ButtonStrongMini from "../../Shared/Button/ButtonStrongMini";
import { SiTicktick } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
import { useGetClientOrdersCountQuery, useGetCompletedOrdersQuery, useGetOnProcessingOrdersQuery, useMakeOrderCompletedMutation } from "../../Redux/features/api/allBaseApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
const AdminOrderTableRow = ({ data, idx }) => {
    const { refetch: clientOrdersCountRefetch } = useGetClientOrdersCountQuery()
    const { refetch: onProcessingRefetch } = useGetOnProcessingOrdersQuery();
    const { refetch: completedRefetch } = useGetCompletedOrdersQuery();
    const [makeOrderCompleted, { data: makeOrderCompletedData }] = useMakeOrderCompletedMutation();

    useEffect(() => {
        if (makeOrderCompletedData) {
            Swal.fire({
                title: "Updated!",
                text: "The Order has completed",
                icon: "success"
            });
            onProcessingRefetch()
            completedRefetch()
            clientOrdersCountRefetch()
        }
    }, [makeOrderCompletedData])

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
    return (
        <tr className={`${idx % 2 !== 0 ? 'bg-secondary/70' : 'bg-secondary/40'}`}>
            <th className="">{idx}</th>
            <td className=""><span className="font-bold">{data?.productData?.length}</span> Items</td>
            <td className="">{data?.totalPrice} BDT</td>
            <td className="">{makeVisibleTime(data?.addedTime)}</td>
            <td className="">{data?.stage === 'processing' ? 'On Processing' : 'Completed'}</td>
            <td className="flex gap-3">
                <button title="Details"><Link to={`/adminOrderDetails/${data?._id}`}><ButtonStrongMini text={<span className="text-xl"><CgFileDocument /></span>} /></Link></button>
                {
                    data?.stage === 'processing' && <button onClick={handleOrderCompleted} title="Make Completed"><ButtonStrongMini text={<span className="text-xl"><SiTicktick /></span>} /></button>
                }
            </td>
        </tr>
    );
};

export default AdminOrderTableRow;