/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRouts = ({ children }) => {
   const {user} = useSelector(state=> state.userSlice);
   if(!user){
    return <Navigate to={'/login'}></Navigate>
   }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRouts;