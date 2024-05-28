import { RiShoppingBasket2Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import LogoWithNotifications from "../../Shared/logoWithNotification/LogoWithNotifications";
import whiteLogo from '../../assets/whiteLogo.png'
import { FaFacebookF, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const NavbarMenu = () => {
    const LinkStyle = `flex items-center gap-2 cursor-pointer navLinkParent transition-all duration-300 relative`
    const StylingComponents = <div className="w-1.5 h-1.5 bg-primary navLinkStyle absolute left-0"></div>
    return (
        <div className="w-80 max-w-[65%] min-h-full bg-base-200 text-base-content">
            <div className='flex min-h-full'>
                <div className=' w-[70px] min-h-screen bg-primary flex justify-between flex-col'>
                    <div className="pt-10 flex flex-col items-center gap-5">
                        <LogoWithNotifications Logo={RiShoppingBasket2Line} notification={0} />
                        <LogoWithNotifications Logo={BsArrowRepeat} notification={0} />
                        <LogoWithNotifications Logo={IoIosHeartEmpty} notification={0} />
                        <LogoWithNotifications
                            userLogo={true}
                            Logo={CiUser} notification={0} />
                    </div>
                    <div className=" pb-10 flex flex-col gap-3 items-center">
                        <img className="h-[130px] w-max" src={whiteLogo} alt="" />
                        <p className=" text-white w-max p-1 text-lg relative">
                            <FaFacebookF />
                        </p>
                        <p className=" text-white w-max p-1 text-lg relative">
                            <FaWhatsapp />
                        </p>
                        <p className=" text-white w-max p-1 text-lg relative">
                            <FaGoogle />
                        </p>
                    </div>
                </div>
                <div className='bg-white min-h-screen w-full'>
                    <ul className="py-10 px-5 flex flex-col gap-3 font-medium text-base">
                        <NavLink to={'/'}>
                            <li className={`${LinkStyle}`}>
                                {StylingComponents}
                                Home
                            </li>
                        </NavLink>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Shop
                        </li>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            About Us
                        </li>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Proprietor
                        </li>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Contact
                        </li>
                        <NavLink to={'/addProduct'}>
                            <li className={`${LinkStyle}`}>
                                {StylingComponents}
                                Add Product
                            </li>
                        </NavLink>
                        <NavLink to={'updateProduct'}>
                            <li className={`${LinkStyle}`}>
                                {StylingComponents}
                                Update Product
                            </li>
                        </NavLink>
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default NavbarMenu;