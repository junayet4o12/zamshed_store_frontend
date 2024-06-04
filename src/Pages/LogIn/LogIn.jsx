import { Link, useNavigate } from "react-router-dom";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, makeDefault } from "../../Redux/features/userSlice/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const LogIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, isError, error, email } = useSelector(state => state.userSlice)
    useEffect(() => {
        dispatch(makeDefault())
        if (isError) {
            toast.error(error)
        }
    }, [dispatch, isError, error])
    useEffect(() => {
        if (!isLoading && email) {
            toast.success("Logged in Successfully!!")
            navigate('/')
        }
    }, [isLoading, email])
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`
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
                <div className="flex flex-col gap-2">
                    <InputLabel text={`Password`} />
                    <input type="password" className={`${inputStyle}`} placeholder="Password" {...register("password", { required: true, })} />
                    <p className="text-sm text-red-500">{``}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Don't have an account? <Link to={'/register'}><span className="font-bold underline hover:text-primary">Register</span></Link></p>
                </div>

                <button>
                <ButtonStrong text={isLoading ? <span className="flex items-center gap-1">Logging in <span className="loading loading-spinner loading-xs"></span></span> : 'Log in'} />
                </button>
            </form>
        </div>
    );
};

export default LogIn; 