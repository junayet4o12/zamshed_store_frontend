import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import Title from "../../Shared/Title/Title";
import proprietor from '../../assets/proprietor.jpg'
const Proprietor = () => {
    const shopDetails = [
        { field: 'Age', value: '45+' },
        { field: 'Address', value: 'Fakhir Bari, Durgapur Chhagalnaiya, Feni' },
        { field: 'Contact Number', value: '+880-1632-884012' },
        { field: 'Email', value: 'zamshed@gmail.com' },
        
    ];
    return (
        <div className="p-2 space-y-4">
            <RoutesTitle />
            <Title text={'Proprietor'} />
            <div className="grid lg:grid-cols-5 gap-y-10">
                <div className="col-span-2 overflow-hidden w-full max-w-[400px] mx-auto"><img src={proprietor} alt="" /></div>
                <div className=" col-span-3 px-5 flex flex-col gap-2 py-2 text-lg">
                    <h2 className="text-primary uppercase text-xl font-bold"><span className="text-4xl">Z</span>amshed <span className="text-4xl">A</span>lom</h2>
                    {
                        shopDetails?.map((item, idx) => <div className=" w-full flex  gap-x-4 gap-y-2 flex-wrap" key={idx}>
                            <p className="min-w-[150px] max-w-[150px] flex gap-1 justify-between"><span className="underline">{item?.field}</span> <span>:</span></p>
                            <p className="font-medium pl-10 sm:pl-0">{item?.value}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Proprietor;