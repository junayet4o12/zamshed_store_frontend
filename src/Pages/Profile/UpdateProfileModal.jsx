/* eslint-disable react/prop-types */
// import React from 'react';

import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog } from "@material-tailwind/react";
import auth from "../../../firebase/firebase.config";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import { inputStyle } from "../../Shared/inputStyle";
import ButtonLight from "../../Shared/Button/ButtonLight";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import ButtonStrong from "../../Shared/Button/ButtonStrong";



const UpdateProfileModal = ({ handleClose, open, profile, refetch }) => {
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm()
    const [ProfilePhotoPlaceholder, setProfilePhotoPlaceholder] = useState(profile?.profilePhoto)
    const [showDefaultImg, setShowDefaultImg] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState('')
    const [profileFile0, setProfileFile0] = useState('')
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfilePhotoPlaceholder(event.target.result);
            setProfileFile0(file)
        };
        setProfilePhoto(reader.readAsDataURL(file))
        // reader.readAsDataURL(file);
    };
    const handleFormBg = () => {
        const image = document.getElementById('image2')
        image?.click()
        // imageInput.current.click()
    }
    const handleDefaultImg = (img) => {
        setProfilePhotoPlaceholder(img)

    }
    const onSubmit = async (data) => {
        let imageUrl = profile?.image
        const toastId = toast.loading("Updating...");
        if (ProfilePhotoPlaceholder === profile?.image) {
            imageUrl = profile?.image
        } else {
            const image = { image: profileFile0 }

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            try {
                imageUrl = res?.data?.data?.display_url
            }
            catch (err) {
                toast.error(err?.message, { id: toastId });
            }
        }
        const name = data?.name;
        const image = imageUrl
        const email = profile?.email;
        const contactNumber = data?.contactNumber;
        const age = parseInt(data?.age);
        const country = data?.country;

        const profileData = {
            name,
            contactNumber,
            age,
            country,
            image
        }
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageUrl

        })
            .then(() => {
                // axiosSecure.put(`/updateUserData/${profile?._id}`, profileData)
                //     .then(res => {
                //         if (res.status == 200) {
                //             toast.success("Profile Updated Successfully!!", { id: toastId });
                //             Swal.fire({
                //                 icon: "success",
                //                 title: "Profile Updated Successfully",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //             refetch()
                //             handleClose()
                //         }
                //     })
                //     .catch(err => {
                //         toast.error(err?.message, { id: toastId });
                //     })

            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })

    }
    const inputFieldStyle = `w-full p-3 px-10 rounded-sm bg-black/20 block text-white border border-primary`
    return (
        <Dialog
            size="md" open={open} handler={handleClose} className="flex justify-center items-center"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full h-[70vh] sm:h-max overflow-y-scroll sm:overflow-visible m-4  px-4 py-4 rounded-sm scrollable-div2 relative z-10">

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                    <h6 className="text-center font-bold">
                        Update Your Profile
                    </h6>

                    <div className="sm:col-span-2">
                        <div className="w-full z-10 space-y-2">
                            <InputLabel text={'Change your profile pic'} />
                            <div className="">

                                <div className='flex gap-5 items-center'>
                                    <div className="ml-[-10px] size-28 sm:size-32  rounded-tl-[50px] rounded-br-[50px] rounded-tr-[30px] rounded-bl-[30px] border-2 border-white bg-primary/10 border-double flex justify-center items-center text-2xl text-gray-500 overflow-hidden relative">
                                        <img className='object-cover size-28 sm:size-32 z-10' src={ProfilePhotoPlaceholder} alt={ProfilePhotoPlaceholder} />

                                        <div className="w-full h-full -z-10 border-2 border-black absolute top-0 left-0 hidden">

                                            <input
                                                id="image2"
                                                onChange={handleFileChange}
                                                className={`${inputFieldStyle}`}
                                                // required
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                placeholder="Image" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-5'>
                                        <div
                                            onClick={handleFormBg}>
                                            <ButtonLight text={'Choose image'} />
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="space-y-2">
                        <InputLabel text={'Your Name'} />
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            defaultValue={profile?.name}
                            className={`${inputStyle}`}

                        />
                        {errors.name && <span className='text-red-500 text-sm font-bold'>Name is required</span>}
                    </div>
                    <div className="space-y-2">
                        <InputLabel text={'Your Email'} />
                        <input
                            required
                            disabled
                            defaultValue={profile?.email}
                            className={`${inputStyle}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <InputLabel text={'Your Contact Number'} />
                        <input
                            placeholder="Contact Number"
                            {...register("contactNumber", {
                                required: true,
                                minLength: 11,
                                maxLength: 11
                            })}
                            type="number"
                            defaultValue={profile?.contactNumber}
                            className={`${inputStyle}`}
                        />
                        {errors?.contactNumber?.type === 'minLength' && <span className='text-red-500 text-sm font-bold'>Contact number must be 11 characters</span>}
                        {errors?.contactNumber?.type === 'maxLength' && <span className='text-red-500 text-sm font-bold'>Contact number must be 11 characters</span>}
                    </div>
                    <div className="text-center flex  items-end gap-5">
                        <button ><ButtonStrong text={'Update'} /></button>
                        <button onClick={() => {
                            setProfilePhotoPlaceholder(profile?.image)
                            handleClose()
                        }} ><ButtonDanger text={'Cancel'} /></button>
                    </div>
                </div>

                {/* <div className="absolute top-0 left-0 w-full -z-10 border border-primary border-double">
                    
                </div> */}
            </form>

        </Dialog>

    );
};

export default UpdateProfileModal;