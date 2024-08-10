import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useGetHomeContentQuery } from "../../Redux/features/api/allBaseApi";
const AddressNavbar = () => {
    const { data=[] } = useGetHomeContentQuery();
    const { address,email } = data[0] || {};
    const shopKeeperResponsibilitiesAndQualities = [
        {
            firstText: "Get All Products",
            secondText: "You Need"
        },
        {
            firstText: "Best Quality",
            secondText: "You Want"
        },
        {
            firstText: "Excellent Service",
            secondText: "You Deserve"
        },
        {
            firstText: "Always Fresh",
            secondText: "You Expect"
        }
    ];
    return (

        <div className="w-full h-11 flex bg-primary text-white text-sm px-2">
            <div className="h-full flex items-center w-1/2">
                <h3 className="flex justify-center items-center gap-2">
                    <span className="flex justify-center items-center gap-0.5"><span className="text-base"><IoLocationOutline /></span> {address || ''}</span> <span className="font-thin text-xs">|</span> <span className="flex justify-center items-center gap-1"><span className="text-base"><TfiEmail /></span>{email}</span>
                </h3>
            </div>
            <div className="w-1/2 flex justify-end items-center">
                <div className="w-3/4 relative">
                    <div className="absolute w-full flex justify-between z-10">
                        <div className="swiper-button-prev-custom text-xl p-1 cursor-pointer"><GrFormPrevious /></div>
                        <div className="swiper-button-next-custom text-xl p-1 cursor-pointer"><GrFormNext /></div>
                    </div>
                    <Swiper
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        modules={[Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}


                        speed={300}

                    >
                        {
                            shopKeeperResponsibilitiesAndQualities?.map((text, idx) => <SwiperSlide key={idx}>
                                <div className="flex justify-center items-center gap-2">
                                    <h2 className="text-lg font-semibold">{text?.firstText}</h2>
                                    <span className="text-secondary font-medium">{text?.secondText}</span>
                                </div>
                            </SwiperSlide>)
                        }
                    </Swiper>
                </div>
            </div>
        </div>

    );
};

export default AddressNavbar;