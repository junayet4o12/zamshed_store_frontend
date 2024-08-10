/* eslint-disable react/prop-types */
import Title from "../../Shared/Title/Title";

import { TbMenuDeep } from "react-icons/tb";

import { FaChevronDown } from "react-icons/fa6";

import { useState } from "react";
import { measurements } from "../../Shared/productMeasurement/measurements";
import ProductImageInputField from "../../Shared/ProductImageInputField/ProductImageInputFIeld";
import selectPhoto from '../../assets/selectPhoto.png'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAllProductsRefetch from "../../hooks/useAllProductsRefetch";
import { useUpdateProductMutation } from "../../Redux/features/api/allBaseApi";
import useProductsCategoriesArray from "../../hooks/useProductsCategoriesArray";
const UpdateProductForm = ({ productData, refetch }) => {
    const {categories=[]} = useProductsCategoriesArray()
    const [updateProduct, all] = useUpdateProductMutation()
    const navigate = useNavigate()
    const { allProductRefetch } = useAllProductsRefetch()
    const { name, productImage: incomingProductImage, price, category, addedTime, measurement, _id } = productData
    const axiosPublic = useAxiosPublic()
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const [showCategory, setShowCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(category || 'Select Categories')
    const [showMeasurementType, setShowCMeasurementType] = useState(false)
    const [selectedMeasurementType, setSelectedMeasurementType] = useState(measurement || 'Select Measurement')
    const [ProductImagePlaceholder, setProductImagePlaceholder] = useState(incomingProductImage || selectPhoto)
    const [productFile0, setProductFile0] = useState('')
    const [ProductImage, setProductImage] = useState('')
    const [productNameError, setProductNameError] = useState('')
    const [productImageError, setProductImageError] = useState('')
    const [categoryError, setCategoryError] = useState('')
    const [measurementError, setMeasurementError] = useState('')
    const [priceError, setPriceError] = useState('');

    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`
    const labelMaker = (text) => {
        return <label>{text} <span className="text-red-500 font-bold">*</span></label>
    }
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
        const image = document.getElementById('updateProduct')
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
        const productImage0 = productFile0 || ProductImagePlaceholder
        const category = selectedCategory
        const measurement = selectedMeasurementType
        const price = e.target.price.value;
        const isHaveImage = ProductImagePlaceholder ? true : false
        if (name === '' || isHaveImage === false || category === 'Select Categories' || measurement === 'Select Measurement' || price === '') {
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
            title: "Are you sure to Update this this?",
            text: " The product will be presented to clients. You can also modify or remove the product later. ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1b8057",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update Product"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Product is Updating...");
                const image = { image: productImage0 }
                let productImage = '';
                if (productImage0 === incomingProductImage) {
                    productImage = productImage0
                } else {
                    const res = await axios.post(imgHostingApi, image, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                    try {
                        productImage = res?.data?.data?.display_url

                    }
                    catch (err) {
                        toast.error(err?.message, { id: toastId });
                        return
                    }
                }
                const productData = { name, productImage, category, measurement, price }
                updateProduct({ data: productData, id: _id })
                .then(res => {
                    toast.success("Product Updated Successfully!!", { id: toastId });
                    refetch()
                    allProductRefetch()
                    navigate('/dashboard/manageProducts')


                })
                .catch(err => {
                    toast.error(err?.message, { id: toastId });
                })  
            }
        });


    }
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-[600px] mx-auto space-y-5">
            <Title text={<span>Update the info of <span>{`"${name}"`}</span></span>} />
            <div className="flex flex-col gap-2">
                {labelMaker('Product Name')}
                <input defaultValue={name} type="text" className={`${inputStyle}`} placeholder="Name" name="name" />
                <p className="text-sm text-red-500">{productNameError}</p>
            </div>
            <div className="flex flex-col gap-2">
                {labelMaker('Product Image')}
                <ProductImageInputField allImgData={{ ProductImagePlaceholder, setProductImagePlaceholder, setProductImage, setProductFile0, productFile0, handleProductImage }} id={'updateProduct'} />
                <p className="text-sm text-red-500">{productImageError}</p>
            </div>
            <div onClick={handleShowCategory} className="flex flex-col gap-2">
                {labelMaker('Product Category')}
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
                {labelMaker('Select Measurement')}
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
                {labelMaker('Price (BDT)')}
                <input defaultValue={price} type="number" className={`${inputStyle}`} placeholder="Price" name="price" step="0.1" />
                <p className="text-sm text-red-500">{priceError}</p>
            </div>

            <button className="transition-all duration-300 border border-primary e hover:bg-primary hover:text-white px-4 py-2.5 rounded-md font-medium">Update Product</button>
        </form>
    );
};

export default UpdateProductForm;