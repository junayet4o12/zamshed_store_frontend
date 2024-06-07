/* eslint-disable react/prop-types */
import { Dialog, DialogHeader } from "@material-tailwind/react";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import { useSelector } from "react-redux";
import { useGetUserDataQuery, useStoreOrderedProductMutation } from "../../Redux/features/api/allBaseApi";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import { inputStyle } from "../../Shared/inputStyle";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BuyingModal = ({ openBuyingModal, handleCloseModal, newAllProductsData, price, handleRemoveAll }) => {
    const [buyingLoading, setBuyingLoading] = useState(false)
    const [storedOrderedProduct, { data: storedOrderedProductData }] = useStoreOrderedProductMutation()
    useEffect(() => {
        if (storedOrderedProductData) {
            setBuyingLoading(false)
            handleRemoveAll()
            Swal.fire({
                icon: "success",
                title: "Your ordered Product is on processing.",
                showConfirmButton: false,
                timer: 2000
            });
            handleCloseModal()

        }
    }, [storedOrderedProductData])
    const { user } = useSelector(state => state.userSlice);
    const { data: userData } = useGetUserDataQuery(user?.email ? user?.email : 'not Logged in');
    console.log(price);
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        const productData = newAllProductsData;
        const clientEmail = user?.email || 'not logged in';
        const contactNumber = data?.contactNumber;
        const buyingData = {
            clientEmail,
            contactNumber,
            productData,
            totalPrice: price,
            stage: 'processing',
            addedTime: new Date().getTime()
        };
        console.log(buyingData);
        storedOrderedProduct(buyingData)
    }
    return (
        <Dialog size="sm" open={openBuyingModal} handler={handleCloseModal} className="p-5">
            <DialogHeader>Buy your products.</DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <InputLabel text={'Your Contact Number'} />
                    <input
                        placeholder="Contact Number"
                        {...register("contactNumber", {
                            required: true,
                            minLength: 11,
                            maxLength: 11
                        })}
                        type="number"
                        defaultValue={userData?.contactNumber}
                        className={`${inputStyle}`}
                    />
                    {errors?.contactNumber?.type === 'minLength' && <span className='text-red-500 text-sm font-bold'>Contact number must be 11 characters</span>}
                    {errors?.contactNumber?.type === 'maxLength' && <span className='text-red-500 text-sm font-bold'>Contact number must be 11 characters</span>}
                </div>
                <div className="w-full flex gap-5 pt-4 items-center">
                    <button>
                        <ButtonStrong text={buyingLoading ? <span className="flex items-center gap-1">Buying <span className="loading loading-spinner loading-xs"></span></span> : `Buy ( ${price} BDT )`} />

                    </button>
                    Or
                    <div onClick={handleCloseModal}>
                        <ButtonDanger text={'Cancel'} />
                    </div>
                </div>
            </form>
        </Dialog >
    );
};

export default BuyingModal;