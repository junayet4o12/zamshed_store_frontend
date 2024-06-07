import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import auth from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { removeUserData } from "../Redux/features/userSlice/userSlice";




const useHandleLogOut = () => {
    const dispatch = useDispatch()
    const handleLogOut = () => {
        const toastId = toast.loading("Logging Out...");
        signOut(auth)
            .then(res => {

                dispatch(removeUserData())
                toast.success("Logged Out!!", { id: toastId });
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return handleLogOut
};

export default useHandleLogOut;