import { useDispatch, useSelector } from "react-redux";
import { loginUserWithGoogle, makeDefault } from "../../Redux/features/userSlice/userSlice";
import ButtonLight from "../Button/ButtonLight";
import { FaGoogle } from "react-icons/fa6";
import { useEffect } from "react";
import { useAddUsersMutation } from "../../Redux/features/api/allBaseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LogInWithGoogle = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [addUsers, { data: createdUserData }] = useAddUsersMutation()
    const { isLoadingGoogle, user, isGoogleLogInCompleted } = useSelector(state => state.userSlice)
    useEffect(() => {
        if (user && isGoogleLogInCompleted) {
            const data = {
                email: user?.email,
                name: user?.displayName,
                addedTime: new Date().getTime(),
                profilePhoto: user?.photoURL,
            }
            addUsers(data)
            if (createdUserData) {
                toast.success("Logged in Successfully!!")
                dispatch(makeDefault())
                navigate('/')
            }
            // dispatch(makeDefault())
        }
    }, [user, isGoogleLogInCompleted, createdUserData])

    const handleGoogleLogIn = () => {
        dispatch(loginUserWithGoogle())
    }
    return (
        <div onClick={handleGoogleLogIn} className="cursor-pointer">
            <ButtonLight text={isLoadingGoogle ? <span className="flex items-center gap-1">Logging In With <FaGoogle /></span> : <span className="flex  items-center gap-2">Log In With <FaGoogle /></span>} />
        </div>
    );
};

export default LogInWithGoogle;