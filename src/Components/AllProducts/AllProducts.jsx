import { useEffect, useState } from "react";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Title from "../../Shared/Title/Title";
import Loading from "../../Shared/Loading/Loading";
import { useGetAllProductsQuery } from "../../Redux/features/api/allBaseApi";

const AllProducts = () => {
    const { data: allProducts, isLoading, isError, error } = useGetAllProductsQuery()
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className="px-2">
            <div className="px-10"><Title text={'All Products'} /></div>
            <div className="flex flex-wrap gap-7 justify-center">
                {
                    allProducts?.map(product=> <ProductCard key={product?._id} productDetails={product} />)
                }
            </div>
        </div>
    );
};

export default AllProducts;