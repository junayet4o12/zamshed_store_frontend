import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSearchingText } from "../../Redux/features/searchingProductsSlice/searchingProductsSlice";
const NavbarSearchBar = () => {
    const dispatch = useDispatch()
    const { searchingText } = useSelector((state) => state.searchingProductsSlice);
    const handleChange = (e)=> {
        e.preventDefault();
        const value = e.target.value;
        dispatch(setSearchingText(value))
    }
    return (
        <div className='w-full max-w-[600px] h-[50px] relative text-sm sm:text-base'>
            <input value={searchingText} onChange={handleChange} className="w-full h-full border border-gray-500 rounded-full px-3 sm:px-5 outline-none focus:border-primary" placeholder="Type your Product..." type="text" />
            <div className="absolute top-0 right-0 h-full p-[3px]">
                <button className="flex justify-center items-center gap-0.5 xs:gap-2 h-full px-2 subxl:px-5  text-black bg-secondary rounded-r-full font-medium text-sm sm:text-base">Search <span className=" text-lg sm:text-2xl"><CiSearch /></span></button>
            </div>
        </div>
    );
};

export default NavbarSearchBar;