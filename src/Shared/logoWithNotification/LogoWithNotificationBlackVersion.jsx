/* eslint-disable react/prop-types */
import React from 'react';

const LogoWithNotificationBlackVersion = ({Logo,notification,userLogo }) => {
    return (
        <p className=" text-black w-max p-1 text-2xl relative cursor-pointer">
            <Logo />
            {!userLogo && <span className="text-sm absolute -top-0.5 -left-0.5 bg-secondary flex justify-center items-center size-[18px] rounded-full text-black">{notification}</span>}

        </p>
    );
};

export default LogoWithNotificationBlackVersion;