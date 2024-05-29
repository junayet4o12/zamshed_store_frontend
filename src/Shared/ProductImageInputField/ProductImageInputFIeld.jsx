/* eslint-disable react/prop-types */
// import React from 'react';

import { useRef, useState } from "react";

const ProductImageInputField = ({ allImgData }) => {
    const [imageInputValue, setImageInputValue] = useState('')
    const imageInput = useRef(null)
    const { ProductImagePlaceholder, setProductImagePlaceholder, setProductImage, productFile0, setProductFile0, handleProductImage } = allImgData


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            document.getElementById('image').files = imageInputValue
            return
        }
        setImageInputValue(document.getElementById('image').files)
        const reader = new FileReader();
        reader.onload = (event) => {
            // setPhotoError('')
            setProductImagePlaceholder(event.target.result);
            setProductFile0(file)
        };
        setProductImage(reader.readAsDataURL(file))
        // reader.readAsDataURL(file);
    };
    return (

        <div>
            <div className='flex flex-wrap gap-10 items-center'>
                <div className="size-28 sm:size-36 rounded-md border border-primary bg-primary/10 flex justify-center items-center text-2xl text-gray-500 overflow-hidden relative">
                    <img className='object-cover w-full h-full' src={ProductImagePlaceholder} alt={ProductImagePlaceholder} />

                    <div className="-z-10 absolute top-0 left-0 hidden">
                        <input
                            id="image"
                            ref={imageInput}
                            onChange={handleFileChange}
                            // required
                            type="file"
                            accept="image/jpeg, image/png"
                            placeholder="Image" />
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <p
                        onClick={handleProductImage}
                        className='btn flex justify-center items-center px-7 font-bold border border-primary hover:border-primary hover:bg-primary/10   rounded-md w-max cursor-pointer'>Choose Image
                    </p>
                </div>

            </div>
        </div>


    );
};

export default ProductImageInputField;