import { FaFacebookF, FaGoogle, FaWhatsapp } from "react-icons/fa6";

const SocialIcons = () => {
    return (
        <>
            <p className="  w-max p-1 text-lg relative">
                <a href='https://www.facebook.com/md.zamshed.737448?mibextid=LQQJ4d'><FaFacebookF /></a>
            </p>
            <p className="  w-max p-1 text-lg relative">
                <a
                    href={`https://wa.me/+8801837294898?text=${encodeURIComponent(`Hello ZAMSHED STORE.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaWhatsapp />
                </a>
            </p>
            <p className="  w-max p-1 text-lg relative">
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
        </>
    );
};

export default SocialIcons;