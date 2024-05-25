import { GoChevronDown } from "react-icons/go";
import { TbMenuDeep } from "react-icons/tb";
import { PiBread, PiCookingPot, PiGrainsLight } from "react-icons/pi";
import { GiHotSpices, GiKetchup } from "react-icons/gi";
import { TbMilk } from "react-icons/tb";
import vegetables from '../../assets/potato.svg'
const Categories = () => {
    const categories = [
        {
            icon: <img className="w-6" src={vegetables} />,
            value: 'Vegetables'
        },
        {
            icon: <PiGrainsLight />,
            value: 'Grains and Cereals'
        },
        {
            icon: <PiCookingPot />,
            value: 'Cooking Essentials'
        },
        {
            icon: <GiHotSpices />,
            value: 'Spices and Herbs'
        },
        {
            icon: <TbMilk />,
            value: 'Dairy Products'
        },
        {
            icon: <PiBread />,
            value: 'Bakery Items'
        },
        {
            icon: <GiKetchup />,
            value: 'Sauces and Condiments'
        },

    ]
    return (
        <div className='min-w-[230px] max-w-[230px] h-[50px] border border-primary rounded-full p-2 px-5 flex gap-3 items-center justify-between cursor-pointer relative categoryParent'>
            <div className='flex items-center gap-3 '>
                <p className='text-2xl rotate-180 -scale-y-100 scale-x-[1.3] w-max text-primary'><TbMenuDeep /></p>
                <p className='text-sm font-semibold'>All Categories</p>
            </div>
            <p className='text-2xl text-primary'><GoChevronDown /></p>
            <div className='w-full absolute left-0 top-0 mt-[50px] bg-white categories shadow-2xl pt-2 flex flex-col'>
                {
                    categories?.map((category, idx) => <div key={idx} className="flex items-center gap-3 h-10 border-b border-gray-500 px-3 text-sm font-medium hover:bg-primary/10"><span className="text-2xl">{category?.icon}</span> <span>{category?.value}</span></div>)
                }
            </div>
        </div>
    );
};

export default Categories;