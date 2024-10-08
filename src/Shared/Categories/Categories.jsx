import { GoChevronDown } from "react-icons/go";
import { TbMenuDeep, TbCategory } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory } from "../../Redux/features/searchingProductsSlice/searchingProductsSlice";
import useProductsCategoriesArray from "../../hooks/useProductsCategoriesArray";

const Categories = () => {
    const {categories=[]} = useProductsCategoriesArray()
    const dispatch = useDispatch()
    const { filterCategory } = useSelector((state) => state.searchingProductsSlice);
    const handleCategory = (category) => {
        dispatch(setFilterCategory(category))
    }
   
    return (
        <div className='min-w-[230px] max-w-[230px] h-[50px] border border-primary rounded-full p-2 px-5 flex gap-3 items-center justify-between cursor-pointer relative categoryParent'>
            <div className='flex items-center gap-2'>
                <p className='text-2xl rotate-180 -scale-y-100 scale-x-[1.3] w-max text-primary'><TbMenuDeep /></p>
                <p className='text-sm font-semibold'>{filterCategory}</p>
            </div>
            <p className='text-2xl text-primary'><GoChevronDown /></p>
            <div className='w-full absolute left-0 top-0 mt-[50px] bg-white categories shadow-2xl pt-2 flex flex-col max-h-[70vh] overflow-x-auto'>
                <div onClick={() => handleCategory('All')} className="flex items-center gap-3 min-h-10 border-b border-gray-500 px-3 text-sm font-medium hover:bg-primary/10"><span className="text-2xl"><TbCategory/></span><span>All</span></div>
                {
                    categories?.map((category, idx) => <div onClick={() => handleCategory(category.value)} key={idx} className={`flex items-center gap-3 min-h-10 border-b border-gray-500 px-3 text-sm font-medium ${filterCategory===category.value && 'bg-primary/10'} hover:bg-primary/10`}><span className="text-2xl">{category?.icon}</span> <span>{category?.value}</span></div>)
                }
            </div>
        </div>
    );
};

export default Categories;