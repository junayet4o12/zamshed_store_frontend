import { useSelector } from "react-redux";
import { useGetAdminQuery } from "../Redux/features/api/allBaseApi";
import { Navigate } from "react-router-dom";
import Loading from "../Shared/Loading/Loading";

const useAdmin = () => {
    const { user } = useSelector(state => state.userSlice);
    const { data, isLoading: isAdminLoading } = useGetAdminQuery(user?.email || 'Not Logged In');
    const isAdmin = data?.isAdmin ? true : false
    return [isAdmin, isAdminLoading]
};

export default useAdmin;