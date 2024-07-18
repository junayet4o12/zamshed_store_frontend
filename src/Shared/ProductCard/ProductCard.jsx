/* eslint-disable react/prop-types */
import { IoIosHeartEmpty } from "react-icons/io";
import ButtonLight from "../Button/ButtonLight";
import { addSingleProduct } from "../../localStorage/addtoCart";
import { useState } from "react";
import AddToCartProductModal from "../AddToCartProductModal/AddToCartProductModal";
import { useSelector } from "react-redux";
import useAdmin from "../../hooks/useAdmin";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FaFire } from "react-icons/fa";

const ProductCard = ({ productDetails }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [openAddToCartModal, setOpenAddToCartModal] = useState(false)
    const { addedTime, category, name, price, productImage, _id, measurement, isHot = false } = productDetails;
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
                    {
                        isHot && <p className="flex items-center text-sm text-[#FF4500] font-extrabold">
                            HOT
                            <span className="text-base"> <FaFire /></span>
                        </p>
                    }

                </div>
                <div className="w-32 overflow-hidden mx-auto">
                    <PhotoProvider>
                        <PhotoView src={productImage}>
                            <img className="w-32 max-h-36 object-cover galleryImage transition-all duration-200 cursor-pointer" src={productImage} alt="" />
                        </PhotoView>
                    </PhotoProvider>
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
                {!isAdmin ? <div onClick={handleBuy} className="flex justify-center items-center ">
                    <ButtonLight text={'Buy'} />
                </div> : <Link to={`/dashboard/updateProduct/${name}/${_id}`}>
                    <div className="flex justify-center items-center "><ButtonLight text={'Update'} /></div>
                </Link>}
            </div>
            <AddToCartProductModal openAddToCartModal={openAddToCartModal} handleCloseModal={handleCloseModal} productDetails={productDetails} />
        </div>
    );
};

export default ProductCard;