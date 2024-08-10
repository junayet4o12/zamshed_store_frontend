import logo from '../../assets/logo.png'
import { CiUser } from "react-icons/ci";
import { Fade as Hamburger } from 'hamburger-react'
import {  useState } from 'react';
import Categories from '../../Shared/Categories/Categories';
import NavbarSearchBar from '../../Shared/NavbarSearchBar/NavbarSearchBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoWithNotificationBlackVersion from '../../Shared/logoWithNotification/LogoWithNotificationBlackVersion';
import { useSelector } from 'react-redux';
import { MdOutlineShoppingCart } from "react-icons/md";
import DashBoardNavBarMenu from './DashBoardNavBarMenu';
import { useGetClientOrdersCountQuery } from '../../Redux/features/api/allBaseApi';
const DashBoardNavBar = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.userSlice);
    const [isOpen, setOpenMenu] = useState(false)
    const location = useLocation();
    const isHome = location?.pathname === '/'
    const { data: orderCount = {} } = useGetClientOrdersCountQuery();
    return (
        <div className='w-full bg-white shadow-md'>
            <div className="w-full flex items-center text-sm px-2 mt-3 gap-7 py-3">
                <img onClick={() => navigate('/')} className='h-10 lg:h-14 cursor-pointer' src={logo} alt="" />
                {
                    isHome && <>
                        <div className='hidden  lg:block z-10'><Categories /></div>
                        <div className='hidden  lg:block w-full'><NavbarSearchBar /></div>
                    </>
                }
                <div className='flex h-[50px] justify-center items-center gap-3  ml-auto'>
                    <Link to={'/dashboard/clientOrders/onProcessing'}>
                        <button className='w-10 h-10  justify-center items-center  text-2xl rounded-full flex'>
                            <LogoWithNotificationBlackVersion userLogo={false} Logo={MdOutlineShoppingCart} notification={orderCount?.pending || 0} />
                        </button>
                    </Link>
                    <span className='font-medium text-gray-500 hidden xs:flex'>|</span>
                    <Link to={'/dashboard/adminProfile'}><button className='w-10 h-10  justify-center items-center  text-lg rounded-full bg-primary/10 hidden xs:flex p-1'>{user?.photoURL ? <img className='w-full h-full rounded-full' src={user?.photoURL} /> : <CiUser />}</button></Link>
                    <div className='z-20'>
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="">
                                <Hamburger toggled={isOpen} toggle={setOpenMenu} size={23} duration={0.6} />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label onClick={() => setOpenMenu(false)} htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <DashBoardNavBarMenu setOpenMenu={setOpenMenu} />
                        </div>
                    </div>
                </div>

            </div>
            {
                isHome && <div className='flex lg:hidden justify-center gap-5 px-10 flex-col sm:flex-row'>
                    <span className='z-10'>
                        <Categories />
                    </span>
                    <NavbarSearchBar />
                </div>
            }
        </div>
    );
};

export default DashBoardNavBar;