/* eslint-disable react/prop-types */
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useGetHomeContentQuery } from "../../Redux/features/api/allBaseApi";
import Loading from "../../Shared/Loading/Loading";
import RoutesTitle from "../../Shared/RoutesTitle/RoutesTitle";
import StylishName from "../../Shared/StylishName";
import Title from "../../Shared/Title/Title";
const Proprietor = () => {
    const { data, isLoading } = useGetHomeContentQuery();
    if (isLoading) {
        return <Loading />
    }
    const { proprietor, address, contactNumber, dateOfBirth, proprietorImage, email } = data[0];
    // const formatDate = (time) => {
    //     const date = new Date(time);

    //     const day = date.getDate();
    //     const month = date.toLocaleString('default', { month: 'long' });
    //     const year = date.getFullYear();

    //     // Formatting the day with suffix
    //     const getDayWithSuffix = (day) => {
    //         if (day > 3 && day < 21) return `${day}th`;
    //         if (day % 10 === 1) return `${day}st`;
    //         if (day % 10 === 2) return `${day}nd`;
    //         if (day % 10 === 3) return `${day}rd`;
    //         return `${day}th`;
    //     };

    //     return `${getDayWithSuffix(day)} ${month} ${year}`;
    // }
    const calculateAge = (time) => {
        const birthDate = new Date(time);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        const dayDifference = today.getDate() - birthDate.getDate();

        // If today's date is before the birthdate this year, subtract one year from the age
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    }
    const ShowingData = ({ field, value }) => {
        return <div className="w-full flex gap-y-2  px-2">
            <p className="min-w-[90px] max-w-[90px] flex gap-1 justify-between "><span className="underline">{field}</span> <span className="min-w-[5px] max-w-[5px]">:</span></p>
            <p className="font-medium break-words w-[calc(100vw-140px)] sm:w-full"> {value}</p>
        </div>
    }
    return (
        <div className=" space-y-4">
            <div className="p-2">
                <RoutesTitle />
                <Title text={'Proprietor'} />
            </div>
            <div className="grid lg:grid-cols-5 gap-y-10">
                <div className="col-span-2 overflow-hidden w-[200px] h-[230px]  xs:w-[300px] xs:h-[345px] sm:h-[460px] sm:w-[400px] mx-auto px-2 ">
                    <PhotoProvider>
                        <PhotoView src={proprietorImage}>
                            <img className="rounded-lg w-full h-full object-cover cursor-pointer" src={proprietorImage} alt="" />
                        </PhotoView>
                    </PhotoProvider>

                </div>
                <div className=" col-span-3 flex flex-col gap-2 py-2 text-lg sm:p-10">
                    <StylishName text={proprietor} />
                    <ShowingData field={'Age'} value={`${calculateAge(dateOfBirth)} Years`} />
                    <ShowingData field={'Address'} value={address} />
                    <ShowingData field={'Contact Number'} value={contactNumber} />
                    <ShowingData field={'Email'} value={email} />
                </div>
            </div>
        </div>
    );
};

export default Proprietor;