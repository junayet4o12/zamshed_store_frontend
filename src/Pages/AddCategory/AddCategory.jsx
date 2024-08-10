import { useState } from "react";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import ProductImageInputField from "../../Shared/ProductImageInputField/ProductImageInputFIeld";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import selectPhoto from '../../assets/selectPhoto.png'
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useAddCategoryMutation } from "../../Redux/features/api/allBaseApi";
import { uploadImg } from "../../UploadFile/uploadImg";
const AddCategory = () => {
    const [addCategory] = useAddCategoryMutation()
    const [CategoryImagePlaceholder, setCategoryImagePlaceholder] = useState(selectPhoto)
    const [categoryFile0, setCategoryFile0] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [categoryImageError, setCategoryImageError] = useState('')
    const [CategoryLogoPlaceholder, setCategoryLogoPlaceholder] = useState(selectPhoto)
    const [categoryLogoFile0, setCategoryLogoFile0] = useState('')
    const [categoryLogo, setCategoryLogo] = useState('')
    const [categoryLogoError, setCategoryLogoError] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setCategoryImageError('');
        setCategoryLogoError('')
        const name = e.target.name.value
        if (categoryFile0 === '') {
            setCategoryImageError('Please Select a category Image')
            return
        }
        if (categoryLogoFile0 === '') {
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
                const toastId = toast.loading("Category is Adding...");
                const image = await uploadImg(categoryFile0);
                const logo = await uploadImg(categoryLogoFile0);

                const data = { name, image, logo }
                try {
                    const res = await addCategory(data).unwrap();
                    if (res?._id) {
                        toast.success("Category Added Successfully!!", { id: toastId });
                        setCategoryImageError('');
                        setCategoryLogoError('')
                        setCategoryImagePlaceholder(selectPhoto)
                        setCategoryLogoPlaceholder(selectPhoto)
                        setCategoryFile0('')
                        setCategoryImage('')
                        setCategoryLogoFile0('')
                        setCategoryLogo('')
                        e.target.name.value = ''
                        document.getElementById('addCategoryImage').value = ''
                        document.getElementById('addCategoryLogo').value = ''
                        // allProductRefetch()
                    }

                }
                catch (err) {
                    toast.error(err?.message, { id: toastId });
                }
            }

        })
    }

    const handleCategoryImage = () => {
        const image = document.getElementById('addCategoryImage')
        image?.click()
    }
    const handleCategoryLogo = () => {
        const image = document.getElementById('addCategoryLogo')
        image?.click()
    }
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`
    return (
        <div className="px-2 space-y-5 pb-10">
            <RoutesTitle />
            <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Add Category'} />
                <div className="flex flex-col gap-2">
                    <InputLabel text={'Category Name'} />
                    <input type="text" required className={`${inputStyle}`} placeholder="Name" name="name" />
                    {/* <p className="text-sm text-red-500">{productNameError}</p> */}
                </div>

                <div className="flex flex-col gap-2">

                    <InputLabel text={'Category Image'} />
                    <ProductImageInputField allImgData={{ ProductImagePlaceholder: CategoryImagePlaceholder, setProductImagePlaceholder: setCategoryImagePlaceholder, setProductImage: setCategoryImage, setProductFile0: setCategoryFile0, productFile0: categoryFile0, handleProductImage: handleCategoryImage }} id={'addCategoryImage'} />
                    <p className="text-sm text-red-500">{categoryImageError}</p>
                </div>
                <div className="flex flex-col gap-2">

                    <InputLabel text={'Category Logo'} />
                    <ProductImageInputField allImgData={{ ProductImagePlaceholder: CategoryLogoPlaceholder, setProductImagePlaceholder: setCategoryLogoPlaceholder, setProductImage: setCategoryLogo, setProductFile0: setCategoryLogoFile0, productFile0: categoryLogoFile0, handleProductImage: handleCategoryLogo }} id={'addCategoryLogo'} />
                    <p className="text-sm text-red-500">{categoryLogoError}</p>
                </div>
                <button className="transition-all duration-300 border border-primary e hover:bg-primary hover:text-white px-4 py-2.5 rounded-md font-medium">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;