export const addedToCart = () => {
    const addedToCartProduct = JSON.parse(localStorage.getItem('zamshedStoreCartProducts'));
    if (addedToCartProduct) {
        return addedToCartProduct;
    } else {
        return []
    }
}

export const removeAllProduct = () => {
    localStorage.removeItem('zamshedStoreCartProducts');
}
export const removeSingleProduct = (data) => {
    const previousProducts = addedToCart()
    const newProducts = previousProducts.filter(productId => data.id !== productId)
    localStorage.setItem('zamshedStoreCartProducts', JSON.stringify(newProducts));
}

export const addSingleProduct = (data) => {
    const previousProducts = addedToCart()
    const newProducts = [...previousProducts, data]
    localStorage.setItem('zamshedStoreCartProducts', JSON.stringify(newProducts));
}