import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetUserDataQuery } from "../Redux/features/api/allBaseApi";
import useHandleLogOut from "../Shared/useHandleLogOut";
import Loading from "../Shared/Loading/Loading";
import useAdmin from "../hooks/useAdmin";

const AdminRouts = ({ children }) => {
    const handleLogOut = useHandleLogOut()
    const { user } = useSelector(state => state.userSlice);
    const [isAdmin, isAdminLoading] = useAdmin();
    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }
    if (isAdminLoading) {
        return <Loading />
    }
    else if (!isAdmin) {
        return handleLogOut()
    }
    return children
};

export default AdminRouts;