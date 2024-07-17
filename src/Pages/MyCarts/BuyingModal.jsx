/* eslint-disable react/prop-types */
import { Dialog, DialogHeader } from "@material-tailwind/react";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import { useSelector } from "react-redux";
import { useGetOrderedProductByEmailQuery, useGetUserDataQuery, useStoreOrderedProductMutation } from "../../Redux/features/api/allBaseApi";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import { inputStyle } from "../../Shared/inputStyle";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BuyingAlertModal from "./BuyingAlertModal";
import { useNavigate } from "react-router-dom";

const BuyingModal = ({ openBuyingModal, handleCloseModal, newAllProductsData, price, handleRemoveAll }) => {
    const navigate = useNavigate()
    const [location, setLocation] = useState('Shop')
    const [buyingAllData, setBuyingAllData] = useState({})
    const [openBuyingAlertModal, setOpenBuyingAlertModal] = useState(false)
    const { user } = useSelector(state => state.userSlice);

    const [buyingLoading, setBuyingLoading] = useState(false)
    const { data: userData, } = useGetUserDataQuery(user?.email, {
        skip: !user?.email,
    });
    const [storedOrderedProduct, { data: storedOrderedProductData }] = useStoreOrderedProductMutation()
    const { refetch } = useGetOrderedProductByEmailQuery(user?.email, {
        skip: !user?.email,
    });
    useEffect(() => {
        if (storedOrderedProductData) {
            setBuyingLoading(false)
            handleRemoveAll()
            Swal.fire({
                title: "Completed",
                text: "Your ordered Product is on Pending.",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Show Order Details"
              }).then((result) => {
                if (result.isConfirmed) {
                 navigate(`/orderDetails/${storedOrderedProductData?._id}`)
                }
              });
            handleCloseModal()
            if (user?.email) {
                refetch()
            }
        }
    }, [storedOrderedProductData])

    const { register, handleSubmit, formState: { errors }, getValues, control } = useForm()
    const handleCloseAlertModal = () => {
        setOpenBuyingAlertModal(false)
    }

    const onSubmit = async (data) => {

        const productData = newAllProductsData;
        const clientEmail = user?.email || 'not logged in';
        const buyingData = {
            clientEmail,
            ...data,
            productData,
            totalPrice: price,
            stage: 'pending',
            addedTime: new Date().getTime()
        };
        setOpenBuyingAlertModal(true)
        setBuyingAllData(buyingData)
        // storedOrderedProduct(buyingData)

    }
    const handleBuy = () => {
        handleCloseAlertModal()
        storedOrderedProduct(buyingAllData)
    }
    return (
        <Dialog size="sm" open={openBuyingModal} handler={handleCloseModal} className="p-5">
            <DialogHeader>Buy your products.</DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <InputLabel text={'Your Name'} />
                    <input
                        placeholder="Your Name"
                        {...register("clientName", {
                            required: true,
                        })}
                        type="text"
                        defaultValue={userData?.name}
                        className={`${inputStyle}`}
                    />
                </div>
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
                <div className="space-y-2">
                    <InputLabel text={'Location'} />
                    <Controller
                        name="location"
                        control={control}
                        defaultValue="Shop"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <select
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setLocation(getValues().location);
                                }}
                                className={`${inputStyle}`}
                                required
                            >
                                <option value="Shop">Shop</option>
                                <option value="Fakhir Bari">Fakhir Bari</option>
                                <option value="Majom Ali Bhuiya Bari">Majom Ali Bhuiya Bari</option>
                                <option value="Haji Bari">Haji Bari</option>
                                <option value="Bhuiya Bari">Bhuiya Bari</option>
                                <option value="Loiya Kazi Bari">Loiya Kazi Bari</option>
                                <option value="Patowari Bari">Patowari Bari</option>
                                <option value="Noku Mazi Bari">Noku Mazi Bari</option>
                                <option value="Other">Other</option>
                            </select>
                        )}
                    />
                </div>
                {
                    location === 'Other' && <div className="space-y-2">
                        <InputLabel text={'Write Your Location'} />
                        <input
                            placeholder="Write Your Location"
                            {...register("writtenLocation", {
                                required: true,

                            })}
                            type="text"
                            className={`${inputStyle}`}
                        />
                    </div>
                }
                <div className="w-full flex gap-5 pt-4 items-center flex-col xs:flex-row">
                    <button>
                        <ButtonStrong text={buyingLoading ? <span className="flex items-center gap-1">Buying <span className="loading loading-spinner loading-xs"></span></span> : `Buy ( ${price} BDT )`} />

                    </button>
                    <span> Or</span>
                    <div onClick={handleCloseModal}>
                        <ButtonDanger text={'Cancel'} />
                    </div>
                </div>
            </form>
            <BuyingAlertModal handleCloseAlertModal={handleCloseAlertModal} openBuyingAlertModal={openBuyingAlertModal} handleBuy={handleBuy} />
        </Dialog >
    );
};

export default BuyingModal;