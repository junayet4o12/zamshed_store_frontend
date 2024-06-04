/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import { removeSingleProduct } from "../../localStorage/addtoCart";
import { restoreAddToCartData } from "../../Redux/features/productsInCartSlice/productsInCartSlice";


const MyCartsCard = ({ data }) => {
    const dispatch = useDispatch()
    const { id, unitValue, unitType, addedTime: localStorageAddedTime } = data[0] || {};
    const productData = data[1] || {};
    const { name, productImage, price, category, addedTime, measurement, _id } = productData

    const priceForKg = measurement === 'Kilogram' ? unitType === 'Kg' ? unitValue * price : unitValue * price / 1000 : ''
    const priceForQuantity = measurement === 'Quantity' ? unitValue * price : ''
    const priceForLitre = measurement === 'Litre' ? unitType === 'Litre' ? unitValue * price : unitValue * price / 1000 : ''
    const realPrice = measurement === 'Kilogram' ? priceForKg : measurement === 'Quantity' ? priceForQuantity : priceForLitre
    const handleRemove = () => {
        removeSingleProduct({ id, unitValue, unitType, addedTime: localStorageAddedTime })
        dispatch(restoreAddToCartData())
    }
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
                            <h2>Price: {realPrice} BDT</h2>

                        </div>
                        <div className="text-sm text-black font-semibold">
                            <h2>{category}</h2>
                        </div>
                        <div className="flex items-center justify-center">
                            <button onClick={handleRemove}><ButtonDanger text={'Remove'} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCartsCard;