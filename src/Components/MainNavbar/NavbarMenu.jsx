import { RiShoppingBasket2Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import LogoWithNotifications from "../../Shared/logoWithNotification/LogoWithNotifications";
import whiteLogo from '../../assets/whiteLogo.png'
import { FaFacebookF, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import auth from "../../../firebase/firebase.config";
import { removeUserData } from "../../Redux/features/userSlice/userSlice";
import toast from "react-hot-toast";
import { useGetCartProductsMutation } from "../../Redux/features/api/allBaseApi";
import { useEffect } from "react";
import useHandleLogOut from "../../Shared/useHandleLogOut";
import useAdmin from "../../hooks/useAdmin";
const NavbarMenu = ({ setOpenMenu }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { addedToCartData } = useSelector(state => state.productsInCartSlice)
    const productIdArray = addedToCartData.map(data => data.id);
    const [getCartProduct, { data, isLoading }] = useGetCartProductsMutation()
    useEffect(() => {
        getCartProduct(productIdArray)
    }, [addedToCartData])
    const allCartProducts = data || [];
    const allCartProductsIdArray = allCartProducts?.map(item => item?._id)
    const newAllProductsData = addedToCartData.filter(item => allCartProductsIdArray.includes(item.id));
    const { user } = useSelector(state => state.userSlice)
    const LinkStyle = `flex items-center gap-2 cursor-pointer navLinkParent transition-all duration-300 relative`
    const StylingComponents = <div className="w-1.5 h-1.5 bg-primary navLinkStyle absolute left-0"></div>
    const handleLogOut = useHandleLogOut()

    return (
        <div className="w-80 max-w-[65%] min-h-full bg-base-200 text-base-content">
            <div className='flex min-h-full'>
                <div className=' w-[70px] min-h-screen bg-primary flex justify-between flex-col'>
                    <div className="pt-10 flex flex-col items-center gap-5">

                        {
                            user && <>
                                <LogoWithNotifications Logo={RiShoppingBasket2Line} notification={newAllProductsData?.length || 0} />
                                <LogoWithNotifications Logo={BsArrowRepeat} notification={0} />
                                <LogoWithNotifications Logo={IoIosHeartEmpty} notification={0} />
                                <Link to={'/myProfile'}>
                                    <LogoWithNotifications
                                        userLogo={true}
                                        Logo={CiUser} notification={0} />
                                </Link>
                            </>
                        }
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
                        <NavLink to={'/gallery'}>
                            <li className={`${LinkStyle}`}>
                                {StylingComponents}
                                Gallery
                            </li>
                        </NavLink>
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
                        {
                            isAdmin && <>
                                <NavLink to={'/addProduct'}>
                                    <li className={`${LinkStyle}`}>
                                        {StylingComponents}
                                        Add Product
                                    </li>
                                </NavLink>
                                <NavLink to={'/manageProducts'}>
                                    <li className={`${LinkStyle}`}>
                                        {StylingComponents}
                                        Manage Products
                                    </li>
                                </NavLink>
                            </>
                        }
                        {!user && <NavLink to={'/login'}>
                            <li className={`${LinkStyle}`}>
                                {StylingComponents}
                                Login
                            </li>
                        </NavLink>}
                        {user && <li onClick={() => handleLogOut()} className={`flex items-center gap-2 cursor-pointer text-red-500 transition-all duration-300 relative bg-primary/10 hover:bg-primary/20 w-max pr-3 pl-1 py-1 rounded-md`}>
                            Logout <span className="text-lg"><MdOutlineLogout /></span>
                        </li>}
                    </ul>
                </div>
            </div>


        </div>
    );
};

export default NavbarMenu;