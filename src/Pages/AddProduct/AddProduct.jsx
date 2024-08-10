import Title from "../../Shared/Title/Title";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";

import { TbMenuDeep } from "react-icons/tb";

import { FaChevronDown } from "react-icons/fa6";

import { useState } from "react";
import { measurements } from "../../Shared/productMeasurement/measurements";
import ProductImageInputField from "../../Shared/ProductImageInputField/ProductImageInputFIeld";
import selectPhoto from '../../assets/selectPhoto.png'
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAddProductMutation } from "../../Redux/features/api/allBaseApi";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import useProductsCategoriesArray from "../../hooks/useProductsCategoriesArray";
import { uploadImg } from "../../UploadFile/uploadImg";
const AddProduct = () => {
    const { categories } = useProductsCategoriesArray()
    const [addProduct] = useAddProductMutation()
   
    const [showCategory, setShowCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('Select Categories')
    const [showMeasurementType, setShowCMeasurementType] = useState(false)
    const [selectedMeasurementType, setSelectedMeasurementType] = useState('Select Measurement')
    const [ProductImagePlaceholder, setProductImagePlaceholder] = useState(selectPhoto)
    const [productFile0, setProductFile0] = useState('')
    const [ProductImage, setProductImage] = useState('')
    const [productNameError, setProductNameError] = useState('')
    const [productImageError, setProductImageError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [measurementError, setMeasurementError] = useState('')
    const [priceError, setPriceError] = useState('');

    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`
    const handleShowCategory = () => {
        setShowCMeasurementType(false)
        setShowCategory(!showCategory)
    }
    const handleCategory = (category) => {

        setSelectedCategory(category)
    }

    const handleShowMeasurement = () => {
        setShowCategory(false)
        setShowCMeasurementType(!showMeasurementType)
    }
    const handleMeasurement = (measurement) => {
        setSelectedMeasurementType(measurement)
    }
    const handleProductImage = () => {
        const image = document.getElementById('addProduct')
        image?.click()
        // imageInput.current.click()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProductNameError('')
        setProductImageError('')
        setCategoryError('')
        setMeasurementError('')
        setPriceError('')
        const name = e.target.name.value
        const productImage0 = productFile0
        const category = selectedCategory
        const measurement = selectedMeasurementType
        const price = e.target.price.value;
        const addedTime = new Date().getTime()
        if (name === '' || productImage0 === '' || category === 'Select Categories' || measurement === 'Select Measurement' || price === '') {
            if (name === '') {
                setProductNameError('Please Give a Product Name')
            }
            if (productImage0 === '') {
                setProductImageError('Please Select a product Image')
            }
            if (category === 'Select Categories') {
                setCategoryError('Please Select a category')
            }
            if (measurement === 'Select Measurement') {
                setMeasurementError('Please Select a measurement type')
            }
            if (price === '') {
                setPriceError('Please give a price')
            }
            return
        }
        Swal.fire({
            title: "Are you sure to add this?",
            text: " The product will be presented to clients. You can also modify or remove the product later. ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add Product"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Product is Adding...");
                let productImage = await uploadImg(productImage0)
                const productData = { name, productImage, category, measurement, price, addedTime }
                try {
                    const res = await addProduct(productData).unwrap();
                    if (res?._id) {
                        toast.success("Product Added Successfully!!", { id: toastId });
                        setSelectedCategory('Select Categories')
                        setSelectedMeasurementType('Select Measurement')
                        setProductImagePlaceholder(selectPhoto)
                        setProductFile0('')
                        setProductImage('')
                        e.target.name.value = ''
                        e.target.price.value = ''
                        document.getElementById('addProduct').value = ''
                        // allProductRefetch()
                    }

                }
                catch (err) {
                    toast.error(err?.message, { id: toastId });
                }



            }
        });
    }
    return (
        <div className="px-2 space-y-5 pb-10">
            <RoutesTitle />

            <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Add Product'} />
                <div className="flex flex-col gap-2">
                    <InputLabel text={'Product Name'} />
                    <input type="text" className={`${inputStyle}`} placeholder="Name" name="name" />
                    <p className="text-sm text-red-500">{productNameError}</p>
                </div>
                <div className="flex flex-col gap-2">

                    <InputLabel text={'Product Image'} />
                    <ProductImageInputField allImgData={{ ProductImagePlaceholder, setProductImagePlaceholder, setProductImage, setProductFile0, productFile0, handleProductImage }} id={'addProduct'} />
                    <p className="text-sm text-red-500">{productImageError}</p>
                </div>
                <div onClick={handleShowCategory} className="flex flex-col gap-2">

                    <InputLabel text={'Product Category'} />
                    <div className='h-[48px] border border-gray-500 hover:border-primary rounded-md p-2 px-5 flex gap-3 items-center justify-between cursor-pointer relative'>
                        <div className='flex items-center gap-3 '>
                            <p className='text-2xl rotate-180 -scale-y-100 scale-x-[1.3] w-max text-primary'><TbMenuDeep /></p>
                            <p className='text-sm font-semibold'>{selectedCategory}</p>
                        </div>
                        <p className={`transition-all duration-300 ${showCategory ? 'rotate-180' : 'rotate-0'}`}><FaChevronDown /></p>
                        <div className={`origin-top transition-all duration-300 w-full mt-[48px] bg-white shadow-2xl pt-2 flex flex-col absolute top-0 left-0 ${showCategory ? 'scale-y-100' : 'scale-y-0'} z-10`}>
                            {
                                categories?.map((category, idx) => <div onClick={() => handleCategory(category?.value)} key={idx} className="flex items-center gap-3 h-10 border-b border-gray-500 px-3 text-sm font-medium hover:bg-primary/10"><span className="text-2xl">{category?.icon}</span> <span>{category?.value}</span></div>)
                            }
                        </div>
                    </div>
                    <p className="text-sm text-red-500">{categoryError}</p>
                </div>
                <div onClick={handleShowMeasurement} className="flex flex-col gap-2 ">

                    <InputLabel text={'Select Measurement'} />
                    <div className='h-[48px] border border-gray-500 hover:border-primary rounded-md p-2 px-5 flex gap-3 items-center justify-between cursor-pointer relative bg-white'>
                        <div className='flex items-center gap-3 '>
                            <p className='text-2xl rotate-180 -scale-y-100 scale-x-[1.3] w-max text-primary'><TbMenuDeep /></p>
                            <p className='text-sm font-semibold'>{selectedMeasurementType}</p>
                        </div>
                        <p className={`transition-all duration-300 ${showMeasurementType ? 'rotate-180' : 'rotate-0'}`}><FaChevronDown /></p>
                        <div className={`origin-top transition-all duration-300 w-full mt-[48px] bg-white shadow-2xl pt-2 flex flex-col absolute top-0 left-0 ${showMeasurementType ? 'scale-y-100' : 'scale-y-0'}`}>
                            {
                                measurements?.map((measurement, idx) => <div onClick={() => handleMeasurement(measurement?.value)} key={idx} className="flex items-center gap-3 h-10 border-b border-gray-500 px-3 text-sm font-medium hover:bg-primary/10"><span className="text-2xl">{measurement?.icon}</span> <span>{measurement?.value}</span></div>)
                            }
                        </div>
                    </div>
                    <p className="text-sm text-red-500">{measurementError}</p>
                </div>
                <div className="flex flex-col gap-2">

                    <InputLabel text={'Price (BDT)'} />
                    <input type="number" className={`${inputStyle}`} placeholder="Price" name="price" />
                    <p className="text-sm text-red-500">{priceError}</p>
                </div>

                <button className="transition-all duration-300 border border-primary e hover:bg-primary hover:text-white px-4 py-2.5 rounded-md font-medium">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;