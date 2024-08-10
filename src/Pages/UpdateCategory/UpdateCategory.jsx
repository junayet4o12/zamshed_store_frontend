import { useNavigate, useParams } from "react-router-dom";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import { useGetCategoryQuery, useGetSingleCategoryQuery, useUpdateCategoryMutation } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import { useEffect, useState } from "react";
import Title from "../../Shared/Title/Title";
import selectPhoto from '../../assets/selectPhoto.png'
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import ProductImageInputField from "../../Shared/ProductImageInputField/ProductImageInputFIeld";
import { hostImage } from "../../hostImage";
const UpdateCategory = () => {
    const navigate = useNavigate()
    const [CategoryImagePlaceholder, setCategoryImagePlaceholder] = useState(selectPhoto)
    const [categoryFile0, setCategoryFile0] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [categoryImageError, setCategoryImageError] = useState('')
    const [CategoryLogoPlaceholder, setCategoryLogoPlaceholder] = useState(selectPhoto)
    const [categoryLogoFile0, setCategoryLogoFile0] = useState('')
    const [categoryLogo, setCategoryLogo] = useState('')
    const [categoryLogoError, setCategoryLogoError] = useState('')
    const { name, id } = useParams();
    const { data: category = {}, isLoading, refetch } = useGetSingleCategoryQuery(id)
    const [updateCategory] = useUpdateCategoryMutation()
    useEffect(() => {
        if (category?.image) {
            setCategoryImagePlaceholder(category?.image)
        }
        if (category?.logo) {
            setCategoryLogoPlaceholder(category?.logo)
        }
    }, [category])
    if (isLoading) {
        return <Loading />
    }


    const handleCategoryImage = () => {
        const image = document.getElementById('updateCategoryImage')
        image?.click()
    }
    const handleCategoryLogo = () => {
        const image = document.getElementById('updateCategoryLogo')
        image?.click()
    }
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`


    const handleSubmit = async (e) => {

        e.preventDefault()
        setCategoryImageError('');
        setCategoryLogoError('')
        const name = e.target.name.value
        const categoryPhoto = categoryFile0 || CategoryImagePlaceholder
        const categoryLogoPhoto = categoryLogoFile0 || CategoryLogoPlaceholder
        if (!categoryPhoto) {
            setCategoryImageError('Please Select a category Image')
            return
        }
        if (!categoryLogoPhoto) {
            setCategoryLogoError('Please Select a category Logo')
            return
        }

        Swal.fire({
            title: "Are you sure to add this?",
            text: " The Category will be presented to clients. You can also modify or remove the product later. ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add Category"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Category is updating...");
                let image = '';
                let logo = ''
                if (categoryPhoto === category?.image) {
                    image = category?.image
                } else {
                    image = await hostImage(categoryPhoto);
                }
                if (categoryLogoPhoto === category?.logo) {
                    logo = category?.logo
                } else {
                    logo = await hostImage(categoryLogoPhoto);
                }


                const data = { name, image, logo };

                updateCategory({ data, id })
                    .then(res => {
                        toast.success("Category Updated Successfully!!", { id: toastId });
                        refetch()
                        navigate('/dashboard/manageCategory')


                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                    })
            }

        })
    }
    return (
        <div className="px-2 space-y-5 pb-10">
            <RoutesTitle removeLastElement={true} productName={name} />
            <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Add Category'} />
                <div className="flex flex-col gap-2">
                    <InputLabel text={'Category Name'} />
                    <input type="text" required defaultValue={category?.name} className={`${inputStyle}`} placeholder="Name" name="name" />
                    {/* <p className="text-sm text-red-500">{productNameError}</p> */}
                </div>

                <div className="flex flex-col gap-2">

                    <InputLabel text={'Category Image'} />
                    <ProductImageInputField allImgData={{ ProductImagePlaceholder: CategoryImagePlaceholder, setProductImagePlaceholder: setCategoryImagePlaceholder, setProductImage: setCategoryImage, setProductFile0: setCategoryFile0, productFile0: categoryFile0, handleProductImage: handleCategoryImage }} id={'updateCategoryImage'} />
                    <p className="text-sm text-red-500">{categoryImageError}</p>
                </div>
                <div className="flex flex-col gap-2">

                    <InputLabel text={'Category Logo'} />
                    <ProductImageInputField allImgData={{ ProductImagePlaceholder: CategoryLogoPlaceholder, setProductImagePlaceholder: setCategoryLogoPlaceholder, setProductImage: setCategoryLogo, setProductFile0: setCategoryLogoFile0, productFile0: categoryLogoFile0, handleProductImage: handleCategoryLogo }} id={'updateCategoryLogo'} />
                    <p className="text-sm text-red-500">{categoryLogoError}</p>
                </div>
                <button className="transition-all duration-300 border border-primary e hover:bg-primary hover:text-white px-4 py-2.5 rounded-md font-medium">Update Category</button>
            </form>
        </div>
    );
};

export default UpdateCategory;