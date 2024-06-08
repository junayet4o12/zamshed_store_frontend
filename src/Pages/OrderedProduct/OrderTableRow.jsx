/* eslint-disable react/prop-types */

import ButtonStrong from "../../Shared/Button/ButtonStrong";
import ButtonStrongMini from "../../Shared/Button/ButtonStrongMini";
import { makeVisibleTime } from "../../Shared/makeVisibleTime";

const OrderTableRow = ({ data, idx }) => {
    console.log();
    return (
        <tr className={`${idx % 2 !== 0 ? 'bg-secondary/70' : 'bg-secondary/40'}`}>
            <th className="">{idx}</th>
            <td className=""><span className="font-bold">{data?.productData?.length}</span> Items</td>
            <td className="">{data?.totalPrice} BDT</td>
            <td className="">{makeVisibleTime(data?.addedTime)}</td>
            <td className="">{data?.stage === 'processing' ? 'On Processing' : 'Completed'}</td>
            <td><ButtonStrongMini text={'Details'} /></td>
        </tr>
    );
};

export default OrderTableRow;