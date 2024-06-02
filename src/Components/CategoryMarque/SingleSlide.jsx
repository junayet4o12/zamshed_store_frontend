/* eslint-disable react/prop-types */

import { useGetCategoryWiseProductsCountQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";

const SingleSlide = ({ category, handleCategory, filterCategory, idx, categoriesLength }) => {
    const { data, isLoading } = useGetCategoryWiseProductsCountQuery(category?.value)
    if(isLoading){
        return <div className="flex flex-col gap-4 w-52">
        <div className="flex gap-4 items-center">
        <span className="text-2xl">{category?.icon}</span>
          <div className="flex flex-col gap-4">
            
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        </div>
      </div>
    }
    console.log(data);
    return (
        <div onClick={() => handleCategory(category?.value)} className={`flex items-center gap-3   px-3 text-sm font-medium cursor-pointer hover:bg-primary/10 rounded-sm p-1 ${filterCategory === category.value && 'bg-primary/10'}`}>
            <span className="text-2xl">{category?.icon}</span>
            <span className="flex flex-col">
                <span className={`font-semibold text-black  
                            ${(idx + 1) != categoriesLength && 'w-max'}`}>{category?.value}</span>
                <span className="text-gray-700">products: {data?.productQuantity}</span>
            </span>
            {/* <span className="text-xl text-gray-700 cursor-pointer"><BsThreeDotsVertical /></span> */}
        </div>
    );
};

export default SingleSlide;