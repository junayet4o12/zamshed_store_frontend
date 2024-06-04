/* eslint-disable react/prop-types */

import { IoIosHeartEmpty } from "react-icons/io";
import { useGetSingleProductQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";

const MyCartsCard = ({ data }) => {
    const { id, unitValue, unitType } = data;
    const { data: productData, isLoading } = useGetSingleProductQuery(id)
    if (isLoading) {
        return <Loading />
    }
    const { name, productImage, price, category, addedTime, measurement, _id } = productData

    const priceForKg = measurement === 'Kilogram' ? unitType === 'Kg' ? unitValue * price : unitValue * price / 1000 : ''
    const priceForQuantity = measurement === 'Quantity' ? unitValue * price : ''
    const priceForLitre = measurement === 'Litre' ? unitType === 'Litre' ? unitValue * price : unitValue * price / 1000 : ''
    return (
        <div>
            <div className="p-3 rounded-lg border border-gray-600 text-gray-600 w-[250px] space-y-3 min-h-full flex flex-col justify-between galleryParent">
                <div className="space-y-3">
                    <div className="flex items-center justify-between ">
                        <h2 className="text-sm font-medium ">{name}</h2>
                    </div>
                    <div className="w-32 overflow-hidden mx-auto">
                        <img className="w-full h-full object-cover galleryImage transition-all duration-200" src={productImage} alt="" />
                    </div>
                </div>
                <div className="flex justify-between flex-col gap-3">
                    <div className="space-y-3">
                        <div className="text-black font-semibold">
                            <h2>Unit: {unitValue} {unitType}</h2>
                        </div>
                        <div className="text-black font-semibold">
                            {measurement === 'Kilogram' && <h2>Price: {priceForKg} BDT</h2>}
                            {measurement === 'Litre' && <h2>Price: {priceForLitre} BDT</h2>}
                            {measurement === 'Quantity' && <h2>Price: {priceForQuantity} BDT</h2>}
                        </div>
                        <div className="text-sm text-black font-semibold">
                            <h2>{category}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCartsCard;