import { useSelector } from "react-redux";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import MyCartsCard from "./MyCartsCard";

const MyCarts = () => {
    const { addedToCartData } = useSelector(state => state.productsInCartSlice)
    return (
        <div className="px-2 space-y-5">
            <RoutesTitle />
            <div className="px-10"><Title text={'My Cart'} /></div>
            <div className="flex flex-wrap justify-center gap-7">
                {
                    addedToCartData?.map( (data, idx) => <MyCartsCard key={idx} data={data} />)
}
            </div>
        </div>
    );
};

export default MyCarts;