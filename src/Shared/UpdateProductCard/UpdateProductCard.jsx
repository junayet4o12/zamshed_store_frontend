/* eslint-disable react/prop-types */
import { IoIosHeartEmpty } from "react-icons/io";
import ButtonLight from "../Button/ButtonLight";
import { Link } from "react-router-dom";

const UpdateProductCard = ({ productDetails }) => {
    const { addedTime, category, name, price, productImage, _id } = productDetails
    return (
        <div className="p-3 rounded-lg border border-gray-600 text-gray-600 w-[200px] space-y-3 min-h-full flex flex-col justify-between galleryParent">
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
                        <h2>Price: {price} BDT</h2>
                    </div>
                    <div className="text-sm text-black font-semibold">
                        <h2>{category}</h2>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Link to={`/updateProduct/${name}/${_id}`}>
                        <ButtonLight text={'Update'} />
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default UpdateProductCard;