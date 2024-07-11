// import React from 'react';

import { useState } from "react";
// import UpdateProfileModal from "./UpdateProfileModal";
import { useSelector } from "react-redux";
import { useGetUserDataQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import UpdateProfileModal from "./UpdateProfileModal";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import userImg from '../../assets/user.png'
import { PhotoProvider, PhotoView } from "react-photo-view";
const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(state => state.userSlice);
    const { data: userProfile, isLoading, refetch } = useGetUserDataQuery(user.email)
    if (isLoading) {
        return <Loading />
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const profileDataStyle = 'inner-border pb-1 transition-all duration-300'
    return (
        <div className="px-5">

            <div className="bg-primary/10 w-full max-w-[750px] m-4 px-4 py-4 rounded-sm relative mx-auto rounded-tl-[60px] rounded-br-[60px] rounded-tr-[10px] rounded-bl-[10px]">

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-5">
                    <div className="sm:col-span-2">
                        <h2 className="text-lg font-bold text-center">
                            My Profile
                        </h2>
                    </div>

                    <div className="sm:col-span-2">
                        <div className="size-32  sm:size-40 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[40px] rounded-bl-[40px] border-2 border-white bg-primary/10 border-double flex justify-center items-center text-2xl  overflow-hidden relative">
                            <PhotoProvider>
                                <PhotoView src={user?.photoURL || userImg}>
                                    <img className='object-cover size-32  sm:size-40 cursor-pointer' src={user?.photoURL || userImg} />
                                </PhotoView>
                            </PhotoProvider>


                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <InputLabel text={'My Name'} />
                        <p className={`${profileDataStyle}`}>{userProfile?.name}</p>
                    </div>
                    <div className="w-full space-y-2">
                        <InputLabel text={'My Email'} />
                        <p className={`${profileDataStyle} break-words`}>{userProfile?.email}</p>
                    </div>
                    <div className="w-full space-y-2">
                        <InputLabel text={'My Contact Number'} />
                        <p className={`${profileDataStyle}`}>{userProfile?.contactNumber || 'Not Updated'}</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={handleOpen} ><ButtonStrong text={'Update Profile'} /></button>
                    </div>

                </div>
                <UpdateProfileModal open={open} handleClose={handleClose} profile={userProfile} refetch={refetch} />
                {/* <div className="absolute top-0 left-0 w-full -z-10 border border-primary border-double">
                    
                </div> */}
            </div>
        </div>
    );
};

export default Profile;