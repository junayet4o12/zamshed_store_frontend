/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRouts = ({ children }) => {
   const {email} = useSelector(state=> state.userSlice);
   if(!email){
    return <Navigate to={'/login'}></Navigate>
   }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRouts;