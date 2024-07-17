


import { useEffect, useState } from "react";
import selectPhoto from '../../assets/selectPhoto.png'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useGetHomeContentQuery, useUpdateHomeContentMutation } from "../../Redux/features/api/allBaseApi";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import Loading from "../../Shared/Loading/Loading";
import ShopImageInputField from "../../Shared/ShopImageInputField/ShopImageInputField";
import { useForm } from "react-hook-form";
import ProprietorImageInputField from "../../Shared/ProprietorImageInputField/ProprietorImageInputField";
import { formatTimestamp } from "../../Shared/makeInputFieldDate";
const ManageProprietor = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const [proprietorImagePlaceholder, setProprietorImagePlaceholder] = useState(selectPhoto)
    const [ShopFile0, setShopFile0] = useState('')
    const [proprietorImage, setProprietor] = useState('')
    const { data: homeContent, isLoading, refetch } = useGetHomeContentQuery();
    const [updateHomeContent, { data: updatedData }] = useUpdateHomeContentMutation()
    useEffect(() => {
        if (homeContent?.length > 0) {
            setProprietorImagePlaceholder(homeContent[0].proprietorImage || selectPhoto)
        }
    }, [isLoading, homeContent,])
    // useEffect(() => {
    // }, [status])
    if (isLoading) {
        return <Loading />
    }
    const {
        address: incomingAddress,
        dateOfBirth: incomingDateOfBirth,
        email: incomingEmail,
        proprietorImage: incomingProprietorImage,
        proprietor: incomingProprietor,
        contactNumber: incomingContactNumber,
        _id
    } = homeContent[0];
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`

    const handleShopImage = () => {
        const image = document.getElementById('shopImage')
        image?.click()
        // imageInput.current.click()
    }

    const onSubmit = async (data) => {
        const isSelectANewImage = proprietorImagePlaceholder === incomingProprietorImage ? false : true
        let proprietorImageUrl = ''
        const toastId = toast.loading("Proprietor data is updating...");
        if (!isSelectANewImage) {
            proprietorImageUrl = incomingProprietorImage
        } else {

            const image = { image: ShopFile0 }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                proprietorImageUrl = res?.data?.data?.display_url
            }
            catch (err) {
                toast.error(err?.message, { id: toastId });
                return
            }
        }
        const dateOfBirth = new Date(data.dateOfBirth).getTime()
        const proprietorData = { ...data, proprietorImage: proprietorImageUrl, dateOfBirth }
        updateHomeContent({ data: proprietorData, id: _id })
            .then(res => {
                toast.success("Proprietor data has updated Successfully!!", { id: toastId });
                refetch()
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return (
        <div className="px-2 space-y-5 pb-10">
            <RoutesTitle />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Update Proprietor Data'} />
                {/* proprietor Name  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={'Proprietor Name'} />
                    <input type="text" className={`${inputStyle}`} placeholder="Name" name="proprietor" {...register("proprietor", { required: true })} defaultValue={incomingProprietor} />
                    <p className="text-sm text-red-500">{errors.proprietor && 'Email is required'}</p>
                </div>
                {/* proprietor image  */}
                <div className="flex flex-col gap-2">

                    <InputLabel text={'Profile'} />
                    <ProprietorImageInputField allImgData={{ ShopImagePlaceholder: proprietorImagePlaceholder, setShopImagePlaceholder: setProprietorImagePlaceholder, setShopImage: setProprietor, setShopFile0, ShopFile0, handleShopImage }} />
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-5">
                    {/* Email  */}
                    <div className="flex flex-col gap-2 xs:col-span-2">
                        <InputLabel text={'Email'} />
                        <input type="email" className={`${inputStyle}`} placeholder="Email" {...register("email", { required: true })} name="email" defaultValue={incomingEmail} />
                        <p className="text-sm text-red-500">{errors.email && 'Email is required'}</p>
                    </div>
                    {/* address  */}
                    <div className="flex flex-col gap-2 xs:col-span-2">
                        <InputLabel text={'Address'} />

                        <input type="text" className={`${inputStyle}`} placeholder="Address" {...register("address", { required: true })} name="address" defaultValue={incomingAddress} />
                        <p className="text-sm text-red-500">{errors.address && 'Address is required'}</p>
                    </div>


                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-5">
                    {/* proprietor Age  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Date Of Birth'} />
                        <input type="date" className={`${inputStyle}`} placeholder="Date Of Birth" {...register("dateOfBirth", { required: true })} name="dateOfBirth" defaultValue={formatTimestamp(incomingDateOfBirth)} />
                        <p className="text-sm text-red-500">{errors.dateOfBirth && 'Date Of Birth is required'}</p>
                    </div>
                    {/* Contact number  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Contact Number'} />
                        <input type="number" className={`${inputStyle}`} placeholder="Contact Number" {...register("contactNumber", { required: true })} name="contactNumber" defaultValue={incomingContactNumber} />
                        <p className="text-sm text-red-500">{errors.address && 'Contact Number is required'}</p>

                    </div>

                </div>


                <button className="transition-all duration-300 border border-primary e hover:bg-primary hover:text-white px-4 py-2.5 rounded-md font-medium">Update Proprietor Data</button>
            </form>
        </div>
    );
};

export default ManageProprietor;