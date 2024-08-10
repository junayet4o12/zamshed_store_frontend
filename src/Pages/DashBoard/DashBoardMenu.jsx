import whiteLogo from '../../assets/whiteLogo.png'
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaWhatsapp } from 'react-icons/fa6';
import useHandleLogOut from '../../Shared/useHandleLogOut';
import { MdOutlineLogout } from 'react-icons/md';
import SocialIcons from '../../Shared/SocialIcons/SocialIcons';

const DashBoardMenu = () => {
    const handleLogOut = useHandleLogOut()
    const LinkStyle = `flex items-center gap-2 cursor-pointer navLinkParent transition-all duration-300 relative`
    const StylingComponents = <div className="w-1.5 h-1.5 bg-primary navLinkStyle absolute left-0"></div>
    return (
        <div className='flex min-h-full'>
            <div className=' w-[70px] min-h-screen bg-primary flex justify-center items-center flex-col'>

                <div className=" pb-10 flex flex-col gap-3 items-center text-white">
                    <img className="h-[130px] w-max" src={whiteLogo} alt="" />
                    <SocialIcons />
                </div>
            </div>
            <div className='bg-white min-h-screen w-full'>
                <ul className="py-10 px-5 flex flex-col gap-3 font-medium text-base">

                    <NavLink to={'adminProfile'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Admin Profile
                        </li>
                    </NavLink>
                    <NavLink to={'addProduct'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Add Product
                        </li>
                    </NavLink>
                    <NavLink to={'manageProducts'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Manage Products
                        </li>
                    </NavLink>
                    <NavLink to={'addCategory'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Add Category
                        </li>
                    </NavLink>
                    <NavLink to={'manageCategory'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Manage Category
                        </li>
                    </NavLink>

                    <NavLink to={'clientOrders'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Client Orders
                        </li>
                    </NavLink>
                    <NavLink to={'manageShop'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Manage Shop
                        </li>
                    </NavLink>
                    <NavLink to={'manageProprietor'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Manage Proprietor
                        </li>
                    </NavLink>



                    <li className='text-center text-lg pt-3'>Or</li>
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
                    <NavLink to={'/aboutShop'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            About Shop
                        </li>
                    </NavLink>
                    <NavLink to={'/proprietor'}>
                        <li className={`${LinkStyle}`}>
                            {StylingComponents}
                            Proprietor
                        </li>
                    </NavLink>
                    <li onClick={() => handleLogOut()} className={`flex items-center gap-2 cursor-pointer text-red-500 transition-all duration-300 relative bg-primary/10 hover:bg-primary/20 w-max pr-3 pl-1 py-1 rounded-md`}>
                        Logout <span className="text-lg"><MdOutlineLogout /></span>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default DashBoardMenu;