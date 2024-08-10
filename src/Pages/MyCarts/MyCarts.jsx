import { useDispatch, useSelector } from "react-redux";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import MyCartsCard from "./MyCartsCard";
import { useGetCartProductsMutation } from "../../Redux/features/api/allBaseApi";
import { useEffect, useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import ButtonStrong from "../../Shared/Button/ButtonStrong";
import ButtonDanger from "../../Shared/Button/ButtonDanger";
import NoProductFound from "../../Shared/NoProductFound/NoProductFound";
import { removeAllProduct } from "../../localStorage/addtoCart";
import { restoreAddToCartData } from "../../Redux/features/productsInCartSlice/productsInCartSlice";
import BuyingModal from "./BuyingModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyCarts = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openBuyingModal, setOpenBuyingModal] = useState(false)
    const { addedToCartData } = useSelector(state => state.productsInCartSlice)
    const productIdArray = addedToCartData.map(data => data.id);
    const [getCartProduct, { data, isLoading }] = useGetCartProductsMutation();
    const { user } = useSelector(state => state.userSlice);
    useEffect(() => {
        getCartProduct(productIdArray)
    }, [addedToCartData])
    if (isLoading) {
        return <Loading />
    }
    const handleOpenBuyingModal = () => {
        setOpenBuyingModal(true)
    }
    const handleCloseModal = () => {
        setOpenBuyingModal(false)
    }
    const allCartProducts = data || [];
    const allCartProductsIdArray = allCartProducts?.map(item => item?._id)
    const firstNewAllProductsData = addedToCartData?.map(item => {
        const product = allCartProducts?.find(product => item.id === product?._id);
        return [item, product];
    })
    const newAllProductsData = firstNewAllProductsData.filter(item => allCartProductsIdArray.includes(item[0].id));
    const priceArray = newAllProductsData?.map(data => {
        const { unitValue, unitType } = data[0] || {};
        const productData = data[1] || {};
        const { price, measurement } = productData
        const priceForKg = measurement === 'Kilogram' ? unitType === 'Kg' ? unitValue * price : unitValue * price / 1000 : 0
        const priceForQuantity = measurement === 'Quantity' ? unitValue * price : 0
        const priceForLitre = measurement === 'Litre' ? unitType === 'Litre' ? unitValue * price : unitValue * price / 1000 : 0
        const realPrice = measurement === 'Kilogram' ? priceForKg : measurement === 'Quantity' ? priceForQuantity : priceForLitre;
        return realPrice
    });
    const totalPrice = priceArray.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    const handleRemoveAll = () => {
        removeAllProduct()
        dispatch(restoreAddToCartData())
    }
    return (
        <div className="px-2 space-y-5 pb-10">
            <RoutesTitle />
            <div className="px-10 space-y-5">
                <div><Title text={'My Cart'} /></div>
                {newAllProductsData?.length > 0 && <>
                    <h3 className="text-2xl font-medium">Total Price: <span className="font-bold">{totalPrice || 0} BDT</span></h3>
                    <data className="flex gap-3">
                        <button onClick={handleOpenBuyingModal}><ButtonStrong text={'Buy All'} /></button>
                        <button onClick={handleRemoveAll}><ButtonDanger text={'Remove All'} /></button>
                    </data>
                </>}
            </div>
            <div className="flex flex-wrap justify-center gap-7">
                {
                    newAllProductsData?.map((data, idx) => <MyCartsCard key={idx} data={data} />)
                }
                {
                    newAllProductsData?.length < 1 && <NoProductFound />
                }
            </div>
            <BuyingModal openBuyingModal={openBuyingModal} handleCloseModal={handleCloseModal} newAllProductsData={newAllProductsData} price={totalPrice} handleRemoveAll={handleRemoveAll} />
        </div>
    );
};

export default MyCarts;