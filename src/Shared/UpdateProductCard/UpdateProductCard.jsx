/* eslint-disable react/prop-types */
import { IoIosHeartEmpty } from "react-icons/io";
import ButtonLight from "../Button/ButtonLight";
import { Link } from "react-router-dom";
import ButtonDanger from "../Button/ButtonDanger";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useDeleteProductsMutation } from "../../Redux/features/api/allBaseApi";
import { useDispatch } from "react-redux";
import { restoreAddToCartData } from "../../Redux/features/productsInCartSlice/productsInCartSlice";
import { useEffect } from "react";

const UpdateProductCard = ({ productDetails, refetch }) => {
    const dispatch = useDispatch()
    const [deleteProduct, { data }] = useDeleteProductsMutation()
    const { addedTime, category, name, price, productImage, _id, measurement } = productDetails
    const showingMeasurementText = measurement === 'Quantity' ? 'Per Peace' : measurement === 'Kilogram' ? 'Per Kg' : 'Per Litre'

    useEffect(() => {
        if (data) {
            toast.success('Deleted Successfully!!')
            refetch()
        }
    }, [data])
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(_id)


            }
        });
    }
    return (
        <div className="p-3 rounded-lg border border-gray-600 text-gray-600 w-[280px] space-y-3 min-h-full flex flex-col justify-between galleryParent">
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
                <div className="flex justify-center items-center gap-4">
                    <Link to={`/updateProduct/${name}/${_id}`}>
                        <ButtonLight text={'Update'} />
                    </Link>

                    <button onClick={handleDelete}>
                        <ButtonDanger text={'Delete'} />
                    </button>

                </div>
            </div>

        </div>
    );
};

export default UpdateProductCard;