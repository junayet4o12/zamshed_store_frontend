import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import proprietor from '../../assets/proprietor.jpg'
const Proprietor = () => {
    const shopDetails = [
        { field: 'Age', value: '45+' },
        { field: 'Address', value: 'Fakhir Bari, Durgapur Chhagalnaiya, Feni' },
        { field: 'Contact Number', value: '+880-1632-884012' },
        { field: 'Email', value: 'zamshed4325@gmail.com' },

    ];
    return (
        <div className=" space-y-4">
            <div className="p-2">
                <RoutesTitle />
                <Title text={'Proprietor'} />
            </div>
            <div className="grid lg:grid-cols-5 gap-y-10">
                <div className="col-span-2 overflow-hidden w-full max-w-[400px] mx-auto px-2 ">
                    <img className="rounded-lg" src={proprietor} alt="" />
                </div>
                <div className=" col-span-3 flex flex-col gap-2 py-2 text-lg sm:p-10">
                    <h2 className="text-primary uppercase text-xl font-bold px-2"><span className="text-4xl">Z</span>amshed <span className="text-4xl">A</span>lam</h2>
                    {
                        shopDetails?.map((item, idx) => <div className="w-full flex gap-y-2  px-2" key={idx}>
                            <p className="min-w-[90px] max-w-[90px] flex gap-1 justify-between "><span className="underline">{item?.field}</span> <span className="min-w-[5px] max-w-[5px]">:</span></p>
                            <p className="font-medium break-words w-[calc(100vw-140px)] sm:w-full">{item?.value}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Proprietor;