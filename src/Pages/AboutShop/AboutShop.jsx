import CountUp from "react-countup";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import shopImage from '../../assets/shopImage.jpg'
const AboutShop = () => {
    const shopDetails = [
        { field: 'Age of Shop', value: '3', extraText: 'Years + ' },
        { field: 'Total Rooms', value: '1', extraText: '' },
        { field: 'Total Product Types', value: '40', extraText: '+' },
        { field: 'Total Products', value: '250', extraText: '+' },
        { field: 'Daily Customers', value: '30', extraText: '+' },
    ];
    return (
        <div className="p-2 space-y-4">
            <RoutesTitle />
            <Title text={'About Shop'} />

            <div className="w-full max-w-[800px] mx-auto space-y-5">
                <h2 className="text-primary uppercase text-xl font-bold"><span className="text-4xl">Z</span>amshed <span className="text-4xl">S</span>tore</h2>
                <div className="col-span-3 overflow-hidden w-full mx-auto object-cover max-h-[450px] flex justify-center items-center rounded-lg"><img className="w-full h-full object-cover " src={shopImage} alt="" /></div>

            </div>
            <div className="pt-5 px-10">
                <div className="mx-auto  py-10 my-4 bg-primary grid grid-cols-1 lg:grid-cols-5 justify-items-center rounded-lg">
                    {/* since, student, rating, instructor, guarantee, ratio */}

                    {
                        shopDetails.map((item, idx) => <div key={idx} className="mx-auto text-white py-5 text-center px-2">
                            <span className="text-4xl"> <CountUp end={item.value} duration={9} /> {item.extraText}</span>
                            <p className="text-xl">{item.field}</p>
                        </div>)
                    }

                </div>
            </div>
        </div>
    );
};

export default AboutShop;