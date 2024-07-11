import { PiBread, PiCookingPot, PiGrainsLight } from "react-icons/pi";
import { GiHotSpices, GiKetchup } from "react-icons/gi";
import { TbMilk } from "react-icons/tb";
import vegetables from '../../assets/potato.svg'
import coldDrinks from '../../assets/cold-drinks.svg'
import { CgMenuGridO } from "react-icons/cg";
import toys from '../../assets/categoriesLogo/toys.png'
import education from '../../assets/categoriesLogo/Educational Materials.png'
export const categories = [
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
    {
        icon: <img className="w-6" src={coldDrinks} />,
        value: 'Cold Drinks'
    },
    {
        icon: <img className="w-6" src={education} />,
        value: 'Educational Materials'
    },
    {
        icon: <img className="w-6" src={toys} />,
        value: 'Toys'
    },

    {
        icon: <CgMenuGridO />,
        value: 'Others'
    },

]