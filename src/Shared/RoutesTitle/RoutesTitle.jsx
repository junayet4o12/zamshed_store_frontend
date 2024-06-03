/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
const RoutesTitle = ({ removeLastElement = false, productName='' }) => {
    const location = useLocation();
    const pathName = location?.pathname;
    let pathArray = ['home', ...pathName.split('/').slice(1)]
    if (removeLastElement) {
        pathArray.pop()
    }
    if(productName){
        pathArray.pop()
        pathArray.push(productName) 
    }
    return (
        <h2 className="font-medium capitalize flex gap-2 flex-wrap">
            {
                pathArray?.map((path, idx) => <span key={idx} className={`flex gap-2 items-center ${(pathArray?.length - 1) === idx ? 'text-primary' : 'text-gray-600'}`}>{path} {(pathArray?.length - 1) !== idx && <FaArrowRight />} </span>)
            }
        </h2>
    );
};

export default RoutesTitle;