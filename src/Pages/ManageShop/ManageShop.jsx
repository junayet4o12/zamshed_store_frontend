


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
const ManageShop = () => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const [ShopImagePlaceholder, setShopImagePlaceholder] = useState(selectPhoto)
    const [ShopFile0, setShopFile0] = useState('')
    const [ShopImage, setShopImage] = useState('')
    const { data: homeContent, isLoading, refetch } = useGetHomeContentQuery();
    const [updateHomeContent, { data: updatedData }] = useUpdateHomeContentMutation()
    useEffect(() => {
        if (homeContent?.length > 0) {
            setShopImagePlaceholder(homeContent[0].shopImage || selectPhoto)
        }
    }, [isLoading, homeContent,])
    // useEffect(() => {
    // }, [status])
    if (isLoading) {
        return <Loading />
    }
    const { dailyCustomers: incomingDailyCustomers,
        productAmount: incomingProductAmount, productTypesAmount: incomingProductTypesAmount, shopAge: incomingShopAge, shopImage: incomingShopImage, shopName: incomingShopName, totalRoom: incomingTotalRoom, _id } = homeContent[0];
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`


    const handleShopImage = () => {
        const image = document.getElementById('shopImage')
        image?.click()
        // imageInput.current.click()
    }

    const onSubmit = async (data) => {
        const isSelectANewImage = ShopImagePlaceholder === incomingShopImage ? false : true
        let shopImage = ''
        const toastId = toast.loading("Shop data is updating...");
        if (!isSelectANewImage) {
            shopImage = incomingShopImage
        } else {

            const image = { image: ShopFile0 }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                shopImage = res?.data?.data?.display_url
            }
            catch (err) {
                toast.error(err?.message, { id: toastId });
                return
            }
        }
        const ShopData = { ...data, shopImage }
        updateHomeContent({ data: ShopData, id: _id })
            .then(res => {
                toast.success("Shop data has updated Successfully!!", { id: toastId });
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
                <Title text={'Update Shop Data'} />
                {/* shop Name  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={'Shop Name'} />
                    <input type="text" className={`${inputStyle}`} placeholder="Name" name="shopName" {...register("shopName", { required: true })} defaultValue={incomingShopName} />
                    <p className="text-sm text-red-500">{errors.shopName && 'Shop Name is required'}</p>
                </div>
                {/* shop image  */}
                <div className="flex flex-col gap-2">

                    <InputLabel text={'Shop Image'} />
                    <ShopImageInputField allImgData={{ ShopImagePlaceholder, setShopImagePlaceholder, setShopImage, setShopFile0, ShopFile0, handleShopImage }} />
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-5">
                    {/* Shop Age  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Shop Age (Year)'} />
                        <input type="number" className={`${inputStyle}`} placeholder="Shop Age" {...register("shopAge", { required: true })} name="shopAge" defaultValue={incomingShopAge} />
                        <p className="text-sm text-red-500">{errors.shopAge && 'Shop Age is required'}</p>
                    </div>
                    {/* totalRoom  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Total Room'} />
                        <input type="number" className={`${inputStyle}`} placeholder="Total Room" {...register("totalRoom", { required: true })} name="totalRoom" defaultValue={incomingTotalRoom} />
                        <p className="text-sm text-red-500">{errors.totalRoom && 'Total Room is required'}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-5">
                    {/* total product Types  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Product Types Amount'} />
                        <input type="number" className={`${inputStyle}`} placeholder="Product Types Amount" {...register("productTypesAmount", { required: true })} name="productTypesAmount" defaultValue={incomingProductTypesAmount} />
                        <p className="text-sm text-red-500">{errors.productTypesAmount && 'Product Types Amount is required'}</p>
                    </div>
                    {/* productsAmount  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Products Amount'} />
                        <input type="number" className={`${inputStyle}`} placeholder="Products Amount" {...register("productAmount", { required: true })} name="productAmount" defaultValue={incomingProductAmount} />
                        <p className="text-sm text-red-500">{errors.productAmount && 'Products Amount is required'}</p>
                    </div>
                </div>
                {/* Daily Customers  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={'Daily Customers'} />
                    <input type="number" className={`${inputStyle}`} placeholder="Daily Customers" {...register("dailyCustomers", { required: true })} name="dailyCustomers" defaultValue={incomingDailyCustomers} />
                    <p className="text-sm text-red-500">{errors.dailyCustomers && 'Daily Customers is required'}</p>
                </div>

                <button className="transition-all duration-300 border border-primary e hover:bg-primary hover:text-white px-4 py-2.5 rounded-md font-medium">Update Shop Data</button>
            </form>
        </div>
    );
};

export default ManageShop;