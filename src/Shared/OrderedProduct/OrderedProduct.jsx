/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import LogoWithNotificationBlackVersion from "../logoWithNotification/LogoWithNotificationBlackVersion";
import { useGetOrderedProductByEmailQuery } from "../../Redux/features/api/allBaseApi";
import { useSelector } from "react-redux";
import LogoWithNotifications from "../logoWithNotification/LogoWithNotifications";
import { MdOutlineShoppingCart } from "react-icons/md";

const OrderedProduct = ({ whiteVersion = false }) => {
    const { user } = useSelector(state => state.userSlice);
    const { data: orderedData, isLoading: orderedDataIsLoading } = useGetOrderedProductByEmailQuery(user?.email)
    return (

        <Link to={'/myOrders'}>
            <button className='w-10 h-10  justify-center items-center  text-2xl rounded-full flex'>
                {
                    whiteVersion ? <LogoWithNotifications Logo={MdOutlineShoppingCart} notification={orderedData?.length || 0} /> : <LogoWithNotificationBlackVersion Logo={MdOutlineShoppingCart} notification={orderedData?.length || 0} />

                }
            </button>
        </Link>

    );
};

export default OrderedProduct;