import { Link, useNavigate } from "react-router-dom";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, makeDefault } from "../../Redux/features/userSlice/userSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LogInWithGoogle from "../../Shared/LogInWithGoogle/LogInWithGoogle";
import { inputStyle } from "../../Shared/inputStyle";

const LogIn = () => {
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, isLogInCompleted, isError, error, user } = useSelector(state => state.userSlice)
    useEffect(() => {
        dispatch(makeDefault())
        if (isError) {
            toast.error(error)
        }
    }, [dispatch, isError, error])
    useEffect(() => {
        if (isLogInCompleted && user) {
            toast.success("Logged in Successfully!!")
            dispatch(makeDefault())
            navigate('/')
        }
    }, [isLogInCompleted, user])
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async ({ email, password }) => {
        console.log(email, password);
        dispatch(loginUser({ email, password }))
    }
    return (
        <div className="p-2">
            <RoutesTitle />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Log in'} />
                {/* your Email  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={`Your Email`} />
                    <input type="email" className={`${inputStyle}`} placeholder="Email" {...register("email", { required: true })} />
                    <p className="text-sm text-red-500">
                        {errors.email && 'Email is required'}
                    </p>
                </div>
                {/* password  */}
                <div className="flex flex-col gap-2 relative">
                    <InputLabel text={`Password`} />
                    <div className="flex">
                        <input type={showPass ? 'text' : 'password'} className={`${inputStyle} rounded-r-none border-r-0`} placeholder="Password" {...register("password", { required: true, })} />
                        <p onClick={() => setShowPass(!showPass)} className="text-xs font-medium uppercase bottom-[18px] right-2 p-1 cursor-pointer  hover:font-semibold w-[70px] border border-gray-500 flex justify-center items-center border-l-0 rounded-r-md">{showPass ? 'Hide' : 'Show'}</p>
                    </div>
                    <p className="text-sm text-red-500">{``}</p>

                </div>
                <div className="flex flex-col gap-2">
                    <p>Don't have an account? <Link to={'/register'}><span className="font-bold underline hover:text-primary">Register</span></Link></p>
                </div>

                <div className="flex gap-3 items-center flex-col xs:flex-row">
                    <button>
                        <ButtonStrong text={isLoading ? <span className="flex items-center gap-1">Logging In <span className="loading loading-spinner loading-xs"></span></span> : 'Log In'} />
                    </button>
                    Or <LogInWithGoogle />
                </div>
            </form>
        </div>
    );
};

export default LogIn; 