import { Link } from "react-router-dom";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import InputLabel from "../../Shared/InputLabel/InputLabel";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";

const LogIn = () => {
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`
    return (
        <div className="p-2">
            <RoutesTitle />
            <form className="w-full max-w-[600px] mx-auto space-y-5">
                <Title text={'Log in'} />
                {/* your Email  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={`Your Email`} />
                    <input type="email" className={`${inputStyle}`} placeholder="Email" name="name" />
                    <p className="text-sm text-red-500">{``}</p>
                </div>
                {/* password  */}
                <div className="flex flex-col gap-2">
                    <InputLabel text={`Password`} />
                    <input type="password" className={`${inputStyle}`} placeholder="Password" name="Password" />
                    <p className="text-sm text-red-500">{``}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Don't have an account? <Link to={'/register'}><span className="font-bold underline hover:text-primary">Register</span></Link></p>
                </div>

                <button>
                    <ButtonStrong text={'Log in'} />
                </button>
            </form>
        </div>
    );
};

export default LogIn; 