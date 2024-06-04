import { Link, Navigate, useNavigate } from "react-router-dom";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser, makeDefault } from "../../Redux/features/userSlice/userSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAddUsersMutation } from "../../Redux/features/api/allBaseApi";

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [addUsers] = useAddUsersMutation()
    const { isLoading, isError, error, email, name } = useSelector(state => state.userSlice)

    useEffect(() => {
        dispatch(makeDefault())
        if (isError) {
            toast.error(error)
        }
    }, [dispatch, isError, error])
    useEffect(() => {
        if (!isLoading && email) {
            toast.success("Registered Successfully!!")
            navigate('/')
        }
    }, [isLoading, email])
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`

    const onSubmit = async ({ name, email, password }) => {
        console.log(email, password);
        const userData = {
            name,
            email,
            addedTime: new Date().getTime()
        }
        addUsers(userData)
        dispatch(createUser({ email, password, name }))
    }
    return (
        <div className="p-2">
            <RoutesTitle />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Register'} />
                {/* your Name  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={`Your Name`} />
                    <input type="text" className={`${inputStyle}`} placeholder="Name" {...register("name", { required: true })} />
                    <p className="text-sm text-red-500">{errors.name && 'Name is required'}</p>
                </div>
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
                    <input type="password" className={`${inputStyle}`} placeholder="Password" {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
                    })} />
                    <p className="text-sm text-red-500">
                        {errors?.password?.type === 'required' && 'Password invalid'}
                        {errors?.password?.type === 'minLength' && 'Password must be minimum 8 characters'}
                        {errors?.password?.type === 'maxLength' && 'Password must be maximum 20 characters'}
                        {errors?.password?.type === 'pattern' && 'Password must contain at least one digit, one lowercase letter, and one uppercase letter.'}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Already have an account? <Link to={'/login'}><span className="font-bold underline hover:text-primary">Log in</span></Link></p>
                </div>

                <button>
                    <ButtonStrong text={isLoading ? <span className="flex items-center gap-1">Registering <span className="loading loading-spinner loading-xs"></span></span> : 'Register'} />
                </button>
            </form>
        </div>
    );
};

export default Register; 