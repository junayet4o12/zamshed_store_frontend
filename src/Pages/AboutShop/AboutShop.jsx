/* eslint-disable react/prop-types */
import CountUp from "react-countup";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import shopImage2 from '../../assets/shopImage.jpg'
import { useGetHomeContentQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
const AboutShop = () => {
    const { data, isLoading } = useGetHomeContentQuery();
    if (isLoading) {
        return <Loading />
    }
    const { dailyCustomers, productAmount, productTypesAmount, shopAge, shopImage, shopName, totalRoom } = data[0];
    const ShowingData = ({ field, value,extraText }) => {
        return <div className="mx-auto text-white py-5 text-center px-2">
            <span className="text-4xl"> <CountUp end={value} duration={9} /> {extraText || ''} </span>
            <p className="text-xl">{field}</p>
        </div>
    }
    return (
        <div className="p-2 space-y-4">
            <RoutesTitle />
            <Title text={'About Shop'} />

            <div className="w-full max-w-[800px] mx-auto space-y-5">
                <h2 className="text-primary uppercase text-xl font-bold"><span className="text-4xl">Z</span>amshed <span className="text-4xl">S</span>tore</h2>
                <div className="col-span-3 overflow-hidden w-full mx-auto object-cover max-h-[450px] flex justify-center items-center rounded-lg"><img className="w-full h-full object-cover " src={shopImage2} alt="" /></div>

            </div>
            <div className="pt-5 px-10">
                <div className="mx-auto  py-10 my-4 bg-primary grid grid-cols-1 lg:grid-cols-5 justify-items-center rounded-lg">
                    {/* since, student, rating, instructor, guarantee, ratio */}

                    <ShowingData field={'Age of Shop'} value={shopAge} extraText='Years +' />
                    <ShowingData field={'Total Rooms'} value={totalRoom}  />
                    <ShowingData field={'Total Product Types'} value={productTypesAmount} extraText='+' />
                    <ShowingData field={'Total Products'} value={productAmount} extraText='+' />
                    <ShowingData field={'Daily Customers'} value={dailyCustomers} extraText='+' />

                </div>
            </div>
        </div>
    );
};

export default AboutShop;