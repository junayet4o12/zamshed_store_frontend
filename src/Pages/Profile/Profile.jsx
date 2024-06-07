// import React from 'react';

import { useState } from "react";
// import UpdateProfileModal from "./UpdateProfileModal";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useSelector } from "react-redux";
import { useGetUserDataQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import UpdateProfileModal from "./UpdateProfileModal";
const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(state => state.userSlice);
    console.log(user.email);
    const {data: userProfile, isLoading, refetch} = useGetUserDataQuery(user.email)
    if (isLoading) {
        return <Loading />
    }
    console.log(userProfile);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const profileDataStyle = 'inner-border pb-1 transition-all duration-300'
    const profileDataLabelStyle = "text-[12.5px] text-gray-600"
    return (
        <p className="px-5">

            <div className="bg-gray-200 w-full max-w-[750px] m-4 px-4 py-4 rounded-sm relative mx-auto rounded-tl-[60px] rounded-br-[60px] rounded-tr-[10px] rounded-bl-[10px]">

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                    <div className="sm:col-span-2">
                        <h2 className="text-lg font-bold text-center">
                            My Profile
                        </h2>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="size-32  sm:size-40 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[40px] rounded-bl-[40px] border-2 border-white bg-primary/10 border-double flex justify-center items-center text-2xl  overflow-hidden relative">
                            <PhotoProvider>
                                <PhotoView src={user?.photoURL}>
                                    <img className='object-cover size-32  sm:size-40 cursor-pointer' src={user?.photoURL} />
                                </PhotoView>
                            </PhotoProvider>


                        </div>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Name</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.name}</p>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Email</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.email}</p>
                    </div>
                    <div className="w-full">
                        <label className={`${profileDataLabelStyle}`}>My Contact Number</label>
                        <p className={`${profileDataStyle}`}>{userProfile?.contactNumber || 'Not Updated'}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={handleOpen} className="transition-all duration-300 bg-primary/80 px-5 py-2.5 rounded-sm font-bold  hover:bg-primary  active:scale-90 text-white text-sm">Update Profile</button>
                    </div>

                </div>
                <UpdateProfileModal open={open} handleClose={handleClose} profile={userProfile} refetch={refetch} />
                {/* <div className="absolute top-0 left-0 w-full -z-10 border border-primary border-double">
                    
                </div> */}
            </div>
        </p>
    );
};

export default Profile;