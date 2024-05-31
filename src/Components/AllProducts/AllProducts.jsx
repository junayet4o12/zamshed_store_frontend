import { useEffect, useState } from "react";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Title from "../../Shared/Title/Title";
import Loading from "../../Shared/Loading/Loading";
import { useGetAllProductsQuery } from "../../Redux/features/api/allBaseApi";
import { useDispatch, useSelector } from "react-redux";
import { setFilterCategory, setSearchingText } from "../../Redux/features/searchingProductsSlice/searchingProductsSlice";
import NoProductFound from "../../Shared/NoProductFound/NoProductFound";

const AllProducts = () => {
    const dispatch = useDispatch()
    const { data: allProducts, isLoading, isError, error } = useGetAllProductsQuery()
    useEffect(() => {
        dispatch(setSearchingText(''))
        dispatch(setFilterCategory('Select Category'))
    }, [dispatch])
    const { searchingText, filterCategory } = useSelector((state) => state.searchingProductsSlice);
    if (isLoading) {
        return <Loading />
    }
    const filteredDataBySearched = allProducts?.filter(product =>
        product.name.toLowerCase().includes(searchingText.toLowerCase())
    );
    const filteredDataByCategory = (filterCategory === 'All' || filterCategory === 'Select Category') ? filteredDataBySearched : filteredDataBySearched?.filter(product => product.category === filterCategory);
    return (
        <div className="px-2">
            <div className="px-10"><Title text={'All Products'} /></div>
            <div className="flex flex-wrap gap-7 justify-center">
                {
                    filteredDataByCategory?.map(product => <ProductCard key={product?._id} productDetails={product} />)
                }

                {filteredDataByCategory?.length < 1 && <NoProductFound />}
            </div>
        </div>
    );
};

export default AllProducts;