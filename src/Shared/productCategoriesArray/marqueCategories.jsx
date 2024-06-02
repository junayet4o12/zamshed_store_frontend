import vegetablesLogo from '../../assets/categoriesLogo/vegetables.svg'
import grainAndCerealsLogo from '../../assets/categoriesLogo/bag-of-grain.svg'
import CookingEssentialsLogo from '../../assets/categoriesLogo/cooking.svg'
import spiciesLogo from '../../assets/categoriesLogo/pan.svg'
import dairyLogo from '../../assets/categoriesLogo/breakfast.svg'
import bakeryLogo from '../../assets/categoriesLogo/bread.svg'
import SaucesLogo from '../../assets/categoriesLogo/chili-sauce.svg'
import ColdDrinksLogo from '../../assets/categoriesLogo/juice-cup.svg'
const logoStyle = 'min-w-16 min-h-16 max-w-16 max-h-16 bg-primary/10 p-3.5 flex justify-center items-center rounded-full'
export const marqueCategories = [
    {
        icon: <img className={`${logoStyle}`} src={vegetablesLogo} />,
        value: 'Vegetables',
    },
    {
        icon: <img className={`${logoStyle}`} src={grainAndCerealsLogo} />,
        value: 'Grains and Cereals',
    },
    {
        icon: <img className={`${logoStyle}`} src={CookingEssentialsLogo} />,
        value: 'Cooking Essentials',
    },
    {
        icon: <img className={`${logoStyle}`} src={spiciesLogo} />,
        value: 'Spices and Herbs',
    },
    {
        icon: <img className={`${logoStyle}`} src={dairyLogo} />,
        value: 'Dairy Products',
    },
    {
        icon: <img className={`${logoStyle}`} src={bakeryLogo} />,
        value: 'Bakery Items',
    },
    {
        icon: <img className={`${logoStyle}`} src={ColdDrinksLogo} />,
        value: 'Cold Drinks',
    },
    {
        icon: <img className={`${logoStyle}`} src={SaucesLogo} />,
        value: 'Sauces and Condiments',
    },
   

]