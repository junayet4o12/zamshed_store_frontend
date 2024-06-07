
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux'
import { setFilterCategory, setSearchingText } from '../../Redux/features/searchingProductsSlice/searchingProductsSlice'
import SingleSlide from './SingleSlide'
import { marqueCategories } from '../../Shared/productCategoriesArray/marqueCategories';
const CategoryMarque = () => {
    const dispatch = useDispatch()
    const { filterCategory } = useSelector((state) => state.searchingProductsSlice);
    const handleCategory = (category) => {
        dispatch(setFilterCategory(category))
        dispatch(setSearchingText(''))
    }
    
    
    return (
        <div className="px-2">
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                breakpoints={{
                    0: { // when window width is >= 0px
                        slidesPerView: 1,
                    },
                    550: { // when window width is >= 550px
                        slidesPerView: 2,
                    },
                    790: { // when window width is >= 790px
                        slidesPerView: 3,
                    },
                    1024: { // when window width is >= 1024px
                        slidesPerView: 4,
                    },
                    1270: { // when window width is >= 1024px
                        slidesPerView: 5,
                    },
                }}
                freeMode={true}

                modules={[FreeMode, Pagination]}
                className='marqueStyle'
            >
                {/* category, handleCategory, filterCategory,idx, categoriesLength */}
                {
                    marqueCategories?.map((category, idx) => <SwiperSlide key={idx}><SingleSlide category={category} handleCategory={handleCategory} filterCategory={filterCategory} idx={idx} categoriesLength={marqueCategories?.length} /></SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default CategoryMarque;