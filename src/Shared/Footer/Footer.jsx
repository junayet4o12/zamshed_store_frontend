// import React from 'react';
import SocialIcons from '../SocialIcons/SocialIcons';
import logo from '../../assets/logo.png'
import { FaFacebookF, FaGoogle, FaWhatsapp } from 'react-icons/fa';
const Footer = () => {

    return (
        <footer className={`w-full footer p-4 bg-primary/10`}>
            <aside className="items-center grid-flow-col mx-auto ">
                <div className='space-y-3'>
                    <img className='w-40' src={logo} alt="" />
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </div>
            </aside>
            <nav className="w-max mx-auto grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <p className="  w-max p-1 text-2xl relative">
                    <a href='https://www.facebook.com/md.zamshed.737448?mibextid=LQQJ4d'><FaFacebookF /></a>
                </p>
                <p className="  w-max p-1 text-2xl relative">
                    <a
                        href={`https://wa.me/+8801837294898?text=${encodeURIComponent(`Hello ZAMSHED STORE.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaWhatsapp />
                    </a>
                </p>
                <p className="  w-max p-1 text-2xl relative">
                    <a

                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=muhammadjunayetmaruf@gmail.com&su=${encodeURIComponent('Want to know more about ZAMSHED STORE')}&body=${encodeURIComponent(`Hello ZAMSHED STORE,

Hope Everything Well. Give a brief description about you.

Your Honest Client.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        <FaGoogle />
                    </a>


                </p>
            </nav>
        </footer>
    );
};

export default Footer;