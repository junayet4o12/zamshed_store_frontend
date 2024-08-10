import { CgMenuGridO } from "react-icons/cg";
import { useGetCategoryQuery } from "../Redux/features/api/allBaseApi";
import Loading from "../Shared/Loading/Loading";
import OthersLogo from '../assets/categoriesLogo/Others.png'
const useProductsCategoriesArray = () => {
    const { data: allCategory = [], isLoading, isError, error, refetch } = useGetCategoryQuery()

    // {
    //     icon: <img className="w-6" src={vegetables} />,
    //     value: 'Vegetables'
    // },
    let categories = allCategory?.map(category => {
        return {
            icon: <img className="w-6" src={category?.logo} />,
            value: category?.name
        }
    })
    categories = [...categories, {
        icon: <CgMenuGridO />,
        value: 'Others'
    },]
    let marqueCategories = allCategory?.map(category => {
        return {
            icon: <img className={`min-w-16 min-h-16 max-w-16 max-h-16 bg-primary/10 p-3.5 flex justify-center items-center rounded-full`} src={category?.image} />,
            value: category?.name
        }
    })
    marqueCategories = [...marqueCategories, {
        icon: <img className={`min-w-16 min-h-16 max-w-16 max-h-16 bg-primary/10 p-3.5 flex justify-center items-center rounded-full`} src={OthersLogo} />,
        value: 'Others',
    },]

    return { categoriesLoading: isLoading, categories, marqueCategories }
};

export default useProductsCategoriesArray;