import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import ButtonLight from "../../Shared/Button/ButtonLight";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import { FaEdit } from "react-icons/fa";
import { RiChatDeleteLine } from "react-icons/ri";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
const ManageCategory = () => {
    const [deleteCategory] = useDeleteCategoryMutation();
    const { data: allCategory, isLoading, isError, error, refetch } = useGetCategoryQuery()
    if (isLoading) {
        return <Loading />
    }
    const handleDelete = (id) => {
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
                const toastId = toast.loading("Category is deleting...");
                deleteCategory(id).unwrap()
                    .then(res => {
                        if (res?._id) {
                            toast.success("Category deleted successfully!!", { id: toastId });
                        }

                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                    })
            }
        });
    };

    return (
        <div className="px-2 space-y-5 pb-10">
            <RoutesTitle />

            <div className="flex flex-wrap gap-7 justify-center">
                <Link to={'/dashboard/addCategory'}>
                    <div className="p-3 rounded-lg border border-gray-600 text-primary w-[180px] space-y-3 min-h-full flex flex-col justify-center items-center galleryParent cursor-pointer py-14">
                        <span className="flex flex-col text-center galleryImage transition-all duration-200">
                            <span className="text-7xl">+</span>
                            Add Product
                        </span>
                    </div>
                </Link>
                {
                    allCategory?.map(product => <div key={product?._id} className="p-3 rounded-lg border border-gray-600 text-gray-600 w-[180px] space-y-3 min-h-full flex flex-col justify-between items-center">
                        <div className="flex justify-center items-center gap-4 w-full">
                            <Link to={`/dashboard/updateCategory/${product?.name}/${product?._id}`}>
                                <ButtonLight text={<FaEdit />} />
                            </Link>

                            <button onClick={() => handleDelete(product?._id)} className="">
                                <ButtonDanger text={<RiChatDeleteLine />} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center w-full gap-2">
                            <img className="size-10 object-cover" src={product?.logo} alt="" />
                            <p>{product?.name}</p>
                        </div>
                        <img className="size-24 object-cover" src={product?.image} alt="" />

                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageCategory;