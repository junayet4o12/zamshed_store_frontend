import vegetablesProduct from '../../assets/galleryImage/vegetablesImage.jpg'
import bakeryProduct from '../../assets/galleryImage/bakeryImage.jpg'
import personalCareProduct from '../../assets/galleryImage/personalCareProductImage.jpg'
import ColdDrinks from '../../assets/galleryImage/coldDrinksImage.jpg'
const ProductGallery = () => {
    const imageStyle = 'w-full object-cover h-full rounded-3xl shadow-xl transition-all duration-300 galleryImage'
    const clipPath = `polygon(100% 0, 95% 50%, 100% 100%, 0% 100%, 0 50%, 0% 0%)`;
    return (
        <div className='grid grid-cols-1 lg:grid-cols-11 gap-7 px-2 '>
            {/* vegetables Section  */}
            <div className=' w-full lg:col-span-6 overflow-hidden rounded-3xl galleryParent relative h-[400px] sm:h-full max-h-[400px] lg:max-h-full'>
                <img className={`${imageStyle}`} src={vegetablesProduct} alt="" />
                <div className='w-full h-full  absolute top-0 bg-black/60 flex items-center px-5 sm:px-20'>
                    <div className='space-y-5'>
                        <p className="sm:w-max py-2 rounded-l-md max-w-[400px] bg-[#e00000] text-lg text-white font-medium px-10" style={{ clipPath: clipPath }}>
                            100% Farm Fresh Food
                        </p>
                        <p className='text-white text-6xl freshFood'>
                            Fresh Organic
                        </p>
                        <p className='text-secondary text-3xl font-medium'>
                            Food For All
                        </p>

                        <button className='px-8 py-3 rounded-full bg-primary/95 hover:bg-primary text-white font-medium transition-all duration-200'>Shop Now</button>


                    </div>
                </div>

            </div>
            <div className=' w-full lg:col-span-5 space-y-7'>
                {/* bakery Section  */}
                <div className=' w-full overflow-hidden rounded-3xl galleryParent h-[280px] sm:h-full max-h-[280px] relative'>
                    <img className={`${imageStyle}`} src={bakeryProduct} alt="" />
                    <div className='absolute top-0 w-full h-full bg-black/60 flex items-center px-10 '>
                        <div className='text-white space-y-5'>
                            <h2 className='text-3xl  font-bold bakeryFood'>Premium Bakery Food</h2>
                            <p className='text-gray-300 text-sm max-w-[370px]'>Variety of ingredients, artistic presentation, and fresh bakery items.</p>
                            <button className='px-8 py-3 rounded-full bg-white/70  hover:bg-primary text-black hover:text-white font-medium transition-all duration-200'>Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col xs:flex-row gap-7'>
                    {/* coldDrinks Section  */}
                    <div className=' w-full overflow-hidden rounded-3xl galleryParent h-[250px] sm:h-full max-h-[300px] relative'>
                        <img className={`${imageStyle}`} src={ColdDrinks} alt="" />
                        <div className='absolute top-0 w-full h-full bg-black/60 flex items-center justify-center'>
                            <div className='text-white space-y-5 flex  flex-col items-center justify-center px-4'>
                                <p className=' text-xl font-semibold max-w-[370px]'>Thirst Quencher Cold Drinks.</p>
                                <button className='px-8 py-3 rounded-full bg-white/70  hover:bg-primary text-black hover:text-white font-medium transition-all duration-200'>Shop Now</button>
                            </div>
                        </div>
                    </div>
                    {/* personalCareProduct section  */}
                    <div className=' w-full overflow-hidden rounded-3xl galleryParent max-h-[300px] relative'>
                        <img className={`${imageStyle}`} src={personalCareProduct} alt="" />
                        <div className='absolute top-0 w-full h-full bg-black/60 flex items-center justify-center'>
                            <div className='text-white space-y-5 flex  flex-col items-center justify-center px-4'>
                                <p className=' text-xl font-semibold max-w-[370px]'>Your Personal Care Essentials</p>
                                <button className='px-8 py-3 rounded-full bg-white/70  hover:bg-primary text-black hover:text-white font-medium transition-all duration-200'>Shop Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;