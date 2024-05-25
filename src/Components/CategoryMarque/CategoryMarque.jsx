import vegetablesLogo from '../../assets/categoriesLogo/vegetables.svg'
import grainAndCerealsLogo from '../../assets/categoriesLogo/bag-of-grain.svg'
import CookingEssentialsLogo from '../../assets/categoriesLogo/cooking.svg'
import spiciesLogo from '../../assets/categoriesLogo/pan.svg'
import dairyLogo from '../../assets/categoriesLogo/breakfast.svg'
import bakeryLogo from '../../assets/categoriesLogo/bread.svg'
import SaucesLogo from '../../assets/categoriesLogo/chili-sauce.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { BsThreeDotsVertical } from "react-icons/bs";
const CategoryMarque = () => {
    const logoStyle = 'min-w-16 min-h-16 max-w-16 max-h-16 bg-primary/10 p-3.5 flex justify-center items-center rounded-full'
    const categories = [
        {
            icon: <img className={`${logoStyle}`} src={vegetablesLogo} />,
            value: 'Vegetables',
            products: 9
        },
        {
            icon: <img className={`${logoStyle}`} src={grainAndCerealsLogo} />,
            value: 'Grains and Cereals',
            products: 5
        },
        {
            icon: <img className={`${logoStyle}`} src={CookingEssentialsLogo} />,
            value: 'Cooking Essentials',
            products: 2
        },
        {
            icon: <img className={`${logoStyle}`} src={spiciesLogo} />,
            value: 'Spices and Herbs',
            products: 4
        },
        {
            icon: <img className={`${logoStyle}`} src={dairyLogo} />,
            value: 'Dairy Products',
            products: 6
        },
        {
            icon: <img className={`${logoStyle}`} src={bakeryLogo} />,
            value: 'Bakery Items',
            products: 1
        },
        {
            icon: <img className={`${logoStyle}`} src={SaucesLogo} />,
            value: 'Sauces and Condiments',
            products: 11
        },

    ]
    return (
        <div className="px-2">
            <Swiper
                slidesPerView={5}
                breakpoints={{
                    320: { // when window width is >= 320px
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    550: { // when window width is >= 480px
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    790: { // when window width is >= 768px
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: { // when window width is >= 1024px
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1270: { // when window width is >= 1024px
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }}
                spaceBetween={30}
                freeMode={true}

                modules={[FreeMode, Pagination]}
            >
                {
                    categories?.map((category, idx) => <SwiperSlide key={idx}><div className="flex items-center gap-3   px-3 text-sm font-medium">
                        <span className="text-2xl">{category?.icon}</span>
                        <span className="flex flex-col">
                            <span className={`font-semibold text-black  
                            ${(idx + 1) != categories?.length && 'w-max'}`}>{category?.value}</span>
                            <span className="text-gray-700">products: {category?.products}</span>
                        </span>
                        <span className="text-xl text-gray-700 cursor-pointer"><BsThreeDotsVertical /></span>
                    </div></SwiperSlide>)
                }

            </Swiper>
            <div className='w-max mt-[50px] bg-white shadow-2xl pt-2 flex gap-5'>

            </div>
        </div>
    );
};

export default CategoryMarque;