/* eslint-disable react/prop-types */
import ButtonLight from "../Button/ButtonLight";
import { Link } from "react-router-dom";
import ButtonDanger from "../Button/ButtonDanger";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDeleteProductsMutation, useUpdateProductMutation } from "../../Redux/features/api/allBaseApi";
import { FaFire } from "react-icons/fa";
import useAllProductsRefetch from "../../hooks/useAllProductsRefetch";
const UpdateProductCard = ({ productDetails, refetch }) => {
    const [updateProduct] = useUpdateProductMutation()
    const { allProductRefetch } = useAllProductsRefetch()
    const [deleteProduct] = useDeleteProductsMutation();
    const { category, name, price, productImage, _id, measurement, isHot = false } = productDetails;
    const showingMeasurementText = measurement === 'Quantity' ? 'Per Piece' : measurement === 'Kilogram' ? 'Per Kg' : 'Per Litre';



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
                deleteProduct(_id).unwrap()
                    .then(res => {
                        if (res?._id) {
                            toast.success('Deleted Successfully!!');
                            refetch();
                        }

                    })
                    .catch(err => {
                        return
                    })
            }
        });
    };

    const handleToggleChange = () => {
        const toastId = toast.loading("Product status is updating...");
        updateProduct({ data: { isHot: !isHot }, id: _id }).unwrap()
            .then(res => {
                if(res?._id){
                    toast.success("Product status Updated Successfully!!", { id: toastId });
                    refetch()
                    allProductRefetch()
                }
                
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    };

    return (
        <div className="p-3 rounded-lg border border-gray-600 text-gray-600 w-[280px] space-y-3 min-h-full flex flex-col justify-between galleryParent">
            <div className="space-y-3">
                <div className="flex items-center justify-between ">
                    <h2 className="text-sm font-medium ">{name}</h2>
                    <div className="form-control">
                        <div className="flex items-center gap-2">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-error toggle-sm"
                                    checked={isHot}
                                    onChange={handleToggleChange}
                                />
                            </label>
                            <span className={`text-xl ${isHot ? 'text-[#FF4500] ' : 'text-gray-600'}`}><FaFire /></span>
                        </div>
                    </div>
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
                    <Link to={`/dashboard/updateProduct/${name}/${_id}`}>
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
