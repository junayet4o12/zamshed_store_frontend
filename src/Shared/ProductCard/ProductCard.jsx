/* eslint-disable react/prop-types */
import { IoIosHeartEmpty } from "react-icons/io";
import ButtonLight from "../Button/ButtonLight";
import { addSingleProduct } from "../../localStorage/addtoCart";
import { useState } from "react";
import AddToCartProductModal from "../AddToCartProductModal/AddToCartProductModal";

const ProductCard = ({ productDetails }) => {
    const [openAddToCartModal, setOpenAddToCartModal] = useState(false)
    const { addedTime, category, name, price, productImage, _id, measurement } = productDetails
    const showingMeasurementText = measurement === 'Quantity' ? 'Per Peace' : measurement === 'Kilogram' ? 'Per Kg' : 'Per Litre'
    const handleBuy = () => {
        setOpenAddToCartModal(true)
    }
    const handleCloseModal = () => {
        setOpenAddToCartModal(false)
    }
    return (
        <div className="p-3 rounded-lg border border-gray-600 text-gray-600 w-[250px] space-y-3 min-h-full flex flex-col justify-between galleryParent">
            <div className="space-y-3">
                <div className="flex items-center justify-between ">
                    <h2 className="text-sm font-medium ">{name}</h2>
                    <button className='w-7 h-7  justify-center items-center  text-xl rounded-full hidden xs:flex'><IoIosHeartEmpty /></button>
                </div>
                <div className="w-32 overflow-hidden mx-auto">
                    <img className="w-full h-full object-cover galleryImage transition-all duration-200" src={productImage} alt="" />
                </div>
            </div>
            <div className="flex justify-between flex-col gap-3">
                <div className="space-y-3">
                    <div className="text-black font-semibold">
                        <h2>Price ({showingMeasurementText}): {price} BDT</h2>
                    </div>
                    <div className="text-sm text-black font-semibold">
                        <h2>{category}</h2>
                    </div>
                </div>
                <div onClick={handleBuy} className="flex justify-center items-center ">
                    <ButtonLight text={'Buy'} />
                </div>
            </div>
            <AddToCartProductModal openAddToCartModal={openAddToCartModal} handleCloseModal={handleCloseModal} productDetails={productDetails} />
        </div>
    );
};

export default ProductCard;