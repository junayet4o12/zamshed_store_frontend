
const AdminProductPriceRow = ({data, id}) => {
    console.log(data);
    const { unitValue, unitType, addedTime} = data[0];
    const {name, price, measurement, category} = data[1]

    const priceForKg = measurement === 'Kilogram' ? unitType === 'Kg' ? unitValue * price : unitValue * price / 1000 : ''
    const priceForQuantity = measurement === 'Quantity' ? unitValue * price : ''
    const priceForLitre = measurement === 'Litre' ? unitType === 'Litre' ? unitValue * price : unitValue * price / 1000 : ''
    const realPrice = measurement === 'Kilogram' ? priceForKg : measurement === 'Quantity' ? priceForQuantity : priceForLitre
    return (
        <>
            <div className="flex gap-1 justify-between">
                <p className="min-w-6">{id}. </p>
                <p className="w-full min-w-[100px] max-w-[100px] xs:min-w-[150px] xs:max-w-[150px] ">{name} - </p>
                <p className="w-full ,ax-w-[80px]  flex justify-between">{unitValue} {unitType} <span>-</span> </p>
                <p className="min-w-max">{realPrice} BDT</p>
            </div>
            <hr className="border-gray-500 my-2" />
        </>
    );
};

export default AdminProductPriceRow;