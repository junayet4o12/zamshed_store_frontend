import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import shopImage from '../../assets/shopImage.jpg'
const AboutShop = () => {
    const shopDetails = [
        { field: 'Proprietor Name', value: 'Zamshed Alam' },
        { field: 'Age of Shop', value: '3+ years' },
        { field: 'Total Rooms', value: '1' },
        { field: 'Total Product Types', value: '40+' },
        { field: 'Total Products', value: '250+' },
        { field: 'Daily Customers', value: '30+' },
    ];
    return (
        <div className="p-2 space-y-4">
            <RoutesTitle />
            <Title text={'About Shop'} />
            <div className="grid lg:grid-cols-5 gap-y-10">
                <div className="col-span-3 max-h-[350px] overflow-hidden w-full max-w-[700px] mx-auto"><img src={shopImage} alt="" /></div>
                <div className=" col-span-2 px-5 flex flex-col gap-2 py-2 text-lg">
                    <h2 className="text-primary uppercase text-xl font-bold"><span className="text-4xl">Z</span>amshed <span className="text-4xl">S</span>tore</h2>
                    {
                        shopDetails?.map((item, idx) => <div className=" w-full flex  gap-4" key={idx}>
                            <p className="w-[180px] flex gap-1 justify-between"><span className="underline">{item?.field}</span> <span>:</span></p>
                            <p className="font-medium">{item?.value}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AboutShop;