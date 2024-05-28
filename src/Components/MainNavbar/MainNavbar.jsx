import logo from '../../assets/logo.png'
import { CiUser } from "react-icons/ci";
import { BsArrowRepeat } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { Fade as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import Categories from '../../Shared/Categories/Categories';
import NavbarSearchBar from '../../Shared/NavbarSearchBar/NavbarSearchBar';
import NavbarMenu from './NavbarMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const MainNavbar = () => {
    const navigate = useNavigate()
    const [isOpen, setOpenMenu] = useState(false)
    const location = useLocation();
    const isHome = location?.pathname === '/' // Current path
    return (
        <div className='w-full bg-white pb-3 lg:pb-0'>
            <div className="w-full flex items-center text-sm px-2 mt-5 gap-7 py-3">
                <img onClick={() => navigate('/')} className='h-10 lg:h-14 cursor-pointer' src={logo} alt="" />
                {
                    isHome && <>
                        <div className='hidden  lg:block z-10'><Categories /></div>
                        <div className='hidden  lg:block w-full'><NavbarSearchBar /></div>
                    </>
                }
                <div className='flex h-[50px] justify-center items-center gap-3  ml-auto'>
                    <button className='w-10 h-10  justify-center items-center  text-lg rounded-full bg-primary/10 hidden xs:flex'><CiUser /></button>
                    <span className='font-medium text-gray-500 hidden xs:flex'>|</span>
                    <button className='w-10 h-10 flex justify-center items-center  text-2xl rounded-full'><BsArrowRepeat /></button>
                    <button className='w-10 h-10  justify-center items-center  text-2xl rounded-full hidden xs:flex'><IoIosHeartEmpty /></button>
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
                            <NavbarMenu />
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

export default MainNavbar;