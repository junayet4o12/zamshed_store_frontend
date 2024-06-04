/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import InputLabel from "../InputLabel/InputLabel";
import { useState } from "react";
import ButtonStrong from "../Button/ButtonStrong";
import ButtonDanger from "../Button/ButtonDanger";
import { useForm } from "react-hook-form";
import { addSingleProduct } from "../../localStorage/addtoCart";
import toast from "react-hot-toast";
import { restoreAddToCartData } from "../../Redux/features/productsInCartSlice/productsInCartSlice";
import { useDispatch } from "react-redux";
const AddToCartProductModal = ({ handleCloseModal, openAddToCartModal, productDetails }) => {
    const dispatch  = useDispatch()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { addedTime, category, name, price, productImage, _id, measurement } = productDetails
    const measurementType = measurement === 'Kilogram' ? 'Kg' : measurement === 'Quantity' ? 'Piece' : 'Litre'
    const [unitValue, setUnitValue] = useState('1');
    const [unitType, setUnitType] = useState(measurementType)
    console.log(measurement);
    const inputStyle = `w-full max-w-[600px] border border-gray-500 outline-none focus:border-primary px-4 py-2.5 rounded-md font-medium`
    const handleUnit = (value, type) => {
        setUnitValue(value)
        setUnitType(type)
    }
    const unitTypeTextForKg = measurement === 'Kilogram' ? `${unitValue} ${unitType === 'Kg' ? 'kg' : 'gm'}` : ''
    const unitTypeTextForQuantity = measurement === 'Quantity' ? `${unitValue} pc` : ''
    const unitTypeTextForLitre = measurement === 'Litre' ? `${unitValue} ${unitType === 'Litre' ? 'litre' : 'ml'}` : ''
    const unitStyle = 'text-sm font-medium border-primary border px-1 rounded-sm cursor-pointer'
    const priceForKg = measurement === 'Kilogram' ? unitType === 'Kg' ? unitValue * price : unitValue * price / 1000 : ''
    const priceForQuantity = measurement === 'Quantity' ? unitValue * price : ''
    const priceForLitre = measurement === 'Litre' ? unitType === 'Litre' ? unitValue * price : unitValue * price / 1000 : ''

    const onSubmit = async (e) => {
        e.preventDefault()
        const productData = {
            id: _id,
            unitValue,
            unitType,
            addedTime: new Date().getTime()
        }
        addSingleProduct(productData)
        dispatch(restoreAddToCartData())
        toast.success(`${name} has added to cart`)
        setUnitValue('1');
        setUnitType(measurementType)
        handleCloseModal()
    }

    return (
        <Dialog size="sm" open={openAddToCartModal} handler={handleCloseModal} className="p-5">
            <DialogHeader>Buy {name}.</DialogHeader>
            <DialogBody className="">
                <form onSubmit={onSubmit} className="space-y-4">
                    {measurement === 'Kilogram' && <>
                        <div className="space-y-2">
                            <InputLabel text={'Unit'} />
                            <div className="flex flex-wrap gap-2">
                                <span onClick={() => handleUnit('250', 'Gram')} className={`${unitStyle} ${unitTypeTextForKg === '250 gm' && 'bg-primary text-white'}`}>250 gm</span>
                                <span onClick={() => handleUnit('500', 'Gram')} className={`${unitStyle} ${unitTypeTextForKg === '500 gm' && 'bg-primary text-white'}`}>500 gm</span>
                                <span onClick={() => handleUnit('1', 'Kg')} className={`${unitStyle} ${unitTypeTextForKg === '1 kg' && 'bg-primary text-white'}`}>1 kg</span>
                                <span onClick={() => handleUnit('2', 'Kg')} className={`${unitStyle} ${unitTypeTextForKg === '2 kg' && 'bg-primary text-white'}`}>2 kg</span>
                                <span onClick={() => handleUnit('3', 'Kg')} className={`${unitStyle} ${unitTypeTextForKg === '3 kg' && 'bg-primary text-white'}`}>3 kg</span>
                                <span onClick={() => handleUnit('5', 'Kg')} className={`${unitStyle} ${unitTypeTextForKg === '5 kg' && 'bg-primary text-white'}`}>5 kg</span>
                            </div>

                        </div>
                        <div className="space-y-2">
                            <InputLabel text={'Custom Unit'} />
                            <div className="grid grid-cols-3 gap-2">
                                <input required onChange={(e) => {
                                    const value = e.target.value
                                    if (Number.isInteger(Number(value)) || value === "") {
                                        setUnitValue(value);
                                    }
                                }} value={unitValue} type="number" placeholder="Unit" className={`${inputStyle} col-span-2`} />
                                <select required onChange={(e) => setUnitType(e.target.value)} value={unitType} className={`${inputStyle} col-span-1`} >
                                    <option>Kg</option>
                                    <option>Gram</option>
                                </select>

                            </div>
                        </div>
                        <div>
                            <InputLabel text={'Price'} />
                            <p>{priceForKg} BDT</p>
                        </div>
                    </>}
                    {measurement === 'Quantity' && <>
                        <div className="space-y-2">
                            <InputLabel text={'Unit'} />
                            <div className="flex flex-wrap gap-2">
                                <span onClick={() => handleUnit('1', 'Piece')} className={`${unitStyle} ${unitTypeTextForQuantity === '1 pc' && 'bg-primary text-white'}`}>1 pc</span>
                                <span onClick={() => handleUnit('2', 'Piece')} className={`${unitStyle} ${unitTypeTextForQuantity === '2 pc' && 'bg-primary text-white'}`}>2 pc</span>
                                <span onClick={() => handleUnit('3', 'Piece')} className={`${unitStyle} ${unitTypeTextForQuantity === '3 pc' && 'bg-primary text-white'}`}>3 pc</span>
                                <span onClick={() => handleUnit('5', 'Piece')} className={`${unitStyle} ${unitTypeTextForQuantity === '5 pc' && 'bg-primary text-white'}`}>5 pc</span>
                                <span onClick={() => handleUnit('10', 'Piece')} className={`${unitStyle} ${unitTypeTextForQuantity === '10 pc' && 'bg-primary text-white'}`}>10 pc</span>
                            </div>

                        </div>
                        <div className="space-y-2">
                            <InputLabel text={'Custom Pieces'} />
                            <div className="grid  gap-2">
                                <input required onChange={(e) => {
                                    const value = e.target.value
                                    if (Number.isInteger(Number(value)) || value === "") {
                                        setUnitValue(value);
                                    }

                                    // if()
                                }} value={unitValue} type="number" placeholder="Unit" className={`${inputStyle} col-span-2`} />

                            </div>
                        </div>
                        <div className="space-y-2">
                            <InputLabel text={'Price'} />
                            <p>{priceForQuantity} BDT</p>
                        </div>
                    </>}
                    {measurement === 'Litre' && <>
                        <div className="space-y-2">
                            <InputLabel text={'Unit'} />
                            <div className="flex flex-wrap gap-2">
                                <span onClick={() => handleUnit('250', 'ML')} className={`${unitStyle} ${unitTypeTextForLitre === '250 ml' && 'bg-primary text-white'}`}>250 ml</span>
                                <span onClick={() => handleUnit('500', 'ML')} className={`${unitStyle} ${unitTypeTextForLitre === '500 ml' && 'bg-primary text-white'}`}>500 ml</span>
                                <span onClick={() => handleUnit('1', 'Litre')} className={`${unitStyle} ${unitTypeTextForLitre === '1 litre' && 'bg-primary text-white'}`}>1 litre</span>
                                <span onClick={() => handleUnit('2', 'Litre')} className={`${unitStyle} ${unitTypeTextForLitre === '2 litre' && 'bg-primary text-white'}`}>2 litre</span>
                                <span onClick={() => handleUnit('3', 'Litre')} className={`${unitStyle} ${unitTypeTextForLitre === '3 litre' && 'bg-primary text-white'}`}>3 litre</span>
                                <span onClick={() => handleUnit('5', 'Litre')} className={`${unitStyle} ${unitTypeTextForLitre === '5 litre' && 'bg-primary text-white'}`}>5 litre</span>
                            </div>

                        </div>
                        <div className="space-y-2">
                            <InputLabel text={'Custom Unit'} />
                            <div className="grid grid-cols-3 gap-2">
                                <input required onChange={(e) => {
                                    const value = e.target.value
                                    if (Number.isInteger(Number(value)) || value === "") {
                                        setUnitValue(value);
                                    }
                                }} value={unitValue} type="number" placeholder="Unit" className={`${inputStyle} col-span-2`} />
                                <select required onChange={(e) => setUnitType(e.target.value)} value={unitType} className={`${inputStyle} col-span-1`} >
                                    <option>Litre</option>
                                    <option>ML</option>
                                </select>

                            </div>
                        </div>
                        <div>
                            <InputLabel text={'Price'} />
                            <p>{priceForLitre} BDT</p>
                        </div>
                    </>}
                    <div className="w-full flex gap-5 pt-4 items-center">
                        <button>
                            <ButtonStrong text={'Add To Cart'} />

                        </button>
                        Or
                        <div onClick={handleCloseModal}>
                            <ButtonDanger text={'Cancel'} />
                        </div>
                    </div>
                </form>
            </DialogBody>
        </Dialog>
    );
};

export default AddToCartProductModal;