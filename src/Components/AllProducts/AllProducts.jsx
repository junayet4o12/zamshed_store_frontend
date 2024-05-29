import { useEffect, useState } from "react";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import Title from "../../Shared/Title/Title";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/allProducts')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data)
            })
    }, [])
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