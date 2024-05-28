import { useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
const RoutesTitle = () => {
    const location = useLocation();
    const pathName = location?.pathname;
    const pathArray = ['home', ...pathName.split('/').slice(1)]

    return (
        <h2 className="font-medium capitalize flex gap-2">
            {
                pathArray?.map((path, idx) => <span key={idx} className={`flex gap-2 items-center ${(pathArray?.length - 1) === idx ? 'text-primary' : 'text-gray-600'}`}>{path} {(pathArray?.length - 1) !== idx && <FaArrowRight/>} </span>)
            }
        </h2>
    );
};

export default RoutesTitle;