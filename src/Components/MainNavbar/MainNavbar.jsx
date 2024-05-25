import logo from '../../assets/logo.png'
import { CiUser } from "react-icons/ci";
import { BsArrowRepeat } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { Fade as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import Categories from '../../Shared/Categories/Categories';
import NavbarSearchBar from '../../Shared/NavbarSearchBar/NavbarSearchBar';
import NavbarMenu from './NavbarMenu';
const MainNavbar = () => {
    const [isOpen, setOpenMenu] = useState(false)


    return (
        <div className='w-full'>
            <div className="w-full flex items-center text-sm px-2 mt-5 gap-7">
                <img className='h-10 lg:h-14' src={logo} alt="" />
                <span className='hidden  lg:block'><Categories /></span>
                <span className='hidden  lg:block w-full'><NavbarSearchBar /></span>
                <div className='flex h-[50px] justify-center items-center gap-3  ml-auto'>
                    <button className='w-10 h-10  justify-center items-center  text-lg rounded-full bg-primary/10 hidden xs:flex'><CiUser /></button>
                    <span className='font-medium text-gray-500 hidden xs:flex'>|</span>
                    <button className='w-10 h-10 flex justify-center items-center  text-2xl rounded-full'><BsArrowRepeat /></button>
                    <button className='w-10 h-10  justify-center items-center  text-2xl rounded-full hidden xs:flex'><IoIosHeartEmpty /></button>
                    <div  className='z-20'>
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
            <div className='flex lg:hidden justify-center gap-5 px-10 flex-col sm:flex-row'>
                <span className='z-10'>
                    <Categories />
                </span>
                <NavbarSearchBar />
            </div>
        </div>
    );
};

export default MainNavbar;