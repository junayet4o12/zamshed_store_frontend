/* eslint-disable react/prop-types */
import { Dialog, DialogHeader } from "@material-tailwind/react";
import ButtonLight from "../../Shared/Button/ButtonLight";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import { useSelector } from "react-redux";

const BuyingAlertModal = ({ openBuyingAlertModal, handleCloseAlertModal, handleBuy }) => {
    const { user } = useSelector(state => state.userSlice);
    return (
        <Dialog size="sm" open={openBuyingAlertModal} handler={handleCloseAlertModal} className="py-5">
            <DialogHeader>Are You Sure To Complete the Order?</DialogHeader>
            <h2 className="text-lg text-gray-700 px-4">Only Proprietor can cancel the Order!!</h2>
            {
                !user?.email && <p className="px-4">You are not logged in yet. If you want to access your order please <span className="underline font-medium hover:text-blue-500">Log In.</span></p>
            }
            <div className="flex gap-5 px-2 sm:px-4 pt-5">
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