/* eslint-disable react/prop-types */
import { Dialog, DialogHeader } from "@material-tailwind/react";
import ButtonLight from "../../Shared/Button/ButtonLight";
import ButtonDanger from "../../Shared/Button/ButtonDanger";

const BuyingAlertModal = ({ openBuyingAlertModal, handleCloseAlertModal,handleBuy }) => {
    return (
        <Dialog size="sm" open={openBuyingAlertModal} handler={handleCloseAlertModal} className="p-5">
            <DialogHeader>Are You Sure To Complete the Order?</DialogHeader>
            <h2 className="text-lg text-gray-700 px-4">Only Proprietor can cancel the Order!!</h2>

           <div className="flex gap-5 px-4 pt-5">
                <button onClick={handleBuy}>
                    <ButtonLight text={'Yes, Buy'} />
                </button>
                <button onClick={handleCloseAlertModal}>
                    <ButtonDanger text={'Cancel'} />
                </button>
           </div>
        </Dialog >
    );
};

export default BuyingAlertModal;